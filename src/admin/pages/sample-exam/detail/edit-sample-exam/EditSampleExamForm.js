import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import { connect } from 'react-redux';
import * as actions from '../../../../../store/actions/index';
import { Form, Input, Button, Select, Col, Row, Icon, Radio } from 'antd';
import CustomPageHeader from '../../../../components/common/custom-page-header/CustomPageHeader';
import {
  emptyMessage,
} from '../../../../../constants/validateInputMessage';
import styles from './EditSampleExam.module.css';
import TextArea from 'antd/lib/input/TextArea';
import WidgetPage from '../../../../components/common/widget-page/WidgetPage';
import { withTranslation } from 'react-i18next';

class EditSampleExamForm extends Component {
  state = {
    imageExamPreview: this.props.detailSampleExam.image_preview ? process.env.REACT_APP_URL_API + this.props.detailSampleExam.image_preview : null,
    imageFile: null
  };

  changeImageExamPreview = (e) => {
    let file = e.target.files[0];
    if (file) {
      this.setState({
        imageExamPreview: URL.createObjectURL(file),
        imageFile: file,
      });
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let data = {
          name: values.name.trim(),
          description: values.description,
          exam_question_id: values.exam_question_id,
          is_shuffle_answer: values.is_shuffle_answer,
          image_preview: this.state.imageFile
        };
        const sampleExamId = this.props.detailSampleExam.id;
        this.props.editSampleExam(sampleExamId, data);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { isLoading, detailSampleExam, listExamQuestions, t } = this.props;
    const { imageExamPreview } = this.state;

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

    //get only listExamQuestions has exam_question_score
    let listExamQuestionsHasExamQuestionScore = listExamQuestions.filter(e => e.exam_question_score_id !== null && e.for_system);

    return (
      <DocumentTitle title='Administrator - Edit exam schedule'>
        <WidgetPage>
          <CustomPageHeader to="/sample-exams" title={t('editSampleExam')} />   
          <Form {...formItemLayout} onSubmit={this.handleSubmit} className={styles.addUserForm}>
            <Row>
              <Col sm={24} md={18}>
                <Form.Item label={t('name')}>
                  {getFieldDecorator('name', {
                    rules: [
                      { required: true, message: emptyMessage("Name") },
                    ],
                    initialValue: detailSampleExam.name
                  })(<Input />)}
                </Form.Item>
                <Form.Item label={t('description')}>
                  {getFieldDecorator('description', {
                    rules: [
                      { required: true, message: emptyMessage("Description") }
                    ],
                    initialValue: detailSampleExam.description
                  })(<TextArea rows={4} />)}
                </Form.Item>
                <Form.Item label={t('examQuestionUsed')}>
                  {getFieldDecorator('exam_question_id', {
                    rules: [
                      { required: true, message: emptyMessage("Use Exam-question") }
                    ],
                    initialValue: detailSampleExam.exam_question_id
                  })(
                    <Select>
                      {listExamQuestionsHasExamQuestionScore.map(examQuestion => {
                        return <Select.Option key={examQuestion.id} value={examQuestion.id}>{examQuestion.name}</Select.Option>;
                      })}
                    </Select>
                  )}
                </Form.Item>
                <Form.Item label={t('isShuffleAnswer')}>
                  {getFieldDecorator('is_shuffle_answer', {
                    rules: [{ required: true, message: emptyMessage("Shuffle answer") }],
                    initialValue: detailSampleExam.is_shuffle_answer
                  })(
                    <Radio.Group>
                      <Radio value={true}>{t('_yes')}</Radio>
                      <Radio value={false}>{t('_no')}</Radio>
                    </Radio.Group>,
                  )}
                </Form.Item> 
                <Form.Item {...tailFormItemLayout}>
                  <Button type="primary" htmlType="submit" loading={isLoading}>
                    {t('update')}
                  </Button>
                </Form.Item>
                <p className="reminderParagraph"><Icon type="warning" /><b>{t('note')}</b>: {t('remindChooseScoreMapping')}</p>
              </Col>
              <Col sm={24} md={6} className={styles.imageExamSchedulePreview}>
                <p className={styles.titleCol}>{t('previewImage')}</p>
                <div>
                  <input
                    id="image-exam-preview"
                    accept="image/*"
                    onChange={this.changeImageExamPreview}
                    className="input-file"
                    type="file"
                  />
                  <Button type="primary">
                    <label htmlFor="image-exam-preview" className={styles.labelInputFile}>
                      <Icon type="upload" /> {t('uploadImage')}
                    </label>
                  </Button>
                </div>
                {
                  imageExamPreview &&
                  <img id="ImageExamPreview" src={imageExamPreview} alt="" />
                }
              </Col>
            </Row>
          </Form>
        </WidgetPage>
      </DocumentTitle>
    )
  }
}

const WrappedEditSampleExamForm = Form.create({ name: 'edit-exam-schedule' })(EditSampleExamForm);

const mapStateToProps = state => ({
  listExamQuestions: state.examquestionReducer.listExamQuestions,
  isLoading: state.sampleExamReducer.isLoadingEdit,
  err: state.sampleExamReducer.err,
  message: state.sampleExamReducer.message,
});

const mapDispatchToProps = dispatch => ({
  editSampleExam: (sampleExamId, data) => dispatch(actions.editSampleExam(sampleExamId, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(WrappedEditSampleExamForm));