import React, { useState, useEffect } from 'react'
import APICaller from '../api-service/APICaller';
import Select from 'react-select';

function HomePage(props) {
    const [allTreatments, updateAllTreatments] = useState([]);
    const [allSubTreatments, updateAllSubTreatments] = useState([]);
    const [subMenu, updateSubMenu] = useState(<em>Waiting for selection...</em>)
    useEffect(() => {
        APICaller.AllTreatments().then(res => res.json().then(data => {
            updateAllTreatments(data.map(element => {
                return { label: element, value: element };
            }));
            // console.log(data);
        }).catch(error => {
            console.log(`[ERROR] : ${error}`)
        }))
    }, [])

    const showTreatmentList = (option) => {
        const treatment_name = option.label;
        console.log(treatment_name);
        APICaller.AllSubTreatments(treatment_name).then(res => res.json().then(data => {
            updateAllSubTreatments(data.map(element => {
                return { label: element, value: element };
            }));
            console.log(data);
            updateSubMenu(<><em>{`showing results for ${treatment_name.toLowerCase()}`}</em><Select options={allSubTreatments} /></>)
        }).catch(error => {
            console.log(`[ERROR] ${error}`)
        }))

    }
    console.log("SubTreatments : ", allSubTreatments);
    const selectMenuColor = {
        darkBg: "#808080",
        lightBg: "#e6ffff",
        lightFont: "#f2f2f2"
    }

    console.log(allTreatments);
    const customStyles = {
        control: (base, state) => ({
            ...base,
            background: props.curStyle.color === "white" ? selectMenuColor.darkBg : selectMenuColor.lightBg,
            color: props.curStyle.color === "white" ? selectMenuColor.darkBg : selectMenuColor.lightBg,
            // match with the menu
            borderRadius: state.isFocused ? "3px 3px 0 0" : 3,
            height: "5em"
        }),
        menu: base => ({
            ...base,
            // override border radius to match the box
            borderRadius: 0,
            // kill the gap
            marginTop: 0
        }),
        menuList: base => ({
            ...base,
            // kill the white space on first and last option
            padding: 0,
            background: props.curStyle.color === "white" ? selectMenuColor.darkBg : selectMenuColor.lightBg,
            color: props.curStyle.color === "white" ? selectMenuColor.lightFont : selectMenuColor.darkBg,
        })
    };
    return (<>
        <div className="container mt-5 mb-5" style={props.curStyle}>
            <label><h2>Select your treatment plan from the menu</h2></label>
            <Select placeholder="Open the dropdown menu to select treatment" options={allTreatments} onChange={showTreatmentList} styles={customStyles} />
            <div className="container">
            </div>
            <div className="container mt-4">
                {subMenu}
            </div>
        </div>


    </>
    );
}

export default HomePage;