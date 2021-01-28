import React, { Component } from "react";
import { Row, Spin, Empty } from 'antd';
import '../../css/Product.css';

import AliceCarousel from 'react-alice-carousel';
import ProductCart from "./ProductCard"
import axios from 'axios';
import Cookies from 'universal-cookie';
import swal from 'sweetalert';
import { config } from '../../config/config';

const cookies = new Cookies();

var ip = config.ipServer;

export default class ProductSlide extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: "",
            user: [],
            product: [],
            statusDataProduct: false
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
        // var url_product = ip + "/Product/find/id/" + this.props.catId;
        // const product = await (await axios.get(url_product)).data;
        // this.setState({
        //     product: product
        // });

        var url_product = "";
        if (this.state.token === "" || this.state.token === null || this.state.token === undefined ||
            this.state.user.levelId === "" || this.state.user.levelId === null || this.state.user.levelId === undefined) {
            url_product = ip + "/Product/find/notauthorization/id/" + this.props.catId + "/16/";

        } else {
            url_product = ip + "/Product/find/authorization/id/" + this.props.catId;
        }

        const product = await (await axios.get(url_product, { headers: { "token": this.state.token, "key": this.state.user?.username } })).data;
        if ((product.statusCode === 500) || (product.statusCode === 400)) {
            swal("Error!", "เกิดข้อผิดพลาดในการเข้าสู่ระบบ \n กรุณาเข้าสู่ระบบใหม่", "error").then((value) => {
                this.setState({
                    token: cookies.remove('token', { path: '/' }),
                    user: cookies.remove('user', { path: '/' })
                });
                window.location.replace('/Login', false);
            });
        } else {
            this.setState({
                product: product,
                statusDataProduct: true
            });
        }
    }

    list_productcade() {
        return this.state.product.map((product) => {
            return <ProductCart product={product} />
        });
    }

    onSlideChange(e) {

    }

    onSlideChanged(e) {

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
            <>
                {
                    (this.state.statusDataProduct) ?
                        (this.state.product.length > 0) ?
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
                            :
                            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                        :
                        <Row id="row-spin-slide">
                            <Spin size="large" />
                        </Row>
                }
            </>
        )

    }
}