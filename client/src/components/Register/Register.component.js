import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import './Register.style.css';

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      emailId: '',
      password: '',
      confirmPassword: '',
      isValid: true,
      passwordError: false,
      ConfirmPasswordError: false,
      emailError: false
    }
    this.validateEmail = this.validateEmail.bind(this);
    this.validatePwd = this.validatePwd.bind(this);
    this.checkConfirmPassword = this.checkConfirmPassword.bind(this);
  }

  validateEmail(e) {
    e.preventDefault();
    this.setState({ emailId: e.target.value });
    const emailId = e.target.value;
    const re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/igm;
    if (re.test(emailId)) {
      this.setState(
        {
          emailError: false,
          isValid: true
        });
    } else {
      this.setState(
        {
          emailError: true,
          isValid: false
        });
    }
  }

  validatePwd(e) {
    e.preventDefault();
    this.setState({ password: e.target.value });
    const password = e.target.value;
    const re = new RegExp("^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$");
    const pwdCorrect = re.test(password);
    if (pwdCorrect) {
      this.setState(
        {
          passwordError: false,
          isValid: true
        });
    } else {
      this.setState(
        {
          passwordError: true,
          isValid: false
        });
    }
  }

  checkConfirmPassword(e) {
    e.preventDefault();
    this.setState({ confirmPassword: e.target.value });
    const confirmPassword = e.target.value;
    const passwordMatch = this.state.password === confirmPassword ? true : false;
    if (passwordMatch) {
      this.setState(
        {
          ConfirmPasswordError: false,
          isValid: true
        });
    } else {
      this.setState(
        {
          ConfirmPasswordError: true,
          isValid: false
        });
    }
  }

  render() {
    return (
      <main className="app-wrapper">
        <div className="app-section">
          <h1>Signup</h1>
          <span>We don't share your personal details with anyone.</span>
        </div>
        <div className="app-section">
          <form action="/" method="post" className="app-form">
            <TextField
              name="firstName"
              label="First Name"
              className="md-cell md-cell--bottom"
              required />
            <TextField
              name="lastName"
              label="Last Name"
              className="md-cell md-cell--bottom"
              required />
            <TextField
              name="emailId"
              label="Email"
              onChange={this.validateEmail}
              className="md-cell md-cell--bottom"
              required />
            <div aria-describedby="info" aria-live="assertive" aria-relevant="additions removals">
              {this.state.emailError ?
                (<span id="info" className="form-error">Invalid Email</span>) :
                (<span></span>)}
            </div>
            <TextField
              name="password"
              label="Password"
              type="password"
              onChange={this.validatePwd}
              className="md-cell md-cell--bottom"
              required />
            <div aria-describedby="info" aria-live="assertive" aria-relevant="additions removals">
              {this.state.passwordError ?
                (<span id="info" className="form-error">Password should be alphanumeric</span>) :
                (<span></span>)}
            </div>
            <TextField
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              onChange={this.checkConfirmPassword}
              className="md-cell md-cell--bottom"
              required />
            <div aria-describedby="info" aria-live="assertive" aria-relevant="additions removals">
              {this.state.ConfirmPasswordError ?
                (<span id="info" className="form-error">Password and Confirm Password are not same</span>) :
                (<span></span>)}
            </div>
            <button name="signUp" disabled={!this.state.isValid} className="form-button w3-button w3-pink" type="submit">Signup</button>
          </form>
        </div>
      </main>
    )
  }
}
export default Login;