from main_app import app, my_mysql

from flask import Flask, request, jsonify, session, redirect, url_for, render_template
import json

import sys


@app.route('/')  # Main Page
def index():
    return render_template('index.html')

@app.route('/chatroom') # Chat Room
def chatroom():
    return render_template('chatroom.html')

@app.route('/profanity_filter', methods=['GET', 'POST']) #Profanity Check
def profanity():
        #send username to this functiono
        #return answer back to js as JSON
    req_data = request.get_json()
    username = req_data['user']

    usernameCheck = {}

    txt = username.lower()
    with open("more_words2.txt") as f:
            for line in f:
                if txt.find(line.strip()) > -1:
                        usernameCheck['profanity_check'] = 1
                        #print(line.strip(), file=sys.stderr)
                        break
                else:
                        usernameCheck['profanity_check'] = 0

    return jsonify(usernameCheck)