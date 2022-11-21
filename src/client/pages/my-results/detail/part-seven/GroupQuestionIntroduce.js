import React from 'react';

export default function GroupQuestionIntroduce(props) {
  return (
    <div className="groupQuestionIntroduce">
      <p>{props.question.group_desc}</p>
      {
        props.question.paragraph_image1 &&
          <div className="image-question">
            <img alt="" src={process.env.REACT_APP_URL_API + props.question.paragraph_image1} />
          </div>
      }
      {
        props.question.paragraph_image2 &&
          <div className="image-question">
            <img alt="" src={process.env.REACT_APP_URL_API + props.question.paragraph_image2} />
          </div>
      }
      {
        props.question.paragraph_image3 &&
          <div className="image-question">
            <img alt="" src={process.env.REACT_APP_URL_API + props.question.paragraph_image3} />
          </div>
      }
    </div>
  );
} 