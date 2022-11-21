import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../../../../store/actions/index';
import { Radio, Button, Input } from 'antd';
import WidgetQuestion from '../../../../../../components/common/widget-question/WidgetQuestion';
import { listFourOption } from '../../../../../../../constants/numberOption';
import { updateObject } from '../../../../../../../shared/utility'; 
import { updateQuestionTextInList, getItemById, getAnswerKey } from '../../../../../../../shared/function';
import { withTranslation } from 'react-i18next';

class RenderQuestionPartFive extends PureComponent {
  state = {
    objQuestion: this.props.partInfo.questions,
    idQuestionFocus: null,
  }

  onChangeQuestionText = (e, questionId) => {
    let value = e.target.value;
    this.setState({
      objQuestion: updateQuestionTextInList(this.state.objQuestion, questionId, value),
    });
  }

  changeInputAnswer = (e, questionId, answerId) => {
    let content = e.target.value; 
    const objectNew = this.state.objQuestion.map(question => {
      if (question.id !== questionId) return question;
      let answersUpdate = question.answers.map(answer => {
        if (answer.id === answerId) return updateObject(answer, { content: content });
        return answer;
      }); 
      return updateObject(question, {
        answers: answersUpdate
      });
    });
    this.setState({ objQuestion: objectNew });
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
      data: question.answers,
      question_text: question.question_text
    };  
    this.setState({ idQuestionFocus: id }, () => {
      this.props.updateQuestion(question.id, data);
    });
  }

  render() {
    const listQuestions = this.props.partInfo.questions;
    const { isSaving, t } = this.props;
    const { idQuestionFocus } = this.state;

    return (
      <div>
        {listQuestions.map(question => {
          return (
            <WidgetQuestion key={question.id}>
              <div className="question-with-input">
                <p className="question-name">{t('question')} {question.question_no}: </p>
                <Input className="input-question" defaultValue={question.question_text} onChange={(e) => this.onChangeQuestionText(e, question.id)} placeholder="Input question" />
              </div>
              <div>
                <Radio.Group onChange={(e) => this.onChangeAnswer(e, question.id)} defaultValue={getAnswerKey(question.answers)} >
                  {listFourOption.map((item, index)=> {
                    let itemAnswer = question.answers[index];
                    return (
                      <Radio className="item-answer" key={item.id} value={itemAnswer ? itemAnswer.id : ''}>
                        {item.value}.<Input className="input-answer" defaultValue={itemAnswer ? itemAnswer.content : ''} onChange={(e) => this.changeInputAnswer(e, question.id, itemAnswer ? itemAnswer.id : null)} placeholder="Input answer" />
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

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(RenderQuestionPartFive));