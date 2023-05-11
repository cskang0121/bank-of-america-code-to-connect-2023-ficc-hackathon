# import os
from flask import Flask
import pandas as pd
import numpy as np
import random
import json
from flask_cors import CORS
from flask import request
from helper import bid, ask, position, output_json, gen_config

# read the evenets.json file into a list of dictionaries
with open('sample_events.json') as f:
    events = json.load(f)

app = Flask(__name__)
CORS(app)

# ----------------------variables------------------------------------
fx_rates = {}
m = None
b = None
div_ratio = None
spread = None
history={}
event_num = 0


@app.route("/event")
def get_event():
    global event_num
    if (event_num >= len(events)):
        return "No more events " + str(event_num), 404
    else:
        ret_event = events[event_num]
        if (ret_event["EventType"] == "ConfigEvent"):
            # global m, b, div_ratio, spread
            # m = ret_event["m"]
            # b = ret_event["b"]
            # div_ratio = ret_event["DivisorRatio"]
            # spread = ret_event["Spread"]
            # print("ConfigEvent: " + str(m) + " " + str(b) +
            #       " " + str(div_ratio) + " " + str(spread))
            pass
        elif (ret_event["EventType"] == "FXMidEvent"):
            # global fx_rates
            # fx_rates[ret_event["Ccy"]] = ret_event["rate"]
            # print("FXMidEvent: " + str(fx_rates))
            pass
        elif (ret_event["EventType"] == "TradeEvent"):
            print("TradeEvent: " + str(ret_event))
        else:
            return "Unknown event type", 404
        event_num += 1
    return ret_event, 200


@app.route("/report_generator", methods=['POST'])
def report_generator():
    # get the input.json from body
    result = []
    input_json = request.get_json()['input']
    for i in input_json:
        ccy = i['Ccy']
        tenor = i['Tenor']
        event_id = i['EventId']

        pos_value, pos_found = position(events[:event_id], ccy, tenor)
        fx_rates, m, b, div_ratio, spread = gen_config(events[:event_id])

        if (pos_found == False):
            result.append(output_json(None, None, None, None,
                                      event_id, ccy, tenor))
            continue
        elif (pos_found == True):
            if (m == None or b == None or div_ratio == None or spread == None or ccy not in fx_rates):
                result.append(output_json(None, None, pos_value, None,
                                          event_id, ccy, tenor))
            else:
                print("else tenor- " + tenor)
                bid_amt = bid(fx_rates[ccy], pos_value,
                              div_ratio, m, tenor, b, spread)
                bid_amt = round(bid_amt,4)
                ask_amt = ask(fx_rates[ccy], pos_value,
                              div_ratio, m, tenor, b, spread)
                ask_amt = round(ask_amt,4)
                result.append(output_json(bid_amt, ask_amt, pos_value, fx_rates[ccy],
                                          event_id, ccy, tenor))
            continue
        else:
            # bid_amt = bid(bid , ask , pos_value , fx_rate , event_id , ccy , tenor)
            pass
    return result, 200


@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>", 200


# start the python app
if __name__ == "__main__":
    app.run(host="127.0.0.1", debug=True, port=5000)
