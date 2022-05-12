import React, { useState, useEffect } from 'react'
import APICaller from '../api-service/APICaller';
import Select from 'react-select';
import HospitalStats from './HospitalStats';
import Dashboard from './Dashboard';

function HomePage(props) {
    const [allTreatments, updateAllTreatments] = useState([]);
    const [allSubTreatments, updateAllSubTreatments] = useState([]);
    const [subTreatment_name, updateSubTreatment_name] = useState("");
    const [treatment_name, updateTreatment_name] = useState("None");
    const [budget, update_budget] = useState(0);

    const [displayDashboard, updatedisplayDashboard] = useState(false);
    const [buttonClicked, updateButtonClicked] = useState(false);
    const [top3HospitalsData, updateTop3HospitalsData] = useState({})


    // Styles
    const selectMenuColor = {
        darkBg: "#808080",
        lightBg: "#e6ffff",
        lightFont: "#f2f2f2",
        darkFont: "#000000"
    }

    const customStyles = {
        control: (base, state) => ({
            ...base,
            background: props.curStyle.mode === "dark" ? selectMenuColor.darkBg : selectMenuColor.lightBg,
            color: selectMenuColor.darkFont,
            // match with the menu
            borderRadius: state.isFocused ? "3px 3px 0 0" : 3,
            height: "5em",
            marginBottom: "2em"
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
            backgroundColor: props.curStyle.mode === "dark" ? selectMenuColor.darkBg : selectMenuColor.lightBg,
            color: selectMenuColor.darkFont,
        })
    };


    useEffect(() => {
        console.log(displayDashboard)
        APICaller.AllTreatments().then(res => res.json().then(data => {
            updateAllTreatments(data.map(element => {
                return { label: element, value: element };
            }));
            // console.log(data);
        }).catch(error => {
            console.log(`[ERROR] : ${error}`)
        }))
    }, [])

    useEffect(() => {

        APICaller.AllSubTreatments(treatment_name).then(res => res.json().then(data => {
            updateAllSubTreatments(data.map(element => {
                return { label: element, value: element };
            }));
        }).catch(error => {
            console.log(`[ERROR] : ${error}`)
        }))
    }, [treatment_name])


    // For getting the values whenever the use type their budget
    const coc_dash = (event) => {
        update_budget(event.target.value);
        console.log(treatment_name, subTreatment_name, budget);
    }


    // Heler function to check whether the object is empty or not
    const isEmptyObj = (obj) => {
        console.log("Size of the object: ", Object.keys(obj).length);
        return Object.keys(obj).length === 0;
    }

    //Partial Working
    // useEffect(() => {
    //     if (buttonClicked) {
    //         async function fetchData() {
    //             await APICaller.Top3Hospitals(subTreatment_name, budget).then(res => res.json().then(data => {
    // if (isEmptyObj(data)) {
    //     alert("Please increase your budget to see the Top 3 hospitals");
    // } else {
    //     updateTop3HospitalsData(data);
    //     console.log("Top3Hospitals : ", data);
    // }
    //             })).catch(error => {
    //                 console.log("[ERROR] : ", error)
    //             })
    //         }
    //         fetchData()
    //     }
    // }, [buttonClicked])


    // I think it is working fine
    useEffect(() => {
        if (buttonClicked) {
            async function fetchData() {
                const response = await APICaller.Top3Hospitals(subTreatment_name, budget)
                console.log(response);
                if (!response.ok) {
                    throw new Error(`An error has occured: ${response.status}`)
                }

                const data = await response.json();
                return data;
            }
            fetchData().then(data => {
                if (isEmptyObj(data)) {
                    alert("Please increase your budget to see the Top 3 hospitals");
                } else {
                    updateTop3HospitalsData(data);
                    console.log("Top3Hospitals : ", data);
                }
            }).catch(error => {
                console.log("[ERROR] : ", error)
            })
        }
    }, [buttonClicked])

    useEffect(() => {
        if (!isEmptyObj(top3HospitalsData)) {
            updatedisplayDashboard(true);
            updateButtonClicked(false);
        }
    }, [top3HospitalsData])


    return (<>
        <div className="container mt-5 mb-5" style={props.curStyle}>
            <label><h2>Select your treatment plan from the menu</h2></label>
            <Select placeholder="Open the dropdown menu to select treatment" options={allTreatments} onChange={(option) => { updateTreatment_name(option.label) }} styles={customStyles} />
            <div className="container mt-4">
                {allSubTreatments.length ?
                    <><em>{`showing results for ${treatment_name.toLowerCase()}`}</em>
                        <Select options={allSubTreatments} styles={customStyles} onChange={(option) => { updateSubTreatment_name(option.label) }} />
                        <label><em>Enter your amount</em></label>
                        <div className="input-group mb-3">
                            <span className="input-group-text">Rs</span>
                            <input type="number" onChange={coc_dash} className="form-control ml-3" aria-label="INR amount" placeholder="Amount in INR" required />
                            {/* <button type="button" className="btn btn-success" onClick={openDashboard}>Go</button> */}
                            <button type="button" className="btn btn-success" onClick={() => { updateButtonClicked(true) }}>Go</button>
                        </div>
                        {displayDashboard && <Dashboard
                            treatment_name={treatment_name}
                            subtreatment_name={subTreatment_name}
                            budget={budget}
                            top3HospitalsData={top3HospitalsData} c
                            urStyle={props.curStyle}
                        />}
                    </>
                    : <></>}
            </div>
        </div>


    </>
    );
}

export default HomePage;