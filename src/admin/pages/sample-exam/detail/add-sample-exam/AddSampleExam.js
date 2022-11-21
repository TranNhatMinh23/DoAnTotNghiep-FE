import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loading from '../../../../components/loading/Loading';
import * as actions from '../../../../../store/actions/index';
import { Form, Input, Button, Select, Row, Col, Icon, Radio } from 'antd';
import styles from './AddSampleExam.module.css';
import CustomPageHeader from '../../../../components/common/custom-page-header/CustomPageHeader';
import {
  emptyMessage,
} from '../../../../../constants/validateInputMessage';
import TextArea from 'antd/lib/input/TextArea';
import WidgetPage from '../../../../components/common/widget-page/WidgetPage';
import { withTranslation } from 'react-i18next';
import moment from 'moment';

const dateFormatUTC = "YYYY-MM-DD HH:mm:ss";

class AddSampleExam extends Component {
  state = {
    imageExamPreview: null,
    imageFile: null
  };

  componentDidMount() {
    this.props.getAllExamQuestions();
  }

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
          image_preview: this.state.imageFile,
          from_date: moment().format(dateFormatUTC),
        };
        this.props.createSampleExam(data);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { isLoading, listExamQuestions, t } = this.props;
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
          offset: 4
        },
        sm: {
          span: 16,
          offset: 5,
        },
      },
    };

    if (!listExamQuestions) {
      return <Loading />;
    } else {
      //get only listExamQuestions has exam_question_score
      let listExamQuestionsHasExamQuestionScore = listExamQuestions.filter(e => e.exam_question_score_id !== null && e.for_system);
      return (
        <WidgetPage>
          <CustomPageHeader to="/sample-exams" title={t('addNewSampleExam')} />  
          <Form {...formItemLayout} onSubmit={this.handleSubmit} className={styles.addUserForm}>
            <Row>
              <Col sm={24} md={18}>
                <Form.Item label={t('name')}>
                  {getFieldDecorator('name', {
                    rules: [
                      { required: true, message: emptyMessage("Name") },
                    ]
                  })(<Input />)}
                </Form.Item>
                <Form.Item label={t('description')}>
                  {getFieldDecorator('description', {
                    rules: [
                      { required: true, message: emptyMessage("Description") }
                    ]
                  })(<TextArea rows={4} />)}
                </Form.Item>
                <Form.Item label={t('examQuestionUsed')}>
                  {getFieldDecorator('exam_question_id', {
                    rules: [
                      { required: true, message: emptyMessage("Use Exam-question") }
                    ]
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
                    rules: [{ required: true, message: emptyMessage("Shuffle answer") }]
                  })(
                    <Radio.Group>
                      <Radio value={true}>{t('_yes')}</Radio>
                      <Radio value={false}>{t('_no')}</Radio>
                    </Radio.Group>,
                  )}
                </Form.Item> 
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
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit" loading={isLoading}>
                {t('createNew')}
              </Button>
            </Form.Item>
            <p className="reminderParagraph"><Icon type="warning" /><b>{t('note')}</b>: {t('remindChooseScoreMapping')}</p>
          </Form>
        </WidgetPage>
      )
    }
  }
}

const WrappedAddSampleExam = Form.create({ name: 'add_sample_exam' })(AddSampleExam);

const mapStateToProps = state => ({
  listExamQuestions: state.examquestionReducer.listExamQuestions,
  isLoading: state.sampleExamReducer.isLoadingCreate,
  err: state.sampleExamReducer.err,
  message: state.sampleExamReducer.message,
});

const mapDispatchToProps = dispatch => ({
  getAllExamQuestions: () => dispatch(actions.getAllExamQuestions()),
  createSampleExam: (data) => dispatch(actions.createSampleExam(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(WrappedAddSampleExam));