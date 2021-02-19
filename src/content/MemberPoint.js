import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { Row, Col, Form, Pagination, Spin } from 'antd';
import '../css/MemberPoint.css';
import Cookies from 'universal-cookie';
import axios from 'axios';
import swal from 'sweetalert';

const cookies = new Cookies();
var ip = "http://localhost:5000";

export default class MemberPoint extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: "",
            user: [],
            size: 10,
            page: "",
            pageOld: "",
            point: [],
            statusDataPoint: false,
            point_count: 0,
            point_sum: 0
        };

        this.onChangePage = this.onChangePage.bind(this);

        // async componentDidMount() {
        //     var url_user = ip + "/UserProfile/find/all/admin";
        //     const user = await (await axios.get(url_user)).data;
        //     this.setState({
        //         user: user,
        //         userstatus: false
        //     });
        //   }
    }

    componentWillMount() {
        this.setState({
            token: cookies.get('token', { path: '/' }),
            user: cookies.get('user', { path: '/' }),
            page: 1,
            pageOld: 1
        });
    }

    async componentDidMount() {
        if (this.state.token === "" || this.state.token === null || this.state.token === undefined || this.state.token === "undefined" ||
            this.state.user.userCode === "" || this.state.user.userCode === null || this.state.user.userCode === undefined || this.state.user.userCode === "undefined") {
            var url_point = ip + "/Point/findbyusercode/authorization/" + this.state.user.userCode + "/" + this.state.page + "/" + this.state.size;
            const point = await (await axios.get(url_point, { headers: { "token": this.state.token, "key": this.state.user?.username } })).data;
            if ((point.statusCode === 500) || (point.statusCode === 400)) {
                swal("Error!", "เกิดข้อผิดพลาดในการเข้าสู่ระบบ \n กรุณาเข้าสู่ระบบใหม่", "error").then((value) => {
                    this.setState({
                        token: cookies.remove('token', { path: '/' }),
                        user: cookies.remove('user', { path: '/' })
                    });
                    window.location.replace('/Login', false);
                });
            } else {
                this.setState({
                    point: point,
                    point_sum: (point.reduce((a, v) => a = a + v.point, 0)),
                    statusDataPoint: true
                });
            }

            var url_point_count = ip + "/Point/count/all/" + this.state.user.userCode;
            const point_count = await (await axios.get(url_point_count, { headers: { "token": this.state.token, "key": this.state.user?.username } })).data;
            if ((point_count.statusCode === 500) || (point_count.statusCode === 400)) {
                swal("Error!", "เกิดข้อผิดพลาดในการเข้าสู่ระบบ \n กรุณาเข้าสู่ระบบใหม่", "error").then((value) => {
                    this.setState({
                        token: cookies.remove('token', { path: '/' }),
                        user: cookies.remove('user', { path: '/' })
                    });
                    window.location.replace('/Login', false);
                });
            } else {
                this.setState({
                    point_count: point_count[0].num
                });
            }

        } else {
            swal("Error!", "เกิดข้อผิดพลาด \n กรุณาเข้าสู่ระบบใหม่", "error").then((value) => {
                this.setState({
                    token: cookies.remove('token', { path: '/' }),
                    user: cookies.remove('user', { path: '/' })
                });
                window.location.replace('/Login', false);
            });
        }
    }

    async componentDidUpdate() {
        if (this.state.page !== this.state.pageOld) {
            var page = 1;
            if (this.state.size <= this.state.point_count) {
                page = parseInt(this.state.page);
            }
            var size = parseInt(this.state.size);
            var userCode = this.state.user.userCode;

            var url_point = ip + "/Point/findbyusercode/authorization/" + userCode + "/" + page + "/" + size;
            const point = await (await axios.get(url_point, { headers: { "token": this.state.token, "key": this.state.user?.username } })).data;
            if ((point.statusCode === 500) || (point.statusCode === 400)) {
                swal("Error!", "เกิดข้อผิดพลาดในการเข้าสู่ระบบ \n กรุณาเข้าสู่ระบบใหม่", "error").then((value) => {
                    this.setState({
                        token: cookies.remove('token', { path: '/' }),
                        user: cookies.remove('user', { path: '/' })
                    });
                    window.location.replace('/Login', false);
                });
            } else {
                this.setState({
                    point: point,
                    pageOld: this.state.page
                });
            }
        }
    }

    onChangePage(page, pageSize) {
        this.setState({
            page: page
        });
    }


    render() {
        return (
            <Container>
                <Row id="Header-Point">ยอดขายรวม</Row>
                <Form>
                    <Row id="MemberPointCss">
                        <Col xs={2} md={4} xl={2}></Col>
                        {
                            (this.state.statusDataPoint) ?
                                <>
                                    <Col xs={20} md={16} xl={20}>
                                        <Col xs={24} md={24} xl={24} id="Point-Header">ยอดขายทั้งหมด</Col>
                                        <Col xs={24} md={24} xl={24} id="Point">{this.state.point_sum}</Col>
                                        <Col xs={24} md={24} xl={24} id="Point-History">ประวัติ</Col>
                                        <Col xs={24} md={24} xl={24}>
                                            {
                                                this.state.point.map((point) => {
                                                    return <Row id="row-point">
                                                        <Col xs={24} md={24} xl={24} id="col-order">{point.orderCode}</Col>
                                                        <Col xs={16} md={16} xl={16} id="col-datepoint">{point.pointDate}</Col>
                                                        <Col xs={8} md={8} xl={8} id="col-point">{point.point}  บาท</Col>
                                                    </Row>
                                                })
                                            }

                                            {
                                                (this.state.point_count > 0) ?
                                                    <Row id="product-footer-page">
                                                        <Pagination
                                                            size="small"
                                                            current={this.state.page}
                                                            pageSize={this.state.size}
                                                            total={this.state.point_count}
                                                            onChange={this.onChangePage}
                                                        />
                                                    </Row>
                                                    :
                                                    <>
                                                    </>
                                            }
                                        </Col>
                                    </Col>
                                </>
                                :
                                <Row id="row-spin-slide">
                                    <Spin size="large" />
                                </Row>
                        }
                        <Col xs={2} md={8} xl={2}></Col>
                    </Row>
                </Form>
            </Container>
        )
    }
}