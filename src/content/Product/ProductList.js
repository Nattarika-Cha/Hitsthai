import React, { Component } from "react";
import { Container, } from 'react-bootstrap';
import { Tabs, Empty } from 'antd';
import '../../css/Profile.css';
import axios from 'axios';
// import swal from 'sweetalert';
import Cookies from 'universal-cookie';
import ProductTab from './ProductTab';

const cookies = new Cookies();

var ip = "http://localhost:5000";
// var ip_img_profile = "http://128.199.198.10/API/profile/";

const { TabPane } = Tabs;

var mode = "";
var page = "";
var size = "";
export default class ProductList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: "",
            user: [],
            catalog: [],
            mode: "",
            page: "",
            tab: "",
            size: 12
        };

        this.callback = this.callback.bind(this);
    }

    componentWillMount() {
        this.setState({
            token: cookies.get('token', { path: '/' }),
            user: cookies.get('user', { path: '/' }),
            mode: this.props.match.params.mode,
            page: parseInt(this.props.match.params.page),
            tab: this.props.match.params.catid
            // size: parseInt(this.props.match.params.size)
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
            return <TabPane tab={cat.catName} key={cat.catId}>
                <ProductTab catId={cat.catId} mode={mode} page={page} size={size} props={this.props}/>
            </TabPane>
        });
    }

    callback(key) {
        console.log(key, " key");
        page = 1;
        this.setState({
            tab: key
        });
    }

    render() {
        console.log(this.state.tab.toString() , " this.state.tab");
        mode = this.props.match.params.mode;
        // page = this.props.match.params.page;
        // size = this.props.match.params.size;
        return (
            <Container fluid id="container-productlist">
                <Tabs activeKey={this.state.tab.toString()} onChange={this.callback}>
                    {this.state.catalog.length > 0 ?
                        this.tab_product()
                        :
                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                    }
                </Tabs>
            </Container>
        )
    }
}