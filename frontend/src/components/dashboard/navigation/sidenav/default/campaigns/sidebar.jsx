import React from 'react'
import CampaignNavElement from './campaign'
import CampaignNavForm from './campaignform'
import CardNavForm from './cardform'
import "./scss/sidebar.scss"

import { ReactComponent as Search } from "../../../../icons/search-ico.svg";
import { ReactComponent as Plus } from "../../../../icons/plus-ico.svg";


export default class BasicCampaignSideNav extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            campaigns: [],
            searchVal: ""
        }
        
        this.search = this.search.bind(this);
        this.toggleCampaignForm = this.toggleCampaignForm.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
        this.deleteCard = this.deleteCard.bind(this);
        this.deleteCampaign = this.deleteCampaign.bind(this);
    }

    componentDidMount(){
        this.loadUserCampaigns();
    }

    search(event){
        
    }
    
    loadUserCampaigns(){
        this.getUserCampaigns().then(data => {
            let campaigns = []
            data.forEach(value => { campaigns.push({
                id: value.id,
                cards: value.cards,
                title: value.title
            }); });
            this.setState({campaigns: campaigns})
        }).catch(data => console.log(data))
    }

    toggleCampaignForm(){
        this.props.setForm("campaign");
    }
    
    formSubmit(){
        this.props.setForm("");
        this.loadUserCampaigns();
    }
    
    deleteCampaign(id){
        this.deleteUserCampaign(id).then(data => {
            let campaigns = this.state.campaigns;
            for(let i = 0; i < campaigns.length; i++){
                if(campaigns[i].id === id){ campaigns.splice(i, 1); i--; }
            }
            this.setState({campaigns: campaigns});
        }).catch(data => console.log(data));
    }

    deleteCard(id, campaignID) {
        this.deleteUserCard(id, campaignID).then(data => {
            console.log(data);
            this.loadUserCampaigns();
        }).catch(data => console.log(data));
    }

    async deleteUserCard(id, campaignID) {
        const response = await fetch("/api/cards/" + id, {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': ' Token ' + localStorage.getItem("token")
            },
            body: JSON.stringify({ campaign: campaignID.toString(), })
        });

        return response.json();
    }
    
    async deleteUserCampaign(id){
        const response = await fetch("/api/campaigns/" + id, {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': ' Token ' + localStorage.getItem("token")
            }
        });
        
        return response.json();
    }

    async getUserCampaigns() {
        const response = await fetch("/api/campaigns/", {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': ' Token ' + localStorage.getItem("token")
            }
        });
        
        return response.json();
    }

    render() {
        if(this.props.focus !== "campaigns" && this.props.form === "campaign"){ this.toggleCampaignForm(); }
        return (
            <div id="default-campaign-sidebar">
                <div className="main-sidebar">
                    <div className="title">
                        <h1>Campaign Decks</h1>
                    </div>
                    <div className="search">
                        <input placeholder="Search..."></input>
                        <button><Search /></button>
                    </div>
                    <div className="campaigns">
                        {this.state.campaigns.map((value, i) => (
                            <CampaignNavElement
                                key={i} 
                                values={value}
                                form={this.props.form}
                                setForm={this.props.setForm}
                                formKey={this.props.formKey}
                                setFormKey={this.props.setFormKey}
                                delete={this.deleteCampaign}
                                cardDelete={this.deleteCard}
                            />
                        ))}
                        <div 
                            onClick={this.toggleCampaignForm} 
                            className={"campaign-nav-element new-campaign-nav-element" + ((this.props.form === "campaign")? " active": "")}
                        >
                            <h2>New Campaign</h2>
                            <span>
                                <Plus />
                            </span>
                        </div>
                    </div>
                </div>
                <CampaignNavForm
                    form={this.props.form}
                    submit={this.formSubmit}
                />
                <CardNavForm
                    form={this.props.form}
                    formKey={this.props.formKey}
                    submit={this.formSubmit}
                />
            </div>
        )
    }
}