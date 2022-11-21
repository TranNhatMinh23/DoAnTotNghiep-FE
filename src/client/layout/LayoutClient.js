import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import ContentClient from '../components/content/ContentClient';
import { ToastContainer } from 'react-toastify';
import { BackTop } from 'antd';
import TopHeader from '../components/top-header/TopHeader';
import NavbarHeader from '../components/navbar-header/NavbarHeader';
import Slider from '../components/slider/Slider';
import Footer from '../components/footer/Footer';

class LayoutClient extends Component {

  render() {
    return (
      <Fragment>
        <BackTop />
        <TopHeader />
        <NavbarHeader />
        {window.location.pathname === "/" && <Slider />}
        <ContentClient>
          <ToastContainer />
          {this.props.children}
        </ContentClient>
        <Footer />
      </Fragment>
    );
  }
}

export default withRouter(LayoutClient);