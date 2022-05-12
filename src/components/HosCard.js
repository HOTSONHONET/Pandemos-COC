import React from 'react'

function HosCard(props) {
    console.log("props.data: ", props.data)

    return (
        <div className="card" styles={{
            width: "18rem", height: "150px", backgroundColor: "#404040"
        }}>
            <img className="card-img-top" src={props.data.image_url} alt="Card image cap" />
            <div className="card-body" styles={{ backgroundColor: "#404040" }}>
                <h5 className="card-title">{props.data.name}</h5>
                <p className="card-text">{`${props.data.location.Region}, ${props.data.location.State}`}</p>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item"><strong>{`Rs ${props.data.cost}`}</strong></li>
            </ul>
        </div>
    )
}

export default HosCard