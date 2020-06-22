let devices;

function getDevices() {
    let request = new XMLHttpRequest();
    request.open("GET", "http://192.168.61.200/get");
    request.send();
    request.onload = () => {
        console.log(request);
        if(request.status === 200) {
            devices = JSON.parse(request.response);
            console.log(devices);
            for (let [key,value] of Object.entries(devices)) {
                var button = document.createElement("button");
                button.id = key;
                button.innerHTML = key;
                document.getElementById("devices").appendChild(button);
                document.getElementById("devices").appendChild(document.createElement("br"));
                document.getElementById("devices").appendChild(document.createElement("br"));
                document.getElementById(key).addEventListener('click', () => control(key));
            }
            document.getElementById("loader").remove();
        } else {
            console.log(`error ${request.status} ${request.statusTest}`);
        }
    }
}

//events
document.addEventListener('DOMContentLoaded', function() {
    getDevices();
}, false);