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
# with open('sample_events.json') as f:
#     events = json.load(f)
with open('./events.json') as f:
    events = json.load(f)

app = Flask(__name__)
CORS(app)

# ----------------------global variables to simulate real time event polling ------------------------------------
fx_rates = {}
history = []
available_ccy_tenor = []
m = None
b = None
div_ratio = None
spread = None
event_num = 0
# -------------------------------------------------------------------------------------------------------------

# endpoint for frontend app to pull all the events to replicate real-time 
@app.route("/event")
def get_event():
    global event_num
    # prevent index out of bound error 
    if (event_num >= len(events)):
        return "No more events " + str(event_num), 404
    else:
        global m, b, div_ratio, spread
        # current event 
        ret_event = events[event_num]
        # evaluating each event for their different type 
        if (ret_event["EventType"] == "ConfigEvent"):
            global m, b, div_ratio, spread
            m = ret_event["m"]
            b = ret_event["b"]
            div_ratio = ret_event["DivisorRatio"]
            spread = ret_event["Spread"]
            # Logging for backend tracking 
            print("ConfigEvent: " + str(m) + " " + str(b) +
                  " " + str(div_ratio) + " " + str(spread))
        elif (ret_event["EventType"] == "FXMidEvent"):
            global fx_rates
            fx_rates[ret_event["Ccy"]] = ret_event["rate"]
            print("fx_rate" , str(fx_rates))

        elif (ret_event["EventType"] == "TradeEvent"):
            print("TradeEvent: " + str(ret_event))

        else:
            return "Unknown event type", 404

        event_num += 1
    # return all the events up to this point 
    return events[:event_num], 200

@app.route("/history", methods=['POST'])
def get_history():
    #get ccy and tenor from the json body
    global event_num
    ccy = request.get_json()['ccy']
    tenor = request.get_json()['tenor']
    history_ccy_tenor = [] 
    for i in range(event_num):
        event_id = i +1 

        pos_value, pos_found = position(events[:event_id], ccy, tenor)
        fx_rates, m, b, div_ratio, spread = gen_config(events[:event_id])

        if (pos_found == False):
            history_ccy_tenor.append(output_json(None, None, None, None,
                                      event_id, ccy, tenor))
            continue
        elif (pos_found == True):
            if (m == None or b == None or div_ratio == None or spread == None or ccy not in fx_rates):
                history_ccy_tenor.append(output_json(None, None, pos_value, None,
                                          event_id, ccy, tenor))
            else:
                print("else tenor- " + tenor)
                bid_amt = bid(fx_rates[ccy], pos_value,
                              div_ratio, m, tenor, b, spread)
                bid_amt = round(bid_amt, 4)
                ask_amt = ask(fx_rates[ccy], pos_value,
                              div_ratio, m, tenor, b, spread)
                ask_amt = round(ask_amt, 4)
                history_ccy_tenor.append(output_json(bid_amt, ask_amt, pos_value, fx_rates[ccy],
                                          event_id, ccy, tenor))
            continue
        else:
            # bid_amt = bid(bid , ask , pos_value , fx_rate , event_id , ccy , tenor)
            pass
    return history_ccy_tenor, 200


    


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
        #if there are no trades found in the with the same ccy and tenor 
        if (pos_found == False):
            # output None to the ask bid and positonn 
            result.append(output_json(None, None, None, None,
                                      event_id, ccy, tenor))
        elif (pos_found == True):
            # if any of the config or fx rate missing , add pos value but not the rest 
            if (m == None or b == None or div_ratio == None or spread == None or ccy not in fx_rates):
                result.append(output_json(None, None, pos_value, None,
                                          event_id, ccy, tenor))
            else:
                # generate bid and ask before rounding to 4 dp 
                bid_amt = bid(fx_rates[ccy], pos_value,
                              div_ratio, m, tenor, b, spread)
                bid_amt = round(bid_amt, 4)
                ask_amt = ask(fx_rates[ccy], pos_value,
                              div_ratio, m, tenor, b, spread)
                ask_amt = round(ask_amt, 4)

                result.append(output_json(bid_amt, ask_amt, pos_value, fx_rates[ccy],
                                          event_id, ccy, tenor))
        else:
            pass
        #writing to output.json
        with open("output.json", "w") as f :
            json.dump(result,f)
    return result, 200


@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>", 200


# start the python app
if __name__ == "__main__":
    app.run(host="127.0.0.1", debug=True, port=5000)


# -------------previous iterations ----------------
#  global available_ccy_tenor
#             available_ccy_tenor.append(
#                 (ret_event["Ccy"]+"-"+ret_event["Tenor"]))
#             hist_new = []
#             print("here is the trade event")
#             for i in available_ccy_tenor:
#                 print("for loop for the avaiolable tenor ")
#                 ccy = i.split("-")[0]
#                 tenor = i.split("-")[0]
#                 event_id = event_num + 1

#                 pos_value, pos_found = position(events[:event_id], ccy, tenor)
#                 if (pos_found == False):
#                     hist_new.append(output_json(None, None, None, None,
#                                                 event_id, ccy, tenor))
#                 elif (pos_found == True):
#                     if (m == None or b == None or div_ratio == None or spread == None or ccy not in fx_rates):
#                         hist_new.append(output_json(None, None, pos_value, None,
#                                                     event_id, ccy, tenor))
#                     else:
#                         print("else tenor- " + tenor)
#                         bid_amt = bid(fx_rates[ccy], pos_value,
#                                       div_ratio, m, tenor, b, spread)
#                         bid_amt = round(bid_amt, 4)
#                         ask_amt = ask(fx_rates[ccy], pos_value,
#                                       div_ratio, m, tenor, b, spread)
#                         ask_amt = round(ask_amt, 4)
#                         hist_new.append(output_json(bid_amt, ask_amt, pos_value, fx_rates[ccy],
#                                                     event_id, ccy, tenor))
#                 else:
#                     # bid_amt = bid(bid , ask , pos_value , fx_rate , event_id , ccy , tenor)
#                     pass
#                 history.append(hist_new)
#                 print("im here now ")
#                 return history, 200