import React, { Component } from "react";
import { Row, Col } from 'antd';
import '../../css/Product.css';
import imgm from '../../img/m.png';
import { Card } from 'antd';

const { Meta } = Card;
export default class ProductCardList extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <Col xs={24} md={12} lg={12}>
                <Card
                    hoverable
                    style={{ width: "auto", border: "10px solid #f0f2f5" }}
                >
                    <Row>
                        <Col xs={6} md={6} lg={6}>
                            <img id="img-product" alt="example" src={imgm} />
                        </Col>
                        <Col xs={18} md={18} lg={18}>
                            <Row id="text-detail">
                                <Meta id="text-title" title="ใบตัดเหล็ก 16'" />
                            </Row>
                            <Row id="text-detail">
                                <Col id="textdescription" xs={5} md={5} xl={5}>
                                    <Meta description="ขนาด" />
                                </Col>
                                <Col id="textdescription" xs={1} md={1} xl={1}>
                                    <Meta description=":" />
                                </Col>
                                <Col xs={18} md={18} xl={18}>
                                    <Meta id="description" description="400x3.0x25.4 mm" />
                                </Col>
                            </Row>
                            <Row id="text-detail">
                                <Col id="textdescription" xs={2} md={2} xl={2}>
                                    <Meta description="สี" />
                                </Col>
                                <Col id="textdescription" xs={1} md={1} xl={1}>
                                    <Meta description=":" />
                                </Col>
                                <Col xs={19} md={19} xl={19}>
                                    <Meta id="description" description="ดำ" />
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                </Card>
            </Col>

        )

    }
}