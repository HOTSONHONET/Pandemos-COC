import React from 'react'

function HosCard(props) {
    const selectMenuColor = {
        darkBg: "#808080",
        lightBg: "#e6ffff",
        lightFont: "#f2f2f2",
        darkFont: "#000000"
    }
    return (
        <div className="card" styles={{
            width: "18rem", height: "150px", backgroundColor: "#404040"
        }}>
            <img className="card-img-top" src="..." alt="Card image cap" />
            <div className="card-body" styles={{ backgroundColor: "#404040" }}>
                <h5 className="card-title">{props.hosInfo.name}</h5>
                <p className="card-text">{`${props.hosInfo.location.Region}, ${props.hosInfo.location.State}`}</p>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item"><strong>{`Rs ${props.hosInfo.cost}`}</strong></li>
            </ul>
        </div>
    )
}

export default HosCard