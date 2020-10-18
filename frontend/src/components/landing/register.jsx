import React from 'react'
import "./scss/register.scss"

export default class Register extends React.Component {
    constructor(props){
        super(props);
        this.state = { username: "", password: "", password_conf: "" };

        this.input = this.input.bind(this);
        this.register = this.register.bind(this);
    }

    input(event){
        const target = event.target;
        this.setState({ [target.name]: target.value });
    }

    register(event) {
        event.preventDefault();

        if(this.state.password === this.state.password_conf){
            this.registerSubmit().then(data => {
                localStorage.setItem('token', data.token);
                window.location.pathname = "/";
            }).catch(data => console.log(data));
        }
        else {
            alert("passwords don't match");
        }
    }

    async registerSubmit() {
        const response = await fetch("/api/auth/register", {
            method: 'POST',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            })
        });

        return response.json();
    }

    render() {
        return (
            <div id="landing-register-body">
                <form>
                    <div className="header">
                        <h1>Register</h1>
                    </div>
                    <div className="form-body">
                        <label>Username
                            <input onChange={this.input} type="text" name="username" value={this.state.username} />
                        </label>
                        <label>Password
                            <input onChange={this.input} type="password" name="password" value={this.state.password} />
                        </label>
                        <label>Confirm Password
                            <input onChange={this.input} type="password" name="password_conf" value={this.state.password_conf} />
                        </label>
                        <button onClick={this.register} id="register">Create Account</button>
                        <p>Already a User? <button id="register_to_login" type="button"><em><u>Login</u></em></button></p>
                    </div>
                </form>
            </div>
        )
    }
}