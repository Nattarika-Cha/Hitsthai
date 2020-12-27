import React, { Component } from "react";
import { Container, } from 'react-bootstrap';
import { Row, Col, Descriptions, PageHeader, } from 'antd';
import '../../css/ProductDetail.css';
import ImageGallery from 'react-image-gallery';
import { CheckCircleTwoTone, CloseCircleTwoTone, ShoppingTwoTone } from '@ant-design/icons';
import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
var ip = "http://localhost:5000";
// var ip_img_profile = "http://128.199.198.10/API/profile/";

const images = [
    {
        original: 'https://picsum.photos/id/1018/1000/600/',
        thumbnail: 'https://picsum.photos/id/1018/250/150/',
    },
    {
        original: 'https://picsum.photos/id/1015/1000/600/',
        thumbnail: 'https://picsum.photos/id/1015/250/150/',
    },
    {
        original: 'https://picsum.photos/id/1019/1000/600/',
        thumbnail: 'https://picsum.photos/id/1019/250/150/',
    },
];

var routes = [];

export default class Abount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: "",
            user: [],
            product: [],
            productId: "",
            caution: []
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
        var url_product = ip + "/Product/find/byproduct/id/" + this.props.match.params.productId;
        const product = await (await axios.get(url_product)).data;
        this.setState({
            product: product
        });

        console.log(this.state.product[0]?.caution, " eeeeee");
        if (this.state.product[0]?.caution !== null && this.state.product[0]?.caution !== "") {
            this.setState({
                caution: this.state.product[0]?.caution.split("-")
            });
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
                            <ImageGallery items={images} />
                        </Col>
                        <Col xs={24} md={24} xl={12}>
                            <Row id="Row-List">
                                <Col xs={10} md={5} xl={5}>
                                    <div>ราคา   :</div>
                                </Col>
                                <Col xs={12} md={12} xl={12} id="detial">
                                    <div>-</div>
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
                                    <Row>
                                        <Col id="col-icon">
                                            <div className="icons-list" id="icon">
                                                <ShoppingTwoTone twoToneColor="#4A85DE"/>
                                            </div>
                                        </Col>
                                        <Col id="color-product2">
                                            <div>สั่งสินค้าล่วงหน้า</div>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row id="dercript">
                                <div>
                                    {this.state.product[0]?.direction}
                                </div>
                            </Row>
                        </Col>
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
                        <Descriptions.Item label="ขั้นตอนการปฐมพยาบาล" span={2}>{this.state.product[0]?.firstaidprocedure}</Descriptions.Item>
                    </Descriptions>
                </Col>

            </Container>
        )

    }
}