from flask import Flask, render_template, request
from w3mo.w3mo import discover, w3mo
import json

app = Flask(__name__)

@app.route('/')
def index():
    return render_template("index.html")

@app.route("/get")
def get():
    x = discover()
    for key in x:
        x[key]['state'] = x[key]['obj'].state
        del(x[key]['obj'])
    return(json.dumps(x))

@app.route("/control", methods=['POST'])
def control():
    if(request.method == "POST"):
        try:
            print(request.args)
            x = w3mo(ip=request.args['ip'])
            x.set_state(int(request.args['state']))
            return json.dumps({"success":x.state})
            
        except Exception as e:
            print(type(e).__name__,e.args)
            return json.dumps({"message":"error!"})

if __name__ == '__main__':
    app.run(host="127.0.0.1",port=9999)
    #app.run(host="0.0.0.0",port=80)