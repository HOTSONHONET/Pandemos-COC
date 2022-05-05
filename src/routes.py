from flask import Flask, redirect, current_app as app, request
from .config import *
from database.db import getDBObjects

# Configs
app.secret_key = SECRET_KEY


# DB Objects
hospital_db, users_db = getDBObjects()


"""

From Here different Routes are defined for different API calls
> Route for getting all hospitals names
> Route for getting all info for the hospitals
> Route for getting selected hospital info
> Route for getting top 3 hospitals


"""


# Fetch hospital data
@app.route("/dashboard/<string:hospitalName>", method=["GET"])
def hospital(hospitalName):
    
