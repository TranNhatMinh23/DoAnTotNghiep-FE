import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { listFourOption } from '../../../../../constants/numberOption';
import { Radio } from 'antd';

class RenderQuestionPartThree extends Component {
  renderListQuestions = () => {
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };
    const { listQuestionPart3 } = this.props;
    let widgetQuestion = listQuestionPart3 ? listQuestionPart3.map(question => {
      return (
        <div id={`questionNo${question.id}`} key={question.id} ref={`questionNo${question.id}`} className="question-wrapper img-in-question">
          <span className="question-number">{question.question_no}.</span>
          <span>{question.question_text}</span>
          {
            question.question_image &&
            <div className="image-question center">
              <img alt="" src={process.env.REACT_APP_URL_API + question.question_image} />
            </div> 
          }
          <div className="answer-wrapper"> 
            {
              question.answers.length > 0 &&
              <Radio.Group onChange={(e) => this.props.onChangeAnswer(e, question.id)}>
                {question.answers &&
                  question.answers.map((ans, index) => {
                    return (
                      <Radio style={radioStyle} key={ans.id} value={listFourOption[index].value + ans.id}>
                        {listFourOption[index].value}. {ans.content}
                      </Radio>
                    );
                  })
                }
              </Radio.Group>
            }
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

RenderQuestionPartThree.propTypes = {
  listQuestionPart3: PropTypes.array,
  onChangeAnswer: PropTypes.func
};

export default RenderQuestionPartThree;