import React, { Component } from "react";
import { Container, Image } from 'react-bootstrap';
import { Row, Space, Empty, Select, Col, Pagination, Spin } from 'antd';
import '../../css/Profile.css';
import axios from 'axios';
// import swal from 'sweetalert';
import Cookies from 'universal-cookie';
import ProductCardGrid from './ProductCardGrid';
import ProductCardList from './ProductCardList';
import { NavLink } from 'react-router-dom';
import swal from 'sweetalert';
import grid from '../../img/mode_grid.svg';
import list from '../../img/mode_list.svg';

const cookies = new Cookies();
const { Option } = Select;

var ip = "http://localhost:5000";
// var ip_img_profile = "http://128.199.198.10/API/profile/";

export default class ProductTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: "",
            user: [],
            // catId: "",
            // mode: "",
            page: "",
            pageOld: "",
            size: "12",
            sizeOld: "",
            product_count: 0,
            product: [],
            statusDataProduct: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.onChangePage = this.onChangePage.bind(this);
    }

    componentWillMount() {
        this.setState({
            token: cookies.get('token', { path: '/' }),
            user: cookies.get('user', { path: '/' }),
            // catId: this.props.catId,
            mode: this.props.mode,
            page: 1,
            pageOld: 1,
            size: "12",
            sizeOld: "12"
        });

    }

    async componentDidMount() {
        var url_product = "";
        if (this.state.token === "" || this.state.token === null || this.state.token === undefined ||
            this.state.user.levelId === "" || this.state.user.levelId === null || this.state.user.levelId === undefined) {
            url_product = ip + "/Product/find/notauthorization/" + this.props.catId + "/16/" + this.state.page + "/" + this.state.size;
        } else {
            url_product = ip + "/Product/find/authorization/" + this.props.catId + "/" + this.state.page + "/" + this.state.size;
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
                product: product,
                statusDataProduct: true
            });
        }

        var url_product_count = ip + "/Product/count/all/" + this.props.catId;
        const product_count = await (await axios.get(url_product_count)).data;
        this.setState({
            product_count: product_count[0].num
        });
    }

    async componentDidUpdate() {
        if (this.props.props.match.params.size !== this.state.sizeOld) {
            if ((this.state.size !== this.state.sizeOld) || (this.state.page !== this.state.pageOld)) {
                var page = 1;
                if (this.state.size <= this.state.product_count) {
                    page = parseInt(this.state.page);
                }

                var size = parseInt(this.state.size);
                var catId = this.props.catId;
                // var url_product = ip + "/Product/find/id/" + catId + "/" + page + "/" + size;
                var url_product = "";
                if (this.state.token === "" || this.state.token === null || this.state.token === undefined ||
                    this.state.user.levelId === "" || this.state.user.levelId === null || this.state.user.levelId === undefined) {
                    url_product = ip + "/Product/find/notauthorization/" + catId + "/16/" + page + "/" + size;
                } else {
                    url_product = ip + "/Product/find/authorization/" + catId + "/" + page + "/" + size;
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
                        product: product,
                        sizeOld: this.state.size,
                        pageOld: this.state.page
                    });
                }
                // const product = await (await axios.get(url_product)).data;
                // this.setState({
                //     product: product,
                //     sizeOld: this.state.size,
                //     pageOld: this.state.page
                // });
            }
        }
    }

    grid_product() {
        return this.state.product.map((product) => {
            return <ProductCardGrid product={product} />
        });
    }

    list_product() {
        return this.state.product.map((product) => {
            return <ProductCardList product={product} />
        });
    }

    async handleChange(value, option) {
        this.setState({
            size: value
        });
        // console.log(value , " value");
        // console.log(option , " option");
    }

    onChangePage(page, pageSize) {
        this.setState({
            page: page
        });
        // console.log(page, " page");
        // console.log(pageSize, " pageSize");
    }

    render() {
        // console.log(this.props.catId, " this.props.catId");
        // console.log(this.props.props.match.params.size, "  this.props.match.params.size");
        return (
            <Container fluid>
                <Row>
                    <Col xs={12} md={12} lg={12}>
                        {this.props.mode === "grid" ?
                            <Space>
                                <NavLink to={"/ProductList/" + this.props.props.match.params.catid + "/grid"}>
                                    <div style={{ border: "10px solid #DA213D", backgroundColor: "#DA213D" }}>
                                        <Image src={grid} />
                                    </div>
                                </NavLink >
                                <NavLink to={"/ProductList/" + this.props.props.match.params.catid + "/list"}>
                                    <div style={{ border: "10px solid #707070", backgroundColor: "#707070" }}>
                                        <Image src={list} />
                                    </div>
                                </NavLink>
                            </Space>
                            :
                            <Space>
                                <NavLink to={"/ProductList/" + this.props.props.match.params.catid + "/grid"}>
                                    <div style={{ border: "10px solid #707070", backgroundColor: "#707070" }}>
                                        <Image src={grid} />
                                    </div>
                                </NavLink >
                                <NavLink to={"/ProductList/" + this.props.props.match.params.catid + "/list"}>
                                    <div style={{ border: "10px solid #DA213D", backgroundColor: "#DA213D" }}>
                                        <Image src={list} />
                                    </div>
                                </NavLink>
                            </Space>
                        }
                    </Col>
                    <Col xs={12} md={12} lg={12} id="product-tab-headerbar-end">
                        <Space>
                            <b>จำนวน</b>

                            {this.props.mode === "grid" ?

                                <Select defaultValue={this.state.size} style={{ width: 60 }} onChange={this.handleChange}>
                                    {/* {(() => { console.log(this.state.size, " tesstttst") })()} */}
                                    <Option value="12">12</Option>
                                    <Option value="24">24</Option>
                                    <Option value="36">36</Option>
                                </Select>
                                :
                                <Select defaultValue={this.state.size} style={{ width: 60 }} onChange={this.handleChange}>
                                    <Option value="12">12</Option>
                                    <Option value="24">24</Option>
                                    <Option value="36">36</Option>
                                </Select>
                            }
                        </Space>
                    </Col>
                </Row>

                {
                    (this.state.statusDataProduct) ?
                        <>
                            <Row style={{marginLeft: "4%", marginRight: "4%"}}>

                                {this.state.product.length > 0 ?
                                    this.props.mode === "grid" ? this.grid_product() : this.list_product()
                                    :
                                    <Col xs={24} md={24} lg={24} id="rowempty">
                                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                                    </Col>
                                }
                            </Row>
                            <Row id="product-footer-page">
                                <Pagination
                                    size="small"
                                    current={this.state.page}
                                    pageSize={this.state.size}
                                    total={this.state.product_count}
                                    onChange={this.onChangePage}
                                // responsive={true} 
                                // showTitle={false} 
                                // showSizeChanger 
                                // showQuickJumper
                                />
                            </Row>
                        </>
                        :
                        <Row id="row-spin-slide">
                            <Spin size="large" />
                        </Row>
                }
            </Container>
        )
    }
}