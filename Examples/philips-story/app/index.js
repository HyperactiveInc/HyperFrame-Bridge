import React from 'react'
import { render } from 'react-dom'
import 'react-fastclick'
// routes (containers)
import Main from './containers/main'
// base styles
import 'swiper/dist/css/swiper.min.css'
import './assets/fonts/centrale_sans.css'
import './base.css'

render(<Main />, document.getElementById('root'))
