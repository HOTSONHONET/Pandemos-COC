import React from 'react';

function About(props) {
    return (
        <div className="container my-3" style={props.curStyle}>
            <div className="row">
                <p className="text-justify">
                    Pandemos is a telemedicine platform which will be deployed as a web application to help patients schedule virtual appointments in their trusted hospitals. The platform will provide a patient-friendly cost of care dashboard, where patients can get better cost estimates for medical procedures from nearby hospitals. Users can compare between hospitals based on the ratings & previous patients’ experiences to get a better idea about the hospital services. The dashboard is a modern analytical tool to monitor hospital Key Performance Indicators (KPI) in a dynamic and interactive way. It can interpret machine readable data to provide meaningful insights in the form of visual representations. Comparative analysis between hospitals based on the ratings, previous patient’s experiences and treatment facilities helps users in making a wise selection of their hospital.
                </p>
            </div>
            <div className="row mt-2">
                <p className="text-justify">
                    Once a patient register to the platform, they will have the opportunity to create or share their Electronic Health Records (EHRs). EHRs can be leveraged and scaled to improve clinical care and health decisions. The application will incorporate a consultant management system which will assist in providing appointments with the physicians for virtual consultation. It will also handle the sharing of EHR with appointed physician while ensuring data democratization. Virtual consultation can be the required multi-prolonged solution that can help patients, especially symptomatic patient to communicate with physician without the need of physical presence.
                </p>
            </div>
        </div>);
}

export default About;
