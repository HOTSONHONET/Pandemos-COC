import json
from random import randint, choice

with open("database\Data\SCB Medical College & Hospital.json", 'r') as jfile:
    scb_dict = json.load(jfile)
    jfile.close()


HOSPITAL_LISTS = ["ISPAT General Hospital",
                  "High Tech College and Hospital",
                  "Jayprakash",
                  "Kalinga Institute of Medical Sciences - KIIMS Bhubaneswar",
                  "All India Medical Sciences - AIIMS Bhubaneswar",
                  "Apollo Hospital Bhubaneswar",
                  "Institute of Medical Sciences and SUM Hospital"
                  ]


# Helper function to give Random Values
def giveRandomValues(treatment_cost):
    numDigits = len(str(treatment_cost))
    val = treatment_cost
    if numDigits == 2:
        val = randint(50, 200)
    if numDigits == 3:
        if treatment_cost <= 500:
            val = randint(250, 500)
        else:
            val = randint(700, 1000)
    if numDigits == 4:
        if treatment_cost <= 5000:
            val = randint(2500, 5000)
        else:
            val = randint(7000, 10000)

    last_digit = val % 10
    tmp1 = val - last_digit
    tmp2 = 10*(int(val/10))
    tmp3 = 100*(int(val/100))
    tmp4 = val - last_digit + 5
    tmp5 = 10*(int(val/10)) + 5
    tmp6 = 100*(int(val/100)) + 5

    val = choice([tmp1, tmp2, tmp3, tmp4, tmp5, tmp6])
    return val


def augment():
    _, scb_data = list(scb_dict.items())[0]
    for hospital in HOSPITAL_LISTS:
        info_dict = {
            f"{hospital}": scb_data
        }

        for treatment_type, treatments in info_dict[hospital]["Types of Treatments"].items():
            for treatment_name, treatment_val in treatments.items():
                for subTreatmentName, subTreatmentCost in treatment_val.items():
                    info_dict[hospital]["Types of Treatments"][treatment_type][treatment_name][subTreatmentName] = giveRandomValues(
                        subTreatmentCost)

        jFileContent = json.dumps(info_dict, indent=4)
        with open(f"database/Data/{hospital}.json", "w") as jfile:
            jfile.write(jFileContent)
            jfile.close()
        print(f"[INFO] {hospital} done...")


if __name__ == "__main__":
    augment()
