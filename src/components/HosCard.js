import React from 'react'

function HosCard(props) {
    console.log("props.data: ", props.data)
    let customStyle = {
        bgcolor: props.curStyle.mode == "dark" ? "#8c8c8c" : "white",
        color: props.curStyle.mode == "dark" ? "#f2f2f2" : "black"
    }
    return (
        <div className="card" style={{ width: "20rem", height: "25rem", backgroundColor: customStyle.bgcolor, color: customStyle.color }}>
            <img className="card-img-top" src={props.data.image_url} alt="Card image cap" style={{ height: "15rem" }} />
            <div className="card-body">
                <h5 className="card-title"><center>{props.data.name}</center></h5>
                <p className="card-text"><center>{`${props.data.location}`}</center></p>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item" style={{ backgroundColor: customStyle.bgcolor, color: customStyle.color }}><center><strong>{`Rs ${props.data.cost}`}</strong></center></li>
            </ul>
        </div >
    )
}

export default HosCard