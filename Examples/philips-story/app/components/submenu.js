import React, { Component, PropTypes } from 'react'
import cx from 'classnames'
// components
// styles
import './submenu.css'

export default class Submenu extends Component {

    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
        this.renderListItem = this.renderListItem.bind(this)
    }

    handleClick(type, reference, index) {
        this.props.onItemSelect(type, reference, index)
    }

    renderListItem(item, index) {
        return (
            <li key={index}
                className={cx(item.classes)}
                onClick={() => { this.handleClick(item.classes[0], item.ref, item.playlistIndex) }}>
                {item.title}
            </li>
        )
    }

    render() {
        const { data, expandClass } = this.props
        return (
            <ul ref="menu" className={cx('submenu', this.props.expandClass)}>
                {data.map(this.renderListItem)}
            </ul>
        )
    }
}
