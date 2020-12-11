# Overview
Simple web ui for the [w3mo](https://www.github.com/mghelton/w3mo) project

# Deploy
* To deploy the web service on a raspberry pi, or other Debian based linux distribution
* DISCLAIMER: this deployment script is meant to be used as if the device's only purpose is to serve this UI. If you have more complex needs, the deployment is obviously going to me more complex.
```
cd /
git clone https://www.github.com/mghelton/w3mo_ui
cd w3mo_ui/web/deploy
./deploy.sh
```
* The above commands will
    * create a folder at the root directory of your system for the web service to direct to.
    * download the necessary dependants
    * enable all services

* After deployment, just enter the IP address or Hostname of your device in a browser to access the UI