from main_app import app, my_mysql

from flask import Flask, request, jsonify, session, redirect, url_for, render_template
from flask_socketio import SocketIO, send, emit, join_room, leave_room
import json

import sys

app.config['TEMPLATES_AUTO_RELOAD'] = True

socketio = SocketIO(app)

@app.route('/')  # Main Page
def index():
    return render_template('index.html')

@app.route('/chatroom') # Chat Room
def chatroom():
        if not session.get('username'):
                print(session.get('username'), file=sys.stderr)
                return render_template('index.html',info = session.get('username'))
        return render_template('chatroom.html', username = session.get('username'))

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
                    session['username'] = username
                    #print(session.get('username'), file=sys.stderr)

            my_mysql.connection.commit()
            cur.close()

    return jsonify(usernameCheck)

@app.route('/drop_session', methods=['POST'])
def drop_session():
        session.clear()
        return render_template('index.html')

@socketio.on('message')
def message(data):
        print("Yolo: ", data, file=sys.stderr)
        send(data)

@socketio.on('join') #Joining a Room
def join(data):
        join_room(data['room'])
        send({})
