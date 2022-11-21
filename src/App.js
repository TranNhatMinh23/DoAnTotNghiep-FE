import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import NotFoundPage from './layout/not-found/NotFoundPage';
import DashboardAdmin from './admin/DashboardAdmin';
import DashboardClient from './client/DashboardClient';

class App extends Component { 

  render() {
    const { isAuthenticated, userInfo } = this.props;
    return (
      <Switch>
        {isAuthenticated && (userInfo.user.role.name === "Admin" || userInfo.user.role.name === "Manager") && <Route path="/admin" render={props => <DashboardAdmin {...props} />} />}
        <Route path="/" component={DashboardClient} />
        <Redirect to="/" />
        <Route component={NotFoundPage} />
      </Switch>
    )
  }
}

App.propTypes = {
  userInfo: PropTypes.any,
  isAuthenticated: PropTypes.bool
}

App.defaultProps = {
  userInfo: {
    user: {
      role: ''
    }
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.authReducer.isAuthenticated,
  userInfo: state.authReducer.userInfo
});

export default withRouter(connect(mapStateToProps, null)(App));
