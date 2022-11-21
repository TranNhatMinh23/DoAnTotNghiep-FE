import React, { Component } from 'react';
import MainMenu from './MainMenu';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import { Link } from 'react-router-dom';
import logo from '../../../assets/images/image_2.png';
import styles from './NavbarHeader.module.css';

class NavbarHeader extends Component {
  componentDidMount(){
    this.props.setAuthorizationToken();
  }

  state = {
    current: 'mail',
    visible: false
  }
  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { isAuthenticated } = this.props;
    return (
      <div className="container-fluid">
        <div className={`row ${styles.navbarHeader}`}>
          <div className={`col-md-3 ${styles.logo}`}><Link to="/"><img alt="logo" src={logo} style={{ height: '70px' }} /></Link></div>
          <div className={`col-md-9 left-main-menu ${styles.leftMenu}`}>
            <MainMenu mode="horizontal" isAuthenticated={isAuthenticated} />
          </div>
        </div>

      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.authReducer.isAuthenticated
});

const mapDispatchToProps = dispatch => ({
  setAuthorizationToken: () => dispatch(actions.setAuthorizationToken()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavbarHeader);