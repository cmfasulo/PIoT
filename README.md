# PIoT:
## Raspberry Pi IoT API Server with ReactJS User Interface

Raspberry Pi server will communicate with ESP8266/arduino clients running simple local servers to control device states and report online status back to Pi.


Start node server:
```npm start```

Start React dev server:
```npm run react```

## TODOs
Client:
* Validation and sanitize form inputs
* Catch/handle form response errors
* Restrict device control per user permissions
* Global styles/configure theme

Server:
* Validate and sanitize api requests
* Catch/handle server/mongoose errors
* Restrict device control per user permissions
* Device "checkin" cron job
