import React, { Component } from "react";
import { Container, Image } from 'react-bootstrap';
import { Row, Space, Empty } from 'antd';
import '../../css/Profile.css';
import axios from 'axios';
// import swal from 'sweetalert';
import Cookies from 'universal-cookie';
import ProductCardGrid from './ProductCardGrid';
import ProductCardList from './ProductCardList';
import { NavLink } from 'react-router-dom';

import grid from '../../img/mode_grid.svg';
import list from '../../img/mode_list.svg';

const cookies = new Cookies();

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
            // page: "",
            // size: "",
            product: []
        };
    }

    componentWillMount() {
        this.setState({
            token: cookies.get('token', { path: '/' }),
            user: cookies.get('user', { path: '/' }),
            // catId: this.props.catId,
            // mode: this.props.mode,
            // page: this.props.page,
            // size: this.props.size
        });

    }

    async componentDidMount() {
        var url_product = ip + "/Product/find/id/" + this.props.catId;
        const product = await (await axios.get(url_product)).data;
        this.setState({
            product: product
        });

        console.log(this.state.product, " product");
    }

    grid_product() {
        return this.state.product.map((product) => {
            return <ProductCardGrid />
        });
    }

    list_product() {
        return this.state.product.map((product) => {
            return <ProductCardList />
        });
    }

    render() {
        return (
            <Container fluid>
                <Row>
                    {this.props.mode === "grid" ?
                        <Space>
                            <NavLink to="/ProductList/grid/1/24">
                                <div style={{ border: "10px solid #DA213D", backgroundColor: "#DA213D" }}>
                                    <Image src={grid} />
                                </div>
                            </NavLink >
                            <NavLink to="/ProductList/list/1/24">
                                <div style={{ border: "10px solid #707070", backgroundColor: "#707070" }}>
                                    <Image src={list} />
                                </div>
                            </NavLink>
                        </Space>
                        :
                        <Space>
                            <NavLink to="/ProductList/grid/1/24">
                                <div style={{ border: "10px solid #707070", backgroundColor: "#707070" }}>
                                    <Image src={grid} />
                                </div>
                            </NavLink >
                            <NavLink to="/ProductList/list/1/24">
                                <div style={{ border: "10px solid #DA213D", backgroundColor: "#DA213D" }}>
                                    <Image src={list} />
                                </div>
                            </NavLink>
                        </Space>
                    }
                </Row>
                <Row>
                    {this.state.product.length > 0 ?
                        this.props.mode === "grid" ? this.grid_product() : this.list_product()
                        :
                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                    }
                </Row>
            </Container>
        )
    }
}