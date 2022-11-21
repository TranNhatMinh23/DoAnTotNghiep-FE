import React, { Component } from 'react';
import { Modal, Input, Button, Form } from 'antd';
import { connect } from 'react-redux';
import * as actions from '../../../../../store/actions/index';
import { emptyMessage } from '../../../../../constants/validateInputMessage';
import { withTranslation } from 'react-i18next';

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class ModalEditExamQuestionScore extends Component {
  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isCreateSuccess) {
      this.handleCancel();
      this.props.resetStatusCreatedNewExamQuestionScore();
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let examQuestionScoreId = this.props.examQuestionScoreEdit.id;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let data = {
          "name": values.name,
          "description": values.description
        };

        this.props.editExamQuestionScore(examQuestionScoreId, data);
      }
    });
  }

  handleCancel = () => {
    this.props.onCloseDialog();
  }

  render() {
    const { getFieldDecorator, getFieldsError, isFieldTouched, getFieldError } = this.props.form;
    const { isLoadingEdit, examQuestionScoreEdit, t } = this.props;
    const nameError = isFieldTouched('name') && getFieldError('name');
    return (
      <Modal
        title={t('editScoreMapping')}
        visible={this.props.visible}
        onCancel={this.handleCancel}
        footer={[
          <Button key="back" onClick={this.handleCancel}>{t('cancel')}</Button>,
          <Button key="submit" type="primary" loading={isLoadingEdit} onClick={this.handleSubmit} disabled={hasErrors(getFieldsError())}>
            {t('update')}
          </Button>
        ]}
      >
        <Form layout="vertical" onSubmit={this.handleSubmit}>
          <Form.Item label={t('name')} validateStatus={nameError ? 'error' : ''} help={nameError || ''}>
            {getFieldDecorator('name', {
              rules: [{ required: true, message: emptyMessage("Name"), whitespace: true }],
              initialValue: examQuestionScoreEdit.name,
            })(<Input placeholder={t('inputName')} />)}
          </Form.Item>
          <Form.Item label={t('description')}>
            {getFieldDecorator('description', {
              initialValue: examQuestionScoreEdit.description,
            })(<Input placeholder={t('inputDescription')} />)}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

const WrappedModalEditExamQuestionScore = Form.create({ name: 'modal_edit_score_mapping' })(ModalEditExamQuestionScore);

const mapStateToProps = state => ({
  isLoadingEdit: state.examquestionScoreReducer.isLoadingEdit,
  isCreateSuccess: state.examquestionScoreReducer.isCreateSuccess,
  err: state.examquestionScoreReducer.err,
  message: state.examquestionScoreReducer.message,
});

const mapDispatchToProps = dispatch => ({
  editExamQuestionScore: (examQuestionScoreId, data) => dispatch(actions.editExamQuestionScore(examQuestionScoreId, data)),
  resetStatusCreatedNewExamQuestionScore: () => dispatch(actions.resetStatusCreatedNewExamQuestionScore())
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(WrappedModalEditExamQuestionScore));