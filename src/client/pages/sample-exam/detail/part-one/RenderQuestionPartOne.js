import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { listFourOption } from '../../../../../constants/numberOption';
import { Radio } from 'antd';

class RenderQuestionPartOne extends PureComponent {
  renderQuestionPartOne = () => {
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };
    const { listQuestionPart1 } = this.props;
    let widgetQuestion = listQuestionPart1 ? listQuestionPart1.map(question => { 
      return (
        <div id={`questionNo${question.id}`} key={question.id} ref={`questionNo${question.id}`} className="question-wrapper">
          <span className="question-number">{question.question_no}.</span>
          <div className="image-question">
            <img alt="" src={process.env.REACT_APP_URL_API + question.question_image} />
          </div>
          <div className="answer-wrapper">
            {
              question.answers.length > 0 &&
              <Radio.Group onChange={(e) => this.props.onChangeAnswer(e, question.id)}>
                {question.answers &&
                  question.answers.map((ans, index) => { 
                    return (
                      <Radio style={radioStyle} key={ans.id} value={listFourOption[index].value+ans.id}>
                        {listFourOption[index].value}. 
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
        {this.renderQuestionPartOne()}
      </Fragment>
    );
  }
}

RenderQuestionPartOne.propTypes = {
  listQuestionPart1: PropTypes.array,
  onChangeAnswer: PropTypes.func
};

export default RenderQuestionPartOne;