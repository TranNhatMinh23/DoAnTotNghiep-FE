import React, { Component } from 'react';
import { listFourOption } from '../../../../../constants/numberOption';
import PropTypes from 'prop-types';

class ViewExample extends Component {
  render() {
    const { listQuestionPart1 } = this.props;
    return (
      <div className="example">
        <span className="example-label">Example:</span>
        <img alt="" src={process.env.REACT_APP_URL_API + listQuestionPart1.ex_question_image} />
        <div className="example-explanation">
          <p>Sample Answer</p>
          <p className="exAnswer">
            {listFourOption.map(ques => {
              return (
                <label key={ques.id}>
                  <span className={ques.value === listQuestionPart1.ex_answer_key ? 'checked' : ''}>{ques.value}</span>
                </label>
              )
            })}
          </p>
        </div>
      </div>
    );
  }
}

ViewExample.propTypes = {
  listQuestionPart1: PropTypes.object
};

export default ViewExample;