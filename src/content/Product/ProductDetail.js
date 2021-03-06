import React, { Component } from "react";
import { Container, } from 'react-bootstrap';
import { Row, Col, Descriptions, Spin, Select, Breadcrumb } from 'antd'; //PageHeader
import '../../css/ProductDetail.css';
import imgm from '../../img/photocomingsoon.svg';
import ImageGallery from 'react-image-gallery';
import { CheckCircleTwoTone, CloseCircleTwoTone, ShoppingTwoTone } from '@ant-design/icons';
import axios from 'axios';
import Cookies from 'universal-cookie';
import swal from 'sweetalert';
import ShowMore from 'react-show-more';
import { NavLink } from 'react-router-dom';
import { config } from '../../config/config';

const { Option } = Select;
const cookies = new Cookies();
var ip = config.ipServer;

// var routes = [];

export default class Abount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: "",
            user: [],
            product: [],
            productTemp: [],
            productId: "",
            caution: [],
            member: [],
            level: [],
            priceAdmin: [],
            priceAdminTemp: [],
            member1: [],
            member2: [],
            member3: [],
            enduser: [],
            images: [],
            size: '',
            min: ''
        };

        this.handleChangeSize = this.handleChangeSize.bind(this);
        this.handleChangeMM = this.handleChangeMM.bind(this);
    }

    handleChangeSize(value) {
        this.setState({
            size: value.value
        });

        if (this.state.min !== "") {
            const product = [...this.state.productTemp];
            const productSet = product.filter((item) => item.size === (value.value + " x " + this.state.min));
            this.setState({
                product: productSet
            });

            if (this.state.product[0]?.memberCode === "Admin") {
                const priceAdmin = [...this.state.priceAdminTemp];
                this.setState({
                    priceAdmin: priceAdmin.filter((item) => item.codeId === productSet[0]?.codeId)
                });
            }
        }

    }

    async handleChangeMM(value) {
        this.setState({
            min: value.value
        });

        if (this.state.size !== "") {
            const product = [...this.state.productTemp];
            const productSet = await product.filter((item) => item.size === (this.state.size + " x " + value.value));
            this.setState({
                product: productSet
            });

            if (this.state.product[0]?.memberCode === "Admin") {
                const priceAdmin = [...this.state.priceAdminTemp];
                console.log(product.filter((item) => item.size === (this.state.size + " x " + value.value))?.codeId, " codeId")
                this.setState({
                    priceAdmin: priceAdmin.filter((item) => item.codeId === productSet[0]?.codeId)
                });
            }
        }

        console.log(this.state.product, " product333")
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
            if (product.length > 1) {
                const productendmin = Math.min.apply(Math, product.map(function (o) { return o.priceend; }));
                const productendmax = Math.max.apply(Math, product.map(function (o) { return o.priceend; }));
                const productmin = Math.min.apply(Math, product.map(function (o) { return o.price; }));
                const productmax = Math.max.apply(Math, product.map(function (o) { return o.price; }));
                const peuductfrist = [{
                    barCode: product[0]?.barCode,
                    brand: product[0]?.brand,
                    catCode: product[0]?.catCode,
                    catId: product[0]?.catId,
                    catName: product[0]?.catName,
                    catStatus: product[0]?.catStatus,
                    caution: product[0]?.caution,
                    codeId: product[0]?.codeId,
                    color: product[0]?.color,
                    createDate: product[0]?.createDate,
                    direction: product[0]?.direction,
                    firstaidprocedure: product[0]?.firstaidprocedure,
                    // flagProduct: product[0]?.flagProduct,
                    keepespreserve: product[0]?.keepespreserve,
                    memberCode: product[0]?.memberCode,
                    memberName: product[0]?.memberName,
                    name: product[0]?.name,
                    price: productmin + " - " + productmax,
                    priceend: productendmin + " - " + productendmax,
                    productCode: product[0]?.productCode,
                    productId: product[0]?.productId,
                    productStatus: product[0]?.productStatus,
                    // size: product[0]?.size,
                    unit: product[0]?.unit,
                    updateDate: product[0]?.updateDate,
                    view: product[0]?.view,
                }]
                // console.log(productmin, " productmin");
                this.setState({
                    productTemp: product,
                    product: peuductfrist
                });
            } else {
                this.setState({
                    product: product
                });
            }


            var url_product_img = ip + "/ProductImg/ImgProduct/all/" + this.props.match.params.productId;
            const product_img = await (await axios.get(url_product_img)).data;
            if (product_img.length > 0) {
                var proimgshow = [];
                const productImgMain = await product_img.filter((item) => item.seq === "1");
                if(productImgMain.length > 1) {
                    proimgshow.push(productImgMain[0]);
                } else {
                    proimgshow.push(...productImgMain);
                }

                const productImgDetail = await product_img.filter((item) => item.seq !== "1");
                if(productImgDetail.length > 1) {
                    proimgshow.push(...productImgDetail);
                }
                
                this.setState({
                    images: proimgshow
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
                    if (priceAdmin.length > 1) {
                        const level1min = Math.min.apply(Math, priceAdmin.map(function (o) { return o.level1; }));
                        const level1max = Math.max.apply(Math, priceAdmin.map(function (o) { return o.level1; }));
                        const level2min = Math.min.apply(Math, priceAdmin.map(function (o) { return o.level2; }));
                        const level2max = Math.max.apply(Math, priceAdmin.map(function (o) { return o.level2; }));
                        const level3min = Math.min.apply(Math, priceAdmin.map(function (o) { return o.level3; }));
                        const level3max = Math.max.apply(Math, priceAdmin.map(function (o) { return o.level3; }));
                        const level4min = Math.min.apply(Math, priceAdmin.map(function (o) { return o.level4; }));
                        const level4max = Math.max.apply(Math, priceAdmin.map(function (o) { return o.level4; }));
                        const level5min = Math.min.apply(Math, priceAdmin.map(function (o) { return o.level5; }));
                        const level5max = Math.max.apply(Math, priceAdmin.map(function (o) { return o.level5; }));
                        const level6min = Math.min.apply(Math, priceAdmin.map(function (o) { return o.level6; }));
                        const level6max = Math.max.apply(Math, priceAdmin.map(function (o) { return o.level6; }));
                        const level7min = Math.min.apply(Math, priceAdmin.map(function (o) { return o.level7; }));
                        const level7max = Math.max.apply(Math, priceAdmin.map(function (o) { return o.level7; }));
                        const level8min = Math.min.apply(Math, priceAdmin.map(function (o) { return o.level8; }));
                        const level8max = Math.max.apply(Math, priceAdmin.map(function (o) { return o.level8; }));
                        const level9min = Math.min.apply(Math, priceAdmin.map(function (o) { return o.level9; }));
                        const level9max = Math.max.apply(Math, priceAdmin.map(function (o) { return o.level9; }));
                        const level10min = Math.min.apply(Math, priceAdmin.map(function (o) { return o.level10; }));
                        const level10max = Math.max.apply(Math, priceAdmin.map(function (o) { return o.level10; }));
                        const level11min = Math.min.apply(Math, priceAdmin.map(function (o) { return o.level11; }));
                        const level11max = Math.max.apply(Math, priceAdmin.map(function (o) { return o.level11; }));
                        const level12min = Math.min.apply(Math, priceAdmin.map(function (o) { return o.level12; }));
                        const level12max = Math.max.apply(Math, priceAdmin.map(function (o) { return o.level12; }));
                        const level13min = Math.min.apply(Math, priceAdmin.map(function (o) { return o.level13; }));
                        const level13max = Math.max.apply(Math, priceAdmin.map(function (o) { return o.level13; }));
                        const level14min = Math.min.apply(Math, priceAdmin.map(function (o) { return o.level14; }));
                        const level14max = Math.max.apply(Math, priceAdmin.map(function (o) { return o.level14; }));
                        const level15min = Math.min.apply(Math, priceAdmin.map(function (o) { return o.level15; }));
                        const level15max = Math.max.apply(Math, priceAdmin.map(function (o) { return o.level15; }));
                        const endusermin = Math.min.apply(Math, priceAdmin.map(function (o) { return o.enduser; }));
                        const endusermax = Math.max.apply(Math, priceAdmin.map(function (o) { return o.enduser; }));

                        const priceadminfrist = [{
                            level1: (level1min === level1max) ? level1min : (level1min + " - " + level1max),
                            level2: (level2min === level2max) ? level2min : (level2min + " - " + level2max),
                            level3: (level3min === level3max) ? level3min : (level3min + " - " + level3max),
                            level4: (level4min === level4max) ? level4min : (level4min + " - " + level4max),
                            level5: (level5min === level5max) ? level5min : (level5min + " - " + level5max),
                            level6: (level6min === level6max) ? level6min : (level6min + " - " + level6max),
                            level7: (level7min === level7max) ? level7min : (level7min + " - " + level7max),
                            level8: (level8min === level8max) ? level8min : (level8min + " - " + level8max),
                            level9: (level9min === level9max) ? level9min : (level9min + " - " + level9max),
                            level10: (level10min === level10max) ? level10min : (level10min + " - " + level10max),
                            level11: (level11min === level11max) ? level11min : (level11min + " - " + level11max),
                            level12: (level12min === level12max) ? level12min : (level12min + " - " + level12max),
                            level13: (level13min === level13max) ? level13min : (level13min + " - " + level13max),
                            level14: (level14min === level14max) ? level14min : (level14min + " - " + level14max),
                            level15: (level15min === level15max) ? level15min : (level15min + " - " + level15max),
                            enduser: (endusermin === endusermax) ? endusermin : (endusermin + " - " + endusermax)
                        }]
                        // console.log(productmin, " productmin");
                        this.setState({
                            priceAdminTemp: priceAdmin,
                            priceAdmin: priceadminfrist
                        });
                    } else {
                        this.setState({
                            priceAdmin: priceAdmin
                        });
                    }
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
                {
                    (this.state.product[0]?.priceend !== null) ?
                        <div id="price-list-product2" > {"฿ " + (((this.state.product[0]?.priceend === null) || (this.state.product[0]?.priceend === "")) ? "-" : this.state.product[0]?.priceend) + "/" + (((this.state.product[0]?.unit === null) || (this.state.product[0]?.unit === "")) ? "-" : this.state.product[0]?.unit)} </div>
                        :
                        <div id="price-list-product3">0</div>
                }

                <div id="price-list-product" > {"฿ " + (((this.state.product[0]?.price === null) || (this.state.product[0]?.price === "")) ? "-" : this.state.product[0]?.price) + "/" + (((this.state.product[0]?.unit === null) || (this.state.product[0]?.unit === "")) ? "-" : this.state.product[0]?.unit)} </div>
            </>
        }
        else if (this.state.product[0]?.memberCode === "member3") {
            return <>
                <div id="price-list-product" > {"฿ " + (((this.state.product[0]?.priceend === null) || (this.state.product[0]?.priceend === "")) ? "-" : this.state.product[0]?.priceend) + "/" + (((this.state.product[0]?.unit === null) || (this.state.product[0]?.unit === "")) ? "-" : this.state.product[0]?.unit)} </div>
                {/* {
                    (this.state.product[0]?.price !== null) ?
                        <div id="price-list-product5" > {(((this.state.product[0]?.price === null) || (this.state.product[0]?.price === "")) ? "-" : this.state.product[0]?.price) + " Point/" + (((this.state.product[0]?.unit === null) || (this.state.product[0]?.unit === "")) ? "-" : this.state.product[0]?.unit)} </div>
                        :
                        <div id="price-list-product3">0</div>
                } */}
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
                                    (member2.name === "level6") ? <Col xs={4} md={4} xl={4} id="solid-col-detail"><div id="price-list-product-detail2" > {"฿ " + (((this.state.priceAdmin[0]?.level6 === null) || (this.state.priceAdmin[0]?.level6 === "")) ? "-" : this.state.priceAdmin[0]?.level6) + "/" + (((this.state.product[0]?.unit === null) || (this.state.product[0]?.unit === "")) ? "-" : this.state.product[0]?.unit)} </div></Col>
                                        : (member2.name === "level7") ? <Col xs={4} md={4} xl={4} id="solid-col-detail"><div id="price-list-product-detail2" > {"฿ " + (((this.state.priceAdmin[0]?.level7 === null) || (this.state.priceAdmin[0]?.level7 === "")) ? "-" : this.state.priceAdmin[0]?.level7) + "/" + (((this.state.product[0]?.unit === null) || (this.state.product[0]?.unit === "")) ? "-" : this.state.product[0]?.unit)} </div></Col>
                                            : (member2.name === "level8") ? <Col xs={4} md={4} xl={4} id="solid-col-detail"><div id="price-list-product-detail2" > {"฿ " + (((this.state.priceAdmin[0]?.level8 === null) || (this.state.priceAdmin[0]?.level8 === "")) ? "-" : this.state.priceAdmin[0]?.level8) + "/" + (((this.state.product[0]?.unit === null) || (this.state.product[0]?.unit === "")) ? "-" : this.state.product[0]?.unit)} </div></Col>
                                                : (member2.name === "level9") ? <Col xs={4} md={4} xl={4} id="solid-col-detail"><div id="price-list-product-detail2" > {"฿ " + (((this.state.priceAdmin[0]?.level9 === null) || (this.state.priceAdmin[0]?.level9 === "")) ? "-" : this.state.priceAdmin[0]?.level9) + "/" + (((this.state.product[0]?.unit === null) || (this.state.product[0]?.unit === "")) ? "-" : this.state.product[0]?.unit)} </div></Col>
                                                    : (member2.name === "level10") ? <Col xs={4} md={4} xl={4} id="solid-col-detail-r"><div id="price-list-product-detail2" > {"฿ " + (((this.state.priceAdmin[0]?.level10 === null) || (this.state.priceAdmin[0]?.level10 === "")) ? "-" : this.state.priceAdmin[0]?.level10) + "/" + (((this.state.product[0]?.unit === null) || (this.state.product[0]?.unit === "")) ? "-" : this.state.product[0]?.unit)} </div></Col>
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
                                    (member3.name === "level11") ? <Col xs={4} md={4} xl={4} id="solid-col-detail"><div id="price-list-product-detail3" > {(((this.state.priceAdmin[0]?.level11 === null) || (this.state.priceAdmin[0]?.level11 === "")) ? "-" : this.state.priceAdmin[0]?.level11) + " %/" + (((this.state.product[0]?.unit === null) || (this.state.product[0]?.unit === "")) ? "-" : this.state.product[0]?.unit)} </div></Col>
                                        : (member3.name === "level12") ? <Col xs={4} md={4} xl={4} id="solid-col-detail-b"><div id="price-list-product-detail3" > {(((this.state.priceAdmin[0]?.level12 === null) || (this.state.priceAdmin[0]?.level12 === "")) ? "-" : this.state.priceAdmin[0]?.level12) + " %/" + (((this.state.product[0]?.unit === null) || (this.state.product[0]?.unit === "")) ? "-" : this.state.product[0]?.unit)} </div></Col>
                                            : (member3.name === "level13") ? <Col xs={4} md={4} xl={4} id="solid-col-detail-b"><div id="price-list-product-detail3" > {(((this.state.priceAdmin[0]?.level13 === null) || (this.state.priceAdmin[0]?.level13 === "")) ? "-" : this.state.priceAdmin[0]?.level13) + " %/" + (((this.state.product[0]?.unit === null) || (this.state.product[0]?.unit === "")) ? "-" : this.state.product[0]?.unit)} </div></Col>
                                                : (member3.name === "level14") ? <Col xs={4} md={4} xl={4} id="solid-col-detail-b"><div id="price-list-product-detail3" > {(((this.state.priceAdmin[0]?.level14 === null) || (this.state.priceAdmin[0]?.level14 === "")) ? "-" : this.state.priceAdmin[0]?.level14) + " %/" + (((this.state.product[0]?.unit === null) || (this.state.product[0]?.unit === "")) ? "-" : this.state.product[0]?.unit)} </div></Col>
                                                    : (member3.name === "level15") ? <Col xs={4} md={4} xl={4} id="solid-col-detail-e"><div id="price-list-product-detail3" > {(((this.state.priceAdmin[0]?.level15 === null) || (this.state.priceAdmin[0]?.level15 === "")) ? "-" : this.state.priceAdmin[0]?.level15) + " %/" + (((this.state.product[0]?.unit === null) || (this.state.product[0]?.unit === "")) ? "-" : this.state.product[0]?.unit)} </div></Col>
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
        // routes = [
        //     {
        //         path: 'Product',
        //         breadcrumbName: 'สินค้า',
        //     },
        //     {
        //         breadcrumbName: this.state.product[0]?.catName,
        //     },
        //     {
        //         breadcrumbName: this.state.product[0]?.name,
        //     },
        // ];
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
                                {/* <PageHeader
                                    className="site-page-header"
                                    breadcrumb={{ routes }}
                                /> */}
                                <Breadcrumb separator=">">
                                    <Breadcrumb.Item><NavLink to="/Product">สินค้า</NavLink></Breadcrumb.Item>
                                    <Breadcrumb.Item><NavLink to={"/ProductList/" + this.state.product[0]?.catId + "/grid"}>{this.state.product[0]?.catName}</NavLink></Breadcrumb.Item>
                                    <Breadcrumb.Item>{this.state.product[0]?.name}</Breadcrumb.Item>
                                </Breadcrumb>
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
                                            {
                                                (this.state.productTemp.length > 1) ?
                                                    <>
                                                        <Col xs={10} md={5} xl={5}>
                                                            <div>ขนาด กว้าง x ยาว:</div>
                                                        </Col>
                                                        <Col xs={12} md={12} xl={12} id="detail-size">
                                                            <Select labelInValue onChange={this.handleChangeSize} id="input" style={{ width: "60%" }} placeholder="เลือกความกว้าง x ยาว">
                                                                <Option value="1220 x 2440">1220 x 2440</Option>
                                                                <Option value="1220 x 3050">1220 x 3050</Option>
                                                            </Select>
                                                        </Col>
                                                        <Col xs={2} md={7} xl={7} id="detail-size">
                                                        </Col>

                                                        <Col xs={10} md={5} xl={5}>
                                                            <div>ขนาด ความหนา:</div>
                                                        </Col>
                                                        <Col xs={12} md={12} xl={12} id="detail-size">
                                                            <Select labelInValue onChange={this.handleChangeMM} id="input" style={{ width: "60%" }} placeholder="เลือกความหนา">
                                                                <Option value="0.8 มม.">0.8 มม.</Option>
                                                                <Option value="1.0 มม.">1.0 มม.</Option>
                                                                <Option value="1.2 มม.">1.2 มม.</Option>
                                                                <Option value="1.5 มม.">1.5 มม.</Option>
                                                            </Select>
                                                        </Col>
                                                    </>
                                                    :
                                                    <>
                                                        <Col xs={10} md={5} xl={5}>
                                                            <div>ขนาด   :</div>
                                                        </Col>
                                                        <Col xs={12} md={12} xl={12} id="detail-size">
                                                            <div>{this.state.product[0]?.size}</div>
                                                        </Col>
                                                    </>
                                            }
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
                                                    <ShowMore
                                                        id="read"
                                                        lines={5}
                                                        more='Show more'
                                                        less='Show less'
                                                        anchorClass=''
                                                    >
                                                        {this.state.product[0]?.direction}
                                                    </ShowMore>
                                                    {/* <div>
                                                        {this.state.product[0]?.direction}
                                                    </div> */}
                                                </Col>
                                            </Col>
                                            <Col xs={24} md={24} xl={24} id="descript-Header1">รายละเอียดสินค้า</Col>
                                            <Col xs={24} md={24} xl={24}>
                                                <Col id="descrip-detail">
                                                    <ShowMore
                                                        id="read"
                                                        lines={5}
                                                        more='Show more'
                                                        less='Show less'
                                                        anchorClass=''
                                                    >
                                                        {this.state.product[0]?.detail}
                                                    </ShowMore>
                                                    {/* <div>
                                                        {this.state.product[0]?.detail}
                                                    </div> */}
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