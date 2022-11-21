import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { listFourOption, listThreeOption } from '../../../../../constants/numberOption';
import { getQuestionById, getAnswerKey } from '../../../../../shared/function';
import ItemAnswer from '../../../../components/item-answer/ItemAnswer';
import YourChoice from '../../../../components/yourchoice/YourChoice';

class ScreenViewPartOneAndTwo extends Component {
  
  renderQuestions = () => {
    const { listQuestionInPart, listResult, partNo } = this.props; 
    let listOptionAnswer = partNo === "2" ? listThreeOption : listFourOption;
    let widgetQuestion = listQuestionInPart ? listQuestionInPart.map(question => { 
      let answerResult = getQuestionById(listResult, question.id);
      let answerKey = getAnswerKey(question.answers);
      return (
        <div id={`questionNo${question.id}`} key={question.id} ref={`questionNo${question.id}`} className="question-wrapper">
          <p className="question-number">
            {question.question_no}. {partNo === "2" && <span style={{fontWeight: '400'}}>Mark your answer on your answer sheet.</span>}
          </p>
          {
            partNo === "1" &&
            <div className="image-question">
              <img alt="" src={process.env.REACT_APP_URL_API + question.question_image} />
            </div>
          }
          <div className="answer-wrapper"> 
            <YourChoice
              yourAnswer={answerResult.your_answer}
              isCorrect={answerResult.your_answer_code === answerKey}
            />
            {question.answers.map((ques, i) => {
              return (
                <ItemAnswer
                  key={ques.id}
                  answerLabel={listOptionAnswer[i].value}
                  answerText=""
                  correct={answerKey === ques.id}
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
        {this.renderQuestions()}
      </Fragment>
    );
  }
}

ScreenViewPartOneAndTwo.propTypes = {
  listQuestionInPart: PropTypes.array,
  detailResult: PropTypes.array,
  partNo: PropTypes.string
}

ScreenViewPartOneAndTwo.defaultProps = {
  detailResult: []
}

export default ScreenViewPartOneAndTwo;