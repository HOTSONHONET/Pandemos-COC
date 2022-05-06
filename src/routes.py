from flask import Flask, redirect, current_app as app, request, jsonify
from .config import *
from database.db import getDBObjects
from pprint import pprint

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


# Fetch all hospital details
@app.route("/")
@app.route("/all")
def allHospitalNames():
    allHospitalNames = hospital_db.list_collection_names()
    to_return = {
        "HospitalNames": list(allHospitalNames)
    }
    return to_return


# Fetch hospital data
@app.route("/all/<string:hospitalName>", methods=["GET"])
def hospitalInfo(hospitalName):
    hospitalInfo = {}
    if hospitalName in hospital_db.list_collection_names():
        for x in hospital_db[hospitalName].find():
            x['_id'] = str(x['_id'])
            hospitalInfo = x
    return hospitalInfo


# Fetch Hospital info based on budget and treatment name
@app.route("/all/<string:treatment_name>/<int:budget>", methods=["GET"])
def top3Hospital(treatment_name: str, budget: int):
    allHospitals = hospital_db.list_collection_names()
    top3 = []
    print(treatment_name)
    for hospital in allHospitals:
        current_hospital = hospital_db[hospital]
        for x in current_hospital.find():
            types_of_treatment = x["Types of Treatments"]
            for _, treatment_list in types_of_treatment.items():
                for subtreatment_name, subtreatment_list in treatment_list.items():
                    for subsubtreatment_name, subsubtreatment_cost in subtreatment_list.items():
                        print(subsubtreatment_name)
                        if subsubtreatment_name == treatment_name and subsubtreatment_cost <= budget:
                            print(subsubtreatment_name, subsubtreatment_cost)
                            top3.append((subsubtreatment_cost, hospital))

    # Selecting top3 hospitals
    top3Hospitals = {}
    hospitals = sorted(top3)
    if len(hospitals) >= 3:
        for i in range(3):
            hospital_cost, hospital_name = hospitals[i]
            top3Hospitals[hospital_name] = hospital_cost

    return top3Hospitals
