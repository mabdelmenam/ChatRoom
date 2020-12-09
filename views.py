from main_app import app, my_mysql

from flask import Flask, request, jsonify, session, redirect, url_for, render_template
import json

import sys

app.config['TEMPLATES_AUTO_RELOAD'] = True

@app.route('/')  # Main Page
def index():
    return render_template('index.html')

@app.route('/chatroom') # Chat Room
def chatroom():
    return render_template('chatroom.html')

@app.route('/profanity_filter', methods=['GET', 'POST']) #Profanity Check
def profanity():
    req_data = request.get_json()
    username = req_data['user']

    usernameCheck = {}

    txt = username.lower()
    #Checking for Profanity
    with open("more_words2.txt") as f:
            for line in f:
                if txt.find(line.strip()) > -1:
                        usernameCheck['profanity_check'] = 1 #Profanity found
                        #print(line.strip(), file=sys.stderr)
                        break
                else:
                        usernameCheck['profanity_check'] = 0 #No Profanity
    
    #Checking if Username is in the database from before
    if(usernameCheck['profanity_check'] == 0): 
            cur = my_mysql.connection.cursor()
            user_Duplicate = cur.execute("SELECT * FROM chatUsers where username =(%s)",[username])

            if user_Duplicate: #Username is already used
                    usernameCheck['profanity_check'] = 1
            else:
                    cur.execute("INSERT INTO chatUsers(username) VALUES(%s)", [username])

            my_mysql.connection.commit()
            cur.close()

    return jsonify(usernameCheck)