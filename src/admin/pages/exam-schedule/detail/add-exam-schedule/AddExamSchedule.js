import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import { connect } from 'react-redux';
import Loading from '../../../../components/loading/Loading';
import * as actions from '../../../../../store/actions/index';
import { Form, Input, Button, Select, Row, Col, Icon, Checkbox, Radio, DatePicker } from 'antd';
import CustomPageHeader from '../../../../components/common/custom-page-header/CustomPageHeader';
import styles from './AddExamSchedule.module.css';
import {
  emptyMessage,
} from '../../../../../constants/validateInputMessage';
import TextArea from 'antd/lib/input/TextArea';
import WidgetPage from '../../../../components/common/widget-page/WidgetPage';
import { ReactMultiEmail } from 'react-multi-email';
import 'react-multi-email/style.css';
import { withTranslation } from 'react-i18next';
import moment from 'moment';
import { disabledDate } from '../../../../../shared/function';

const dateFormat = 'DD/MM/YYYY';
const dateFormatUTC = "YYYY-MM-DD HH:mm:ss";
const { Option, OptGroup } = Select;

class AddExamSchedule extends Component {
  state = {
    imageExamPreview: null,
    imageFile: null,
    emails: [],
    isVisibleInputRegrexEmail: false,
    isVisibleInputListEmail: false,
    regrexEmail: '',
    fromDate: null
  };

  componentDidMount() {
    this.props.getAllExamQuestions();
    this.props.getAllExamQuestionsOfSystemForCompany();
  }

  toggleInputRegrexEmail = () => {
    this.setState({
      isVisibleInputRegrexEmail: !this.state.isVisibleInputRegrexEmail
    });
  }

  toggleInputListEmail = () => {
    this.setState({
      isVisibleInputListEmail: !this.state.isVisibleInputListEmail
    });
  }

  changeRegrexEmail = (e) => {
    this.setState({
      regrexEmail: e.target.value
    })
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

  onChangeFromDate = (date, dateString) => {
    this.setState({ fromDate: date });
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
          regrexEmail: this.state.isVisibleInputRegrexEmail ? this.state.regrexEmail : null,
          listsEmail: this.state.isVisibleInputListEmail ? this.state.emails : [],
          from_date: moment(values.from_date).format(dateFormatUTC),
          to_date: moment(values.to_date).format(dateFormatUTC),
          image_preview: this.state.imageFile
        };
        this.props.createExamSchedule(data);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { isLoading, listExamQuestions, listExamQuestionOfSystemForCompanyToUse, t } = this.props;
    const { imageExamPreview, emails, isVisibleInputListEmail, isVisibleInputRegrexEmail, fromDate } = this.state;
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

    if (!listExamQuestions || !listExamQuestionOfSystemForCompanyToUse) {
      return <Loading />;
    } else {
      //get only listExamQuestions has exam_question_score
      let listExamQuestionsHasExamQuestionScore = listExamQuestions.filter(e => e.exam_question_score_id !== null);

      return (
        <DocumentTitle title={`Administrator - ${t('addNewExams')}`}>
          <WidgetPage>
            <CustomPageHeader to="/exam-schedules" title={t('addNewExams')} />
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
                  <Form.Item label={t('useExamQuestion')}>
                    {getFieldDecorator('exam_question_id', {
                      rules: [
                        { required: true, message: emptyMessage("Use Exam-question") }
                      ]
                    })(
                      <Select
                        // showSearch
                        // filterOption={(input, option) =>
                        //   console.log(option)
                          
                        //   // option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        // }
                      >
                        <OptGroup label={t('yourExamQuestions')}>
                          {listExamQuestionsHasExamQuestionScore.map(examQuestion => {
                            return <Option key={examQuestion.id} value={examQuestion.id}>{examQuestion.name}</Option>;
                          })}
                        </OptGroup>
                        <OptGroup label={t('examQuestionsOfSystem')}>
                          {listExamQuestionOfSystemForCompanyToUse.map(examQuestion => {
                            return <Option key={examQuestion.id} value={examQuestion.id}>{examQuestion.name}</Option>;
                          })}
                        </OptGroup>
                      </Select>
                    )}
                  </Form.Item>
                  <Form.Item label={t('fromDate')}>
                    {getFieldDecorator('from_date', {
                      rules: [
                        { required: true, message: emptyMessage("From date") },
                      ],
                    })(<DatePicker onChange={this.onChangeFromDate} disabledDate={e => disabledDate(e, moment())} className={styles.chooseBirthday} format={dateFormat} />)
                    }
                  </Form.Item>
                  <Form.Item label={t('toDate')}>
                    {getFieldDecorator('to_date', {
                      rules: [
                        { required: true, message: emptyMessage("To date") },
                      ],
                    })(<DatePicker disabledDate={e => disabledDate(e, fromDate)} className={styles.chooseBirthday} format={dateFormat} />)}
                  </Form.Item>
                  <Form.Item label={t('_participants')}>
                    <Checkbox onChange={this.toggleInputRegrexEmail}>{t('inviteUsingRegrexEmail')}</Checkbox>
                    {isVisibleInputRegrexEmail &&
                      <Input onChange={this.changeRegrexEmail} defaultValue="@" placeholder={t('inviteUsingRegrexEmailPlaceholder')} />
                    }
                    <br />
                    <Checkbox onChange={this.toggleInputListEmail}>{t('inviteUsingEmail')}</Checkbox>
                    {isVisibleInputListEmail &&
                      <ReactMultiEmail
                        placeholder={t('inviteEmail')}
                        emails={emails}
                        onChange={(_emails) => {
                          this.setState({ emails: _emails });
                        }}
                        getLabel={(
                          email,
                          index,
                          removeEmail
                        ) => {
                          return (
                            <div className={styles.tagEmail} data-tag key={index}>
                              {email}
                              <span data-tag-handle onClick={() => removeEmail(index)}>
                                ×
                          </span>
                            </div>
                          );
                        }}
                      />}
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
                  <p className="reminderParagraph"><Icon type="warning" /><b>{t('note')}</b>: {t('remindChooseScoreMapping')}</p>
                </Col>
              </Row>
              <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit" loading={isLoading}>
                  {t('createNew')}
                </Button>
              </Form.Item>
            </Form>
          </WidgetPage>
        </DocumentTitle>
      )
    }
  }
}

const WrappedAddExamSchedule = Form.create({ name: 'add-exam-schedule' })(AddExamSchedule);

const mapStateToProps = state => ({
  listExamQuestions: state.examquestionReducer.listExamQuestions,
  listExamQuestionOfSystemForCompanyToUse: state.examquestionReducer.listExamQuestionOfSystemForCompanyToUse,
  isLoading: state.examScheduleReducer.isLoadingCreate,
  err: state.examScheduleReducer.err,
  message: state.examScheduleReducer.message,
});

const mapDispatchToProps = dispatch => ({
  getAllExamQuestions: () => dispatch(actions.getAllExamQuestions()),
  getAllExamQuestionsOfSystemForCompany: () => dispatch(actions.getAllExamQuestionsOfSystemForCompany()),
  createExamSchedule: (data) => dispatch(actions.createExamSchedule(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(WrappedAddExamSchedule));