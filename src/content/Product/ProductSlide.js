import React, { Component } from "react";
import { Row } from 'antd';
import '../../css/Product.css';

import AliceCarousel from 'react-alice-carousel';
import ProductCart from "./ProductCard"
import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

var ip = "http://localhost:5000";
// var ip_img_profile = "http://128.199.198.10/API/profile/";

export default class ProductSlide extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: "",
            user: [],
            product: []
        };

        this.list_productcade = this.list_productcade.bind(this);
    }

    componentWillMount() {
        this.setState({
            token: cookies.get('token', { path: '/' }),
            user: cookies.get('user', { path: '/' })
        });
    }

    async componentDidMount() {
        var url_product = ip + "/Product/find/id/" + this.props.catId;
        const product = await (await axios.get(url_product)).data;
        this.setState({
            product: product
        });
    }

    list_productcade() {
        //console.log(this.state.product, " product");
        return this.state.product.map((product) => {
            return <ProductCart product={product}/>
        });
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

        //console.log(this.props.catId, " this.props.catId");

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
                    {this.list_productcade()}
                </AliceCarousel>
            </Row>
        )

    }
}