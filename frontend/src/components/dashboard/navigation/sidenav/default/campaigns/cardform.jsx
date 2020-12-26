import React from 'react'
import './scss/cardform.scss'

import { ReactComponent as Eye } from "../../../../icons/eye-ico.svg";

export default class CardNavForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            description: "",
        }

        this.input = this.input.bind(this);
        this.submit = this.submit.bind(this);
    }

    input(event) {
        const target = event.target;
        this.setState({ [target.name]: target.value });
    }

    submit(event) {
        event.preventDefault();

        this.campaignSubmit().then(data => {
            this.props.submit();
            this.setState({
                name: "",
                description: ""
            })
        }).catch(data => console.log(data));
    }

    async campaignSubmit() {
        const response = await fetch("/api/cards/", {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': ' Token ' + localStorage.getItem("token"),
            },
            body: JSON.stringify({
                campaign: this.props.formKey,
                name: this.state.name,
                description: this.state.description,
                private: "true",
            })
        });

        return response.json();
    }

    render() {
        return (
            <div id="card-form" className={(this.props.form === "card")? "active" : ""}>
                <form>
                    <div className="header">
                        <h1>New Card</h1>
                        <button><Eye /></button>
                    </div>
                    <div className="body">
                        <label id="img-label" className={(this.state.name === "") ? "" : "active"}>
                            <input type="file" name="img" multiple={false} />
                        </label>
                        <input
                            onChange={this.input}
                            type="text" name="name"
                            placeholder="Name"
                            value={this.state.name}
                            className={(this.state.name === "") ? "" : "active"}
                            autoComplete="off"
                        />
                        <textarea
                            onChange={this.input}
                            name="description"
                            placeholder="Description"
                            className={(this.state.name === "") ? "" : "active"}
                            value={this.state.description}
                        ></textarea>
                        <div className={(this.state.name === "") ? "options" : "options active"}>
                            <button onClick={this.submit}>Create</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}