# import json
# import os
# from glob import glob
# from pprint import pprint

# DATA_PATH = "database/Data"


# for hospital in os.listdir(DATA_PATH):
#     hospital_dict = {hospital: {}}
#     hospital_path = f"{DATA_PATH}/{hospital}"
#     for treatment_type in os.listdir(hospital_path):
#         hospital_dict[hospital][treatment_type] = {}
#         treatment_path = f"{hospital_path}/{treatment_type}"
#         for jsonFilePath in glob(f"{treatment_path}/*.json"):
#             try:
#                 with open(jsonFilePath, "r") as jfile:
#                     data = json.load(jfile)
#                     jfile.close()
#                 k, v = list(data.items())[0]
#                 hospital_dict[hospital][treatment_type][k] = v
#             except:
#                 continue

#     jFileContent = json.dumps(hospital_dict, indent=4)
#     with open(f"database/{hospital}.json", "w") as jfile:
#         jfile.write(jFileContent)
#         jfile.close()
