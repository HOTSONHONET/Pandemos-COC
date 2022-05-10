import React, { useState, useEffect } from 'react';
import APICaller from '../api-service/APICaller';

function HospitalStats(props) {
    const [hos_info, update_hos_info] = useState([]);
    useEffect(() => {
        APICaller.HosInfo().then(res => res.json().then(data => {
            update_hos_info(data);
            console.log(data);
        }))
    }, [])

    const selectMenuColor = {
        darkBg: "#808080",
        lightBg: "#e6ffff",
        lightFont: "#f2f2f2",
        darkFont: "#000000"
    }

    return (
        <div className="container mt-5 scrollspy-example" styles={props.curStyle} dataSpy="scroll">
            <h2>Hospitals Stats</h2>
            {hos_info.length ? hos_info.map(ele => {
                return <><div className="card mt-3 mb-3 py-auto" key={ele.Name} styles={{ backgroundColor: "red" }}>
                    <div className="row no-gutters">
                        <div className="col-auto">
                            <img src="//placehold.it/200" className="img-fluid" alt="" />
                        </div>
                        <div className="col">
                            <div className="card-block px-2">
                                <h4 className="card-title">{`${ele.Name}`}</h4>
                                <p className="card-text">{`${ele.Region},${ele.State}`}</p>
                            </div>
                        </div>
                    </div>
                </div></>
            }) : <></>}
        </div>
    )
}

export default HospitalStats