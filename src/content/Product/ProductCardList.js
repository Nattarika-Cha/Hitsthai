import React, { Component } from "react";
import { Row, Col } from 'antd';
import '../../css/Product.css';
import imgm from '../../img/photocomingsoon.svg';
import { Card } from 'antd';
import { NavLink } from 'react-router-dom';

const { Meta } = Card;
export default class ProductCardList extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    showPrice() {
        if (this.props.product.memberCode === "Admin") {
            return <div id="price-list-product" >ดูข้อมูลราคา</div>
        }
        else if (this.props.product.memberCode === "EndUser") {
            return <div id="price-list-product" > {"฿ " + (((this.props.product.price === null) || (this.props.product.price === "")) ? "-" : this.props.product.price) + "/" + (((this.props.product.unit === null) || (this.props.product.unit === "")) ? "-" : this.props.product.unit)} </div>
        }
        else if (this.props.product.memberCode === "member1") {
            return <>
                {
                    (this.props.product.priceend !== null) ?
                        <div id="price-list-product2" > {"฿ " + (((this.props.product.priceend === null) || (this.props.product.priceend === "")) ? "-" : this.props.product.priceend) + "/" + (((this.props.product.unit === null) || (this.props.product.unit === "")) ? "-" : this.props.product.unit)} </div>
                        :
                        <div id="price-list-product3">0</div>
                }

                <div id="price-list-product" > {"฿ " + (((this.props.product.price === null) || (this.props.product.price === "")) ? "-" : this.props.product.price) + "/" + (((this.props.product.unit === null) || (this.props.product.unit === "")) ? "-" : this.props.product.unit)} </div>
            </>
        }
        else if (this.props.product.memberCode === "member2") {
            return <>
                <div id="price-list-product" > {"฿ " + (((this.props.product.priceend === null) || (this.props.product.priceend === "")) ? "-" : this.props.product.priceend) + "/" + (((this.props.product.unit === null) || (this.props.product.unit === "")) ? "-" : this.props.product.unit)} </div>
                {
                    (this.props.product.price !== null) ?
                        <div id="price-list-product4" > {"Commission " + (((this.props.product.price === null) || (this.props.product.price === "")) ? "-" : this.props.product.price) + " /" + (((this.props.product.unit === null) || (this.props.product.unit === "")) ? "-" : this.props.product.unit)} </div>
                        :
                        <div id="price-list-product3">0</div>
                }
            </>
        }
        else if (this.props.product.memberCode === "member3") {
            return <>
                <div id="price-list-product" > {"฿ " + (((this.props.product.priceend === null) || (this.props.product.priceend === "")) ? "-" : this.props.product.priceend) + "/" + (((this.props.product.unit === null) || (this.props.product.unit === "")) ? "-" : this.props.product.unit)} </div>
                {
                    (this.props.product.price !== null) ?
                        <div id="price-list-product5" > {(((this.props.product.price === null) || (this.props.product.price === "")) ? "-" : this.props.product.price) + " Point/" + (((this.props.product.unit === null) || (this.props.product.unit === "")) ? "-" : this.props.product.unit)} </div>
                        :
                        <div id="price-list-product3">0</div>
                }
            </>
        }
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
                            <Col xs={8} md={8} lg={8}>
                                {
                                    (this.props.product.url === null) ?
                                        <img id="img-product" alt="example" src={imgm} />
                                        :
                                        <img id="img-product" alt="example" src={this.props.product.url} />
                                }
                            </Col>
                            <Col xs={16} md={16} lg={16} id="product-card-list-col">
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
                                        {this.showPrice()}
                                        {/* {
                                            (this.props.product.memberCode === "Admin") ?
                                                <div id="price-list-product" >ดูข้อมูลราคา</div>
                                                :
                                                <>
                                                    {
                                                        (this.props.product.priceend !== null) ?
                                                            <div id="price-list-product2" > {"฿ " + (((this.props.product.priceend === null) || (this.props.product.priceend === "")) ? "-" : this.props.product.priceend) + "/" + (((this.props.product.unit === null) || (this.props.product.unit === "")) ? "-" : this.props.product.unit)} </div>
                                                            :
                                                            <div id="price-list-product3">0</div>
                                                    }
                                                    <div id="price-list-product" > {"฿ " + (((this.props.product.price === null) || (this.props.product.price === "")) ? "-" : this.props.product.price) + "/" + (((this.props.product.unit === null) || (this.props.product.unit === "")) ? "-" : this.props.product.unit)} </div>
                                                </>
                                        } */}
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