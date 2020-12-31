import React, { Component } from "react";
import { Row, Col } from 'antd';
import '../../css/Product.css';
import imgm from '../../img/m.png';
import { Card } from 'antd';
import { NavLink } from 'react-router-dom';

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
                <NavLink to={"/ProductDetail/" + this.props.product.productId}>
                    <Card
                        hoverable
                        style={{ width: "auto", border: "10px solid #f0f2f5" }}
                    >
                        <Row>
                            <Col xs={6} md={6} lg={6}>
                                <img id="img-product" alt="example" src={imgm} />
                            </Col>
                            <Col xs={18} md={18} lg={18} id="product-card-list-col">
                                <Row id="text-detail">
                                    <Meta id="text-title" title={this.props.product.name} />
                                </Row>
                                <Row id="text-detail">
                                    {/* <div>{"ขนาด : " + this.props.product.size}</div> */}
                                    <Meta description={"ขนาด : " + this.props.product.size} />
                                    {/* <Col id="textdescription" xs={2} md={2} xl={2}>
                                        <Meta description="ขนาด : " />
                                    </Col>
                                    <Col xs={21} md={21} xl={21}>
                                        <Meta id="description" description={this.props.product.size} />
                                    </Col> */}
                                </Row>
                                <Row id="text-detail">
                                    {/* <div>{"สี : " + this.props.product.color}</div> */}
                                    <Meta description={"สี : " + this.props.product.color} />
                                    {/* <Col id="textdescription" xs={1} md={1} xl={1}>
                                        <Meta description="สี : " />
                                    </Col>
                                    <Col xs={23} md={23} xl={23}>
                                        <Meta id="description" description={this.props.product.color} />
                                    </Col> */}
                                </Row>
                                <Row id="text-detail">
                                    {/* <div>{"วิธีการใช้งาน : " + this.props.product.direction}</div> */}
                                    <Meta description={"วิธีการใช้งาน : " + this.props.product.direction} />
                                    {/* <Col id="textdescription" xs={4} md={4} xl={4}>
                                        <Meta description="วิธีการใช้งาน : " />
                                    </Col>
                                    <Col xs={19} md={19} xl={19}>
                                        <Meta id="description" description={this.props.product.direction} />
                                    </Col> */}
                                </Row>
                                <Row id="text-detail">
                                    <Col id="textdescription" xs={24} md={24} xl={24}>
                                        <div id="price-list-product" > {"฿ " + (((this.props.product.price === null) || (this.props.product.price === "")) ? "-" : this.props.product.price) + "/" + (((this.props.product.unit === null) || (this.props.product.unit === "")) ? "-" : this.props.product.unit)} </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>

                    </Card>
                </NavLink>
            </Col>

        )

    }
}