import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'

import Home from "../content/Home";
import Register from "../content/Register";
import Login from "../content/Login";

export default class Index extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={Home} />
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

