import React, { Component } from 'react';
import { Modal, Input, Button, Form } from 'antd';
import { connect } from 'react-redux';
import * as actions from '../../../../../store/actions/index';
import { emptyMessage } from '../../../../../constants/validateInputMessage';
import { withTranslation } from 'react-i18next';

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class ModalAddCategory extends Component {
  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isCreateSuccess) {
      this.handleCancel();
      this.props.resetStatusCreatedNewCategory();
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let data = {
          "name": values.name,
          "description": values.description
        };
        this.props.addNewCategory(data);
      }
    });
  }

  handleCancel = () => {
    this.props.onCloseDialog();
  }

  render() {
    const { getFieldDecorator, getFieldsError, isFieldTouched, getFieldError } = this.props.form;
    const { isLoadingCreate, t } = this.props;
    const nameError = isFieldTouched('name') && getFieldError('name');
    const descriptionError = isFieldTouched('description') && getFieldError('description');
    return (
      <Modal
        title={t('addNewCategory')}
        visible={this.props.visible}
        onCancel={this.handleCancel}
        footer={[
          <Button key="back" onClick={this.handleCancel}>{t('cancel')}</Button>,
          <Button key="submit" type="primary" loading={isLoadingCreate} onClick={this.handleSubmit} disabled={hasErrors(getFieldsError())}>
            {t('createNew')}
          </Button>
        ]}
      >
        <Form layout="vertical" onSubmit={this.handleSubmit}>
          <Form.Item label={t('name')} validateStatus={nameError ? 'error' : ''} help={nameError || ''}>
            {getFieldDecorator('name', {
              rules: [{ required: true, message: emptyMessage("Category name"), whitespace: true }],
            })(<Input placeholder={t('inputCategoryName')} />)}
          </Form.Item>
          <Form.Item label={t('description')} validateStatus={descriptionError ? 'error' : ''} help={descriptionError || ''}>
            {getFieldDecorator('description', {
              rules: [{ required: true, message: emptyMessage("Description"), whitespace: true }],
            })(<Input placeholder={t('inputDescription')} />)}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

const WrappedModalAddCategory = Form.create({ name: 'modal_add_category' })(ModalAddCategory);

const mapStateToProps = state => ({
  isLoadingCreate: state.categoryReducer.isLoadingCreate,
  isCreateSuccess: state.categoryReducer.isCreateSuccess,
  err: state.categoryReducer.err,
  message: state.categoryReducer.message,
});

const mapDispatchToProps = dispatch => ({
  addNewCategory: (data) => dispatch(actions.addNewCategory(data)),
  resetStatusCreatedNewCategory: () => dispatch(actions.resetStatusCreatedNewCategory())
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(WrappedModalAddCategory));