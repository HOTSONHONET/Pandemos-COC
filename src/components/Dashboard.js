import React, { useEffect, useState } from 'react'
import APICaller from '../api-service/APICaller';
import BarChart from './BarChart';

function Dashboard(props) {

    let budget = props.budget;
    let treatment_name = props.treatment_name;
    let subtreatment_name = props.subtreatment_name;
    let hos_info = props.hos_info;
    console.log("budget : ", budget)
    console.log("treatment_name : ", treatment_name)
    console.log("subtreatment_name: ", subtreatment_name)
    console.log("hos_info : ", hos_info)
    return (
        <div className="container mt-4" styles={props.curStyle}>
            <h2>Dashboard</h2>

            { }
        </div>
    )
}

export default Dashboard