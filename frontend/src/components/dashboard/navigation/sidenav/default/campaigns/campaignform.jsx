import React from 'react'
import './scss/campaignform.scss'

import { ReactComponent as Eye } from "../../../../icons/eye-ico.svg";

export default class CampaignNavForm extends React.Component {
    render(){
        let active;
        if(this.props.active){ active="active"; }

        return(
            <div id="campaign-form" className={active}>
                <form>
                    <div className="header">
                        <h1>New Campaign</h1>
                        <button><Eye /></button>
                    </div>
                    <div className="body">
                        <label id="img-label">
                            <input type="file" name="img" multiple={false} />
                        </label>
                        <input type="text" name="title" placeholder="Title" />
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