import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'

import Home from "../content/Home";
import Abount from "../content/About";
import Product from "../content/Product";
import Contact from "../content/Contact";

// import Davelop from "../content/Davelop";
import Register from "../content/Register";
import Login from "../content/Login";

export default class Index extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/Home" component={Home} />
                <Route exact path="/Abount" component={Abount} />
                <Route exact path="/Product" component={Product} />
                <Route exact path="/Contact" component={Contact} />
                <Route exact path="/Login" component={Login} />
                <Route exact path="/Register" component={Register} />
            </Switch>
        );
    }
}

// export default React.createClass( {
//     render() {
//         return (
//             <Switch>
//                 <Route exact path="/" component={Home} />
//                 <Route exact path="/Login" component={Login} />
//                 <Route exact path="/Register" component={Register} />
//             </Switch>
//         );
//     }
// });

