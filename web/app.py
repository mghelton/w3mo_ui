from flask import Flask, render_template
from w3mo.w3mo import discover
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

if __name__ == '__main__':
    app.run(host="0.0.0.0",port=80)