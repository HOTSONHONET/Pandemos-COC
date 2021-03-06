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

    static LoginUser(email, password) {
        return fetch('/cms/login'), {
            'method': 'POST',
            header: {
                'Content-Type': 'application / json'
            },
            body: {
                "email": email,
                "password": password
            }
        }
    }
};