import React from 'react'
import APICaller from '../api-service/APICaller';

function SearchBar(props) {
    let allTreatments = APICaller.AllTreatments();
    console.log(allTreatments);
    return (<>
        <div className="container mt-10" style={props.curStyle}>
            <select className="form-select form-select-lg mb-3" aria-label=".form-select-lg example">
            </select>
        </div>
    </>
    );
}

export default SearchBar