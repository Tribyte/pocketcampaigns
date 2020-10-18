import React from 'react'
import "./scss/index.scss"

import { ReactComponent as Logo } from './svgs/SVG-Campaigns.svg';
import { ReactComponent as Create } from "./svgs/create-icon.svg"
import { ReactComponent as Organize } from "./svgs/organize-icon.svg"
import { ReactComponent as Play } from "./svgs/sick-play-icon.svg"

export default class Index extends React.Component {
    render(){
        return(
            <div id="landing-index-body">
                <div className="title">
                    <Logo />
                    <h1>Pocket Campaigns</h1>
                </div>
                <div className="cards">
                    <div className="card">
                        <h3 className="card_title">Create</h3>
                        <Create />
                        {/* <p>Pocket Campaign is a simple GM's tool to convert your ideas into easy-to-manage decks and cards. A card may represent a character, location, plot hook or really anything else you can think of. Give your card a name, add notes and identifiers to describe it.</p> */}
                    </div>
                    <div className="card">
                        <h3 className="card_title">Organize</h3>
                        <Organize />
                        {/* <p>Cards are sorted under Campaign Decks. Each deck has it's own custom set of tags that you define. Tag each card entry with all that apply, and search by them. Cards automatically link to each other if they find another card's name in their notes or descriptions, creating a smooth flow or even adventure track.</p> */}
                    </div>
                    <div className="card">
                        <h3 className="card_title">Play</h3>
                        <Play />
                        {/* <p>Decks and cards can both be shared and imported by other users. These exports can be password-locked, and even set to delete their secret notes when imported without the correct password. GMs can keep their players up to date on all the features of their world without giving anything away.</p> */}
                    </div>
                </div>
                <div className="body-nav">
                    <button onClick={this.props.register}><h1>Get Started &#62;</h1></button>
                    <button onClick={this.props.login}><h2><u>or Log In</u></h2></button>
                </div>
            </div>
        )
    }
}