from flask import Flask, render_template, Response, request, redirect, url_for
#from waitress import serve
from w3mo import w3mo

app = Flask(__name__)

@app.route("/")
def index():
    #return render_template('index.html');
    if(request.method == "GET"):
        return render_template("index.html")
        
if __name__ == '__main__':
    #serve(host="127.0.0.1",port=9000)
    #app.run(host="127.0.0.1",port=9999)
    app.run(host="0.0.0.0",port=80)