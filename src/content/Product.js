import React, { Component } from "react";
import { Container } from 'react-bootstrap';

export default class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <Container fluid>
                <div>Product</div>
            </Container>
        )

    }
}