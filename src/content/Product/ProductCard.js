import React, { Component } from "react";
import { Row, Col } from 'antd';
import '../../css/Product.css';
import imgm from '../../img/photocomingsoon.svg';
import { Card } from 'antd';
import { NavLink } from 'react-router-dom';

const { Meta } = Card;
export default class ProductCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    showPrice() {
        if (this.props.product.memberCode === "Admin") {
            return <div id="price-card-product" >ดูข้อมูลราคา</div>
        }
        else if (this.props.product.memberCode === "EndUser") {
            return <>
                {
                    (this.props.product.priceendmin === this.props.product.priceendmax) ?
                        <div id="price-card-product" > {"฿ " + (((this.props.product.priceendmin === null) || (this.props.product.priceendmin === "")) ? "-" : this.props.product.priceendmin) + "/" + (((this.props.product.unit === null) || (this.props.product.unit === "")) ? "-" : this.props.product.unit)} </div>
                        :
                        <div id="price-card-product" > {"฿ " + (((this.props.product.priceendmin === null) || (this.props.product.priceendmin === "")) ? "-" : this.props.product.priceendmin) + " - " + (((this.props.product.priceendmax === null) || (this.props.product.priceendmax === "")) ? "-" : this.props.product.priceendmax) + "/" + (((this.props.product.unit === null) || (this.props.product.unit === "")) ? "-" : this.props.product.unit)} </div>
                }
            </>
        }
        else if (this.props.product.memberCode === "member1") {
            return <>
                {
                    (this.props.product.priceendmin !== null) ?
                        (this.props.product.priceendmin === this.props.product.priceendmax) ?
                            <div id="price-card-product2" > {"฿ " + (((this.props.product.priceendmin === null) || (this.props.product.priceendmin === "")) ? "-" : this.props.product.priceendmin) + "/" + (((this.props.product.unit === null) || (this.props.product.unit === "")) ? "-" : this.props.product.unit)} </div>
                            :
                            <div id="price-card-product2" > {"฿ " + (((this.props.product.priceendmin === null) || (this.props.product.priceendmin === "")) ? "-" : this.props.product.priceendmin) + " - " + (((this.props.product.priceendmax === null) || (this.props.product.priceendmax === "")) ? "-" : this.props.product.priceendmax) + "/" + (((this.props.product.unit === null) || (this.props.product.unit === "")) ? "-" : this.props.product.unit)} </div>
                        :
                        <div id="price-card-product3">0</div>
                }
                {
                    (this.props.product.pricemin === this.props.product.pricemax) ?
                        <div id="price-card-product" > {"฿ " + (((this.props.product.pricemin === null) || (this.props.product.pricemin === "")) ? "-" : this.props.product.pricemin) + "/" + (((this.props.product.unit === null) || (this.props.product.unit === "")) ? "-" : this.props.product.unit)} </div>
                    :
                        <div id="price-card-product" > {"฿ " + (((this.props.product.pricemin === null) || (this.props.product.pricemin === "")) ? "-" : this.props.product.pricemin) + " - " + (((this.props.product.pricemax === null) || (this.props.product.pricemax === "")) ? "-" : this.props.product.pricemax) + "/" + (((this.props.product.unit === null) || (this.props.product.unit === "")) ? "-" : this.props.product.unit)} </div>
                }
                
            </>
        }
        else if (this.props.product.memberCode === "member2") {
            return <>
                {
                    (this.props.product.priceendmin !== null) ?
                        (this.props.product.priceendmin === this.props.product.priceendmax) ?
                            <div id="price-card-product2" > {"฿ " + (((this.props.product.priceendmin === null) || (this.props.product.priceendmin === "")) ? "-" : this.props.product.priceendmin) + "/" + (((this.props.product.unit === null) || (this.props.product.unit === "")) ? "-" : this.props.product.unit)} </div>
                            :
                            <div id="price-card-product2" > {"฿ " + (((this.props.product.priceendmin === null) || (this.props.product.priceendmin === "")) ? "-" : this.props.product.priceendmin) + " - " + (((this.props.product.priceendmax === null) || (this.props.product.priceendmax === "")) ? "-" : this.props.product.priceendmax) + "/" + (((this.props.product.unit === null) || (this.props.product.unit === "")) ? "-" : this.props.product.unit)} </div>
                        :
                        <div id="price-card-product3">0</div>
                }
                {
                    (this.props.product.pricemin === this.props.product.pricemax) ?
                        <div id="price-card-product" > {"฿ " + (((this.props.product.pricemin === null) || (this.props.product.pricemin === "")) ? "-" : this.props.product.pricemin) + "/" + (((this.props.product.unit === null) || (this.props.product.unit === "")) ? "-" : this.props.product.unit)} </div>
                    :
                        <div id="price-card-product" > {"฿ " + (((this.props.product.pricemin === null) || (this.props.product.pricemin === "")) ? "-" : this.props.product.pricemin) + " - " + (((this.props.product.pricemax === null) || (this.props.product.pricemax === "")) ? "-" : this.props.product.pricemax) + "/" + (((this.props.product.unit === null) || (this.props.product.unit === "")) ? "-" : this.props.product.unit)} </div>
                }
            </>
        }
        else if (this.props.product.memberCode === "member3") {
            return <>
                {
                    (this.props.product.priceendmin === this.props.product.priceendmax) ?
                        <div id="price-card-product" > {"฿ " + (((this.props.product.priceendmin === null) || (this.props.product.priceendmin === "")) ? "-" : this.props.product.priceendmin) + "/" + (((this.props.product.unit === null) || (this.props.product.unit === "")) ? "-" : this.props.product.unit)} </div>
                        :
                        <div id="price-card-product" > {"฿ " + (((this.props.product.priceendmin === null) || (this.props.product.priceendmin === "")) ? "-" : this.props.product.priceendmin) + " - " + (((this.props.product.priceendmax === null) || (this.props.product.priceendmax === "")) ? "-" : this.props.product.priceendmax) + "/" + (((this.props.product.unit === null) || (this.props.product.unit === "")) ? "-" : this.props.product.unit)} </div>
                }
                {/* {
                    (this.props.product.price !== null) ?
                        <div id="price-card-product5" > {(((this.props.product.price === null) || (this.props.product.price === "")) ? "-" : this.props.product.price) + " Point/" + (((this.props.product.unit === null) || (this.props.product.unit === "")) ? "-" : this.props.product.unit)} </div>
                        :
                        <div id="price-card-product3">0</div>
                } */}
            </>
        }
    }

    render() {
        return (
            <NavLink to={"/ProductDetail/" + this.props.product.productId}>
                <Card
                    hoverable
                    // style={{ width: "100%", height: "100%", borderRight: "10px solid #fbfbfb", borderLeft: "10px solid #fbfbfb" }}
                    id="card-product"
                    cover={
                        (this.props.product.url === null) ?
                            <img id="img-product" alt="example" src={imgm} />
                            :
                            <img id="img-product" alt="example" src={this.props.product.url} />
                    }>
                    <Row id="text-detail">
                        <Meta id="text-title" title={this.props.product.name} />
                    </Row>
                    <Row id="text-detail">
                        {/* <div>{"ขนาด : " + this.props.product.size}</div> */}
                        <Meta description={"ขนาด : " + this.props.product.size} />
                        {/* <Col id="textdescription" xs={5} md={5} xl={5}>
                            <Meta description="ขนาด" />
                        </Col>
                        <Col id="textdescription" xs={1} md={1} xl={1}>
                            <Meta description=":" />
                        </Col>
                        <Col xs={18} md={18} xl={18}>
                            <Meta id="description" description={this.props.product.size} />
                        </Col> */}
                    </Row>
                    <Row id="text-detail">
                        {/* <div>{"สี : " + this.props.product.color}</div> */}
                        <Meta description={"สี : " + this.props.product.color} />
                        {/* <Col id="textdescription" xs={2} md={2} xl={2}>
                            <Meta description="สี" />
                        </Col>
                        <Col id="textdescription" xs={1} md={1} xl={1}>
                            <Meta description=":" />
                        </Col>
                        <Col xs={19} md={19} xl={19}>
                            <Meta id="description" description={this.props.product.color} />
                        </Col> */}
                    </Row>
                    <Row id="text-detail">
                        <Col id="textdescription" xs={24} md={24} xl={24}>
                            {this.showPrice()}
                            {/* {
                                (this.props.product.memberCode === "Admin") ?
                                    <div id="price-card-product" >ดูข้อมูลราคา</div>
                                    :
                                    <>
                                        {
                                            (this.props.product.priceend !== null) ?
                                                <div id="price-card-product2" > {"฿ " + (((this.props.product.priceend === null) || (this.props.product.priceend === "")) ? "-" : this.props.product.priceend) + "/" + (((this.props.product.unit === null) || (this.props.product.unit === "")) ? "-" : this.props.product.unit)} </div>
                                                :
                                                <div id="price-card-product3">0</div>
                                        }
                                        <div id="price-card-product" > {"฿ " + (((this.props.product.price === null) || (this.props.product.price === "")) ? "-" : this.props.product.price) + "/" + (((this.props.product.unit === null) || (this.props.product.unit === "")) ? "-" : this.props.product.unit)} </div>
                                    </>
                            } */}
                        </Col>
                    </Row>
                </Card>
            </NavLink>
        )

    }
}