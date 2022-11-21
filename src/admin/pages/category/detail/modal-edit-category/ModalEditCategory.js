import React, { Component } from 'react';
import { Modal, Input, Button, Form } from 'antd';
import { connect } from 'react-redux';
import * as actions from '../../../../../store/actions/index';
import { emptyMessage } from '../../../../../constants/validateInputMessage';
import { withTranslation } from 'react-i18next';

class ModalEditCategory extends Component {
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
        this.props.editCategory(this.props.categoryEdit.id, data);
      }
    });
  }

  handleCancel = () => {
    this.props.onCloseDialog();
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { isLoadingCreate, categoryEdit, t } = this.props;
    return (
      <Modal
        title={t('editCategory')}
        visible={this.props.visible}
        onCancel={this.handleCancel}
        footer={[
          <Button key="back" onClick={this.handleCancel}>{t('cancel')}</Button>,
          <Button key="submit" type="primary" loading={isLoadingCreate} onClick={this.handleSubmit}>
            {t('update')}
          </Button>
        ]}
      >
        <Form layout="vertical" onSubmit={this.handleSubmit}>
          <Form.Item label={t('name')}>
            {getFieldDecorator('name', {
              rules: [{ required: true, message: emptyMessage("Category name"), whitespace: true }],
              initialValue: categoryEdit.name
            })(<Input placeholder={t('inputCategoryName')} />)}
          </Form.Item>
          <Form.Item label={t('description')}>
            {getFieldDecorator('description', {
              rules: [{ required: true, message: emptyMessage("Description"), whitespace: true }],
              initialValue: categoryEdit.description
            })(<Input placeholder={t('inputDescription')} />)}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

const WrappedModalEditCategory = Form.create({ name: 'modal_edit_category' })(ModalEditCategory);

const mapStateToProps = state => ({
  isLoadingCreate: state.categoryReducer.isLoadingCreate,
  isCreateSuccess: state.categoryReducer.isCreateSuccess,
  err: state.categoryReducer.err,
  message: state.categoryReducer.message,
});

const mapDispatchToProps = dispatch => ({
  editCategory: (categoryId, data) => dispatch(actions.editCategory(categoryId, data)),
  resetStatusCreatedNewCategory: () => dispatch(actions.resetStatusCreatedNewCategory())
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(WrappedModalEditCategory));