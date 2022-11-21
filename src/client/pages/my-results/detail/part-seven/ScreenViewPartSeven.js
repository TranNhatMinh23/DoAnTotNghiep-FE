import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { listFourOption } from '../../../../../constants/numberOption';
import { additionalIsFirstGroup, getQuestionById, getAnswerKey, getAnswerById } from '../../../../../shared/function';
import YourChoice from '../../../../components/yourchoice/YourChoice';
import ItemAnswer from '../../../../components/item-answer/ItemAnswer';
import GroupQuestionIntroduce from './GroupQuestionIntroduce';

class ScreenViewPartSeven extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listQuestionPart7: additionalIsFirstGroup(this.props.listQuestionPart7),
    }
  }

  renderListQuestions = () => {
    const { listQuestionPart7 } = this.state;
    const { listResult } = this.props;
    let widgetQuestion = listQuestionPart7 ? listQuestionPart7.map(question => {
      let answerResult = getQuestionById(listResult, question.id);
      const listAnswersInQuestion = question.answers;
      let answerKey = getAnswerKey(listAnswersInQuestion);
      return (
        <Fragment key={question.id}>
          {question.isFirstGroup && <GroupQuestionIntroduce question={question} />}
          <div id={`questionNo${question.id}`} ref={`questionNo${question.id}`} className="question-wrapper">
            <span className="question-number">{question.question_no}.</span>
            <span>{question.question_text}</span>
            {
              question.question_image &&
              <div className="image-question center">
                <img alt="" src={process.env.REACT_APP_URL_API + question.question_image} />
              </div>
            }
            <div className="answer-wrapper">
              <YourChoice
                yourAnswer={answerResult.your_answer}
                isCorrect={answerResult.your_answer_code === answerKey}
              />
              {listAnswersInQuestion.map((ques, i) => {
                let answerByPosition = getAnswerById(listAnswersInQuestion, answerResult[`position_` + (i + 1)]);
                return (
                  <ItemAnswer
                    key={ques.id}
                    answerLabel={listFourOption[i].value}
                    answerText={answerByPosition ? answerByPosition.content : ''}
                    correct={answerKey === answerByPosition.id}
                  />
                )
              })}
            </div>
          </div>
        </Fragment>
      )
    }) : null;

    return widgetQuestion;
  }

  render() {
    return (
      <Fragment>
        {this.renderListQuestions()}
      </Fragment>
    );
  }
}

ScreenViewPartSeven.propTypes = {
  listQuestionPart7: PropTypes.array
};

export default ScreenViewPartSeven;