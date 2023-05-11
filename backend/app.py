# import os
from flask import Flask
import pandas as pd
import numpy as np
import random
import json
from flask_cors import CORS
from flask import request

fx_rates = {}
m = None
b = None
div_ratio = None
spread = None
event_num = 0 
# read the evenets.json file into a list of dictionaries
with open('sample_events.json') as f:
    events = json.load(f)

app = Flask(__name__)
CORS(app)

@app.route("/event")
def get_event():
    global event_num
    if(event_num >= len(events)):
        return "No more events " + str(event_num), 404
    else:
        ret_event = events[event_num]
        if(ret_event["EventType"] == "ConfigEvent"):
            global m, b, div_ratio, spread
            m = ret_event["m"]
            b = ret_event["b"]
            div_ratio = ret_event["DivisorRatio"]
            spread = ret_event["Spread"]
            print("ConfigEvent: " + str(m) + " " + str(b) + " " + str(div_ratio) + " " + str(spread))
        elif(ret_event["EventType"] == "FXMidEvent"):
            global fx_rates
            fx_rates[ret_event["Ccy"]] = ret_event["rate"]
            print("FXMidEvent: " + str(fx_rates))
        elif(ret_event["EventType"] == "TradeEvent"):
            print("TradeEvent: " + str(ret_event))
        else:
            return "Unknown event type", 404
        event_num += 1
    return ret_event, 200

@app.route("/report_generator", methods=['POST'])
def report_generator():
    # get the input.json from body
    input_json = request.get_json()['input']
    print(type(input_json))
    return "Report generated",200


@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>", 200




# start the python app 
if __name__ == "__main__":
    app.run(host="127.0.0.1", debug=True, port=5000)