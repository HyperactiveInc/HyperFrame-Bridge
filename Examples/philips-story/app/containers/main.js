import React, { Component } from 'react'
// components
import Slideshow from '../components/slideshow'
import HyperFrame from '../assets/hyper/hyperframe'
// styles
import './main.css'
// assets
import { config } from '../config'

export default class Main extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        HyperFrame.init()
    }

    render() {

        return (
            <div className="app">
                {config && <Slideshow slides={config} />}
            </div>
        )
    }
}
