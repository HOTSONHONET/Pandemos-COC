from flask import Flask, redirect, current_app as app, request, jsonify
from .config import *
from database.db import getDBObjects
from pprint import pprint

# Configs
app.secret_key = SECRET_KEY


# DB Objects
hospital_db, users_db = getDBObjects()


"""
Route: /coc
==========

From Here different Routes are defined for different API calls
> Route for getting all hospitals names
> Route for getting all info for a particular hospital
> Route for filtering top 3 available with the particular service and is of below the provided budget
> Route for getting all the treatments available in a hospital
> Route for listing all the available treatments under a particular type of treatement
> Route for fetching all the subtreatments available under a particular treatement which is of a particular type


"""


# Fetch all hospital details
@app.route("/")
@app.route("/coc")
def allHospitalNames():
    allHospitalNames = hospital_db.list_collection_names()
    to_return = {
        "HospitalNames": list(allHospitalNames)
    }
    return to_return


# Fetch hospital data
@app.route("/coc/<string:hospitalName>", methods=["GET"])
def hospitalInfo(hospitalName):
    hospitalInfo = {}
    if hospitalName in hospital_db.list_collection_names():
        for x in hospital_db[hospitalName].find():
            x['_id'] = str(x['_id'])
            hospitalInfo = x
    return hospitalInfo


# Fetch Hospital info based on budget and treatment name
@app.route("/coc/<string:treatment_name>/<int:budget>", methods=["GET"])
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


# Route for fetching all the Types of Treatment available in the hospital
@app.route("/coc/treatments/<string:hospital_name>")
def allTreatments(hospital_name):
    allHospitals = hospital_db.list_collection_names()
    to_return = {}
    if hospital_name in allHospitals:
        for reqHospital in hospital_db[hospital_name].find():
            for treatmentType, treatmentList in reqHospital["Types of Treatments"].items():
                to_return[treatmentType] = list(treatmentList.keys())

    return to_return


# Route for fetching all the treatments available a particular type of treaments
@app.route("/coc/treatments/<string:hospital_name>/<string:type_of_treatment>")
def allTreatmentsOfAType(hospital_name, type_of_treatment):
    allHospitals = hospital_db.list_collection_names()
    to_return = {}
    if hospital_name in allHospitals:
        for reqHospital in hospital_db[hospital_name].find():
            for treatmentType, treatmentList in reqHospital["Types of Treatments"].items():
                if treatmentType == type_of_treatment:
                    to_return[treatmentType] = list(treatmentList.keys())
    return to_return


# Route for fetching all the subtreatments available under a particular treatment which is of a particular type
@app.route("/coc/treatments/<string:hospital_name>/<string:type_of_treatment>/<string:req_treatment_name>")
def allSubtreatmentsUnderATreatmentOfAType(hospital_name, type_of_treatment, req_treatment_name):
    allHospitals = hospital_db.list_collection_names()
    to_return = {}
    if hospital_name in allHospitals:
        for reqHospital in hospital_db[hospital_name].find():
            for treatmentType, treatmentList in reqHospital["Types of Treatments"].items():
                if treatmentType == type_of_treatment:
                    to_return[treatmentType] = {}
                    for treatment_name, subTreatmentList in treatmentList.items():
                        if treatment_name == req_treatment_name:
                            to_return[treatmentType][treatment_name] = subTreatmentList

    return to_return
