#!/bin/bash

# Update and Upgrade Installed Packages
sudo apt-get update
sudo apt-get upgrade

# Install Node Version Manager (nvm)
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh | bash
export NVM_DIR="/home/main/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Install Latest Node Version
nvm install node
nvm use node

# Install foreverjs to run node server continuously
npm install forever -g

# Install MongoDB and Start as Service
sudo apt-get install mongodb-server -y
sudo mkdir -p /data/db
sudo service mongodb start

# Install node modules
npm install
