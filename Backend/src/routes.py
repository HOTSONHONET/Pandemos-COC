from flask import redirect, current_app as app, request, jsonify
from .config import *
from database.db import getDBObjects
from pprint import pprint
import string

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
> Route for getting treatment list in alphabetic order

"""


# Fetch all hospital details
@app.route("/")
@app.route("/coc")
def allHospitalNames():
    allHospitalNames = hospital_db.list_collection_names()
    to_return = {
        "HospitalNames": list(allHospitalNames)
    }
    return jsonify(to_return)


# Fetch hospital data
@app.route("/coc/<string:hospitalName>", methods=["GET"])
def hospitalInfo(hospitalName):
    hospitalInfo = {}
    if hospitalName in hospital_db.list_collection_names():
        for x in hospital_db[hospitalName].find():
            x['_id'] = str(x['_id'])
            hospitalInfo = x
    return jsonify(hospitalInfo)


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
                        if subsubtreatment_name == treatment_name and subsubtreatment_cost <= budget:
                            top3.append((subsubtreatment_cost, hospital))

    # Selecting top3 hospitals
    top3Hospitals = {}
    hospitals = sorted(top3)
    if len(hospitals) >= 3:
        for i in range(3):
            hospital_cost, hospital_name = hospitals[i]
            top3Hospitals[hospital_name] = hospital_cost

    return jsonify(top3Hospitals)


# Route for fetching all the Types of Treatment available in the hospital
@app.route("/coc/treatments/<string:hospital_name>")
def allTreatments(hospital_name):
    allHospitals = hospital_db.list_collection_names()
    to_return = {}
    if hospital_name in allHospitals:
        for reqHospital in hospital_db[hospital_name].find():
            for treatmentType, treatmentList in reqHospital["Types of Treatments"].items():
                to_return[treatmentType] = list(treatmentList.keys())

    return jsonify(to_return)


# # Route for fetching all the treatments available a particular type of treaments
# @app.route("/coc/treatments/<string:hospital_name>/<string:type_of_treatment>")
# def allTreatmentsOfAType(hospital_name, type_of_treatment):
#     allHospitals = hospital_db.list_collection_names()
#     to_return = {}
#     if hospital_name in allHospitals:
#         for reqHospital in hospital_db[hospital_name].find():
#             for treatmentType, treatmentList in reqHospital["Types of Treatments"].items():
#                 if treatmentType == type_of_treatment:
#                     to_return[treatmentType] = list(treatmentList.keys())
#     return jsonify(to_return)


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

    return jsonify(to_return)


# Route for getting the treatment list in alphabetic order
@app.route("/coc/treatments/all")
def allTreatmentsInOrder():
    allHospitals = hospital_db.list_collection_names()
    to_return = []
    # Since all hospitals have the same set of treatments
    reqHosital = [x for x in hospital_db[allHospitals[0]].find()][0]
    for _, treatmentList in reqHosital["Types of Treatments"].items():
        for treatment_name in treatmentList.keys():
            to_return.append(treatment_name)
    to_return = sorted(to_return)
    return jsonify(to_return)


# Route for getting the subtreatment list of a particular treatment
@app.route("/coc/treatments/all/<string:treatment_name>")
def allSubTreatments(treatment_name=""):
    to_return = []
    print("*"*10, treatment_name, "*"*10)
    if treatment_name != "":
        # Since all hospitals have the same set of treatments
        allHospitals = hospital_db.list_collection_names()
        reqHosital = [x for x in hospital_db[allHospitals[0]].find()][0]
        for _, treatmentList in reqHosital["Types of Treatments"].items():
            for treatment_name_ in treatmentList.keys():
                if treatment_name == treatment_name_:
                    to_return = list(treatmentList[treatment_name].keys())

    return jsonify(to_return)


# Route for getting short info on all hospitals
@app.route("/coc/hos-info")
def getShortInfoOfHSP():
    allHospitals = hospital_db.list_collection_names()
    to_return = []

    for hospital in allHospitals:
        reqHospital = [x for x in hospital_db[hospital].find()][0]
        to_return.append({
            "Name": hospital,
            "Region": reqHospital['Location']["Region"],
            "State": reqHospital['Location']["State"]
        })

    return jsonify(to_return)


# Fetching all subTreaments and their cost under a particular hospital
@app.route("/coc/treatments/<string:hospital_name>/<string:treatment_name>")
def getCostOfTreatments(hospital_name, treatment_name):
    to_return = []
    reqHospital = [x for x in hospital_db[hospital_name].find()][0]
    for _, treatmentList in reqHospital["Types of Treatments"].items():
        for treatment_name_ in treatmentList.keys():
            if treatment_name == treatment_name_:
                for k, v in treatmentList[treatment_name].items():
                    to_return.append({
                        "name": k,
                        "cost": v
                    })
    return jsonify(to_return)


"""
Route: /cms
===========
> Route for registering users
> Route for collecting EHR templates from openEHR
> Route for downloading patient profile 



"""
