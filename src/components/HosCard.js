import React from 'react'

function HosCard(props) {
    console.log("props.data: ", props.data)

    return (
        <div className="card" style={{ width: "20rem", height: "25rem" }}>
            <img className="card-img-top" src={props.data.image_url} alt="Card image cap" style={{ height: "15rem" }} />
            <div className="card-body" styles={{ backgroundColor: "#404040" }}>
                <h5 className="card-title"><center>{props.data.name}</center></h5>
                <p className="card-text"><center>{`${props.data.location}`}</center></p>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item"><center><strong>{`Rs ${props.data.cost}`}</strong></center></li>
            </ul>
        </div >
    )
}

export default HosCard