import React from 'react'
import CampaignNavElement from './campaign'
import CampaignNavForm from './campaignform'
import "./scss/sidebar.scss"

import { ReactComponent as Search } from "../../../../icons/search-ico.svg";
import { ReactComponent as Plus } from "../../../../icons/plus-ico.svg";


export default class BasicCampaignSideNav extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            campaigns: [],
            campaignForm: false
        }
        
        this.toggleCampaignForm = this.toggleCampaignForm.bind(this);
    }
    
    componentDidMount(){
        this.loadUserCampaigns();
    }
    
    loadUserCampaigns(){
        this.getUserCampaigns().then(data => {
            console.log(data);
            let campaigns = []
            data.forEach(value => { campaigns.push({title: value.title}); });
            this.setState({campaigns: campaigns})
            // data
        }).catch(data => console.log(data))
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

    toggleCampaignForm(){
        this.setState({campaignForm: !this.state.campaignForm});
    }

    render() {
        if(this.props.focus !== "campaigns" && this.state.campaignForm){ this.toggleCampaignForm(); }
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
                            <CampaignNavElement key={i} title={value.title} />
                        ))}
                        <div onClick={this.toggleCampaignForm} className={"campaign-nav-element new-campaign-nav-element" + ((this.state.campaignForm)? " active": "")}>
                            <h2>New Campaign</h2>
                            <span>
                                <Plus />
                            </span>
                        </div>
                    </div>
                </div>
                <CampaignNavForm active={this.state.campaignForm} />
            </div>
        )
    }
}