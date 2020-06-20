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
  python.stdout.on('data', function (data) {
    let devices = JSON.parse(data.toString('utf8'));
    console.log(devices);
    for (let [key, value] of Object.entries(devices)) {
      console.log(`${key}: ${value}`);
    }

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