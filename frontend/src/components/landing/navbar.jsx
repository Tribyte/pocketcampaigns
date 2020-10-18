import "./scss/navbar.scss"
import React from 'react'

import { ReactComponent as Logo } from './svgs/SVG-Campaigns.svg';
import { ReactComponent as Discord } from './svgs/discord-icon.svg';

export default class Navbar extends React.Component {
    render() {
        return (
            <nav>
                <div className="left-nav">
                    <button onClick={this.props.index} id="logo-img"><Logo /></button>
                    <button onClick={this.props.index} id="logo-txt">Pocket Campaigns</button>
                </div>

                <div className="right-nav">
                    <a href="https://discord.gg/rD7vnzC"><button><Discord /></button></a>
                    <button onClick={this.props.login} className="login">Login</button>
                    <button onClick={this.props.register} className="register">Register</button>
                </div>
            </nav>
        )
    }
}