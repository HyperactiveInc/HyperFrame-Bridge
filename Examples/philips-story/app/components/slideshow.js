import React, { Component, PropTypes } from 'react'
import cx from 'classnames'
import Swiper from 'swiper';
// components
import SquareButton from './squareButton'
// styles
import './slideshow.css'

export default class Slideshow extends Component {

    constructor(props) {
        super(props)
        this.renderSlide = this.renderSlide.bind(this)
        this.renderSlideElements = this.renderSlideElements.bind(this)
        this.renderFixedElements = this.renderFixedElements.bind(this)
        this.state = {
            index: localStorage.getItem('storedIndex') || 0,
            showFixed: false,
        }
    }

    componentDidMount() {

        const setCurrentPage = (swiper) => {
            this.setState({
                index: swiper.activeIndex,
                showFixed: true,
            })
            localStorage.setItem('storedIndex', swiper.activeIndex)
        }

        const onSlideChangeStart = (swiper) => {
            this.setState({ showFixed: false })
        }

        this.swiper = new Swiper(this.refs.story, {
            initialSlide: this.state.index,
            direction: 'horizontal',
            speed: 300,
            loop: false,
            shortSwipes: true,
            threshold: 40,
            pagination: this.refs.pagination,
            paginationClickable: true,
            runCallbacksOnInit: false,
            onInit: setCurrentPage,
            onSlideChangeStart: onSlideChangeStart,
            onTransitionEnd: setCurrentPage,
        })

    }

    renderFixedElements(elem, index) {
        if (elem) {
            switch (elem.type) {
                case 'image':
                    return (
                        <img key={elem.type + index}
                             src={elem.src}
                             className={elem.classes && cx(elem.classes)} />
                    )
                    break;
                case 'square':
                    return (
                        <SquareButton key={'square'+ index}
                                      classes={elem.classes}
                                      playlistIndex={elem.playlistIndex}
                                      reference={elem.ref}
                                      submenu={elem.submenu}
                                      src={elem.src} />
                    )
                    break;
                default:
                    return console.warn('unknown elem type', elem.type);
            }
        }
    }

    renderSlideElements(elem, index) {
        switch (elem.type) {
            case 'image':
                return (
                    <img key={elem.type + index}
                         src={elem.src}
                         className={elem.classes && cx(elem.classes)} />
                )
                break;
            default:
                return console.warn('unknown elem type', elem.type);
        }
    }

    renderSlide(slide, index) {
        const style = {
            backgroundImage: 'url('+ slide.src +')',
        }

        return (
            <div key={index} className="swiper-slide" style={style}>
                {slide.relative && slide.relative.map(this.renderSlideElements)}
            </div>
        )
    }

    render() {
        const { slides } = this.props
        const { index, showFixed } = this.state
        const { buttons } = slides[index]
        return (
            <div ref="story" className="swiper-container">
      	        <div className="swiper-wrapper">
                    {slides && slides.map(this.renderSlide)}
                </div>
      			<div ref="fixed" className={cx('swiper-fixed', {'hidden': !showFixed})}>
                    <div className="buttons">
                        {buttons && buttons.map(this.renderFixedElements)}
                    </div>
                </div>
      	        <div ref="pagination" className="swiper-pagination"></div>
      		</div>
        )
    }
}
