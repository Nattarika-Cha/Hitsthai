import React, { Component } from "react";
import { NavLink } from 'react-router-dom';
import '../css/Sidebar.css';
import '../css/Header.css';
import { Row, Col, Avatar, Collapse } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import logo from '../img/logo3.svg';
import { withRouter } from "react-router-dom";

const { Panel } = Collapse;

export default withRouter(class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div>
                <Row id="div-sidebar1">
                    <img
                        src={logo}
                        width="25%"
                        height="auto"
                        className="d-inline-block align-top"
                        alt="React Bootstrap logo"
                        style={{ paddingBottom: "0.9%", paddingTop: "0.9%" }}
                    />
                </Row>
                <Row id="div-sidebar2">
                    <Col xs={4}><Avatar size="large" icon={<UserOutlined />} id="img-profile-avatar" /></Col>
                    <Col xs={20} style={{ paddingLeft: "2%", paddingTop: "2%" }}>สวัสดี</Col>
                </Row>
                <Row id="div-sidebar3">
                    <NavLink to="/Login" id="div-sidebar3" >เข้าสู่ระบบ</NavLink >
                </Row>
                <Row id="div-sidebar3">
                    <Col xs={7} id="col-sidbar3"><NavLink to="/Profile" id="div-sidebar3" >แก้ไขโปรไฟล์</NavLink ></Col>
                    <Col xs={1} id="col-sidbar3-k">|</Col>
                    <Col xs={8} id="col-sidbar3"><NavLink to="/Changepass" id="div-sidebar3" >เปลี่ยนรหัสผ่าน</NavLink ></Col>
                    <Col xs={1} id="col-sidbar3-k">|</Col>
                    <Col xs={7} id="col-sidbar3"><NavLink to="/Logout" id="div-sidebar3" >ออกจากระบบ</NavLink ></Col>
                </Row>
                <hr width="90%" size="3" />
                <Row id="div-sidebar5">
                    <Collapse id="div-sidebar5" expandIcon={() => <UserOutlined />} >
                        <Panel showArrow={false} header="ประเภทสินค้า" key="1">
                            <div>testttttttttttttt</div>
                        </Panel>
                    </Collapse>
                </Row>
                <NavLink to="/Home"><Row id="div-sidebar5"> หน้าหลัก</Row></NavLink>
                <NavLink to="/Abount"><Row id="div-sidebar5">เกี่ยวกับ</Row></NavLink>
                <NavLink to="/Product"><Row id="div-sidebar5">สินค้า</Row></NavLink>
                <NavLink to="/Contact"><Row id="div-sidebar5">ติดต่อเรา</Row></NavLink>
                <Row id="div-sidebar6">
                    <div>TH | EN</div>
                </Row>
            </div>
        )
    }
})

