import React, { Component } from 'react';
import '../css/Header.css';
import '../css/Sidebar.css';
import { Row, Col, Menu, Empty, Collapse, Avatar, Image } from 'antd';
import { MenuOutlined, UserOutlined, CaretRightOutlined, PhoneOutlined } from '@ant-design/icons';
import { Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { FiAlignJustify } from "react-icons/fi";
import Sidebar from "react-sidebar";
// import SidebarContent from "./Sidebar";
import disableScroll from 'disable-scroll';
import logo from '../img/logo3.svg';

const { Panel } = Collapse;

const { SubMenu } = Menu;


// const menu = (
//     <Menu>
//         <Menu.ItemGroup title="Group title">
//             <Menu.Item icon={<UserOutlined />}>1st menu item</Menu.Item>
//             <Menu.Item>2nd menu item</Menu.Item>
//         </Menu.ItemGroup>
//         <SubMenu title="sub menu">
//             <Menu.Item>3rd menu item</Menu.Item>
//             <Menu.Item>4th menu item</Menu.Item>
//         </SubMenu>
//         <SubMenu title="disabled sub menu" disabled>
//             <Menu.Item>5d menu item</Menu.Item>
//             <Menu.Item>6th menu item</Menu.Item>
//         </SubMenu>
//     </Menu>
// );

const active = { color: "rgb(255 255 255)", backgroundColor: "#DA213D", borderRadius: "10mm", marginTop: "0.7%", marginBottom: "0.7%" };
const cookies = new Cookies();

var ip = "http://localhost:5000";
var ip_img_profile = "http://128.199.198.10/API/profile/";
var widthSideber = "";
var heightSideber = "";
export default class Header2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: "",
            user: [],
            catalog: [],
            sidebarOpen: false
        }

        this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    }

    onSetSidebarOpen(open) {
        (open) ? disableScroll.on() : disableScroll.off()
        this.setState({ sidebarOpen: open });
    }


    componentWillMount() {
        this.setState({
            token: cookies.get('token', { path: '/' }),
            user: cookies.get('user', { path: '/' })
        });
    }

    async componentDidMount() {
        var url_catalog = ip + "/Catalog/find/all";
        const catalog = await (await axios.get(url_catalog)).data;
        this.setState({
            catalog: catalog
        });
    }

    tab_product() {
        return this.state.catalog.map((cat) => {
            return <Menu.Item key={cat.catId} id="cat-option"><NavLink to={"/ProductList/" + cat.catId + "/grid"}>{cat.catName}</NavLink></Menu.Item>
        });
    }

    tab_product_mobile() {
        return this.state.catalog.map((cat) => {
            return <div id="cat-content"><NavLink to={"/ProductList/" + cat.catId + "/grid"} id="sub-cat" onClick={() => this.onSetSidebarOpen(false)}> <CaretRightOutlined style={{ paddingRight: "1%" }} /> {cat.catName}</NavLink></div>
        });
    }

    render() {
        widthSideber = (window.innerWidth * 80 / 100) + "px";
        heightSideber = window.innerHeight + "px";
        // window.addEventListener("click", function (e) {
        //     if (window.location.pathname === "/Home" || window.location.pathname === "/") {
        //         console.log("testtttt")
        //         sty_home = { color: "rgb(255 255 255)", backgroundColor: "#DA213D", borderRadius: "10mm" };
        //     }
        //     else 
        //     {
        //         sty_home = {};
        //     }
        //     console.log(window.location.pathname, " window.location.pathname Head2");
        // });
        // console.log(window.location.pathname, " window.location.pathname Head222222");

        // var sty_home;
        // if (window.location.pathname === "/Home" || window.location.pathname === "/") {
        //     sty_home = active;
        // }
        return (
            <Container fluid>
                <div id="header-frist2">
                    {window.innerWidth >= 684 ?
                        <Row>
                            <Col xs={6} xl={6} id="col-Headder-center2">
                                <Menu
                                    // onClick={this.handleClick}
                                    style={{ width: 360, lineHeight: "inherit", fontSize: "medium", color: "#000000" }}
                                    // defaultSelectedKeys={['1']}
                                    // defaultOpenKeys={['sub1']}
                                    mode="horizontal"
                                >
                                    <SubMenu key="sub1" icon={<MenuOutlined style={{display: "inline-flex"}}/>} title="ประเภทสินค้าทั้งหมด">
                                        {this.state.catalog.length > 0 ?
                                            this.tab_product()
                                            :
                                            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                                        }
                                    </SubMenu>
                                </Menu>
                            </Col>
                            <Col xs={12} xl={12} id="col-Headder-center4" >
                                <NavLink to="/Home" id="nav-Header" activeStyle={active} style={{fontSize: "medium" , color: "#000000"}}>หน้าแรก</NavLink >
                                <NavLink to="/Abount" id="nav-Header" activeStyle={active} style={{fontSize: "medium" , color: "#000000"}}>เกี่ยวกับ</NavLink>
                                <NavLink to="/Product" id="nav-Header" activeStyle={active} style={{fontSize: "medium" , color: "#000000"}}>สินค้า</NavLink>
                                <NavLink to="/Contact" id="nav-Header" activeStyle={active} style={{fontSize: "medium" , color: "#000000"}}>ติดต่อเรา</NavLink>
                            </Col>
                            <Col xs={6} xl={6} id="col-Headder-center3">
                                <div style={{fontSize: "medium", color: "#000000", paddingTop:"1%"}}><PhoneOutlined rotate={90} style={{display:"inline-flex", color: "#000000", marginRight:"2%", paddingTop:"0%"}}/>Call us : 090-543-6000</div>
                            </Col>
                        </Row>
                        :
                        <Container fluid>
                            {/* <Dropdown overlay={menu}>
                                <FiAlignJustify style={{ fontSize: 40 }} />
                            </Dropdown> */}
                            <Sidebar
                                sidebar={<div>
                                    <Row id="div-sidebar1">
                                        <img
                                            src={logo}
                                            width="19%"
                                            height="auto"
                                            className="d-inline-block align-top"
                                            alt="React Bootstrap logo"
                                            style={{ paddingBottom: "0.9%", paddingTop: "0.9%" }}
                                        />
                                    </Row>
                                    {
                                        (this.state.token === "" || this.state.token === null || this.state.token === undefined) ?
                                            <>
                                                <Row id="div-sidebar2">
                                                    <Col xs={4}><Avatar size="large" icon={<UserOutlined />} id="img-profile-avatar" /></Col>
                                                    <Col xs={20} style={{ paddingLeft: "5%", whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden", fontSize:"Medium", marginTop:"5%" }}>สวัสดี</Col>
                                                </Row>
                                                <Row id="div-sidebar3">
                                                    <NavLink to="/Login" id="div-sidebar3" onClick={() => this.onSetSidebarOpen(false)} >เข้าสู่ระบบ</NavLink >
                                                </Row>
                                            </>
                                            :
                                            <>
                                                <Row id="div-sidebar2">
                                                    <Col xs={4}><Image src={ip_img_profile + this.state.user.img} alt="imgProfile" id="img-profile" style={{ borderRadius: "50%" }} fluid responsive /></Col>
                                                    <Col xs={20} style={{ paddingLeft: "2%", whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden", marginTop: "1.5%" }}>{this.state.user?.name}</Col>
                                                </Row>
                                                <Row id="div-sidebar3">
                                                    {/* <Col xs={11} id="col-sidbar3"><NavLink to="/MemberPoint" id="div-sidebar3" onClick={() => this.onSetSidebarOpen(false)} >Point</NavLink ></Col>
                                                    <Col xs={1} id="col-sidbar3-k">|</Col>
                                                    <Col xs={12} id="col-sidbar3"><NavLink to="/Profile" id="div-sidebar3" onClick={() => this.onSetSidebarOpen(false)} >แก้ไขโปรไฟล์</NavLink ></Col>

                                                    <Col xs={11} id="col-sidbar3"><NavLink to="/Changepass" id="div-sidebar3" onClick={() => this.onSetSidebarOpen(false)} >เปลี่ยนรหัสผ่าน</NavLink ></Col>
                                                    <Col xs={1} id="col-sidbar3-k">|</Col>
                                                    <Col xs={12} id="col-sidbar3"><NavLink to="/Logout" id="div-sidebar3" onClick={() => this.onSetSidebarOpen(false)} >ออกจากระบบ</NavLink ></Col> */}
                                                </Row>
                                            </>
                                    }
                                    <hr width="90%" size="2" />
                                    <Row id="div-sidebar4">
                                        <Collapse expandIcon={() => <UserOutlined />} >
                                            <Panel showArrow={false} header="ประเภทสินค้า" key="1" style={{fontSize:"Medium", backgroundColor: "#ffffff"}}>
                                                {this.state.catalog.length > 0 ?
                                                    this.tab_product_mobile()
                                                    :
                                                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                                                }
                                            </Panel>
                                        </Collapse>
                                    </Row>
                                    <NavLink to="/Home" onClick={() => this.onSetSidebarOpen(false)}><Row id="div-sidebar5"> หน้าหลัก</Row></NavLink>
                                    <NavLink to="/Abount" onClick={() => this.onSetSidebarOpen(false)}><Row id="div-sidebar5">เกี่ยวกับ</Row></NavLink>
                                    <NavLink to="/Product" onClick={() => this.onSetSidebarOpen(false)}><Row id="div-sidebar5">สินค้า</Row></NavLink>
                                    <NavLink to="/Contact" onClick={() => this.onSetSidebarOpen(false)}><Row id="div-sidebar5">ติดต่อเรา</Row></NavLink>
                                    {
                                        (this.state.token === "" || this.state.token === null || this.state.token === undefined) ?
                                            <>
                                            </>
                                            :
                                            <>
                                                <Row id="div-sidebar7">
                                                    <Collapse expandIcon={() => <UserOutlined />} >
                                                        <Panel showArrow={false} header="ตั้งค่า" key="1" style={{fontSize:"Medium", backgroundColor: "#ffffff"}}>
                                                            <div id="cat-content"><NavLink to="/MemberPoint" id="sub-cat" onClick={() => this.onSetSidebarOpen(false)}> <CaretRightOutlined style={{ paddingRight: "1%" }} /> Point</NavLink></div>
                                                            <div id="cat-content"><NavLink to="/Profile" id="sub-cat" onClick={() => this.onSetSidebarOpen(false)}> <CaretRightOutlined style={{ paddingRight: "1%" }} /> แก้ไขโปรไฟล์</NavLink></div>
                                                            <div id="cat-content"><NavLink to="/Changepass" id="sub-cat" onClick={() => this.onSetSidebarOpen(false)}> <CaretRightOutlined style={{ paddingRight: "1%" }} /> เปลี่ยนรหัสผ่าน</NavLink></div>
                                                            <div id="cat-content"><NavLink to="/Logout" id="sub-cat" onClick={() => this.onSetSidebarOpen(false)}> <CaretRightOutlined style={{ paddingRight: "1%" }} /> ออกจากระบบ</NavLink></div>
                                                        </Panel>
                                                    </Collapse>
                                                </Row>
                                            </>
                                    }
                                    {/* <Row id="div-sidebar6">
                                        <div>TH | EN</div>
                                    </Row> */}
                                </div>}
                                // docked= {true}
                                sidebarClassName="custom-sidebar-class"
                                contentId="custom-sidebar-content-id"
                                open={this.state.sidebarOpen}
                                onSetOpen={this.onSetSidebarOpen}
                                touch={true}
                                shadow={true}
                                pullRight={false}
                                touchHandleWidth={20}
                                dragToggleDistance={30}
                                transitions={true}
                                styles={{ sidebar: { background: "white", width: widthSideber, height: heightSideber, zIndex: "10", position: "inherit" } }}
                            >
                                <FiAlignJustify style={{ fontSize: 25, color: "aliceblue", marginLeft: "2%",marginTop: "2%" }} onClick={() => this.onSetSidebarOpen(true)} />
                            </Sidebar>
                        </Container>
                    }
                </div>
            </Container>
        )
    }
}