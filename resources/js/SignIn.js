import React from 'react';

export default class SignIn extends React.Component {

    formSubmit = (e) => {
        e.preventDefault();

    };

    toggleLogin = (e) => {
    };


    render() {
        const messageStyle = {
            opacity: 0.5,
            textAlign: 'center',
            padding: '1rem'
        }

        return (
            <div>
                <p style={messageStyle}>Start Your List By Entering Your Email
                    Below</p>

                <form>
                    <div className="input-group">
                        <input className="form-control" type="email"/>
                        <div className="input-group-append">
                            <button
                                    className="btn btn-primary">Sign Up
                            </button>
                        </div>
                    </div>
                    <div className="input-group">
                        <label htmlFor="existingUser">
                        <input type="checkbox" name="existingUser" className="form-control" id="existingUser" /> Already Registered
                        </label>
                    </div>
                </form>
            </div>
        );
    };

}

