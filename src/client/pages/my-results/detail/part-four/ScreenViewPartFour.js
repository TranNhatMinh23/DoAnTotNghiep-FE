import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { listFourOption } from '../../../../../constants/numberOption'; 
import YourChoice from '../../../../components/yourchoice/YourChoice';
import ItemAnswer from '../../../../components/item-answer/ItemAnswer';
import { getQuestionById, getAnswerKey, getAnswerById } from '../../../../../shared/function';

class ScreenViewPartFour extends Component {
  renderListQuestions = () => { 
    const { listQuestionPart4, listResult } = this.props;
    let widgetQuestion = listQuestionPart4 ? listQuestionPart4.map(question => {
      let answerResult = getQuestionById(listResult, question.id);
      const listAnswersInQuestion = question.answers;
      let answerKey = getAnswerKey(listAnswersInQuestion);
      return (
        <div id={`questionNo${question.id}`} key={question.id} ref={`questionNo${question.id}`} className="question-wrapper">
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
              let answerByPosition = getAnswerById(listAnswersInQuestion, answerResult[`position_`+(i+1)]);
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

ScreenViewPartFour.propTypes = {
  listQuestionPart4: PropTypes.array 
};

export default ScreenViewPartFour;