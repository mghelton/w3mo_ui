from flask import Flask, render_template, request
from w3mo.w3mo import discover, w3mo
import json
import waitress

app = Flask(__name__)
x = {}

@app.route('/')
def index():
    return render_template("index.html")

@app.route("/get")
def get():
    for key in x:
        try:    
            x[key]['state'] = x[key]['obj'].state
            del(x[key]['obj'])
        except KeyError:
            pass
    return(json.dumps(x))

@app.route("/control", methods=['POST'])
def control():
    if(request.method == "POST"):
        try:
            ip = request.args['ip']
        except KeyError:
            ip = x[request.args['device'].lower()]['ip']
        try:
            device = w3mo(ip=ip)
            device.set_state(int(request.args['state']))
            return json.dumps({"success":device.state})
            
        except Exception as e:
            print(type(e).__name__,e.args)
            return json.dumps({"message":"error!"})

if __name__ == '__main__':
    x = discover()
    waitress.serve(app,host="127.0.0.1",port=9999)
