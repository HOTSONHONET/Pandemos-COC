export default class APICaller {
    static AllTreatments() {
        return fetch("/coc/treatments/all", {
            'method': 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
    }

    static AllSubTreatments(treatment_name) {
        return fetch(`/coc/treatments/all/${treatment_name}`, {
            'method': 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }


    static HosInfo() {
        return fetch(`/coc/hos-info`, {
            'method': 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }


    static Top3Hospitals(subTreatment_name, budget) {
        return fetch(`/coc/${subTreatment_name}/${budget}`, {
            'method': "GET",
            headers: {
                'Content-Type': "application/json"
            }
        })
    }

    static AllSubTreatmentCost(hospital_name, treatment_name) {
        return fetch(`/coc/treatments/${hospital_name}/${treatment_name}`, {
            'method': 'GET',
            header: {
                'Content-Type': 'application/json'
            }
        })
    }

    // static Register(name, email, password, state, gender){
    //     return fetch('/')
    // }
};