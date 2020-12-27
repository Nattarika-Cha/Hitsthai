import React, { Component } from "react";
import '../css/Footer.css';
import { Container, Image } from 'react-bootstrap';
import { Row, Col, } from 'antd';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import logofacebook from "../img/facebook.svg";

var ip = "http://localhost:5000";

export default class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            catalog: []
        }
    }

    async componentDidMount() {
        var url_catalog = ip + "/Catalog/find/all";
        const catalog = await (await axios.get(url_catalog)).data;
        this.setState({
            catalog: catalog
        });
    }

    render() {
        return (
            <Container fluid>
                {/* <div id="footer-div"> */}
                <div id="footer-frist">
                    <Row id="row-img-facebook"><Image src={logofacebook} id="img-facebook" onClick={() => { window.open("https://www.facebook.com/HitsThai-106136738074290/", "_blank"); }}/> <div id="test-facebook">HitsThai</div></Row>
                    <Row>
                        <Col xs={14} md={7} xl={6} id="col-footer">
                            <Row id="header-footer"> ติดต่อเรา </Row>
                            <Row id="body-footer"> ฝ่ายขาย</Row>
                            <Row id="body-footer">โทร : 090-543-6000</Row>
                            {/* <Row id="body-footer">Fax : xxxxxxxxxx</Row> */}
                            <Row id="body-footer">email : info@hitsthai.com</Row>
                            <Row id="body-footer">เวลาทำการ : จ. - ส. 08.30 - 17.30</Row>
                            <Row id="body-footer"></Row>

                        </Col>
                        <Col xs={10} md={5} xl={6} id="col-footer">
                            <Row id="header-footer"> หมวดหมู่ทั้งหมด </Row>
                            {
                                this.state.catalog?.map((catalog, i) => {
                                    return <NavLink to={"/ProductList/" + catalog.catId + "/grid"}><Row id="body-footer">{catalog.catName}</Row></NavLink>
                                })
                            }
                            {/* <Row id="body-footer"> ใบตัด</Row>
                            <Row id="body-footer"> ใบตัดโลหะ</Row>
                            <Row id="body-footer"> แผ่นสแตนเลส</Row>
                            <Row id="body-footer"> แผ่นสแตนเลสติดผนัง</Row> */}
                        </Col>
                        <Col xs={12} md={6} xl={6} id="col-footer">
                            <Row id="header-footer"> อื่นๆ </Row>
                            <Row id="body-footer"> เกี่ยวกับเรา</Row>
                            <Row id="body-footer"> สินค้า</Row>
                            <Row id="body-footer"> ติดต่อเรา</Row>
                            <Row id="body-footer"> บัญชี</Row>
                        </Col>
                        <Col xs={12} md={6} xl={6} id="col-footer">

                        </Col>
                    </Row>
                </div>
                {/* </div> */}
            </Container>
        )
    }
}

