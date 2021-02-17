import React from 'react';
import { Route, Redirect } from 'react-router-dom';
var jwt = require('jsonwebtoken');

class PrivateRoute extends React.Component {

    render() {
        let token = localStorage.getItem("MyToken");
        let decoded = jwt.decode(token)
        console.log(decoded);
        console.log(this.props.component);
        return (
            <>
              {decoded && decoded.admin ? (
                <Route component={this.props.component} path={this.props.path} />
              ) : (
                <Redirect
                  to={{
                    pathname: "/admin/signin",
                  }}
                />
              )}
            </>
          );
    }

  }

  export default PrivateRoute

