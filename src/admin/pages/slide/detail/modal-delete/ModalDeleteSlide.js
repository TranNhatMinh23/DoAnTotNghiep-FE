import React, { Component } from 'react';
import { Modal } from 'antd';
import { connect } from 'react-redux';
import styles from './ModalDeleteSlide.module.css';
import * as actions from '../../../../../store/actions/index';

class ModalDeleteSlide extends Component {

  handleOk = () => {
    this.props.deleteSlide(this.props.slideDelete.id)
  }

  handleCancel = () => {
    this.props.onCloseDialog();
  }

  render() {
    return (
      <Modal
        title="Confirm delete Slide?"
        visible={this.props.visible}
        okText='Yes'
        okType='danger'
        cancelText='No'
        onOk={this.handleOk}
        confirmLoading={this.props.isLoading}
        onCancel={this.handleCancel}
      >
        <p className={styles.message}>Do you want delete this slide ?</p>
      </Modal>
    )
  }
}

const mapStateToProps = state => ({
  isLoading: state.slideReducer.isLoading,
  err: state.slideReducer.err,
  message: state.slideReducer.message,
});

const mapDispatchToProps = dispatch => ({
  deleteSlide: (slideId) => dispatch(actions.deleteSlide(slideId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalDeleteSlide);