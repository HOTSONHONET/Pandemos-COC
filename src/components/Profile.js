import React, { useState } from 'react'
import Register from './Register';
import UserProfile from './UserProfile';
import Login from './Login';

function Profile(props) {
    const [already_user, update_already_user] = useState(true);

    const performRegistration = (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        const name = data.get("name");
        const email = data.get("email");
        const password = data.get("password");
        const gender = data.get("gender");
        const address = data.get("address");
        const contact_number = data.get("cnumber")

    }

    return (
        <div className="container">
            {already_user && <Login />}
            {!already_user && <Register performRegistration={performRegistration} />}
        </div>
    );
}

export default Profile