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
            form: "",
            formKey: 0,
            particles: <Particle id="background" type="bubbles" width="400" />
        };

        this.logout = this.logout.bind(this);
        this.campaigns = this.campaigns.bind(this);
        this.adventurer = this.adventurer.bind(this);
        this.setForm = this.setForm.bind(this);
        this.setFormKey = this.setFormKey.bind(this);
    }

    logout(){ window.location.href = "/logout" }

    expanded(value){
        this.setState({expanded: (this.state.expanded === value)? "": value});
    }

    campaigns(){ this.expanded("campaigns"); }
    adventurer(){ this.expanded("adventurer"); }

    setForm(formName){ this.setState({form: (this.state.form === formName)? "": formName}); }
    setFormKey(formKey){ this.setState({formKey: formKey}); }

    render() {
        return (
            <div id="default-sidebar" className={(this.state.expanded !== "")? "active" : ""}>
                {this.state.particles}
                <div className="sidebar-flex">
                    <div className="nav">
                        <div className="nav-links">
                            <div className="top">
                                <Logo />
                                <button onClick={this.campaigns}><File /></button>
                                <button onClick={this.adventurer}><Person /></button>
                                <Apps />
                            </div>
                            <div className="bottom">
                                <Settings />
                                <button onClick={this.logout}><Logout /></button>
                            </div>
                        </div>
                    </div>
                    <CampaignsSidebar
                        focus={this.state.expanded} 
                        form={this.state.form}
                        setForm={this.setForm}
                        formKey={this.state.formKey}
                        setFormKey={this.setFormKey}
                    />
                </div>
            </div>
        )
    }
}