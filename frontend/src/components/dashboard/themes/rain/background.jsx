// credit Aaron Rickle
import React from 'react'
import "./scss/background.scss"

export default class RainBackground extends React.Component {

    createRain(){
        let rain = {front: [], back: []};

        for(let i = 0; i < 96;){
            let randoHundo = (Math.floor(Math.random() * (98 - 1 + 1) + 1));
            let randoFiver = (Math.floor(Math.random() * (5 - 2 + 1) + 2));
            i += randoFiver;

            const AnimationStyle = {
                animationDelay: "0." + randoHundo + "s",
                animationDuration: "0.5" + randoHundo + "s"
            };

            const frontDropStyle = {
                left: i + "%",
                bottom: (randoFiver + randoFiver - 1 + 100) + "%",
                animationDelay: "0." + randoHundo + "s",
                animationDuration: "0.5" + randoHundo + "s"
            };

            const backDropStyle = {
                right: i + "%",
                bottom: (randoFiver + randoFiver - 1 + 100) + "%",
                animationDelay: "0." + randoHundo + "s",
                animationDuration: "0.5" + randoHundo + "s"
            };

            rain.front.push(
                <div className="drop" key={i * 2} style={frontDropStyle}>
                    <div className="stem" style={AnimationStyle}></div>
                    <div className="splat" style={AnimationStyle}></div>
                </div>
            );

            rain.back.push(
                <div className="drop" key={(i * 2) + 1} style={backDropStyle}>
                    <div className="stem" style={AnimationStyle}></div>
                    <div className="splat" style={AnimationStyle}></div>
                </div>
            );
        }

        return rain;
    }

    render(){
        let rain = this.createRain();
        return (
            <div className="rain-background">
                <div className="back-row-toggle splat-toggle">
                    <div className="rain front-row">
                        {rain.front}
                    </div>
                    <div className="rain back-row">
                        {rain.back}
                    </div>
                </div>
            </div>
        )
    }
}