import React from 'react'
import './scss/campaign.scss'

import { ReactComponent as X } from "../../../../icons/x-ico.svg";
import { ReactComponent as Lock } from "../../../../icons/lock-ico.svg";

export default class CampaignNavElement extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            private: this.props.private,
            img: this.props.img,
            title: this.props.title,
            description: this.props.description,
            creator: this.props.creator,
            cards: this.props.cards,
            tags: this.props.tags
        }
    }

    render(){
        return (
            <div className="campaign-nav-element">
                <h2>{this.state.title}</h2>
                <span>
                    <X />
                    <Lock />
                </span>
            </div>
        )
    }
}