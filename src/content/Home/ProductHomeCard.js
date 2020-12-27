import React, { Component } from "react";
import { Row, Col } from 'antd';
import '../../css/Product.css';
import imgm from '../../img/m.png';
import { Card } from 'antd';
import { NavLink } from 'react-router-dom';

const { Meta } = Card;
export default class ProductCardTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <Col xs={12} md={8} lg={6}>
                <NavLink to={"/ProductDetail/" + this.props.product.productId}>
                    <Card
                        hoverable
                        style={{ width: "max-content", border: "10px solid #f0f2f5" }}
                        // id="card-product"
                        cover={<img id="img-product" alt="example" src={imgm} />}>
                        <Row id="text-detail">
                            <Meta id="text-title" title={this.props.product.name} />
                        </Row>
                        <Row id="text-detail">
                            <Col id="textdescription" xs={3} md={3} xl={3}>
                                <Meta description="ขนาด : " />
                            </Col>
                            <Col xs={21} md={21} xl={21}>
                                <Meta id="description" description={this.props.product.size} />
                            </Col>
                        </Row>
                        <Row id="text-detail">
                            <Col id="textdescription" xs={2} md={2} xl={2}>
                                <Meta description="สี : " />
                            </Col>
                            <Col xs={22} md={22} xl={22}>
                                <Meta id="description" description={this.props.product.color} />
                            </Col>
                        </Row>
                    </Card>
                </NavLink>
            </Col>

        )

    }
}