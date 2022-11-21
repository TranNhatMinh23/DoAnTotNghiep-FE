import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { listFourOption } from '../../../../../constants/numberOption';
import { additionalIsFirstGroup } from '../../../../../shared/function';
import { Radio } from 'antd';
import GroupQuestionIntroduce from './GroupQuestionIntroduce';

class RenderQuestionPartSeven extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      listQuestionPart7: additionalIsFirstGroup(this.props.listQuestionPart7),
    }
  }

  renderListQuestions = () => {
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };

    const { listQuestionPart7 } = this.state;
    let widgetQuestion = listQuestionPart7 ? listQuestionPart7.map(question => {
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

RenderQuestionPartSeven.propTypes = {
  listQuestionPart7: PropTypes.array,
  onChangeAnswer: PropTypes.func
};

export default RenderQuestionPartSeven;