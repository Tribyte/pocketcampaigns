import React from 'react'
import './scss/card.scss'

import { ReactComponent as X } from "../../../../icons/x-ico.svg";
import { ReactComponent as Lock } from "../../../../icons/lock-ico.svg";

export default class CardNavElement extends React.Component {
    constructor(props) {
        super(props);

        this.state = { active: false }

        this.getCardClick = this.getCardClick.bind(this);
        this.delete = this.delete.bind(this);
    }

    getCardClick() { this.setState({ active: !this.state.active }) }

    delete(){
        this.props.delete(this.props.values.id, this.props.campaignID);
    }

    render() {
        return (
            <div onClick={this.getCardClick} className="card-nav-element">
                <h2>{this.props.values.name}</h2>
                <span className={(this.state.active) ? "active" : ""}>
                    <button onClick={this.delete} key={this.props.values.id}><X /></button>
                    <button><Lock /></button>
                </span>
            </div>
        )
    }
}