import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions/index';
import Loading from '../../../components/loading/Loading';
import NotFound from '../../../components/not-found/NotFound';
import ScreenUsersManagement from './ScreenUsersManagement';

class UsersManagementIndex extends Component {
  componentDidMount() {
    this.props.getAllUsers();
  }

  render() {
    const { isLoaded, listAllUsers, err } = this.props;
    if (isLoaded && listAllUsers) {
      return <ScreenUsersManagement listAllUsers={listAllUsers} />
    }

    if (isLoaded && err) {
      return <NotFound />
    }

    return (
      <Loading />
    );
  }
}

const mapStateToProps = state => ({
  listAllUsers: state.userReducer.listAllUsers,
  isLoaded: !state.userReducer.isLoading,
  err: state.userReducer.err,
  message: state.userReducer.message,
});

const mapDispatchToProps = dispatch => ({
  getAllUsers: () => dispatch(actions.getAllUsers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersManagementIndex);