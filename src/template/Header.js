import React, { Component } from 'react';
import '../css/Header.css';
import { Row, Col, Avatar, Input, Menu, Dropdown, AutoComplete } from 'antd';
import { Container, Image } from 'react-bootstrap';
import { UserOutlined, SearchOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import logo from '../img/logo3.svg';
import axios from 'axios';
import Cookies from 'universal-cookie';
// import { useHistory } from "react-router-dom";
import { withRouter } from "react-router-dom";

var ip = "http://localhost:5000";
var ip_img_profile = "http://128.199.198.10/API/profile/";
// var img_profile = "";
const cookies = new Cookies();

// const { Option } = Select;
const menu = (
    <Menu>
        <Menu.Item key="0">
            <NavLink to="/Login" id="sub-icon-profile" >เข้าสู่ระบบ</NavLink >
        </Menu.Item>
        {/* <Menu.Divider />
        <Menu.Item key="1">
            <NavLink to="/Register" id="sub-icon-profile" >สมัครสมาชิก</NavLink >
        </Menu.Item> */}
    </Menu>
);
const menuuser = (
    <Menu>
        <Menu.Item key="0">
            <NavLink to="/MemberPoint" id="sub-icon-profile" style={{fontSize: "16px"}}>Point</NavLink >
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="1">
            <NavLink to="/Profile" id="sub-icon-profile" style={{fontSize: "16px"}}>แก้ไขโปรไฟล์</NavLink >
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="2">
            <NavLink to="/Changepass" id="sub-icon-profile" style={{fontSize: "16px"}}>เปลี่ยนรหัสผ่าน</NavLink >
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="3">
            <NavLink to="/Logout" id="sub-icon-profile" style={{fontSize: "16px"}}>ออกจากระบบ</NavLink >
        </Menu.Item>
    </Menu>
);

export default withRouter(class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: "",
            user: [],
            catalog: [],
            catId: "0",
            options: [
                // { value: 'Burns Bay Road' },
                // { value: 'Downing Street' },
                // { value: 'Wall Street' },
            ]
        }

        // this.handleChange = this.handleChange.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.onSearchFild = this.onSearchFild.bind(this);
    }

    componentWillMount() {
        this.setState({
            token: cookies.get('token', { path: '/' }),
            user: cookies.get('user', { path: '/' })
        });


        // img_profile = ip_img_profile + this.state.user.img;
    }

    // async componentDidMount() {
    //     var url_catalog = ip + "/Catalog/find/all";
    //     const catalog = await (await axios.get(url_catalog)).data;
    //     this.setState({
    //         catalog: catalog
    //     });
    // }

    // tab_product() {
    //     return this.state.catalog.map((cat) => {
    //         return <Option value={cat.catId}>{cat.catName}</Option>
    //     });
    // }

    // handleChange(value) {
    //     this.setState({
    //         catalog: value
    //     });
    // }

    onSearch(value) {
        if (value !== "") {
            this.props.history.push("/SearchProduct/grid/" + value);
        }
    }

    // onChange(value) {
    //     console.log(value.target.value, " value");
    //     options = [
    //         { value: 'Burns Bay Road' },
    //         { value: 'Downing Street' },
    //         { value: 'Wall Street' },
    //     ];
    // }

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
        console.log(this.state.user, " userrrr");
        // img_profile = ip_img_profile + this.state.user.img;
        // console.log(this.state.user, " this.state.user")
        // console.log(img_profile, " img_profile")
        return (
            // <div>
            <Container fluid>
                <div id="header-frist">
                    {window.innerWidth >= 684 ?
                        <Row>
                            <Col xs={6} xl={6}>
                                <img
                                    src={logo}
                                    width="90px"
                                    height="auto"
                                    className="d-inline-block align-top"
                                    alt="React Bootstrap logo"
                                    style={{ paddingBottom: "0.3%", paddingTop: "1%" }}
                                />
                            </Col>
                            <Col xs={12} xl={12} id="col-Headder-center">
                                {/* <Select
                                // showSearch
                                defaultValue="0"
                                style={{ width: 180 }}
                                placeholder="สินค้าทั้งหมด"
                                optionFilterProp="children"
                                onChange={this.handleChange}
                            // filterOption={(input, option) =>
                            //     option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            // }
                            // filterSort={(optionA, optionB) =>
                            //     optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                            // }
                            >
                                <Option value="0">สินค้าทั้งหมด</Option>
                                {this.state.catalog.length > 0 ?
                                    this.tab_product()
                                    :
                                    <></>
                                }
                            </Select> */}
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
                                {/* <Input.Search allowClear style={{ width: '70%' }} placeholder="ค้นหา" onSearch={this.onSearch} /> */}
                            </Col>
                            <Col xs={4} xl={5} style={{ textAlign: "end", whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}>
                                {/* <strong style={{ paddingRight: "15%" }}> TH | EN </strong> */}
                                <span style={{ paddingRight: "5%" }}> {this.state.user?.name}</span>
                            </Col>
                            <Col xs={2} xl={1} style={{ textAlign: "end" }}>
                                {/* <strong style={{ paddingRight: "15%" }}> TH | EN </strong> */}
                                {/* <span style={{ paddingRight: "5%" }}> {this.state.user?.name}</span> */}
                                {
                                    (this.state.token === "" || this.state.token === null || this.state.token === undefined) ?
                                        <Dropdown overlay={menu} trigger={['click']} placement="bottomRight" arrow>
                                            <Avatar size="large" icon={<UserOutlined />} id="img-profile-avatar" />
                                        </Dropdown>
                                        :
                                        <Dropdown overlay={menuuser} trigger={['click']} placement="bottomRight" arrow>
                                            {/* <> */}
                                            {/* <Avatar size="large" icon={<UserOutlined />} /> */}
                                            <Image src={ip_img_profile + this.state.user.img} alt="imgProfile" id="img-profile" fluid responsive />
                                            {/* </> */}
                                            {/* <img src={ip_img_profile + this.state.user.img} /> */}
                                        </Dropdown>
                                }
                            </Col>
                        </Row>
                        :
                        <Row id="header-frist-mobile">
                            <img
                                src={logo}
                                width="25%"
                                height="25%"
                                className="d-inline-block align-top"
                                alt="React Bootstrap logo"
                                style={{ paddingBottom: "0.9%", paddingTop: "0.9%" }}
                            />
                            <NavLink to="/SearchProduct/grid"><SearchOutlined id="icon-search"/></NavLink>
                        </Row>
                    }
                </div>
            </Container>
        )
    }
})