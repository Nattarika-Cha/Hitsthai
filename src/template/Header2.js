import React, { Component } from 'react';
import '../css/Header.css';
import { Row, Col, Menu, Empty } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';

const { SubMenu } = Menu;
const active = { color: "rgb(255 255 255)", backgroundColor: "#DA213D", borderRadius: "10mm", marginTop: "0.7%", marginBottom: "0.7%" };
const cookies = new Cookies();

var ip = "http://localhost:5000";
export default class Header2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: "",
            user: [],
            catalog: []
        }
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
            return <Menu.Item key={cat.catId}><NavLink to={"/ProductList/" + cat.catId + "/grid"}>{cat.catName}</NavLink></Menu.Item>
        });
    }

    render() {
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
                    <Row>
                        <Col xs={6} xl={6} id="col-Headder-center2">
                            <Menu
                                // onClick={this.handleClick}
                                style={{ width: 360, borderRight: "2px solid rgba(110, 109, 109, 0.30)", lineHeight: "inherit" }}
                                // defaultSelectedKeys={['1']}
                                // defaultOpenKeys={['sub1']}
                                mode="horizontal"
                            >
                                <SubMenu key="sub1" icon={<MenuOutlined />} title="ประเภทสินค้าทั้งหมด">
                                    {this.state.catalog.length > 0 ?
                                        this.tab_product()
                                        :
                                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                                    }
                                </SubMenu>
                            </Menu>
                        </Col>
                        <Col xs={12} xl={12} id="col-Headder-center4">
                            <NavLink to="/Home" id="nav-Header" activeStyle={active}>หน้าแรก</NavLink >
                            <NavLink to="/Abount" id="nav-Header" activeStyle={active}>เกี่ยวกับ</NavLink>
                            <NavLink to="/Product" id="nav-Header" activeStyle={active}>สินค้า</NavLink>
                            <NavLink to="/Contact" id="nav-Header" activeStyle={active}>ติดต่อเรา</NavLink>
                        </Col>
                        <Col xs={6} xl={6} id="col-Headder-center3">
                            <div>Call us : 090-543-6000</div>
                        </Col>
                    </Row>
                </div>
            </Container>
        )
    }
}