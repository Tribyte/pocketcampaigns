import React from 'react'
import './scss/campaignform.scss'

import { ReactComponent as Eye } from "../../../../icons/eye-ico.svg";

export default class CampaignNavForm extends React.Component {
    constructor(props){
        super(props);
        this.state = { active: false };

        this.toggleActive = this.toggleActive.bind(this);
    }

    toggleActive(){
        this.setState({active: !this.state.active});
    }

    render(){
        let active;
        if(this.state.active){ active="active"; }

        return(
            <div id="campaign-form">
                <form>
                    <div className="header" class={active}>
                        <h1>New Campaign</h1>
                        <button><Eye /></button>
                    </div>
                    <div class="body">
                        <input type="text" name="title" placeholder="Title" />
                        <label id="img-label">
                            <input type="file" name="img" multiple="false" />
                        </label>
                        <textarea placeholder="Description"></textarea>
                        <div className="options">
                            <button>Create</button>
                            <button id="campaigns-nav-advanced-options">Advanced Options</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}