import React from 'react'
import Particle from "../../../../tools/particles/particle"
import CampaignsSidebar from "./campaigns/sidebar"
import "./scss/sidebar.scss"

import {ReactComponent as Logo} from "../../../icons/logo-ico.svg";
import {ReactComponent as File} from "../../../icons/file-ico.svg";
import {ReactComponent as Person} from "../../../icons/person-ico.svg";
import {ReactComponent as Apps} from "../../../icons/apps-ico.svg";
import {ReactComponent as Settings} from "../../../icons/settings-ico.svg";
import {ReactComponent as Logout} from "../../../icons/logout-ico.svg";


export default class BasicSideNav extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            expanded: "",
            particles: <Particle id="background" type="bubbles" width="400" />
        };

        this.logout = this.logout.bind(this);
        this.campaigns = this.campaigns.bind(this);
    }

    logout(){ window.location.href = "/logout" }

    campaigns(){
        if(this.state.expanded === "campaigns"){ this.setState({expanded: ""}); }
        else { this.setState({expanded: "campaigns"}); }
    }

    render() {
        let active = "";
        if(this.state.expanded !== ""){ active="active"; }

        return (
            <div id="default-sidebar" className={active}>
                {this.state.particles}
                <div className="sidebar-flex">
                    <div className="nav">
                        <div className="nav-links">
                            <div className="top">
                                <Logo />
                                <button onClick={this.campaigns}><File /></button>
                                <Person />
                                <Apps />
                            </div>
                            <div className="bottom">
                                <Settings />
                                <button onClick={this.logout}><Logout /></button>
                            </div>
                        </div>
                    </div>
                    <CampaignsSidebar />
                </div>
            </div>
        )
    }
}