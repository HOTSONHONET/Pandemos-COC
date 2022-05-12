import React from 'react'

function Register(props) {
    return (
        <div className="container mt-3">
            <center><h2>Register</h2></center>
            <section className="vh-100">
                <div className="container-fluid h-custom">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-md-9 col-lg-6 col-xl-5">
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                                className="img-fluid" alt="Sample image" />
                        </div>
                        <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                            <form onSubmit={props.performRegistration}>
                                {/* Name */}
                                <div className="form-group mb-4">
                                    <label className="form-label" htmlFor="name">Name</label>
                                    <input type="text" id="form3Example3" name="name" className="form-control form-control-lg"
                                        placeholder="Enter your name" />
                                </div>

                                {/* Gender */}
                                <div className="form-group mb-4">
                                    <label htmlFor="gender">Gender</label>
                                    <small> (click here to select gender...)</small>
                                    <select id="inputState" className="form-control" name="gender"
                                        aria-placeholder="Select from the dropdown" required>
                                        <option selected>Female</option>
                                        <option selected>Male</option>
                                        <option selected>Other</option>
                                    </select>
                                </div>

                                {/* Address */}
                                <div className="form-group mb-4">
                                    <label htmlFor="address">Address</label>
                                    <input type="text" className="form-control" id="address" aria-describedby="emailHelp" name="address"
                                        placeholder="e.g: 221 Baker Street" required />
                                </div>

                                {/* Contact Numbder */}
                                <div className="form-group mb-4">
                                    <label htmlFor="contactNumber">Contact Number</label>
                                    <input type="text" className="form-control" id="cnumber" aria-describedby="emailHelp" name="cnumber"
                                        placeholder="e.g: +91-9999999999" required />
                                </div>


                                {/* Email */}
                                <div className="form-group mb-4">
                                    <label className="form-label" htmlFor="email">Email address</label>
                                    <input type="email" id="form3Example3" name="email" className="form-control form-control-lg"
                                        placeholder="Enter a valid email address" />
                                </div>

                                {/* Password */}
                                <div className="form-group mb-3">
                                    <label className="form-label" htmlFor="password">Password</label>
                                    <input type="password" id="form3Example4" name="password" className="form-control form-control-lg"
                                        placeholder="Enter password" />
                                </div>

                                {/* button */}
                                <div className="text-center">
                                    <button type="submit" className="btn btn-success">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Register