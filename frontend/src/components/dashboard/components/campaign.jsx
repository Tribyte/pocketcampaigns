import React from 'react'
import './scss/campaign.scss'

export default class CampaignDashElement extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            title: props.values.title,
            description: props.values.description
        }

        this.input = this.input.bind(this);
        this.deselect = this.deselect.bind(this);
    }

    input(event){
        const target = event.target;
        this.setState({ [target.name]: target.value });
    }

    deselect(event){
        this.campaignSubmit();
    }

    async campaignSubmit() {
        const response = await fetch("/api/campaigns/" + this.props.values.id + "/", {
            method: 'PUT',
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

    render() {
        return (
            <div className="campaign-dash-card">
                <input
                    onChange={this.input}
                    type="text" name="title"
                    value={this.state.title}
                    onBlur={this.deselect}
                    autoComplete="off"
                />
                <textarea
                    onChange={this.input}
                    name="description"
                    placeholder="Description"
                    value={this.state.description}
                    onBlur={this.deselect}
                ></textarea>
                <h2>{this.props.values.private? "Private" : "uhh..."}</h2>
            </div>
        )
    }
}