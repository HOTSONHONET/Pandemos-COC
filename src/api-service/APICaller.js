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
};