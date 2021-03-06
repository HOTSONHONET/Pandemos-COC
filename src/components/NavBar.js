import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ReactComponent as PandemosLogo } from '../static/logo.svg';

export default function Navbar(props) {
    let mode = props.darkMode ? 'dark' : 'light';
    let modeSwitchText = props.darkMode ? 'light' : 'dark';
    return <nav className={`navbar navbar-expand-lg navbar-${mode} bg-${mode}`}>
        <div className="container-fluid">
            <div className="fw-bold">
                <Link className="navbar-brand" to="/">
                    <PandemosLogo alt="" width="30" height="24" className="d-inline-block align-text-top" />
                    {props.title}
                </Link>
            </div>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link className="nav-link" to="/about">About</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/profile">Profile</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/dashboard">DashBoard</Link>
                    </li>
                </ul>
                <div className={`form-check form-switch text-${modeSwitchText}`}>
                    <input className="form-check-input" onClick={props.toggleDarkMode} type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                    <label className="form-check-label" htmlFor="flexSwitchCheckDefault">{`Go-${props.darkMode ? "Light" : "Dark"}`}</label>
                </div>
            </div>
        </div>
    </nav>;
};

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    about: PropTypes.string,
}

Navbar.defaultProps = {
    about: "About",
}