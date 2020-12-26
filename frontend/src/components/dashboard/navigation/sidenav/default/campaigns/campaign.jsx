import React from 'react'
import CardNavElement from './card'
import './scss/campaign.scss'

import { ReactComponent as X } from "../../../../icons/x-ico.svg";
import { ReactComponent as Lock } from "../../../../icons/lock-ico.svg";
import { ReactComponent as Plus } from "../../../../icons/plus-ico.svg";

export default class CampaignNavElement extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            active: false,
            startCoords: {x: 0, y: 0},
        }

        this.target = {};
        this.getCampaignClick = this.getCampaignClick.bind(this);
        this.toggleCardForm = this.toggleCardForm.bind(this);
        this.delete = this.delete.bind(this);
    }

    getCampaignClick(){ this.setState({active: !this.state.active}) }

    toggleCardForm() {
        this.props.setForm("card");
        this.props.setFormKey(this.props.values.id);
    }

    delete(){ this.props.delete(this.props.values.id); }

    setDragging(x, y){ this.setState({ startCoords: {x: x, y: y} }); }

    drag = e => {
        this.target.style.left = (e.pageX - this.state.startCoords.x) + "px";
        this.target.style.top = (e.pageY - this.state.startCoords.y) + "px";
    }

    render(){

        const dragStart = e => { 
            this.setDragging(e.pageX, e.pageY);
            this.target = e.target;
            document.addEventListener('mousemove', this.drag);
        }

        const dragOver = e => { e.stopPropagation(); }

        const dragEnd = e => {
            document.removeEventListener('mousemove', this.drag);
            e.target.style.left = "0px";
            e.target.style.top = "0px";
        }

        return (
            <div id="campaign-nav-dropdown">
                <div
                    onClick={this.getCampaignClick}
                    className="campaign-nav-element"
                    onMouseDown={dragStart}
                    onDragOver={dragOver}
                    onMouseUp={dragEnd}
                >
                    <h2>{this.props.values.title}</h2>
                    <span className={(this.state.active)? "active": ""}>
                        <button onClick={this.delete}><X /></button>
                        <button><Lock /></button>
                    </span>
                </div>
                <div className={(this.state.active)? "cards active": "cards"}>
                    {this.props.values.cards.map((value, i) => (
                        <CardNavElement key={i} values={value} campaignID={this.props.values.id} delete={this.props.cardDelete}/>
                    ))}
                    <div
                        onClick={this.toggleCardForm}
                        className={"card-nav-element new-card-nav-element" + ((this.props.form === "card" && this.props.formKey === this.props.values.id) ? " active" : "")}
                    >
                        <h2>New Card</h2>
                        <span>
                            <Plus />
                        </span>
                    </div>
                </div>
            </div>
        )
    }
}