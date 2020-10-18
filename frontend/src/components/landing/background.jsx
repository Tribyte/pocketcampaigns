import React from 'react'
import Particle from "../tools/particles/particle"
import "./scss/background.scss"
import "../tools/backgrounds/gradient.jsx"
import Gradient from '../tools/backgrounds/gradient.jsx'

export default class Background extends React.Component {
    constructor(props){
        super(props);

        this.state = { particles: <Particle id="landing-background" type="bubbles" width="1000"></Particle>}

        this.background = React.createRef();
    }

    componentDidMount(){
        Gradient("landing-background");
    }

    render() {
        return (
            <div className="background">
                {this.state.particles}
            </div>
        )
    }
}