import React from 'react'
import './scss/campaignform.scss'

import { ReactComponent as Eye } from "../../../../icons/eye-ico.svg";

export default class CampaignNavForm extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            title: "",
            description: "",
        }

        this.input = this.input.bind(this);
        this.submit = this.submit.bind(this);
    }

    input(event){
        const target = event.target;
        this.setState({[target.name]: target.value});
    }

    submit(event) {
        event.preventDefault();

        this.campaignSubmit().then(data => {
            this.props.submit();
            this.setState({
                title: "",
                description: ""
            })
        });
    }

    async campaignSubmit() {
        const response = await fetch("/api/campaigns/", {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': ' Token ' + localStorage.getItem("token"),
            },
            body: JSON.stringify({
                title: this.state.title,
                description: this.state.description,
                private: "true",
            })
        });

        return response.json();
    }

    render(){
        return(
            <div id="campaign-form" className={(this.props.form === "campaign")? "active" : ""}>
                <form>
                    <div className="header">
                        <h1>New Campaign</h1>
                        <button><Eye /></button>
                    </div>
                    <div className="body">
                        <label id="img-label" className={(this.state.title === "") ? "" : "active"}>
                            <input type="file" name="img" multiple={false} />
                        </label>
                        <input
                            onChange={this.input}
                            type="text" name="title"
                            placeholder="Title"
                            value={this.state.title}
                            className={(this.state.title === "") ? "" : "active"}
                            autoComplete="off"
                        />
                        <textarea
                            onChange={this.input}
                            name="description"
                            placeholder="Description"
                            className={(this.state.title === "") ? "" : "active"}
                            value={this.state.description}
                        ></textarea>
                        <div className={(this.state.title === "") ? "options" : "options active"}>
                            <button onClick={this.submit}>Create</button>
                            <button id="campaigns-nav-advanced-options">Advanced Options</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}