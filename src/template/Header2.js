import React, { Component } from 'react';
import '../css/Header.css';
import { Row, Col, Menu } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const { SubMenu } = Menu;

export default class Header extends Component {
    state = {
        current: 'mail',
      };
    
      handleClick = e => {
        console.log('click ', e);
        this.setState({ current: e.key });
      };

    render() {
        const { current } = this.state;
        return (
            // <div>
            <Container fluid>
                <div id="header-frist2">

                    <Row>
                        <Col xs={6} xl={6}>
                        <Menu onClick={this.handleClick} mode="inline">
                            <SubMenu
                                key="SubMenu"
                                icon={<SettingOutlined />}
                                title="Navigation Three - Submenu"
                            >
                                <Menu.ItemGroup title="Item 1">
                                    <Menu.Item key="setting:1">Option 1</Menu.Item>
                                    <Menu.Item key="setting:2">Option 2</Menu.Item>
                                </Menu.ItemGroup>
                                <Menu.ItemGroup title="Item 2">
                                    <Menu.Item key="setting:3">Option 3</Menu.Item>
                                    <Menu.Item key="setting:4">Option 4</Menu.Item>
                                </Menu.ItemGroup>
                            </SubMenu>
                            </Menu>
                        </Col>
                        <Col xs={12} xl={12}>
                            <NavLink to="/Home" id="nav-Header">หน้าแรก</NavLink >
                            <NavLink to="/Home" id="nav-Header">เกี่ยวกับ</NavLink>
                            <NavLink to="/Home" id="nav-Header">สินค้า</NavLink>
                            <NavLink to="/Home" id="nav-Header">ติดต่อเรา</NavLink>
                        </Col>
                        <Col xs={6} xl={6} style={{ textAlign: "end" }}>
                            <div>Call us : 0888888888</div>
                        </Col>
                    </Row>
                </div>
            </Container>
        )
    }
}