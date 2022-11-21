import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import { connect } from 'react-redux';
import * as actions from '../../../../../store/actions/index';
import { Form, Input, Button, Select, Col, Row, Icon, Checkbox, Radio, DatePicker } from 'antd';
import CustomPageHeader from '../../../../components/common/custom-page-header/CustomPageHeader';
import {
  emptyMessage,
} from '../../../../../constants/validateInputMessage';
import styles from './EditExamScheduleForm.module.css';
import TextArea from 'antd/lib/input/TextArea';
import WidgetPage from '../../../../components/common/widget-page/WidgetPage';
import { ReactMultiEmail } from 'react-multi-email';
import 'react-multi-email/style.css';
import { withTranslation } from 'react-i18next';
import moment from 'moment';
import { disabledDate } from '../../../../../shared/function';
import EmailInviteToExam from './EmailInviteToExam';

const dateFormat = 'DD/MM/YYYY';
const dateFormatUTC = "YYYY-MM-DD HH:mm:ss";
const { Option, OptGroup } = Select;

class EditExamScheduleForm extends Component {
  state = {
    imageExamPreview: this.props.detailExamSchedule.image_preview ? process.env.REACT_APP_URL_API + this.props.detailExamSchedule.image_preview : null,
    imageFile: null,
    emails: [],
    isVisibleInputRegrexEmail: this.props.detailExamSchedule.regrex ? true : false,
    isVisibleInputListEmail: this.props.detailExamSchedule.listEmails.length > 0 ? true : false,
    regrexEmail: this.props.detailExamSchedule.regrex ? this.props.detailExamSchedule.regrex : "@",
    fromDate: this.props.detailExamSchedule ? moment(this.props.detailExamSchedule.from_date) : null
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.isEditSuccess) {
      this.setState({ emails: [] });
    };
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
        let dataListEmailInvited = this.state.emails.concat(this.props.detailExamSchedule.listEmails);
        let data = {
          name: values.name.trim(),
          description: values.description,
          exam_question_id: values.exam_question_id,
          is_shuffle_answer: values.is_shuffle_answer,
          image_preview: this.state.imageFile,
          regrexEmail: this.state.isVisibleInputRegrexEmail ? this.state.regrexEmail : "",
          listsEmail: this.state.isVisibleInputListEmail ? dataListEmailInvited : [],
          from_date: moment(values.from_date).format(dateFormatUTC),
          to_date: moment(values.to_date).format(dateFormatUTC),
        };
        const examScheduleId = this.props.detailExamSchedule.id;
        this.props.editExamSchedule(examScheduleId, data);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { isLoading, detailExamSchedule, listExamQuestions, listExamQuestionOfSystemForCompanyToUse, t } = this.props;
    const { imageExamPreview, emails, regrexEmail, isVisibleInputListEmail, isVisibleInputRegrexEmail, fromDate } = this.state;

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
    let listExamQuestionsHasExamQuestionScore = listExamQuestions.filter(e => e.exam_question_score_id !== null);

    return (
      <DocumentTitle title={`Administrator - ${t('editExams')}`}>
        <WidgetPage>
          <CustomPageHeader to="/exam-schedules" title={t('editExams')} />
          <p><Icon className={styles.iconTitle} type="border-outer" />{t('detailInfoExam')}</p>
          <Form {...formItemLayout} onSubmit={this.handleSubmit} className={styles.addUserForm}>
            <Row>
              <Col sm={24} md={18}>
                <Form.Item label={t('name')}>
                  {getFieldDecorator('name', {
                    rules: [
                      { required: true, message: emptyMessage("Name") },
                    ],
                    initialValue: detailExamSchedule.name
                  })(<Input />)}
                </Form.Item>
                <Form.Item label={t('description')}>
                  {getFieldDecorator('description', {
                    rules: [
                      { required: true, message: emptyMessage("Description") }
                    ],
                    initialValue: detailExamSchedule.description
                  })(<TextArea rows={4} />)}
                </Form.Item>
                <Form.Item label={t('useExamQuestion')}>
                  {getFieldDecorator('exam_question_id', {
                    rules: [
                      { required: true, message: emptyMessage("Use Exam-question") }
                    ],
                    initialValue: detailExamSchedule.exam_question_id
                  })(
                    <Select
                      // showSearch
                      // filterOption={(input, option) =>
                      //   option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
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
                    initialValue: detailExamSchedule.from_date ? moment(detailExamSchedule.from_date) : null
                  })(<DatePicker onChange={this.onChangeFromDate} disabledDate={e => disabledDate(e, moment())} className={styles.chooseBirthday} format={dateFormat} />)
                  }
                </Form.Item>
                <Form.Item label={t('toDate')}>
                  {getFieldDecorator('to_date', {
                    rules: [
                      { required: true, message: emptyMessage("To date") },
                    ],
                    initialValue: detailExamSchedule.to_date ? moment(detailExamSchedule.to_date) : null
                  })(<DatePicker disabledDate={e => disabledDate(e, fromDate)} className={styles.chooseBirthday} format={dateFormat} />)}
                </Form.Item>
                <Form.Item label={t('_participants')}>
                  <Checkbox onChange={this.toggleInputRegrexEmail} defaultChecked={isVisibleInputRegrexEmail}>{t('inviteUsingRegrexEmail')}</Checkbox>
                  {isVisibleInputRegrexEmail &&
                    <Input onChange={this.changeRegrexEmail} value={regrexEmail} defaultValue="@" placeholder={t('inviteUsingRegrexEmailPlaceholder')} />
                  }
                  <br />
                  <Checkbox onChange={this.toggleInputListEmail} defaultChecked={isVisibleInputListEmail}>{t('inviteUsingEmail')}</Checkbox>
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
                    rules: [{ required: true, message: emptyMessage("Shuffle answer") }],
                    initialValue: detailExamSchedule.is_shuffle_answer
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
          </Form>
          <EmailInviteToExam listEmailInvited={detailExamSchedule.listEmailInvited} examsId={detailExamSchedule.id} />
        </WidgetPage>
      </DocumentTitle>
    )
  }
}

const WrappedEditExamScheduleForm = Form.create({ name: 'edit-exam-schedule' })(EditExamScheduleForm);

const mapStateToProps = state => ({
  listExamQuestions: state.examquestionReducer.listExamQuestions,
  isLoading: state.examScheduleReducer.isLoadingEdit,
  isEditSuccess: state.examScheduleReducer.isEditSuccess,
  err: state.examScheduleReducer.err,
  message: state.examScheduleReducer.message,
});

const mapDispatchToProps = dispatch => ({
  getAllExamQuestions: () => dispatch(actions.getAllExamQuestions()),
  editExamSchedule: (examScheduleId, data) => dispatch(actions.editExamSchedule(examScheduleId, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(WrappedEditExamScheduleForm));