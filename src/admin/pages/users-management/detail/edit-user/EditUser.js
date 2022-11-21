import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../../store/actions/index';
import Loading from '../../../../components/loading/Loading';
import NotFoundPage from '../../../../components/not-found/NotFound';
import EditUserForm from './EditUserForm';

class EditUser extends Component {
  componentDidMount() {
    let { userId } = this.props.match.params;
    this.props.getUserById(userId);
  }

  render() {

    const { isLoaded, detailUser, err } = this.props;

    if (isLoaded && detailUser) {
      return <EditUserForm detailUser={detailUser} />
    }

    if (isLoaded && err) {
      return <NotFoundPage />
    }

    return (
      <Loading />
    );
  }
}

const mapStateToProps = state => ({
  isLoaded: !state.userReducer.isLoading,
  err: state.userReducer.err,
  message: state.userReducer.message,
  detailUser: state.userReducer.detailUser,
});

const mapDispatchToProps = dispatch => ({
  getUserById: (userId) => dispatch(actions.getUserById(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditUser);