import React from 'react'
import Landing from './components/landing/landing.js';
import Dashboard from './components/dashboard/dashboard.js';

export default class App extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            user: localStorage.getItem("token")
        }
    }

    render() {
        if(window.location.pathname==="/logout"){
            localStorage.removeItem("token");

            this.setState({user: localStorage.getItem("token")});
            if(window.location.pathname==="/logout"){ window.location.pathname = "/"; }
        }

        if(this.state.user !== "undefined" && this.state.user){
            return ( <Dashboard /> )
        }

        return ( <Landing /> )
    }
}