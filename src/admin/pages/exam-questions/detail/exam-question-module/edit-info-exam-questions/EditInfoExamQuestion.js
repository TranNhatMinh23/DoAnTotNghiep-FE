import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../../../store/actions/index';
import { Divider, Select } from 'antd';
import { Form, Input, Button } from 'antd';
import { emptyMessage } from '../../../../../../constants/validateInputMessage';
import { withTranslation } from 'react-i18next';

class EditInfoExamQuestion extends Component {

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let data = {
          name: values.name,
          exam_question_score_id: values.exam_question_score_id
        };
        let examQuestionId = this.props.detailExamQuestion.id;
        this.props.editExamQuestionInfo(examQuestionId, data);
      }
    });
  };

  render() {
    const { detailExamQuestion, isLoadingUpdate, listExamQuestionScore, t } = this.props;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        md: { span: 5 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        md: {
          offset: 5
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    return (
      <>
        <Divider orientation="left">{t('editInfo')}</Divider>
        <Form {...formItemLayout} onSubmit={this.handleSubmit} labelAlign="left">
          <Form.Item label={t('examQuestionName')}>
            {getFieldDecorator('name', {
              rules: [
                { required: true, message: emptyMessage("Exam-question name") },
              ],
              initialValue: detailExamQuestion.name,
            })(<Input />)}
          </Form.Item>
          <Form.Item label={t('scoreMapping')}>
            {getFieldDecorator('exam_question_score_id', {
              rules: [
                { required: true, message: emptyMessage("Score mapping") }
              ],
              initialValue: detailExamQuestion.exam_question_score_id,
            })(
              <Select onChange={this.changeExamQuestionScore} >
                {listExamQuestionScore.map(item => {
                  return <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                })}
              </Select>
            )
            }
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" loading={isLoadingUpdate}>
              {t('save')}
            </Button>
          </Form.Item>
        </Form>
      </>
    )
  }
}

const mapStateToProps = state => ({
  isLoadingUpdate: state.examquestionReducer.isLoadingUpdate,
  err: state.examquestionReducer.err,
  message: state.examquestionReducer.message,
  detailExamQuestion: state.examquestionReducer.detailExamQuestion,
  listExamQuestionScore: state.examquestionScoreReducer.listExamQuestionScore,
});

const mapDispatchToProps = dispatch => ({
  editExamQuestionInfo: (examQuestionId, data) => dispatch(actions.editExamQuestionInfo(examQuestionId, data)),
});

const WrappedEditInfoExamQuestionForm = Form.create({ name: 'edit_info_exam_question' })(EditInfoExamQuestion);

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(WrappedEditInfoExamQuestionForm));