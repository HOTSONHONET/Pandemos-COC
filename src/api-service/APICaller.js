export default class APICaller {
    static AllTreatments() {
        let res = fetch("http://localhost:5000/coc/treatments/all", {
            'method': 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(resp => resp.json())
        return res;
    }
};