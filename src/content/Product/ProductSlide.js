import React, { Component } from "react";
import { Row } from 'antd';
import '../../css/Product.css';

import AliceCarousel from 'react-alice-carousel';
import ProductCart from "./ProductCard"

export default class ProductSlide extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    onSlideChange(e) {
        console.log('Item`s position during a change: ', e.item);
        console.log('Slide`s position during a change: ', e.slide);
    }

    onSlideChanged(e) {
        console.log('Item`s position after changes: ', e.item);
        console.log('Slide`s position after changes: ', e.slide);
    }

    render() {
        const responsive = {
            0: {
                items: 1
            },
            250: {
                items: 2
            },
            450: {
                items: 3
            },
            1020: {
                items: 4
            },
            1300: {
                items: 5
            },
            1900: {
                items: 6
            },
            2500: {
                items: 7
            }
        };

        return (
            <Row id="Row-Product">
                <AliceCarousel
                    duration={400}
                    autoPlay={true}
                    responsive={responsive}
                    startIndex={1}
                    fadeOutAnimation={true}
                    mouseDragEnabled={true}
                    playButtonEnabled={true}
                    autoPlayInterval={2000}
                    autoPlayDirection="ltr"
                    autoPlayActionDisabled={true}
                    onSlideChange={this.onSlideChange}
                    onSlideChanged={this.onSlideChanged}
                >
                    <ProductCart />
                    <ProductCart />
                    <ProductCart />
                    <ProductCart />
                    <ProductCart />

                </AliceCarousel>
            </Row>
        )

    }
}