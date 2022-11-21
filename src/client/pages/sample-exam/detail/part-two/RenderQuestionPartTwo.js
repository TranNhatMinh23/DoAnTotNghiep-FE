import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { listThreeOption } from '../../../../../constants/numberOption';
import { Radio } from 'antd';

class RenderQuestionPartTwo extends PureComponent {
  renderListQuestions = () => {
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };
    const { listQuestionPart2 } = this.props;
    let widgetQuestion = listQuestionPart2 ? listQuestionPart2.map(question => {
      return (
        <div id={`questionNo${question.id}`} key={question.id} ref={`questionNo${question.id}`} className="question-wrapper">
          <span className="question-number">{question.question_no}.</span>
          <span>Mark your answer on your answer sheet.</span>
          <div className="answer-wrapper">
            {
              question.answers.length > 0 &&
              <Radio.Group onChange={(e) => this.props.onChangeAnswer(e, question.id)}>
                {question.answers &&
                  question.answers.map((ans, index) => {
                    return (
                      <Radio style={radioStyle} key={ans.id} value={listThreeOption[index].value + ans.id}>
                        {listThreeOption[index].value}.
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

RenderQuestionPartTwo.propTypes = {
  listQuestionPart2: PropTypes.array,
  onChangeAnswer: PropTypes.func
};

export default RenderQuestionPartTwo;