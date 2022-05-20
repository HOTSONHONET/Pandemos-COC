import React, { useState, useEffect } from 'react'
import APICaller from '../api-service/APICaller';



function HomePage(props) {
    const [hospitals, updateHospitals] = useState(null);
    useEffect(() => {
        async function fetchHosInfo() {
            const response = await APICaller.HosInfo();
            console.log("[INFO] Collected all hosInfo : ", response);
            const data = await response.json();
            return data;
        }

        fetchHosInfo().then(data => {
            updateHospitals(data);
            console.log("data : ", data)
        }).catch(error => {
            console.log("[ERROR] : ", error)
        })

    }, []);

    let customStyle = {
        bgcolor: props.curStyle.mode == "dark" ? "#8c8c8c" : "white",
        color: props.curStyle.mode == "dark" ? "#f2f2f2" : "black"
    }

    return (
        (hospitals && <div className="container">
            <div className="row mt-3">
                {hospitals.map(ele => {
                    return (
                        <div className="card mt-2 mx-auto mb-2" style={{ width: "20rem", backgroundColor: customStyle.bgcolor, color: customStyle.color }}>
                            <img className="card-img-top" src={ele.image_url} alt="Card image cap" style={{ height: "15rem" }} />
                            <div className="card-body">
                                <h5 className="card-title"><center>{ele.name}</center></h5>
                            </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item" style={{ backgroundColor: customStyle.bgcolor, color: customStyle.color }}><center>{ele.location}</center></li>
                                <li className="list-group-item" style={{ backgroundColor: customStyle.bgcolor, color: customStyle.color }}></li>
                            </ul>
                        </div>
                    )
                })}
            </div>
        </div>)
    )
}

export default HomePage;