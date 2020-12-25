import React, { Component } from "react";
import { Container, Image } from 'react-bootstrap';
import { Row, Col, Divider } from 'antd';
import '../css/About.css';
import logo from '../img/hits_logo2.png'
export default class Abount extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <Container fluid>
                 <Row id="About">
                     <Col xs={24} md={24} xl={24} id="col-imglogo">
                        <Image
                            src={logo}
                            width="20%"
                            height="auto"
                            className="d-inline-block align-top"
                            alt="React Bootstrap logo"
                            style={{ paddingBottom: "0.3%", paddingTop: "0.3%" }}
                        />
                     </Col>
                     <Col id="col-about">
                        <Divider orientation="left">บริษัท ฮิตส์ จำกัด</Divider>
                            <p>
                            hits ผู้ผลิตและผู้จัดจำหน่ายสินค้านำเข้าจากต่างประเทศที่ได้คุณภาพ มาตรฐานระดับสากล ด้วยประสบการณ์ที่มากกว่า 30 ปี ในวงการวัสดุอุปกรณ์ เครื่องมือช่างตกแต่งบ้าน และเฟอร์นิเจอร์ เราคัดสรรสินค้าที่มีคุณภาพเป็นมาตรฐานออกสู่ตลาด รับประกันคุณภาพและบริการ ได้ผลตอบรับที่ดีและความไว้วางใจจากช่างมืออาชีพ วิศวกร สถาปนิก โครงการชั้นนำ โรงงาน และร้านค้าตัวแทนจำหน่าย จากนี้และในอนาคตเรามุ่งมั่นพัฒนาสินค้าและบริการที่ดีสู่คุณ
                            </p>
                     </Col>
                 </Row>
            </Container>
        )

    }
}