import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2';
import APICaller from '../api-service/APICaller';
import BarChart from './BarChart';
import HosCard from './HosCard';
function Dashboard(props) {

    let budget = props.budget;
    let treatment_name = props.treatment_name;
    let subtreatment_name = props.subtreatment_name;
    let data = props.top3HospitalsData;

    console.log("*******", "Inside Dashboard", "*******")
    console.log("budget : ", budget)
    console.log("treatment_name : ", treatment_name)
    console.log("subtreatment_name: ", subtreatment_name)
    console.log("data: ", data)
    let top3Hospitals = data["top 3 hospitals"]["hospitals"];
    let dashboard_data = data["top 3 hospitals"]["compare_data"]
    console.log("dashboard_data : ", dashboard_data)
    console.log("Top3Hospitals: ", top3Hospitals)

    return (
        <>
            <br></br>
            <div className="container mt-4">
                <h2>Dashboard</h2>
                <div className='row' key="hospital-cards">
                    <em className="mt-2 mb-2">Top 3 Hospitals </em>
                    {top3Hospitals.map(ele => {
                        return (<>
                            <div className='col-md' key={ele.name} >
                                <HosCard data={ele} curStyle={props.curStyle} />
                            </div>
                        </>)
                    })}
                </div>
                <div className="container mt-5" key="barcharts">
                    <em className="mt-2 mb-2">Comparitive Analysis between Hospitals</em>
                    <div className="row mt-2 mb-2">
                        {dashboard_data.map(ele => {
                            console.log("ele: ", ele);
                            return (
                                <div className="col-6">
                                    <BarChart data={ele.data} name={ele.treatment_name} key={ele.treatment_name} />
                                </div>)
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard