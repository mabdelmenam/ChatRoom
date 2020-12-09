#export FLASK_APP=main_app.py
#export FLASK_DEBUG=true

from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_mysqldb import MySQL
import os
import json
import sys

app = Flask(__name__)

# Configure DB
app.config.from_pyfile('config.py')
my_mysql = MySQL(app)

from views import *
CORS(app, supports_credentials=True)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
