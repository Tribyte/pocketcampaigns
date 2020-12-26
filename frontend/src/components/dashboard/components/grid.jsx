import React from 'react';
import CampaignDashElement from './campaign'
import './scss/grid.scss'

export default class Grid extends React.Component {
    render(){
        return (
            <div className="page-fix">
                <div id="grid">
                    {this.props.values.map((values, i) => (
                        <CampaignDashElement key={i} values={values} />
                    ))}
                </div>
            </div>
        )
    }
}