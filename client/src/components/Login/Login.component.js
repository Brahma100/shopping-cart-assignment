import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import './Login.style.css';

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            emailId: '',
            password: '',
            isValid: true,
            showPwdError: false,
            showEmailError: false
        }
        this.checkEmail = this.checkEmail.bind(this);
        this.checkPassword = this.checkPassword.bind(this);
    }

    checkEmail(e) {
        e.preventDefault();
        this.setState({ emailId: e.target.value });
        const emailId = e.target.value;
        const re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/igm;
        const emailCorrect = re.test(emailId);
        if (emailCorrect) {
            this.setState(
                {
                    showEmailError: false,
                    isValid: true
                });
        } else {
            this.setState(
                {
                    showEmailError: true,
                    isValid: false
                });
        }
    }

    checkPassword(e) {
        e.preventDefault();
        this.setState({ password: e.target.value });
        const password = e.target.value;
        const re = new RegExp("^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$");
        const pwdCorrect = re.test(password);
        if (re.test(password)) {
            this.setState(
                {
                    showPwdError: false,
                    isValid: true
                });
        } else {
            this.setState(
                {
                    showPwdError: true,
                    isValid: false
                });
        }
    }

    render() {
        return (
            <main className="app-wrapper">
                <div className="app-section">
                    <h1>Login</h1>
                    <span>Get access to your Orders, Wishlist and Recommendations</span>
                </div>
                <div className="app-section">
                    <form action="/" method="post" className="app-form">
                        <TextField
                            name="emailId"
                            label="Email Id"
                            onBlur={this.checkEmail}
                            linedirection="center"
                            className="md-cell md-cell--bottom "
                            required />

                        <div aria-describedby="info" aria-live="assertive" aria-relevant="additions removals">
                            {this.state.showEmailError ?
                                (<span id="info" className="input-error">
                                    Invalid Email</span>) :
                                (<span></span>)}
                        </div>
                        <TextField
                            id="password"
                            name="password"
                            type="password"
                            label="Password"
                            onBlur={this.checkPassword}
                            linedirection="center"
                            className="md-cell md-cell--bottom"
                            required />
                        <div aria-describedby="info" aria-live="assertive" aria-relevant="additions removals">
                            {this.state.showPwdError ?
                                (<span id="info" className="input-error">
                                    Password should be alphanumeric</span>) :
                                (<span></span>)}
                        </div>

                        <div>
                            <button
                                id="submit"
                                name="submit"
                                disabled={!this.state.isValid}
                                className="form-button w3-button w3-pink"
                                type="submit">
                                Login
                            </button>
                        </div>
                    </form>
                </div>
                <div></div>
            </main>
        )
    }
}
export default Login;