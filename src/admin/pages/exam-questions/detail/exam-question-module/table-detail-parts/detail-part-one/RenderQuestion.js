import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../../../../store/actions/index';
import { Radio, Button, Icon, message } from 'antd';
import WidgetQuestion from '../../../../../../components/common/widget-question/WidgetQuestion'; 
import { listFourOption } from '../../../../../../../constants/numberOption';
import { updateObject } from '../../../../../../../shared/utility';
import loadingGif from '../../../../../../assets/icons/spinner2.gif';
import styles from './RenderQuestion.module.css';
import { getAnswerKey, getItemById } from '../../../../../../../shared/function';
import { withTranslation } from 'react-i18next';

class RenderQuestion extends PureComponent {
  state = {
    objQuestion: this.props.partInfo.questions,
    idQuestionFocus: null,
    currentFile: null
  }

  changeImageQuestion = (e, questionId) => {
    let files = e.target.files;
    if (files) {
      this.setState({ currentFile: files, idQuestionFocus: questionId }, () => {
        this.props.uploadQuestionImage(questionId, files[0]);
      });
    } else {
      message.error("No files!");
    }
  }

  onChangeAnswer = (e, id) => {
    const objectNew = this.state.objQuestion.map(question => {
      if (question.id !== id) return question;
      let answersUpdate = question.answers.map(answer => {
        if (answer.id !== e.target.value) {
          return updateObject(answer, { is_correct_flag: false });
        } else {
          return updateObject(answer, { is_correct_flag: true });
        }
      });
      return updateObject(question, {
        answers: answersUpdate
      });
    });
    this.setState({ objQuestion: objectNew });
  }

  onSaveDataAPI = (id) => {
    let question = getItemById(this.state.objQuestion, id);  
    let data = {
      data: question.answers 
    }; 
    this.setState({ idQuestionFocus: id, currentFile: null }, () => {
      this.props.updateQuestion(question.id, data);
    });
  }

  deleteQuestionImage = (questionId) => {
    this.props.deleteQuestionImage(questionId);
  }

  render() {
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };

    const listQuestions = this.props.partInfo.questions;
    const { isUploadQuestionImage, isSaving, t } = this.props;
    const { idQuestionFocus } = this.state; 

    return (
      <div>
        {listQuestions.map(question => {
          return (
            <WidgetQuestion key={question.id}>
              <p className="question-name">{t('question')} {question.question_no}</p>
              <div className={`row ${styles.displayImage}`}>
                <div className="col-md-12 image-preview">
                  {
                    (isUploadQuestionImage && idQuestionFocus === question.id) ?
                      <div className="dialog-image">
                        <img className="img-loading" src={loadingGif} alt="" />
                      </div>
                      : question.question_image ?
                        <div className="dialog-image">
                          <img id={`Image${question.id}`} src={process.env.REACT_APP_URL_API + question.question_image} alt="" />
                          <p className="close-classic" onClick={() => this.deleteQuestionImage(question.id)}></p>
                        </div>
                        : ''
                  }
                </div>
              </div>
              <p>
                <input
                  id={`upload-image-${question.id}`}
                  accept="image/*"
                  onChange={(e) => this.changeImageQuestion(e, question.id)}
                  className="input-file"
                  type="file"
                />
                <Button type="primary">
                  <label htmlFor={`upload-image-${question.id}`} className="lb-input-file">
                    <Icon type="upload" /> {t('uploadImage')}
                  </label>
                </Button>
              </p>
              <div>
                <Radio.Group onChange={(e) => this.onChangeAnswer(e, question.id)} defaultValue={getAnswerKey(question.answers)} >
                  {listFourOption.map((item, index) => {
                    let itemAnswer = question.answers[index];
                    return (
                      <Radio style={radioStyle} key={item.id} value={itemAnswer ? itemAnswer.id : ''}>
                        {item.value}.
                      </Radio>
                    )
                  })}
                </Radio.Group>
              </div>
              <p className="lb-direction-question">{t('instructionEachQuestion')}</p>
              <div className="btn-submit-widget-question">
                <Button
                  type={getAnswerKey(question.answers) ? "default" : "primary"}
                  loading={(isSaving && idQuestionFocus === question.id)}
                  onClick={() => this.onSaveDataAPI(question.id)}
                >
                  {getAnswerKey(question.answers) ? t('update') : t('save') }
                </Button>
              </div>
            </WidgetQuestion>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isUploadQuestionImage: state.detailPartReducer.isUploadQuestionImage,
  isSaving: state.detailPartReducer.isUpdateQuestion,
  err: state.detailPartReducer.err,
  message: state.detailPartReducer.message
});

const mapDispatchToProps = dispatch => ({
  uploadAudioForTest: (examQuestionId, files) => dispatch(actions.uploadAudioForTest(examQuestionId, files)),
  updateQuestion: (questionId, data) => dispatch(actions.updateQuestion(questionId, data)),
  uploadQuestionImage: (questionId, files) => dispatch(actions.uploadQuestionImage(questionId, files)),
  deleteQuestionImage: (questionId) => dispatch(actions.deleteQuestionImage(questionId))
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(RenderQuestion));