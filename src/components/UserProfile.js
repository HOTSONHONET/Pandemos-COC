import React from 'react'

function UserProfile() {

    return (
        <div container="container" styles={{ width: "18rem", height: "150px" }}>
            <div className="row">
                <div className="card">
                    <img className="card-img-top" src="https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/03/GettyImages-1092658864_thumb-732x549.jpg" alt="Card image cap" />
                    <div className="card-body">
                        <h5 className="card-title">Name: Jai Kishan</h5>
                        <p className="card-text">email: ram@healthme.com</p>
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">Geneder: Male</li>
                        <li className="list-group-item">Age: 22</li>
                        <li className="list-group-item">Residence: Bhubaneswar, Odisha</li>
                    </ul>
                </div>
            </div>
            <div className="row mt-5">
                <div className="col">
                    <div class="card" styles={{ width: "18rem", height: "20px" }}>
                        <div className="card-body">
                            <h5 className="card-title">Skin Cancer image</h5>
                        </div>
                        <img class="card-img-top" src="https://2rdnmg1qbg403gumla1v9i2h-wpengine.netdna-ssl.com/wp-content/uploads/sites/3/2021/04/moleSkinCancer-1150885505-770x533-1-650x428.jpg" alt="Card image cap" />
                        <div class="card-body">
                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div class="card" styles={{ width: "18rem", height: "20px" }}>
                        <div className="card-body">
                            <h5 className="card-title">Health Record</h5>
                        </div>
                        <img class="card-img-top" src="https://www.practicefusion.com/assets/images/pages_wp/Figure-4.2-outpatient-paper-based-patient-encounter-form.png"
                            alt="Card image cap" />
                        <div class="card-body">
                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default UserProfile