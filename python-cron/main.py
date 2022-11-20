import requests
import json
import time
import os
from dotenv import load_dotenv

load_dotenv()

TG_BOT_TOKEN = os.getenv('TG_BOT_TOKEN')

def job():
  # 1. Get all user:account:txnCount pairs from api
  backend_api_url = "https://fvmbot.herokuapp.com"
  users = requests.get(backend_api_url + "/users").json()["users"]

  # 2. Call glif to get txnCount: curTxnCount
  glif_api_url = "https://graph-wallaby.glif.link/query"
  for user in users:
    limit = 100
    offset = 0
    firstTime = user["firstTime"]

    txnCount = user["txnCount"]
    payload = {
      "operationName": "Messages",
      "variables": {
          "address": user["address"],
          "limit": limit,
          "offset": offset
      },
      "query": "query Messages($address: String!, $limit: Int!, $offset: Int!) {\n  messages(address: $address, limit: $limit, offset: $offset) {\n    cid\n    to {\n      id\n      robust\n      __typename\n    }\n    from {\n      id\n      robust\n      __typename\n    }\n    nonce\n    height\n    method\n    value\n    __typename\n  }\n}"
    }
    txns = requests.post(glif_api_url, json=(payload)).json()["data"]["messages"]
    if txns is None:
      payload = {
        "txnCount": "0",
        "firstTime": False
      }
      users = requests.put(backend_api_url + "/users/userId/" + str(user["userId"]) + "/address/" + user["address"], json=payload).json()
      continue
    
    curTxnCount = len(txns)

    if firstTime == True:
      payload = {
        "txnCount": str(curTxnCount),
        "firstTime": False
      }
      users = requests.put(backend_api_url + "/users/userId/" + str(user["userId"]) + "/address/" + user["address"], json=payload).json()
      continue

    print(txnCount)
    print(curTxnCount)

    # 3. if curTxnCount > txnCount then
    #      take newTxns = latest (curTxnCount - txnCount) txns
    #      send users a dm for newTxns
    #      update txnCount in db
    newTxns = curTxnCount - txnCount
    for i in range(newTxns):
      tg_api_url = "https://api.telegram.org/"+ TG_BOT_TOKEN +"/sendMessage"
      payload = {
        "chat_id": user["userId"],
        "text": "There is a new activity at " + user["address"] + " . Find more at https://explorer.glif.io/tx/" + txns[i]["cid"] +"/?network=wallabynet"
      }
      response = requests.post(tg_api_url, json=(payload)).json()
      print(response)
      payload = {
        "txnCount": str(curTxnCount),
        "firstTime": False
      }
      users = requests.put(backend_api_url + "/users/userId/" + str(user["userId"]) + "/address/" + user["address"], json=payload).json()
      print(users)

while True:
  try:
    job()
    time.sleep(5)
    print("Sleeping for 5 secs...")
  except Exception:
    continue
