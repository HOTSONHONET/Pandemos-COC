import pymongo
import os
import json
from glob import glob

# Config
DATA_FOLDER = "database/Data"

# Creating a client object to connect to the database
db_client = pymongo.MongoClient("mongodb://localhost:27017")


# Helper function to create/get collection objects from the database
def getDBObjects():
    # Making a DB object to create/get Hospital Collections
    hospital_db = db_client["Hospitals"]

    # Creating a database
    pandemos_db = db_client["Pandemos"]
    return hospital_db, pandemos_db


# Helper function to push data of Hospitals as record in Hospital Collection
def pushHospitalData2DB():
    hospital_db, _ = getDBObjects()
    for jfile_path in glob(f"{DATA_FOLDER}/*json"):
        with open(jfile_path, "r") as jfile:
            jfile_content = json.load(jfile)
            jfile.close()
        hospital_name, info = list(jfile_content.items())[0]
        # if hospital_name not in hospital_db.list_collection_names():
        hospital_collection = hospital_db[hospital_name]
        hospital_collection.insert_one(info)


if __name__ == "__main__":
    getDBObjects()
    pushHospitalData2DB()
