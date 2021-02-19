import React, { Component } from "react";
import { Row, Col, Empty, Spin, Carousel } from 'antd';
import { Container, Image } from 'react-bootstrap';
import '../css/Product.css';
import ProductSlide from "./Product/ProductSlide"
import axios from 'axios';
import Cookies from 'universal-cookie';
import { NavLink } from 'react-router-dom';
// import P1 from '../img/pd1.svg';
// import P2 from '../img/pd2.svg';
// import P3 from '../img/pd3.svg';
import { config } from '../config/config';

const cookies = new Cookies();

var ip = config.ipServer;
export default class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: "",
            user: [],
            catalog: [],
            statusDataCat: false,
            statusDataImg: false,
            mode: "",
            img_product: []
        };
    }

    componentWillMount() {
        this.setState({
            token: cookies.get('token', { path: '/' }),
            user: cookies.get('user', { path: '/' })
        });
    }

    async componentDidMount() {
        var url_catalog = ip + "/Catalog/find/all";
        const catalog = await (await axios.get(url_catalog)).data;
        this.setState({
            catalog: catalog,
            statusDataCat: true
        });

        var url_img_product = ip + "/ImgSetting/find/all/product/font";
        const img_product = await (await axios.get(url_img_product)).data;
        this.setState({
            img_product: img_product,
            statusDataImg: true
        });
    }

    render() {

        return (
            <Container fluid id="bg">
                <Col xs={24} md={24} xl={24} id="cover-product">
                    <Carousel autoplay>
                        {
                            (this.state.statusDataImg) ?
                                (this.state.img_product.length > 0) ?
                                    this.state.img_product.map((img, i) => {
                                        return <Image src={img.urlimg} onClick={() => {this.props.history.push(img.url)}} style={{ cursor: "pointer" }} fluid></Image>
                                    })
                                    :
                                    <></>
                                :
                                <Row id="row-spin">
                                    <Spin size="large" />
                                </Row>

                        }
                    </Carousel>
                </Col>
                <Row id="Product">
                </Row>
                {
                    (this.state.statusDataCat) ?
                        (this.state.catalog.length > 0) ?
                            this.state.catalog.map((cat, i) => {
                                return <>
                                    <Row id="Rowgroup-product">
                                        <Col xs={14} md={20} xl={20}>{cat.catName}</Col>
                                        <Col id="List-all" xs={10} md={4} xl={4}><NavLink to={"/ProductList/" + cat.catId + "/grid"}>ดูทั้งหมด</NavLink></Col>
                                    </Row>
                                    <ProductSlide catId={cat.catId} />
                                </>
                            })
                            :
                            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                        :
                        <Row id="row-spin">
                            <Spin size="large" />
                        </Row>

                }
            </Container>
        )

    }
}