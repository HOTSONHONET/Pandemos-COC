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
    const [buttonState, updateButtonState] = useState(null);
    const [budget, update_budget] = useState(0);
    const [hos_info, update_hos_info] = useState([])
    const [top3Hospitals, updateTop3Hospitals] = useState([])

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

    useEffect(() => {
        APICaller.AllSubTreatments(treatment_name).then(res => res.json().then(data => {
            updateAllSubTreatments(data.map(element => {
                return { label: element, value: element };
            }));
        }).catch(error => {
            console.log(`[ERROR] : ${error}`)
        }))
    }, [treatment_name])



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


    const coc_dash = (event) => {
        update_budget(event.target.value);
        console.log(treatment_name, subTreatment_name, budget);
    }

    // To fix: the submenu is show for the previously selected item
    // Have to fix it
    const showTreatmentList = (option) => {
        updateTreatment_name(option.label);
        console.log("option selected: ", option.label);
    }

    // To get the subTreatment name
    const getSubTreatment = (subTreatment) => {
        updateSubTreatment_name(subTreatment.label);
        console.log("sub option: ", subTreatment.label)
    }

    // Heler function to check whether the object is empty or not
    const isEmptyObj = (obj) => {
        console.log("Size of the object: ", Object.keys(obj).length);
        return Object.keys(obj).length === 0;
    }

    // This will monitor top3Hospitals list and once it gets updated only then only we will get AllSubTreatment costs
    useEffect(() => {
        if (top3Hospitals.length > 0 && buttonState) {
            let trans_info = {}
            console.log("Top3Hospitals: ", top3Hospitals);
            top3Hospitals.forEach((hos) => {
                console.log("hos:", hos.name);
                let hos_name = hos.name;
                APICaller.AllSubTreatmentCost(hos.name, treatment_name).then(res => res.json().then(data => {
                    console.log("data recieved from API: ", data);
                    data.forEach(ele => {
                        let t_name = ele.name;
                        let cost = ele.cost;
                        if (t_name in trans_info) {
                            trans_info[t_name].push({
                                "name": hos_name,
                                "cost": cost
                            })
                        } else {
                            trans_info[t_name] = [{
                                "name": hos_name,
                                "cost": cost
                            }]
                        }
                    })
                })).catch(error => {
                    console.log("[ERROR] : ", error)
                })
            })
            update_hos_info(trans_info);

        }

    }, [top3Hospitals])


    const openDashboard = () => {
        console.log(subTreatment_name, budget, "openDashboard");
        setTimeout(APICaller.Top3Hospitals(subTreatment_name, budget).then(res => res.json().then(data => {
            console.log("top3 hospital data: ", data);
            console.log("top3Hospital is empty:", isEmptyObj(top3Hospitals));

            if (isEmptyObj(data)) {
                alert("The current budget will not be sufficed even for the minimum treatment cost");
                updateButtonState(null);
            } else {
                updateTop3Hospitals(data);
                updateButtonState(true)
            }


        })).catch(error => {
            console.log(`[Error] ${error}`)
        }), 2000)
        updateButtonState(true);

    }
    return (<>
        <div className="container mt-5 mb-5" style={props.curStyle}>
            <label><h2>Select your treatment plan from the menu</h2></label>
            <Select placeholder="Open the dropdown menu to select treatment" options={allTreatments} onChange={showTreatmentList} styles={customStyles} />
            <div className="container mt-4">
                {allSubTreatments.length ?
                    <><em>{`showing results for ${treatment_name.toLowerCase()}`}</em>
                        <Select options={allSubTreatments} styles={customStyles} onChange={getSubTreatment} />
                        <label><em>Enter your amount</em></label>
                        <div className="input-group mb-3">
                            <span className="input-group-text">Rs</span>
                            <input type="number" onChange={coc_dash} className="form-control ml-3" aria-label="INR amount" placeholder="Amount in INR" required />
                            <button type="button" className="btn btn-success" onClick={openDashboard}>Go</button>
                        </div>
                    </>
                    : <></>}
            </div>
            {buttonState && <Dashboard hos_info={hos_info} treatment_name={treatment_name} subtreatment_name={subTreatment_name} budget={budget} top3Hospitals={top3Hospitals} curStyle={props.curStyle} />}
            {/* <HospitalStats curStyle={props.curStyle} /> */}
        </div>


    </>
    );
}

export default HomePage;