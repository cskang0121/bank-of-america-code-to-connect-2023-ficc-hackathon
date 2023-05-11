def skew(net_position, divisor_ratio, m , tenor , b ):
    return net_position / divisor_ratio * variance(m,tenor,b)

def variance(m , tenor , b ): 
    print(str(tenor) +"heiiii")
    return m * int(tenor[:-1])*30.0 + b

def new_mid(fx_rate , net_position, divisor_ratio, m , tenor , b ):
    print("skew tenor- " + str(tenor))
    return fx_rate - skew(net_position, divisor_ratio, m , tenor , b)

def bid(fx_rate , net_position, divisor_ratio, m , tenor , b  , spread ):
    print("bid tenor- " + str(tenor))
    return new_mid(fx_rate , net_position, divisor_ratio, m , tenor , b ) - (0.5 * spread / 10000 )


def ask(fx_rate , net_position, divisor_ratio, m , tenor , b  , spread):
    return new_mid(fx_rate , net_position, divisor_ratio, m , tenor , b ) + (0.5 * spread / 10000 )

# def bid(new_mid , spread ):
#     return new_mid - (0.5 * spread / 10000 )

# def ask(new_mid , spread):
#     return new_mid + (0.5 * spread / 10000 )

def gen_config(events ):
    fx_rates = {}
    m = None
    b = None
    div_ratio = None
    spread = None
    for i in events:
        if (i["EventType"] == "ConfigEvent"):
            m = i["m"]
            b = i["b"]
            div_ratio = i["DivisorRatio"]
            spread = i["Spread"]
        elif (i["EventType"] == "FXMidEvent"):
            fx_rates[i["Ccy"]] = i["rate"]
    return fx_rates , m , b , div_ratio , spread


def position(events , ccy , tenor):
    pos = 0 
    found = False 
    for i in events: 
        if i['EventType'] == "TradeEvent" and i['Ccy'] == ccy and i['Tenor'] == tenor: 
            found = True
            if i['BuySell'] == "buy":
                pos += i['Quantity']
            elif i['BuySell'] == "sell":
                pos -= i['Quantity']
    return pos , found



# calculations to send to output.json 
# return {EventId , Ccy , Tenor , Bid , Ask , Position , QuoteStatus }
def output_json(bid , ask , position , fx_rate , event_id , ccy , tenor ):
    if(bid == None or ask == None ):
        quote_status = "EXCEPTION"
        return {
            "EventId": event_id,
            "Ccy": ccy,
            "Tenor": tenor,
            "Bid": "NA",
            "Ask": "NA",
            "Position": position if position != None else "NA",
            "QuoteStatus": quote_status
        }
    elif abs(bid - fx_rate) > 0.1*fx_rate or abs(ask - fx_rate) > 0.1*fx_rate:
        quote_status = "NON_TRADABLE"
        return {
            "EventId": event_id,
            "Ccy": ccy,
            "Tenor": tenor,
            "Bid": bid,
            "Ask": ask,
            "Position": position,
            "QuoteStatus": quote_status
        }
    else:
        quote_status = "TRADABLE"
        return {
            "EventId": event_id,
            "Ccy": ccy,
            "Tenor": tenor,
            "Bid": bid,
            "Ask": ask,
            "Position": position,
            "QuoteStatus": quote_status
        }
