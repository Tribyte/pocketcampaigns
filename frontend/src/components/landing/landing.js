import React, { Component } from 'react';
import Navbar from "./navbar"
import Background from "./background"
import Index from "./index"
import Login from "./login"
import Register from "./register"

class Landing extends Component {
    constructor(props){
        super(props);
        this.state = { child: "" }

        this.index = this.index.bind(this);
        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
    }

    index(){ this.setLocation(""); }
    login(){ this.setLocation("login"); }
    register(){ this.setLocation("register"); }

    setLocation(location){
        this.setState(state => ({ child: location }));
        if(window.location.pathname !== "/" + location){ window.history.pushState("", "", "/" + location); }
    }

    checkLocation(location){
        return (window.location.pathname === "/" + location && this.state.child !== location);
    }

    render(){
        if(this.checkLocation("login")){ this.login(); }
        if(this.checkLocation("register")){ this.register(); }

        let body;
        if(this.state.child === "login"){ body = <Login /> }
        else if(this.state.child === "register"){ body = <Register /> }
        else{ body = <Index login={this.login} register={this.register} /> }

        return (
            <div className="footer-fix">
                <Navbar index={this.index} login={this.login} register={this.register} />
                <Background />
                {body}
            </div>
        )
    }
}

export default Landing;
