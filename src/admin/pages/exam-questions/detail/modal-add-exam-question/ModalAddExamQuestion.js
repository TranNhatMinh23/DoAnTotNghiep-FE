import React, { Component } from 'react';
import { Modal, Input, Button, Form, Radio } from 'antd';
import { connect } from 'react-redux';
import styles from './ModalAddExamQuestion.module.css';
import * as defineConst from '../../../../../constants/defineConst';
import * as actions from '../../../../../store/actions/index';
import { emptyMessage } from '../../../../../constants/validateInputMessage';
import DetailFormat from './DetailFormat';
import { withTranslation } from 'react-i18next';

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class ModalAddExamQuestion extends Component {
  state = {
    isFormatChoosed: defineConst.NEW_FORMAT
  }

  onChangeFormat = e => {
    this.setState({
      isFormatChoosed: e.target.value
    });
  }

  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isCreateSuccess) {
      this.handleCancel();
      this.props.resetStatusCreatedNewExamQuestion();
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let data = {
          "name": values.name,
          "examquestionsFormat": values.examquestionsFormat,
          "for_system": typeof values.for_system !== "undefined" ? values.for_system : false
        };  
        this.props.createNewExamQuestion(data);
      }
    });
  }

  handleCancel = () => {
    this.props.onCloseDialog();
  }

  render() {
    const { getFieldDecorator, getFieldsError, isFieldTouched, getFieldError } = this.props.form;
    const { isLoadingCreate, t, userInfo } = this.props; 
    const isAdmin = userInfo && userInfo.user.role.name === "Admin"; 
    const nameError = isFieldTouched('name') && getFieldError('name');
    return (
      <Modal
        title={t('addNewExamQuestionTitleModel')}
        style={{ top: 20 }}
        visible={this.props.visible}
        onCancel={this.handleCancel}
        footer={[
          <Button key="back" onClick={this.handleCancel}>{t('cancel')}</Button>,
          <Button key="submit" type="primary" loading={isLoadingCreate} onClick={this.handleSubmit} disabled={hasErrors(getFieldsError())}>
            {t('create')}
          </Button>
        ]}
      >
        <Form className="formInModal" onSubmit={this.handleSubmit}>
          <Form.Item label={t('name')} validateStatus={nameError ? 'error' : ''} help={nameError || ''}>
            {getFieldDecorator('name', {
              rules: [{ required: true, message: emptyMessage("Exam question name"), whitespace: true }],
            })(<Input placeholder={t('inputExamQuestionPlaceholder')} />)}
          </Form.Item>
          {isAdmin && <Form.Item label={t('examquestionFor')}>
            {getFieldDecorator('for_system', {initialValue: true})(
              <Radio.Group className={styles.chooseFormat}>
                <Radio value={false}>{t('examquestionForCompany')}</Radio>
                <Radio value={true}>{t('examquestionForSystem')}</Radio>
              </Radio.Group>
            )}
          </Form.Item> }
          <Form.Item label={t('examQuestionFormat')}>
            {getFieldDecorator('examquestionsFormat', { initialValue: defineConst.NEW_FORMAT })(
              <Radio.Group onChange={this.onChangeFormat} className={styles.chooseFormat}>
                <Radio value={defineConst.NEW_FORMAT}>{t('newFormat')}</Radio>
                <Radio value={defineConst.OLD_FORMAT}>{t('oldFormat')}</Radio>
              </Radio.Group>
            )}
          </Form.Item>
          <DetailFormat formatCode={this.state.isFormatChoosed} />
        </Form>
      </Modal>
    )
  }
}

const WrappedModalAddExamQuestion = Form.create({ name: 'modal_add_exam_question' })(ModalAddExamQuestion);

const mapStateToProps = state => ({
  isLoadingCreate: state.examquestionReducer.isLoadingCreate,
  isCreateSuccess: state.examquestionReducer.isCreateSuccess,
  err: state.examquestionReducer.err,
  message: state.examquestionReducer.message,
  userInfo: state.authReducer.userInfo,
});

const mapDispatchToProps = dispatch => ({
  createNewExamQuestion: (data) => dispatch(actions.createNewExamQuestion(data)),
  resetStatusCreatedNewExamQuestion: () => dispatch(actions.resetStatusCreatedNewExamQuestion())
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(WrappedModalAddExamQuestion));