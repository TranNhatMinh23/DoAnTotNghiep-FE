import React from 'react';

export default function GroupQuestionIntroduce(props) {
  return (
    <div className="groupQuestionIntroduce">
      <p>Question {`${props.question.question_no} - ${props.question.question_no + 3} ${props.question.group_desc}`}</p>
      {
        props.question.paragraph_image1 ?
          <div className="image-question" style={{ textAlign: "center", width: '100% !important' }}>
            <img alt="" src={process.env.REACT_APP_URL_API + props.question.paragraph_image1} />
          </div>
          : null
      }
    </div>
  );
} 