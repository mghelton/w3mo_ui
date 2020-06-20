let devices;

function sendToPython() {
  var python = require('child_process').spawn('python', ['./test.py', input.value]);
  python.stdout.on('data', function (data) {
    console.log("Python response: ", data.toString('utf8'));
    result.textContent = data.toString('utf8');
  });

  python.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  python.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
}

function getDevices() {
  var python = require('child_process').spawn('python', ['./getDevices.py']);
  var docFrag = document.createDocumentFragment();
  python.stdout.on('data', function (data) {
    let devices = JSON.parse(data.toString('utf8'));
    console.log(devices);
    for (let [key, value] of Object.entries(devices)) {
      var button = document.createElement("input");
      button.setAttribute('text', key);
      button.setAttribute('class','btn btn-primary');
      docFrag.appendChild(button);
      console.log(`${key}: ${value}`);
    }
    document.getElementById('devices').appendChild(docFrag);
  });

  python.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  python.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
}

//events
document.addEventListener('DOMContentLoaded', function() {
    getDevices();
}, false);

btn.addEventListener('click', () => {
  sendToPython();
});

btn.dispatchEvent(new Event('click'));