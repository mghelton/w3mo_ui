const { ipcMain } = require('electron');

let devices;
let loaded = false;

function getDevices() {
  var getDevices = require('child_process').spawn('python', ['./getDevices.py']);
  var docFrag = document.createDocumentFragment();
  getDevices.stdout.on('data', function (data) {
    devices = JSON.parse(data.toString('utf8'));
    console.log(devices);
    for (let [key, value] of Object.entries(devices)) {
      var button = document.createElement('button');
      button.id = key;
      button.innerHTML = key;
      button.className = "btn btn-primary local_btn";
      // button.onclick = "control(key)";
      //button.disabled = 

      document.getElementById("devices").appendChild(button);
      document.getElementById("devices").appendChild(document.createElement("br"));
      document.getElementById("devices").appendChild(document.createElement("br"));
      //console.log(`${key}: ${value}`);
      /*document.getElementById(key).addEventListener('click', () => {
        let new_state;
        if(devices[key]['state'] == 0){new_state = 1;}
        else{new_state = 0;}
        if(loaded){control(key,devices[key]['ip'],new_state);}
        if(devices[key]['state'] == 1){document.getElementById(key).className = "btn btn-primary local_btn";}
        else{document.getElementById(key).className = "btn btn-secondary local_btn";}
      });
      */
      document.getElementById(key).addEventListener('click', () => {
        control(key)
      });
      document.getElementById(key).dispatchEvent(new Event('click'));
    }
  });
}

function control(key) {
    console.log("RUNNING");
    if(devices[key]['state'] == 0){state = 1;}
    else{state = 0;}
    var controlDevice = require('child_process').spawn('python', ['./control.py', devices[key]['ip'], state]);
    controlDevice.stdout.on('data', function (data) {
      //result.textContent = data.toString('utf8');
      console.log(data.toString('utf8'));
      devices[key]['state'] = parseInt(data.toString('utf8'));
      if(devices[key]['state'] == 1){document.getElementById(key).className = "btn btn-primary local_btn";}
      else{document.getElementById(key).className = "btn btn-secondary local_btn";}
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

btn.addEventListener('click', () => {
  console.log("pressed!")
  //sendToPython();
});

//btn.dispatchEvent(new Event('click'));