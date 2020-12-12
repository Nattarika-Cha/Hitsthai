import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'

import Home from "../content/Home";
import Davelop from "../content/Davelop";
import Register from "../content/Register";
import Login from "../content/Login";
import Changepass from "../content/Changepass";
import Profile from "../content/Profile";
import Product from "../content/Product";

export default class Index extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={Davelop} />
                <Route exact path="/Home" component={Home} />
                <Route exact path="/Login" component={Login} />
                <Route exact path="/Register" component={Register} />
                <Route exact path="/Changepass" component={Changepass} />
                <Route exact path="/Profile" component={Profile} />
                <Route exact path="/Product" component={Product} />
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

