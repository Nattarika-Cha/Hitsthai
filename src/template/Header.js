import React, { Component } from 'react';
import '../css/Header.css';
import { Row, Col, Avatar, Select, Input, Menu, Dropdown } from 'antd';
import { Container, Image } from 'react-bootstrap';
import { UserOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import logo from '../img/logo.png'
import Cookies from 'universal-cookie';


var ip_img_profile = "http://128.199.198.10/API/profile/";
var img_profile = "";
const cookies = new Cookies();

const { Option } = Select;
const menu = (
    <Menu>
        <Menu.Item key="0">
            <NavLink to="/Login" id="sub-icon-profile" >เข้าสู่ระบบ</NavLink >
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="1">
            <NavLink to="/Register" id="sub-icon-profile" >สมัครสมาชิก</NavLink >
        </Menu.Item>
    </Menu>
);
const menuuser = (
    <Menu>
        <Menu.Item key="0">
            <NavLink to="/Profile" id="sub-icon-profile" >แก้ไขโปรไฟล์</NavLink >
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="1">
            <NavLink to="/Changepass" id="sub-icon-profile" >เปลี่ยนรหัสผ่าน</NavLink >
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="2">
            <NavLink to="/Logout" id="sub-icon-profile" >ออกจากระบบ</NavLink >
        </Menu.Item>
    </Menu>
);
export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: "",
            user: []
        }
    }

    componentWillMount() {
        this.setState({
            token: cookies.get('token', { path: '/' }),
            user: cookies.get('user', { path: '/' })
        });

        img_profile = ip_img_profile + this.state.user.img;
    }

    render() {
        // img_profile = ip_img_profile + this.state.user.img;
        console.log(this.state.user, " this.state.user")
        console.log(img_profile, " img_profile")
        return (
            // <div>
            <Container fluid>
                <div id="header-frist">

                    <Row>
                        <Col xs={6} xl={6}>
                            <img
                                src={logo}
                                width="110px"
                                height="auto"
                                className="d-inline-block align-top"
                                alt="React Bootstrap logo"
                                style={{ paddingBottom: "0.3%", paddingTop: "0.3%" }}
                            />
                        </Col>
                        <Col xs={12} xl={12} id="col-Headder-center">
                            <Select
                                showSearch
                                style={{ width: 180 }}
                                placeholder="สินค้าทั้งหมด"
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                filterSort={(optionA, optionB) =>
                                    optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                }
                            >
                                <Option value="1">Not Identified</Option>
                                <Option value="2">Closed</Option>
                                <Option value="3">Communicated</Option>
                                <Option value="4">Identified</Option>
                                <Option value="5">Resolved</Option>
                                <Option value="6">Cancelled</Option>
                            </Select>
                            <Input.Search allowClear style={{ width: '50%' }} placeholder="ค้นหา" />
                        </Col>
                        <Col xs={6} xl={6} style={{ textAlign: "end" }}>
                            <strong style={{ paddingRight: "15%" }}> TH | EN </strong>
                            {
                                (this.state.token === "" || this.state.token === null || this.state.token === undefined)?
                                    <Dropdown overlay={menu} trigger={['click']} placement="bottomRight" arrow>
                                        <Avatar size="large" icon={<UserOutlined />} id="img-profile-avatar"/>
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
                </div>
            </Container>
        )
    }
}