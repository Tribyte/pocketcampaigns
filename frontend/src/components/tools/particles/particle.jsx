import React, { Component } from 'react'
import "./scss/particle.scss"

export default class Particle extends Component {
    render() {
        function random(m, n) {
            m = parseInt(m);
            n = parseInt(n);
            return Math.floor(Math.random() * (n - m + 1)) + m;
        }

        function bubbles(width) {
            let bubbles = [];
            let bubblecount = (width / 50) * 10;

            for (var i = 0; i <= bubblecount; i++) {
                let size = (random(40, 80) / 10);
                const particleStyle = {
                    top: random(0, 100) + '%',
                    left: random(0, 95) + '%',
                    width: size + 'px',
                    height: size + 'px',
                    animationDelay: (random(0, 30) / 10) + 's'
                }

                bubbles.push(
                    <span key={i} className="particle" style={particleStyle}></span>
                );
            }

            return bubbles;
        }

        let divClassName = "particletext particle_overlay " + this.props.type;
        return (
            <div id={this.props.id} className={divClassName}>
                {bubbles(this.props.width)}
            </div>
        )
    }
}