import React, { Component } from "react";
import { Container, Image } from 'react-bootstrap';
import { Row, Space, Empty, Select, Col, Pagination, AutoComplete, Input, Spin } from 'antd';
import '../css/Profile.css';
import '../css/Product.css';
import axios from 'axios';
// import swal from 'sweetalert';
import Cookies from 'universal-cookie';
import ProductCardGrid from './Product/ProductCardGrid';
import ProductCardList from './Product/ProductCardList';
import { NavLink } from 'react-router-dom';

import grid from '../img/mode_grid.svg';
import list from '../img/mode_list.svg';
import swal from 'sweetalert';

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
            options: [],
            statusDataProduct: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.onChangePage = this.onChangePage.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.onSearchFild = this.onSearchFild.bind(this);
    }

    componentWillMount() {
        this.setState({
            token: cookies.get('token', { path: '/' }),
            user: cookies.get('user', { path: '/' }),
            mode: this.props.mode,
            page: 1,
            pageOld: 1,
            size: "12",
            sizeOld: "12",
            search: this.props.match.url.substring(20)
        });
    }

    async componentDidMount() {
        // var dataSearch = {};
        var url_product = "";
        if (this.state.token === "" || this.state.token === null || this.state.token === undefined ||
            this.state.user.levelId === "" || this.state.user.levelId === null || this.state.user.levelId === undefined) {
            // url_product = ip + "/Product/find/notauthorization/search/16/" + this.props.match.url.substring(20) + "/" + this.state.page + "/" + this.state.size;
            url_product = ip + "/Product/find/notauthorization/search2/";
            const dataSearch = {
                search: this.props.match.url.substring(20),
                page: this.state.page,
                size: this.state.size,
                levelId: 16
            }

            const product = await (await axios.post(url_product, dataSearch, { headers: { "token": this.state.token, "key": this.state.user?.username } })).data;
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

        } else {
            // url_product = ip + "/Product/find/authorization/search/" + this.props.match.url.substring(20) + "/" + this.state.page + "/" + this.state.size;
            url_product = ip + "/Product/find/authorization/search/";
            const dataSearch1 = {
                search: this.props.match.url.substring(20),
                page: this.state.page,
                size: this.state.size,
                levelId: 0
            }

            const product = await (await axios.post(url_product, dataSearch1, { headers: { "token": this.state.token, "key": this.state.user?.username } })).data;
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
        }

        // const product = await (await axios.post(url_product, { headers: { "token": this.state.token, "key": this.state.user?.username }, dataSearch })).data;
        // if ((product.statusCode === 500) || (product.statusCode === 400)) {
        //     swal("Error!", "เกิดข้อผิดพลาดในการเข้าสู่ระบบ \n กรุณาเข้าสู่ระบบใหม่", "error").then((value) => {
        //         this.setState({
        //             token: cookies.remove('token', { path: '/' }),
        //             user: cookies.remove('user', { path: '/' })
        //         });
        //         window.location.replace('/Login', false);
        //     });
        // } else {
        //     this.setState({
        //         product: product,
        //         statusDataProduct: true
        //     });
        // }

        const dataSearchCount = {
            search: this.props.match.url.substring(20)
        }
        var url_product_count = ip + "/Product/count/search/";
        const product_count = await (await axios.post(url_product_count, dataSearchCount)).data;
        this.setState({
            product_count: product_count[0].num
        });
    }

    async componentDidUpdate() {
        // if (this.props.props.match.params.size !== this.state.sizeOld) {  
        if ((this.state.size !== this.state.sizeOld) || (this.state.page !== this.state.pageOld) || (this.state.search !== this.props.match.url.substring(20))) {
            var page = 1;
            if (this.state.size <= this.state.product_count) {
                page = parseInt(this.state.page);
            }

            var size = parseInt(this.state.size);

            var url_product = "";
            // var dataSearch = {};
            if (this.state.token === "" || this.state.token === null || this.state.token === undefined ||
                this.state.user.levelId === "" || this.state.user.levelId === null || this.state.user.levelId === undefined) {
                // url_product = ip + "/Product/find/notauthorization/search/16/" + this.props.match.url.substring(20) + "/" + page + "/" + size;
                url_product = ip + "/Product/find/notauthorization/search2/";
                const dataSearch2 = {
                    search: this.props.match.url.substring(20),
                    page: page,
                    size: size,
                    levelId: 16
                }

                const product = await (await axios.post(url_product, dataSearch2, { headers: { "token": this.state.token, "key": this.state.user?.username } })).data;
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
                        pageOld: this.state.page,
                        search: this.props.match.url.substring(20)
                    });
                }
            } else {
                // url_product = ip + "/Product/find/authorization/search/" + this.props.match.url.substring(20) + "/" + page + "/" + size;
                url_product = ip + "/Product/find/authorization/search/";
                const dataSearch3 = {
                    search: this.props.match.url.substring(20),
                    page: page,
                    size: size,
                    levelId: 0
                }

                const product = await (await axios.post(url_product, dataSearch3, { headers: { "token": this.state.token, "key": this.state.user?.username } })).data;
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
                        pageOld: this.state.page,
                        search: this.props.match.url.substring(20)
                    });
                }
            }

            // const product = await (await axios.post(url_product, { headers: { "token": this.state.token, "key": this.state.user?.username } }, dataSearch)).data;
            // if ((product.statusCode === 500) || (product.statusCode === 400)) {
            //     swal("Error!", "เกิดข้อผิดพลาดในการเข้าสู่ระบบ \n กรุณาเข้าสู่ระบบใหม่", "error").then((value) => {
            //         this.setState({
            //             token: cookies.remove('token', { path: '/' }),
            //             user: cookies.remove('user', { path: '/' })
            //         });
            //         window.location.replace('/Login', false);
            //     });
            // } else {
            //     this.setState({
            //         product: product,
            //         sizeOld: this.state.size,
            //         pageOld: this.state.page,
            //         search: this.props.match.url.substring(20)
            //     });
            // }

            const dataSearchCount = {
                search: this.props.match.url.substring(20)
            }
            var url_product_count = ip + "/Product/count/search/";
            const product_count = await (await axios.post(url_product_count, dataSearchCount)).data;
            this.setState({
                product_count: product_count[0].num
            });
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
    }

    onChangePage(page, pageSize) {
        this.setState({
            page: page
        });
    }

    onSearch(value) {
        if (value !== "") {
            this.props.history.push("/SearchProduct/grid/" + value);
        }
    }

    async onSearchFild(value) {
        if (value !== "") {
            var url_wordsearch = ip + "/Product/find/wordsearch/" + value;
            const wordsearch = await (await axios.get(url_wordsearch)).data;
            this.setState({
                options: wordsearch
            });
        } else {
            this.setState({
                options: []
            });
        }
    }

    render() {
        return (
            <Container fluid>
                {window.innerWidth < 684 ?
                    <Row id="row-search">
                        <AutoComplete
                            style={{ width: "70%" }}
                            options={this.state.options}
                            filterOption={(inputValue, option) =>
                                option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                            }
                            onSearch={this.onSearchFild}
                        >
                            <Input.Search style={{ width: '100%' }} placeholder="ค้นหา" onSearch={this.onSearch} />
                        </AutoComplete>
                    </Row>
                    :
                    <></>
                }
                <Row id="Row-Product-Search">
                    ค้นหาคำว่า "{this.props.match.url.substring(20)}" จำนวน {this.state.product_count} รายการ
                </Row>
                <Row id="Row-Product">
                    <Col xs={12} md={12} lg={12}>
                        {this.props.match.params.mode === "grid" ?
                            <Space>
                                <NavLink to={"/SearchProduct/grid/" + this.props.match.url.substring(20)}>
                                    <div style={{ border: "10px solid #DA213D", backgroundColor: "#DA213D" }}>
                                        <Image src={grid} />
                                    </div>
                                </NavLink >
                                <NavLink to={"/SearchProduct/list/" + this.props.match.url.substring(20)}>
                                    <div style={{ border: "10px solid #707070", backgroundColor: "#707070" }}>
                                        <Image src={list} />
                                    </div>
                                </NavLink>
                            </Space>
                            :
                            <Space>
                                <NavLink to={"/SearchProduct/grid/" + this.props.match.url.substring(20)}>
                                    <div style={{ border: "10px solid #707070", backgroundColor: "#707070" }}>
                                        <Image src={grid} />
                                    </div>
                                </NavLink >
                                <NavLink to={"/SearchProduct/list/" + this.props.match.url.substring(20)}>
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

                            {this.props.match.params.mode === "grid" ?

                                <Select defaultValue={this.state.size} style={{ width: 60 }} onChange={this.handleChange}>
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
                            <Row id="Row-Product-img">
                                {this.state.product.length > 0 ?
                                    this.props.match.params.mode === "grid" ? this.grid_product() : this.list_product()
                                    :
                                    <Col xs={24} md={24} lg={24} id="rowempty">
                                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                                    </Col>
                                }
                            </Row>
                            <Row id="product-footer-page-search">
                                <Pagination size="small" current={this.state.page} pageSize={this.state.size} total={this.state.product_count} onChange={this.onChangePage} />
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