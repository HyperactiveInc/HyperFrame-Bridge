import React, { Component, PropTypes } from 'react'
import cx from 'classnames'
// components
import HyperFrame from '../assets/hyper/hyperframe'
import Submenu from '../components/submenu'
// styles
import './squareButton.css'

export default class SquareButton extends Component {

    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
        this.state = {
            showSubmenu: false,
        }
    }

    handleClick(type, reference, index) {
        switch (type) {
            case 'content-item':
                HyperFrame.presentContentItem(HyperFrame.content[reference])
                break
            case 'playlist':
                HyperFrame.presentPlaylist(HyperFrame.content[reference], index)
                break
            case 'open-submenu':
                this.setState({ showSubmenu: !this.state.showSubmenu })
                break
            default:
                console.warn('handleClick | unknown button type', type)
        }
    }

    render() {
        const {
            classes,
            playlistIndex,
            reference,
            submenu,
            src,
        } = this.props

        return (
            <a className={classes && cx('square-button', classes)}
               onClick={() => { this.handleClick(classes[0], reference, playlistIndex) }}>
                {submenu && <Submenu data={submenu}
                                     onItemSelect={this.handleClick}
                                     expandClass={this.state.showSubmenu && 'expand-up'} />}
                <img src={src} />
            </a>
        )
    }
}
