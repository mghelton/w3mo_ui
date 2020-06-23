# w3mo_ui
Web and Electron based UIs for the [w3mo](https://www.github.com/mghelton/w3mo) project


# Web
* To deploy the web service on a raspberry pi, or other Debian based linux distribution
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

# Electron
* I don't have env setup steps documented at this time, but you need python-shell as a dependant...

## Notes
* you have to ```npm install --save-dev electron``` in the electron directory to install node_packages


# References
* https://www.electronjs.org/docs/tutorial/first-app#installing-electron
