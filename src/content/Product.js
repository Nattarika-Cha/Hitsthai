import React, { Component } from "react";
import { Row, Col } from 'antd';
import { Container, } from 'react-bootstrap';
import '../css/Product.css';

import ProductSlide from "./Product/ProductSlide"

export default class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <Container fluid id="bg">
                <Row id="Product">
                </Row>
                <Row id="Rowgroup-product">
                    <Col xs={14} md={20} xl={20}>
                        ใบตัดโลหะ
                        </Col>
                    <Col id="List-all" xs={10} md={4} xl={4}>
                        ดูทั้งหมด
                        </Col>
                </Row>
                <ProductSlide />
                <Row id="Rowgroup-product">
                    <Col xs={14} md={20} xl={20}>
                        ใบตัดโลหะ
                        </Col>
                    <Col id="List-all" xs={10} md={4} xl={4}>
                        ดูทั้งหมด
                        </Col>
                </Row>
                <ProductSlide />
            </Container>
        )

    }
}