import React, { Component } from "react";
import { Row, Col } from 'antd';
import '../../css/Product.css';
import imgm from '../../img/m.png';
import { Card } from 'antd';

const { Meta } = Card;
export default class ProductCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <Card
                hoverable
                // style={{ width: "100%", height: "100%", borderRight: "10px solid #fbfbfb", borderLeft: "10px solid #fbfbfb" }}
                id="card-product"
                cover={<img id="img-product" alt="example" src={imgm} />}>
                <Row id="text-detail">
                    <Meta title="ใบตัดเหล็ก 16'" />
                </Row>
                <Row id="text-detail">
                    <Col id="textdescription" xs={5} md={5} xl={5}>
                        <Meta description="ขนาด" />
                    </Col>
                    <Col id="textdescription" xs={1} md={1} xl={1}>
                        <Meta description=":" />
                    </Col>
                    <Col xs={18} md={18} xl={18}>
                        <Meta description="400x3.0x25.4 mm" />
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
                        <Meta description="ดำ" />
                    </Col>
                </Row>
            </Card>

        )

    }
}