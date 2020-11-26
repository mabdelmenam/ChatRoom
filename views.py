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
