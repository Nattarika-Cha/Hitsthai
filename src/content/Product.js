import React, { Component } from "react";
import {Row,} from 'antd';
import { Container } from 'react-bootstrap';
import '../css/Product.css';

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        };
    }

    render(){
        return(
            <Container>
                <Row>

                </Row>
            </Container>
        )
    }
}