from flask import redirect, current_app as app, request, jsonify, session
from .config import *
from database.db import getDBObjects
from pprint import pprint
import string
from passlib.hash import pbkdf2_sha256
import uuid

# Configs
app.secret_key = SECRET_KEY


# DB Objects
hospital_db, pandemos_db = getDBObjects()


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
    main_treatment = ""
    type_of_treament = ""
    for hospital in allHospitals:
        current_hospital = hospital_db[hospital]
        for x in current_hospital.find():
            location = x["Location"]
            image_url = str(x["image_url"])
            types_of_treatment = x["Types of Treatments"]
            for type_name, treatment_list in types_of_treatment.items():
                for subtreatment_name, subtreatment_list in treatment_list.items():
                    for subsubtreatment_name, subsubtreatment_cost in subtreatment_list.items():
                        if subsubtreatment_name == treatment_name and subsubtreatment_cost <= budget:
                            top3.append(
                                (subsubtreatment_cost, hospital, location, image_url))
                            main_treatment = subtreatment_name
                            type_of_treament = type_name

    top3Hospitals = {}
    if len(top3) >= 3:
        pprint(f"[INFO] Top3Hospitals : {top3}")
        # Selecting top3 hospitals
        top3Hospitals = {"top 3 hospitals": {
            "hospitals": [],
            "compare_data": []
        }}
        top3hospitals_partial_data = sorted(top3)[:3]
        req_hospitals = []
        for hospital_data in top3hospitals_partial_data:
            cost, hospital_name, location, image_url = hospital_data
            top3Hospitals["top 3 hospitals"]["hospitals"].append({
                "name": hospital_name,
                "location": f"{location['Region']}, {location['State']}",
                "cost": cost,
                "image_url": image_url
            })
            req_hospitals.append(hospital_name)

        mapper = {}
        for hospital in req_hospitals:
            current_hospital = [x for x in hospital_db[hospital].find()][0]
            pprint(current_hospital["Types of Treatments"][type_of_treament])
            methods = current_hospital["Types of Treatments"][type_of_treament][main_treatment]

            for method, cost in methods.items():
                if method not in mapper.keys():
                    mapper[method] = [{
                        "name": hospital,
                        "cost": cost
                    }]
                else:
                    mapper[method].append({
                        "name": hospital,
                        "cost": cost
                    })

        for treatment_name, data in mapper.items():
            top3Hospitals["top 3 hospitals"]["compare_data"].append({
                "treatment_name": treatment_name,
                "data": data
            })

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
            "name": hospital,
            "location": f"{reqHospital['Location']['Region']}, {reqHospital['Location']['State']}",
            "image_url": reqHospital['image_url']
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
> Route for Login
> Route for profile management 
> Route for signing out user

"""


# Helper function to manage session
class SessionManager:
    def start_session(self, user):
        # So that we will only return _id, name, email, state, region
        del user["password"]
        session["logged_in"] = True
        session["user"] = user
        return jsonify(user), 200

    def signOut(self):
        session.clear()


@app.route("/cms/register", methods=["POST"])
def register_user():
    print(f"request.form: {request.form}")
    print(f"List of Collections: ")
    print(pandemos_db.list_collection_names())
    # Creating the user object
    user = {
        "_id": uuid.uuid4().hex,
        "name": request.form.get("name"),
        "email": request.form.get("email"),
        "password": request.form.get("password"),
        "state": request.form.get("state"),
        "gender": request.form.get("gender"),
        "address": request.form.get("address")

    }

    # Encrypting the password
    user["password"] = pbkdf2_sha256.encrypt(user["password"])

    pprint(user)

    # Checking for existing email address
    if pandemos_db["Users"].find_one({"email": user["email"]}):
        print(pandemos_db["Users"].find_one({"email": user["email"]}))
        return jsonify({"error": "Email address already in use"}), 400

    # Inserting new user to the Users collections
    if pandemos_db["Users"].insert_one(user):
        return SessionManager().start_session(user)

    return jsonify({"error": "Signup failed"}), 400


@app.route("/cms/signout")
def signout():
    return SessionManager().signOut()


# Route for login
@app.route("/cmc/login", methods=["POST"])
def login():
    user = pandemos_db["Users"].find_one({
        "email": request.form.get("email")
    })

    if user and pbkdf2_sha256.verify(request.form.get("password"), user["password"]):
        return SessionManager().start_session(user)
    return jsonify({"error": "Invalid login credentials"}), 401
