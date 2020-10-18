import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class ParticleItem extends Component {
    render() {
        return ( <span className="particle" style="{itemStyle}"></span> )
    }
}

// ParticleItem.prototype = {
//     particleItem: PropTypes.object.isRequired
// }

// const itemStyle = {
//     top: this.props.particleItem.top,
//     left: this.props.particleItem.left,
//     width: this.props.particleItem.width,
//     height: this.props.particleItem.height,
//     animationDelay: this.props.particleItem.animation_delay
// }