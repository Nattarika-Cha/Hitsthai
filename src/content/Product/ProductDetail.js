import React, { Component } from "react";
import { Container, } from 'react-bootstrap';
import { Row, Col, Descriptions, PageHeader, Spin } from 'antd';
import '../../css/ProductDetail.css';
import imgm from '../../img/photocomingsoon.svg';
import ImageGallery from 'react-image-gallery';
import { CheckCircleTwoTone, CloseCircleTwoTone, ShoppingTwoTone } from '@ant-design/icons';
import axios from 'axios';
import Cookies from 'universal-cookie';
import swal from 'sweetalert';

const cookies = new Cookies();
var ip = "http://localhost:5000";
// var ip_img_profile = "http://128.199.198.10/API/profile/";

// const images = [
//     {
//         original: imgm,
//         thumbnail: imgm,
//     },
//     {
//         original: 'https://picsum.photos/id/1015/1000/600/',
//         thumbnail: 'https://picsum.photos/id/1015/250/150/',
//     },
//     {
//         original: 'https://picsum.photos/id/1019/1000/600/',
//         thumbnail: 'https://picsum.photos/id/1019/250/150/',
//     },
// ];

var routes = [];

export default class Abount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: "",
            user: [],
            product: [],
            productId: "",
            caution: [],
            member: [],
            level: [],
            priceAdmin: [],
            member1: [],
            member2: [],
            member3: [],
            enduser: [],
            images: []
        };
    }

    componentWillMount() {
        this.setState({
            token: cookies.get('token', { path: '/' }),
            user: cookies.get('user', { path: '/' }),
            productId: this.props.match.params.productId
        });
    }

    async componentDidMount() {
        // var url_product = ip + "/Product/find/byproduct/authorization/id/" + this.props.match.params.productId;
        var url_product = "";
        var url_view = ip + "/Product/update/view/" + this.props.match.params.productId;
        await (await axios.put(url_view, { headers: { "token": this.state.token, "key": this.state.user?.username } })).data;
        if (this.state.token === "" || this.state.token === null || this.state.token === undefined ||
            this.state.user.levelId === "" || this.state.user.levelId === null || this.state.user.levelId === undefined) {
            url_product = ip + "/Product/find/byproduct/notauthorization/id/" + this.props.match.params.productId + "/16";
        } else {
            url_product = ip + "/Product/find/byproduct/authorization/id/" + this.props.match.params.productId;
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
                product: product
            });

            var url_product_img = ip + "/ProductImg/ImgProduct/all/" + this.props.match.params.productId;
            const product_img = await (await axios.get(url_product_img)).data;
            if (product_img.length > 0) {
                this.setState({
                    images: product_img
                });
            } else {
                this.setState({
                    images: [{
                        original: imgm,
                        thumbnail: imgm,
                    }]
                });
            };

            if (this.state.product[0]?.caution !== null && this.state.product[0]?.caution !== "") {
                this.setState({
                    caution: this.state.product[0]?.caution.split("-")
                });
            }

            if (this.state.product[0]?.memberCode === "Admin") {
                //level
                var url_level = ip + "/Level/find/allmember";
                const level = await (await axios.get(url_level, { headers: { "token": this.state.token, "key": this.state.user?.username } })).data;
                if ((level.statusCode === 500) || (level.statusCode === 400)) {
                    swal("Error!", "เกิดข้อผิดพลาดในการเข้าสู่ระบบ \n กรุณาเข้าสู่ระบบใหม่", "error").then((value) => {
                        this.setState({
                            token: cookies.remove('token', { path: '/' }),
                            user: cookies.remove('user', { path: '/' })
                        });
                        window.location.replace('/Login', false);
                    });
                } else {
                    this.setState({
                        level: level
                    });
                }

                let member1 = this.state.level.filter(function (level) {
                    return level.memberCode === "member1"
                });

                let member2 = this.state.level.filter(function (level) {
                    return level.memberCode === "member2"
                });

                let member3 = this.state.level.filter(function (level) {
                    return level.memberCode === "member3"
                });

                let enduser = this.state.level.filter(function (level) {
                    return level.memberCode === "EndUser"
                });

                this.setState({
                    member1: member1,
                    member2: member2,
                    member3: member3,
                    enduser: enduser
                });

                //member
                // var url_member = ip + "/Member/find/all";
                // const member = await (await axios.get(url_member, { headers: { "token": this.state.token, "key": this.state.user?.username } })).data;
                // if ((level.statusCode === 500) || (level.statusCode === 400)) {
                //     swal("Error!", "เกิดข้อผิดพลาดในการเข้าสู่ระบบ \n กรุณาเข้าสู่ระบบใหม่", "error").then((value) => {
                //         this.setState({
                //             token: cookies.remove('token', { path: '/' }),
                //             user: cookies.remove('user', { path: '/' })
                //         });
                //         window.location.replace('/Login', false);
                //     });
                // } else {
                //     this.setState({
                //         member: member
                //     });
                // }

                //priceAdmin
                var url_priceAdmin = ip + "/Product/find/priceAdmin/authorization/codeid/" + this.state.product[0]?.codeId;
                const priceAdmin = await (await axios.get(url_priceAdmin, { headers: { "token": this.state.token, "key": this.state.user?.username } })).data;
                if ((level.statusCode === 500) || (level.statusCode === 400)) {
                    swal("Error!", "เกิดข้อผิดพลาดในการเข้าสู่ระบบ \n กรุณาเข้าสู่ระบบใหม่", "error").then((value) => {
                        this.setState({
                            token: cookies.remove('token', { path: '/' }),
                            user: cookies.remove('user', { path: '/' })
                        });
                        window.location.replace('/Login', false);
                    });
                } else {
                    this.setState({
                        priceAdmin: priceAdmin
                    });
                }
            }
        }
    }

    showPrice() {
        if (this.state.product[0]?.memberCode === "Admin") {
            return <> <div id="price-list-product" >ดูข้อมูลราคาด้านล่าง</div>
                {/* <Row>
                    <Col xs={24} md={8} xl={8}><div id="price-list-product" > {"ลูกค้าทั่วไป"} </div></Col>
                    <Col xs={0} md={4} xl={4}><div id="price-list-product-detail" ></div></Col>
                    <Col xs={24} md={12} xl={12}><div id="price-list-product-detail" > {"฿ " + (((this.state.product[0]?.priceend === null) || (this.state.product[0]?.priceend === "")) ? "-" : this.state.product[0]?.priceend) + "/" + (((this.state.product[0]?.unit === null) || (this.state.product[0]?.unit === "")) ? "-" : this.state.product[0]?.unit)} </div></Col>
                </Row>
                <Row>
                    <Col xs={8} md={8} xl={8}><div id="price-list-product" > {this.state.member1[0]?.memberName} </div></Col>
                    <Col xs={16} md={16} xl={16}></Col>
                </Row>
                {
                    this.state.member1.map((member1) => {
                        return <Row>
                            <Col xs={0} md={4} xl={4}><div id="price-list-product" >  </div></Col>
                            <Col xs={12} md={8} xl={8}><div id="price-list-product-detail1" > {"- " + member1.didplayName}</div></Col>
                            {
                                (member1.name === "level1") ? <Col xs={12} md={12} xl={12}><div id="price-list-product-detail1" > {"฿ " + (((this.state.priceAdmin[0]?.level1 === null) || (this.state.priceAdmin[0]?.level1 === "")) ? "-" : this.state.priceAdmin[0]?.level1) + "/" + (((this.state.product[0]?.unit === null) || (this.state.product[0]?.unit === "")) ? "-" : this.state.product[0]?.unit)} </div></Col>
                                    : (member1.name === "level2") ? <Col xs={12} md={12} xl={12}><div id="price-list-product-detail1" > {"฿ " + (((this.state.priceAdmin[0]?.level2 === null) || (this.state.priceAdmin[0]?.level2 === "")) ? "-" : this.state.priceAdmin[0]?.level2) + "/" + (((this.state.product[0]?.unit === null) || (this.state.product[0]?.unit === "")) ? "-" : this.state.product[0]?.unit)} </div></Col>
                                        : (member1.name === "level3") ? <Col xs={12} md={12} xl={12}><div id="price-list-product-detail1" > {"฿ " + (((this.state.priceAdmin[0]?.level3 === null) || (this.state.priceAdmin[0]?.level3 === "")) ? "-" : this.state.priceAdmin[0]?.level3) + "/" + (((this.state.product[0]?.unit === null) || (this.state.product[0]?.unit === "")) ? "-" : this.state.product[0]?.unit)} </div></Col>
                                            : (member1.name === "level4") ? <Col xs={12} md={12} xl={12}><div id="price-list-product-detail1" > {"฿ " + (((this.state.priceAdmin[0]?.level4 === null) || (this.state.priceAdmin[0]?.level4 === "")) ? "-" : this.state.priceAdmin[0]?.level4) + "/" + (((this.state.product[0]?.unit === null) || (this.state.product[0]?.unit === "")) ? "-" : this.state.product[0]?.unit)} </div></Col>
                                                : (member1.name === "level5") ? <Col xs={12} md={12} xl={12}><div id="price-list-product-detail1" > {"฿ " + (((this.state.priceAdmin[0]?.level5 === null) || (this.state.priceAdmin[0]?.level5 === "")) ? "-" : this.state.priceAdmin[0]?.level5) + "/" + (((this.state.product[0]?.unit === null) || (this.state.product[0]?.unit === "")) ? "-" : this.state.product[0]?.unit)} </div></Col>
                                                    : <></>
                            }
                        </Row>
                    })
                }
                <Row>
                    <Col xs={8} md={8} xl={8}><div id="price-list-product" > {this.state.member2[0]?.memberName} </div></Col>
                    <Col xs={16} md={16} xl={16}></Col>
                </Row>
                {
                    this.state.member2.map((member2) => {
                        return <Row>
                            <Col xs={0} md={4} xl={4}><div id="price-list-product" >  </div></Col>
                            <Col xs={12} md={8} xl={8}><div id="price-list-product-detail2" > {"- " + member2.didplayName}</div></Col>
                            {
                                (member2.name === "level6") ? <Col xs={12} md={12} xl={12}><div id="price-list-product-detail2" > {"Commission " + (((this.state.priceAdmin[0]?.level6 === null) || (this.state.priceAdmin[0]?.level6 === "")) ? "-" : this.state.priceAdmin[0]?.level6) + "/" + (((this.state.product[0]?.unit === null) || (this.state.product[0]?.unit === "")) ? "-" : this.state.product[0]?.unit)} </div></Col>
                                    : (member2.name === "level7") ? <Col xs={12} md={12} xl={12}><div id="price-list-product-detail2" > {"Commission " + (((this.state.priceAdmin[0]?.level7 === null) || (this.state.priceAdmin[0]?.level7 === "")) ? "-" : this.state.priceAdmin[0]?.level7) + "/" + (((this.state.product[0]?.unit === null) || (this.state.product[0]?.unit === "")) ? "-" : this.state.product[0]?.unit)} </div></Col>
                                        : (member2.name === "level8") ? <Col xs={12} md={12} xl={12}><div id="price-list-product-detail2" > {"Commission " + (((this.state.priceAdmin[0]?.level8 === null) || (this.state.priceAdmin[0]?.level8 === "")) ? "-" : this.state.priceAdmin[0]?.level8) + "/" + (((this.state.product[0]?.unit === null) || (this.state.product[0]?.unit === "")) ? "-" : this.state.product[0]?.unit)} </div></Col>
                                            : (member2.name === "level9") ? <Col xs={12} md={12} xl={12}><div id="price-list-product-detail2" > {"Commission " + (((this.state.priceAdmin[0]?.level9 === null) || (this.state.priceAdmin[0]?.level9 === "")) ? "-" : this.state.priceAdmin[0]?.level9) + "/" + (((this.state.product[0]?.unit === null) || (this.state.product[0]?.unit === "")) ? "-" : this.state.product[0]?.unit)} </div></Col>
                                                : (member2.name === "level10") ? <Col xs={12} md={12} xl={12}><div id="price-list-product-detail2" > {"Commission " + (((this.state.priceAdmin[0]?.level10 === null) || (this.state.priceAdmin[0]?.level10 === "")) ? "-" : this.state.priceAdmin[0]?.level10) + "/" + (((this.state.product[0]?.unit === null) || (this.state.product[0]?.unit === "")) ? "-" : this.state.product[0]?.unit)} </div></Col>
                                                    : <></>
                            }
                        </Row>
                    })
                }
                <Row>
                    <Col xs={8} md={8} xl={8}><div id="price-list-product" > {this.state.member3[0]?.memberName} </div></Col>
                    <Col xs={16} md={16} xl={16}></Col>
                </Row>
                {
                    this.state.member3.map((member3) => {
                        return <Row>
                            <Col xs={0} md={4} xl={4}><div id="price-list-product" >  </div></Col>
                            <Col xs={12} md={8} xl={8}><div id="price-list-product-detail3" > {"- " + member3.didplayName}</div></Col>
                            {
                                (member3.name === "level11") ? <Col xs={12} md={12} xl={12}><div id="price-list-product-detail3" > {(((this.state.priceAdmin[0]?.level11 === null) || (this.state.priceAdmin[0]?.level11 === "")) ? "-" : this.state.priceAdmin[0]?.level11) + " Point/" + (((this.state.product[0]?.unit === null) || (this.state.product[0]?.unit === "")) ? "-" : this.state.product[0]?.unit)} </div></Col>
                                    : (member3.name === "level12") ? <Col xs={12} md={12} xl={12}><div id="price-list-product-detail3" > {(((this.state.priceAdmin[0]?.level12 === null) || (this.state.priceAdmin[0]?.level12 === "")) ? "-" : this.state.priceAdmin[0]?.level12) + " Point/" + (((this.state.product[0]?.unit === null) || (this.state.product[0]?.unit === "")) ? "-" : this.state.product[0]?.unit)} </div></Col>
                                        : (member3.name === "level13") ? <Col xs={12} md={12} xl={12}><div id="price-list-product-detail3" > {(((this.state.priceAdmin[0]?.level13 === null) || (this.state.priceAdmin[0]?.level13 === "")) ? "-" : this.state.priceAdmin[0]?.level13) + " Point/" + (((this.state.product[0]?.unit === null) || (this.state.product[0]?.unit === "")) ? "-" : this.state.product[0]?.unit)} </div></Col>
                                            : (member3.name === "level14") ? <Col xs={12} md={12} xl={12}><div id="price-list-product-detail3" > {(((this.state.priceAdmin[0]?.level14 === null) || (this.state.priceAdmin[0]?.level14 === "")) ? "-" : this.state.priceAdmin[0]?.level14) + " Point/" + (((this.state.product[0]?.unit === null) || (this.state.product[0]?.unit === "")) ? "-" : this.state.product[0]?.unit)} </div></Col>
                                                : (member3.name === "level15") ? <Col xs={12} md={12} xl={12}><div id="price-list-product-detail3" > {(((this.state.priceAdmin[0]?.level15 === null) || (this.state.priceAdmin[0]?.level15 === "")) ? "-" : this.state.priceAdmin[0]?.level15) + " Point/" + (((this.state.product[0]?.unit === null) || (this.state.product[0]?.unit === "")) ? "-" : this.state.product[0]?.unit)} </div></Col>
                                                    : <></>
                            }
                        </Row>
                    })
                } */}
            </>
        }
        else if (this.state.product[0]?.memberCode === "EndUser") {
            return <div id="price-list-product" > {"฿ " + (((this.state.product[0]?.price === null) || (this.state.product[0]?.price === "")) ? "-" : this.state.product[0]?.price) + "/" + (((this.state.product[0]?.unit === null) || (this.state.product[0]?.unit === "")) ? "-" : this.state.product[0]?.unit)} </div>
        }
        else if (this.state.product[0]?.memberCode === "member1") {
            return <>
                {
                    (this.state.product[0]?.priceend !== null) ?
                        <div id="price-list-product2" > {"฿ " + (((this.state.product[0]?.priceend === null) || (this.state.product[0]?.priceend === "")) ? "-" : this.state.product[0]?.priceend) + "/" + (((this.state.product[0]?.unit === null) || (this.state.product[0]?.unit === "")) ? "-" : this.state.product[0]?.unit)} </div>
                        :
                        <div id="price-list-product3">0</div>
                }

                <div id="price-list-product" > {"฿ " + (((this.state.product[0]?.price === null) || (this.state.product[0]?.price === "")) ? "-" : this.state.product[0]?.price) + "/" + (((this.state.product[0]?.unit === null) || (this.state.product[0]?.unit === "")) ? "-" : this.state.product[0]?.unit)} </div>
            </>
        }
        else if (this.state.product[0]?.memberCode === "member2") {
            return <>
                <div id="price-list-product" > {"฿ " + (((this.state.product[0]?.priceend === null) || (this.state.product[0]?.priceend === "")) ? "-" : this.state.product[0]?.priceend) + "/" + (((this.state.product[0]?.unit === null) || (this.state.product[0]?.unit === "")) ? "-" : this.state.product[0]?.unit)} </div>
                {
                    (this.state.product[0]?.price !== null) ?
                        <div id="price-list-product4" > {"Commission " + (((this.state.product[0]?.price === null) || (this.state.product[0]?.price === "")) ? "-" : this.state.product[0]?.price) + " /" + (((this.state.product[0]?.unit === null) || (this.state.product[0]?.unit === "")) ? "-" : this.state.product[0]?.unit)} </div>
                        :
                        <div id="price-list-product3">0</div>
                }
            </>
        }
        else if (this.state.product[0]?.memberCode === "member3") {
            return <>
                <div id="price-list-product" > {"฿ " + (((this.state.product[0]?.priceend === null) || (this.state.product[0]?.priceend === "")) ? "-" : this.state.product[0]?.priceend) + "/" + (((this.state.product[0]?.unit === null) || (this.state.product[0]?.unit === "")) ? "-" : this.state.product[0]?.unit)} </div>
                {
                    (this.state.product[0]?.price !== null) ?
                        <div id="price-list-product5" > {(((this.state.product[0]?.price === null) || (this.state.product[0]?.price === "")) ? "-" : this.state.product[0]?.price) + " Point/" + (((this.state.product[0]?.unit === null) || (this.state.product[0]?.unit === "")) ? "-" : this.state.product[0]?.unit)} </div>
                        :
                        <div id="price-list-product3">0</div>
                }
            </>
        }
    }

    showPriceAdmin() {
        if (this.state.product[0]?.memberCode === "Admin") {
            return <>
                <Row id="level-price">
                    <Col xs={24} md={24} xl={24} id="header-price">ตารางเปลียบเทียบราคา</Col>
                    <Col xs={24} md={24} xl={24} id="header-price"></Col>

                    <Col xs={4} md={4} xl={4} id="solid-col">ระดับ</Col>
                    <Col xs={4} md={4} xl={4} id="solid-col">level1</Col>
                    <Col xs={4} md={4} xl={4} id="solid-col">level2</Col>
                    <Col xs={4} md={4} xl={4} id="solid-col">level3</Col>
                    <Col xs={4} md={4} xl={4} id="solid-col">level4</Col>
                    <Col xs={4} md={4} xl={4} id="solid-col">level5</Col>

                    <Col xs={4} md={4} xl={4} id="solid-col">{this.state.member1[0]?.memberName}</Col>
                    {
                        this.state.member1.map((member1) => {
                            return <>
                                {
                                    (member1.name === "level1") ? <Col xs={4} md={4} xl={4} id="solid-col-detail"><div id="price-list-product-detail1" > {"฿ " + (((this.state.priceAdmin[0]?.level1 === null) || (this.state.priceAdmin[0]?.level1 === "")) ? "-" : this.state.priceAdmin[0]?.level1) + "/" + (((this.state.product[0]?.unit === null) || (this.state.product[0]?.unit === "")) ? "-" : this.state.product[0]?.unit)} </div></Col>
                                        : (member1.name === "level2") ? <Col xs={4} md={4} xl={4} id="solid-col-detail"><div id="price-list-product-detail1" > {"฿ " + (((this.state.priceAdmin[0]?.level2 === null) || (this.state.priceAdmin[0]?.level2 === "")) ? "-" : this.state.priceAdmin[0]?.level2) + "/" + (((this.state.product[0]?.unit === null) || (this.state.product[0]?.unit === "")) ? "-" : this.state.product[0]?.unit)} </div></Col>
                                            : (member1.name === "level3") ? <Col xs={4} md={4} xl={4} id="solid-col-detail"><div id="price-list-product-detail1" > {"฿ " + (((this.state.priceAdmin[0]?.level3 === null) || (this.state.priceAdmin[0]?.level3 === "")) ? "-" : this.state.priceAdmin[0]?.level3) + "/" + (((this.state.product[0]?.unit === null) || (this.state.product[0]?.unit === "")) ? "-" : this.state.product[0]?.unit)} </div></Col>
                                                : (member1.name === "level4") ? <Col xs={4} md={4} xl={4} id="solid-col-detail"><div id="price-list-product-detail1" > {"฿ " + (((this.state.priceAdmin[0]?.level4 === null) || (this.state.priceAdmin[0]?.level4 === "")) ? "-" : this.state.priceAdmin[0]?.level4) + "/" + (((this.state.product[0]?.unit === null) || (this.state.product[0]?.unit === "")) ? "-" : this.state.product[0]?.unit)} </div></Col>
                                                    : (member1.name === "level5") ? <Col xs={4} md={4} xl={4} id="solid-col-detail-r"><div id="price-list-product-detail1" > {"฿ " + (((this.state.priceAdmin[0]?.level5 === null) || (this.state.priceAdmin[0]?.level5 === "")) ? "-" : this.state.priceAdmin[0]?.level5) + "/" + (((this.state.product[0]?.unit === null) || (this.state.product[0]?.unit === "")) ? "-" : this.state.product[0]?.unit)} </div></Col>
                                                        : <></>
                                }
                            </>
                        })
                    }


                    <Col xs={4} md={4} xl={4} id="solid-col">{this.state.member2[0]?.memberName}</Col>
                    {
                        this.state.member2.map((member2) => {
                            return <>
                                {
                                    (member2.name === "level6") ? <Col xs={4} md={4} xl={4} id="solid-col-detail"><div id="price-list-product-detail2" > {"Commission " + (((this.state.priceAdmin[0]?.level6 === null) || (this.state.priceAdmin[0]?.level6 === "")) ? "-" : this.state.priceAdmin[0]?.level6) + "/" + (((this.state.product[0]?.unit === null) || (this.state.product[0]?.unit === "")) ? "-" : this.state.product[0]?.unit)} </div></Col>
                                        : (member2.name === "level7") ? <Col xs={4} md={4} xl={4} id="solid-col-detail"><div id="price-list-product-detail2" > {"Commission " + (((this.state.priceAdmin[0]?.level7 === null) || (this.state.priceAdmin[0]?.level7 === "")) ? "-" : this.state.priceAdmin[0]?.level7) + "/" + (((this.state.product[0]?.unit === null) || (this.state.product[0]?.unit === "")) ? "-" : this.state.product[0]?.unit)} </div></Col>
                                            : (member2.name === "level8") ? <Col xs={4} md={4} xl={4} id="solid-col-detail"><div id="price-list-product-detail2" > {"Commission " + (((this.state.priceAdmin[0]?.level8 === null) || (this.state.priceAdmin[0]?.level8 === "")) ? "-" : this.state.priceAdmin[0]?.level8) + "/" + (((this.state.product[0]?.unit === null) || (this.state.product[0]?.unit === "")) ? "-" : this.state.product[0]?.unit)} </div></Col>
                                                : (member2.name === "level9") ? <Col xs={4} md={4} xl={4} id="solid-col-detail"><div id="price-list-product-detail2" > {"Commission " + (((this.state.priceAdmin[0]?.level9 === null) || (this.state.priceAdmin[0]?.level9 === "")) ? "-" : this.state.priceAdmin[0]?.level9) + "/" + (((this.state.product[0]?.unit === null) || (this.state.product[0]?.unit === "")) ? "-" : this.state.product[0]?.unit)} </div></Col>
                                                    : (member2.name === "level10") ? <Col xs={4} md={4} xl={4} id="solid-col-detail-r"><div id="price-list-product-detail2" > {"Commission " + (((this.state.priceAdmin[0]?.level10 === null) || (this.state.priceAdmin[0]?.level10 === "")) ? "-" : this.state.priceAdmin[0]?.level10) + "/" + (((this.state.product[0]?.unit === null) || (this.state.product[0]?.unit === "")) ? "-" : this.state.product[0]?.unit)} </div></Col>
                                                        : <></>
                                }
                            </>
                        })
                    }

                    <Col xs={4} md={4} xl={4} id="solid-col">{this.state.member3[0]?.memberName}</Col>
                    {
                        this.state.member3.map((member3) => {
                            return <>
                                {
                                    (member3.name === "level11") ? <Col xs={4} md={4} xl={4} id="solid-col-detail"><div id="price-list-product-detail3" > {(((this.state.priceAdmin[0]?.level11 === null) || (this.state.priceAdmin[0]?.level11 === "")) ? "-" : this.state.priceAdmin[0]?.level11) + " Point/" + (((this.state.product[0]?.unit === null) || (this.state.product[0]?.unit === "")) ? "-" : this.state.product[0]?.unit)} </div></Col>
                                        : (member3.name === "level12") ? <Col xs={4} md={4} xl={4} id="solid-col-detail-b"><div id="price-list-product-detail3" > {(((this.state.priceAdmin[0]?.level12 === null) || (this.state.priceAdmin[0]?.level12 === "")) ? "-" : this.state.priceAdmin[0]?.level12) + " Point/" + (((this.state.product[0]?.unit === null) || (this.state.product[0]?.unit === "")) ? "-" : this.state.product[0]?.unit)} </div></Col>
                                            : (member3.name === "level13") ? <Col xs={4} md={4} xl={4} id="solid-col-detail-b"><div id="price-list-product-detail3" > {(((this.state.priceAdmin[0]?.level13 === null) || (this.state.priceAdmin[0]?.level13 === "")) ? "-" : this.state.priceAdmin[0]?.level13) + " Point/" + (((this.state.product[0]?.unit === null) || (this.state.product[0]?.unit === "")) ? "-" : this.state.product[0]?.unit)} </div></Col>
                                                : (member3.name === "level14") ? <Col xs={4} md={4} xl={4} id="solid-col-detail-b"><div id="price-list-product-detail3" > {(((this.state.priceAdmin[0]?.level14 === null) || (this.state.priceAdmin[0]?.level14 === "")) ? "-" : this.state.priceAdmin[0]?.level14) + " Point/" + (((this.state.product[0]?.unit === null) || (this.state.product[0]?.unit === "")) ? "-" : this.state.product[0]?.unit)} </div></Col>
                                                    : (member3.name === "level15") ? <Col xs={4} md={4} xl={4} id="solid-col-detail-e"><div id="price-list-product-detail3" > {(((this.state.priceAdmin[0]?.level15 === null) || (this.state.priceAdmin[0]?.level15 === "")) ? "-" : this.state.priceAdmin[0]?.level15) + " Point/" + (((this.state.product[0]?.unit === null) || (this.state.product[0]?.unit === "")) ? "-" : this.state.product[0]?.unit)} </div></Col>
                                                        : <></>
                                }
                            </>
                        })
                    }

                    <Col xs={4} md={4} xl={4} id="solid-col">{this.state.enduser[0]?.memberName}</Col>
                    <Col xs={4} md={4} xl={4} id="solid-col-detail-e"><div id="price-list-product-detail" > {"฿ " + (((this.state.product[0]?.priceend === null) || (this.state.product[0]?.priceend === "")) ? "-" : this.state.product[0]?.priceend) + "/" + (((this.state.product[0]?.unit === null) || (this.state.product[0]?.unit === "")) ? "-" : this.state.product[0]?.unit)} </div></Col>
                </Row>
            </>
        }
    }

    render() {
        routes = [
            {
                breadcrumbName: 'สินค้า',
            },
            {
                breadcrumbName: this.state.product[0]?.catName,
            },
            {
                breadcrumbName: this.state.product[0]?.name,
            },
        ];
        return (
            <Container fluid>
                {
                    (this.state.product.length === 0) ?
                        <Row id="row-spin">
                            <Spin size="large" />
                        </Row>
                        :
                        <>
                            <Row id="pageheader">
                                <PageHeader
                                    className="site-page-header"
                                    breadcrumb={{ routes }}
                                />
                            </Row>
                            <Col id="Product-detail">
                                <Row id="Product-name" >
                                    <div>{this.state.product[0]?.name}</div>
                                </Row>

                                <Row>
                                    <Col xs={24} md={24} xl={10} id="img-showproduct">
                                        <ImageGallery items={this.state.images} />
                                    </Col>
                                    <Col xs={24} md={24} xl={12}>
                                        <Row id="Row-List">
                                            <Col xs={10} md={5} xl={5}>
                                                <div>ราคา   :</div>
                                            </Col>
                                            <Col xs={12} md={12} xl={12} id="detial">
                                                {this.showPrice()}
                                                {/* <div>{"฿ " + (((this.state.product[0]?.price === null) || (this.state.product[0]?.price === "")) ? "-" : this.state.product[0]?.price) + "/" + (((this.state.product[0]?.unit === null) || (this.state.product[0]?.unit === "")) ? "-" : this.state.product[0]?.unit)}</div> */}
                                            </Col>
                                        </Row>
                                        <Row id="Row-List">
                                            <Col xs={10} md={5} xl={5}>
                                                <div>ขนาด   :</div>
                                            </Col>
                                            <Col xs={12} md={12} xl={12} id="detail-size">
                                                <div>{this.state.product[0]?.size}</div>
                                            </Col>
                                        </Row>
                                        <Row id="Row-List">
                                            <Col xs={10} md={5} xl={5}>
                                                <div>รหัสสินค้า   :</div>
                                            </Col>
                                            <Col xs={12} md={12} xl={12} id="detial">
                                                <div>{this.state.product[0]?.productCode}</div>
                                            </Col>
                                        </Row>
                                        <Row id="Row-List">
                                            <Col xs={10} md={5} xl={5}>
                                                <div>สถานะ   :</div>
                                            </Col>
                                            <Col xs={12} md={12} xl={12} id="detial">
                                                {
                                                    (this.state.product[0]?.flagProduct === 1) ?
                                                        <Row>
                                                            <Col id="col-icon">
                                                                <div className="icons-list" id="icon">
                                                                    <CheckCircleTwoTone twoToneColor="#52c41a" />
                                                                </div>
                                                            </Col>
                                                            <Col id="color-product">
                                                                <div>มีจำหน่าย</div>
                                                            </Col>
                                                        </Row>
                                                        : (this.state.product[0]?.flagProduct === 2) ?
                                                            <Row>
                                                                <Col id="col-icon">
                                                                    <div className="icons-list" id="icon">
                                                                        <CloseCircleTwoTone twoToneColor="#ff0404" />
                                                                    </div>
                                                                </Col>
                                                                <Col id="color-product1">
                                                                    <div>รอเพิ่มเติมสินค้า</div>
                                                                </Col>
                                                            </Row>
                                                            : (this.state.product[0]?.flagProduct === 3) ?
                                                                <Row>
                                                                    <Col id="col-icon">
                                                                        <div className="icons-list" id="icon">
                                                                            <ShoppingTwoTone twoToneColor="#4A85DE" />
                                                                        </div>
                                                                    </Col>
                                                                    <Col id="color-product2">
                                                                        <div>สั่งสินค้าล่วงหน้า</div>
                                                                    </Col>
                                                                </Row>
                                                                :
                                                                <></>
                                                }
                                            </Col>
                                        </Row>
                                        <Row id="dercript">
                                            <Col xs={24} md={24} xl={24} id="descript-Header">วิธีการใช้งาน</Col>
                                            <Col xs={24} md={24} xl={24}>
                                                <Col id="descrip-detail">
                                                    <div>
                                                        {this.state.product[0]?.direction}
                                                    </div>
                                                </Col>
                                            </Col>
                                            <Col xs={24} md={24} xl={24} id="descript-Header1">รายละเอียดสินค้า</Col>
                                            <Col xs={24} md={24} xl={24}>
                                                <Col id="descrip-detail">
                                                    <div>
                                                        {this.state.product[0]?.detail}
                                                    </div>
                                                </Col>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row>

                                    {this.showPriceAdmin()}


                                </Row>

                            </Col>

                            <Col id="Product-detail1">
                                <Descriptions
                                    title="ข้อมูลเพิ่มเติมเพิ่มเติม"
                                    bordered
                                    column={{ xl: 1, md: 1, xs: 1, sm: 1, }}
                                >
                                    <Descriptions.Item label="ตราสินค้า">{this.state.product[0]?.brand}</Descriptions.Item>
                                    <Descriptions.Item label="ขนาด (มม.)">{this.state.product[0]?.size}</Descriptions.Item>
                                    <Descriptions.Item label="วิธีใช้งาน">{this.state.product[0]?.direction}</Descriptions.Item>
                                    <Descriptions.Item label="ข้อควรระวัง" span={2}>
                                        {
                                            this.state.caution?.map((caution, i) => {
                                                return <> - {caution} <br /> </>
                                            })
                                        }
                                    </Descriptions.Item>
                                    <Descriptions.Item label="วิธีเก็บรักษา" labelStyle={{ width: "25%" }} span={2}>{this.state.product[0]?.keepespreserve}</Descriptions.Item>
                                    {/* <Descriptions.Item label="ขั้นตอนการปฐมพยาบาล" span={2}>{this.state.product[0]?.firstaidprocedure}</Descriptions.Item> */}
                                </Descriptions>
                            </Col>
                        </>
                }

            </Container>
        )

    }
}