#include <ESP8266WebServer.h>
#include <ESP8266WiFi.h>
#include <ESP8266mDNS.h>
#include <WiFiUdp.h>
#include <ArduinoOTA.h>

MDNSResponder mdns;

// Replace with your network credentials
const char* ssid = "";
const char* password = "";
const char* deviceName = "PIoT-Device";

// *** UPDATE THESE FOR YOU NETWORK CONFIG ***
IPAddress ip(000, 000, 0, 00); // Assign Static local IP address for this device
IPAddress gateway(0, 000, 0, 0);
IPAddress subnet(000, 000, 000, 0);

ESP8266WebServer server(80);

void setup() {

  // GPIO for signaling relay module
  pinMode(D2, OUTPUT);
  digitalWrite(D2, LOW);

  delay(1000);
  Serial.begin(115200);
  Serial.println("Booting");
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  WiFi.config(ip, gateway, subnet);

  while (WiFi.waitForConnectResult() != WL_CONNECTED) {
    Serial.println("Connection Failed! Rebooting...");
    delay(5000);
    ESP.restart();
  }

  Serial.println("");
  Serial.print("Connected to ");
  Serial.println(ssid);
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());

  // ***********************************************************
  // *      Arduino Over The Air (OTA) Bootloader Setup        *
  // ***********************************************************

  // Port defaults to 8266 (may want to change for additional security)
   ArduinoOTA.setPort(8266);

  // Hostname defaults to esp8266-[ChipID]
   ArduinoOTA.setHostname(deviceName);
   WiFi.hostname(deviceName);

  // No authentication by default
   ArduinoOTA.setPassword(password);

  ArduinoOTA.onStart([]() {
    Serial.println("Start");
  });

  ArduinoOTA.onEnd([]() {
    Serial.println("\nEnd");
  });

  ArduinoOTA.onProgress([](unsigned int progress, unsigned int total) {
    Serial.printf("Progress: %u%%\r", (progress / (total / 100)));
  });

  ArduinoOTA.onError([](ota_error_t error) {
    Serial.printf("Error[%u]: ", error);
    if (error == OTA_AUTH_ERROR) Serial.println("Auth Failed");
    else if (error == OTA_BEGIN_ERROR) Serial.println("Begin Failed");
    else if (error == OTA_CONNECT_ERROR) Serial.println("Connect Failed");
    else if (error == OTA_RECEIVE_ERROR) Serial.println("Receive Failed");
    else if (error == OTA_END_ERROR) Serial.println("End Failed");
  });

  ArduinoOTA.begin();

  // ***********************************************************
  // *               ESP8266 Web Server Setup                  *
  // ***********************************************************

  if (mdns.begin("esp8266", WiFi.localIP())) {
    Serial.println("MDNS responder started");
  }

  server.on("/on", [](){
    digitalWrite(D2, HIGH);
    server.send(200, "text/json", "{\"state\":\"on\"}");
    delay(1000);
  });

  server.on("/off", [](){
    digitalWrite(D2, LOW);
    server.send(200, "text/json", "{\"state\":\"off\"}");
    delay(1000);
  });

  server.on("/status", [](){
    if (digitalRead(D2) == HIGH){
      server.send(200, "text/json", "{\"localIp\":" + IpAddress2String(WiFi.localIP()) + ", \"state\":\"on\"}");
    } else {
      server.send(200, "text/json", "{\"localIp\":" + IpAddress2String(WiFi.localIP()) + ", \"state\":\"off\"}");
    }
    delay(1000);
  });

  server.begin();
  Serial.println("HTTP server started");
}

void loop(void) {
  ArduinoOTA.handle();
  server.handleClient();
}

String IpAddress2String(const IPAddress& ipAddress)
{
  return String(ipAddress[0]) + String(".") +\
  String(ipAddress[1]) + String(".") +\
  String(ipAddress[2]) + String(".") +\
  String(ipAddress[3])  ;
}
