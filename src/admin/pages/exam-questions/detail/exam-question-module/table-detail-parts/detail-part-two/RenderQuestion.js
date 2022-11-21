import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../../../../store/actions/index';
import WidgetQuestion from '../../../../../../components/common/widget-question/WidgetQuestion';
import { Radio, Button } from 'antd';
import { listThreeOption } from '../../../../../../../constants/numberOption'; 
import { updateObject } from '../../../../../../../shared/utility';
import { getItemById, getAnswerKey } from '../../../../../../../shared/function';
import { withTranslation } from 'react-i18next';

class RenderQuestion extends Component {
  state = {
    objQuestion: this.props.partInfo.questions,
    idQuestionFocus: null
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

  render() {
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };
    const listQuestions = this.props.partInfo.questions;
    const { isSaving, t } = this.props;
    const { idQuestionFocus } = this.state;
    return (
      <div>
        {listQuestions.map(question => {
          return (
            <WidgetQuestion key={question.id}>
              <p className="question-name">{t('question')} {question.question_no}</p>
              <div>
                <Radio.Group onChange={(e) => this.onChangeAnswer(e, question.id)} defaultValue={getAnswerKey(question.answers)} >
                  {listThreeOption.map((item, index) => {
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
                  type={getAnswerKey(question.answers) ? "default" : "primary" }
                  loading={(isSaving && idQuestionFocus === question.id)}
                  onClick={() => this.onSaveDataAPI(question.id)}
                >
                  {getAnswerKey(question.answers) ? t('update') : t('save')}
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
  isSaving: state.detailPartReducer.isUpdateQuestion,
  err: state.detailPartReducer.err,
  message: state.detailPartReducer.message
});

const mapDispatchToProps = dispatch => ({
  updateQuestion: (questionId, data) => dispatch(actions.updateQuestion(questionId, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(RenderQuestion));