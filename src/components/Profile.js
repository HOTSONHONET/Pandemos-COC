import React, { useState } from 'react'
import Register from './Register';
import UserProfile from './UserProfile';
import Login from './Login';

function Profile(props) {
    // const [already_user, update_already_user] = useState(true);


    // return (
    //     <div className="container">
    //         {already_user && <Login />}
    //         {!already_user && <Register />}
    //     </div>
    // );



    const [hide, updateHide] = useState(true);
    const [email, updateEmail] = useState("")
    const [password, updatePassword] = useState("")
    const [displayProfile, updateProfile] = useState(false)
    const performLogin = (event) => {
        console.log(email, password);
        // async function logggingIN() {
        //     const resp = await APICaller().LoginUser(email, password);
        //     const respJ = await resp.json();
        //     return respJ;
        // }

        // logggingIN().then(data => {
        //     if ("error" in Object.keys(data)) {
        //         <Register />
        //     } else {
        //         <UserProfile userInfo={data} />
        //     }
        // }).catch(error => {
        //     console.log("ERROR :", error)
        // })
        updateProfile(true);
    }

    return (<div className="container">
        {!displayProfile && <div className="container mt-3">
            <center><h2>Login</h2></center>
            <section className="vh-100">
                <div className="container-fluid h-custom">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-md-9 col-lg-6 col-xl-5">
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                                className="img-fluid" alt="Sample image" />
                        </div>
                        <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                            <form onSubmit={props.runSessionCheck}>
                                {/* Email */}
                                <div className="form-group mb-4">
                                    <label className="form-label" htmlFor="email">Email address</label>
                                    <input type="email" id="form3Example3" name="email" className="form-control form-control-lg"
                                        placeholder="Enter a valid email address" onChange={(e) => { updateEmail(e.target.value) }} />
                                </div>

                                {/* Password */}
                                <div className="form-group mb-3">
                                    <label className="form-label" htmlFor="password">Password</label>
                                    <input type={hide ? "password" : "text"} id="form3Example4" name="password" className="form-control form-control-lg"
                                        placeholder="Enter password" onChange={(e) => { updatePassword(e.target.value) }} />
                                    <input type="checkbox" onClick={() => { updateHide(!hide) }} />Show password
                                </div>

                                {/* button */}
                                <div className="text-center">
                                    <button type="button" className="btn btn-success" onClick={(event) => performLogin(event)}>Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        }
        {
            displayProfile && <UserProfile email={email} />
        }
    </div>

    )
}

export default Profile