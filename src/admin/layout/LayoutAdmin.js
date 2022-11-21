import React, { Component } from 'react';
import { Layout, BackTop } from 'antd';
import styles from './LayoutAdmin.module.css';
import 'react-toastify/dist/ReactToastify.css';
import HeaderLayout from '../components/header/HeaderLayout';
import SideBarLayout from '../components/sidebar/SideBarLayout'; 
import { ToastContainer } from 'react-toastify';

const { Content, Footer } = Layout;

class LayoutAdmin extends Component {
  state = {
    collapsed: false,
  };

  onCollapse = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <Layout className={styles.layoutAdmin}>
        <BackTop />
        <SideBarLayout
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        />
        <Layout ref="widgetMain" className="widgetMain">
          <HeaderLayout
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}
          />
          <Content className={styles.contentLayout}>
            <ToastContainer />
            {this.props.children}
          </Content>
          <Footer className={styles.footerLayoutAdmin}>
            Copyright @2019 ENGLISH CENTER - All rights reserved
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default LayoutAdmin;