const { ipcMain } = require('electron');

let devices;
let loaded = false;

function getDevices() {
  var getDevices = require('child_process').spawn('python', ['py/getDevices.py']);
  var docFrag = document.createDocumentFragment();
  getDevices.stdout.on('data', function (data) {
    devices = JSON.parse(data.toString('utf8'));
    console.log(devices);
    for (let [key, value] of Object.entries(devices)) {
      //create button object
      var button = document.createElement('button');
      button.id = key;
      button.innerHTML = key;
      // button.className = "btn btn-success";
      //add button to div
      document.getElementById("devices").appendChild(button);
      document.getElementById("devices").appendChild(document.createElement("br"));
      document.getElementById("devices").appendChild(document.createElement("br"));
      //create event listener and set button state
      document.getElementById(key).addEventListener('click', () => control(key));
      setButtonState(key);
    }
    document.getElementById("loader").remove();
  });
}

function setButtonState(key){
  if(devices[key]['state'] == 1){document.getElementById(key).className = "btn btn-active";}
  else{document.getElementById(key).className = "btn btn-inactive";}
}

function control(key) {
    if(devices[key]['state'] == 0){state = 1;}
    else{state = 0;}
    var controlDevice = require('child_process').spawn('python', ['py/control.py', devices[key]['ip'], state]);
    controlDevice.stdout.on('data', function (data) {
      //result.textContent = data.toString('utf8');
      console.log(data.toString('utf8'));
      devices[key]['state'] = parseInt(data.toString('utf8'));
      setButtonState(key);
      // devices[key].state = int(data.toString('utf8'));
    });
      
    controlDevice.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });
      
    controlDevice.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
    });
}

//events
document.addEventListener('DOMContentLoaded', function() {
    getDevices();
    loaded = true;
}, false);