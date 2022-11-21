import React, { PureComponent } from 'react';
import ScreenViewPartThree from './ScreenViewPartThree.js';
import { directionPartThree } from '../../../../../constants/directionText.js';
import { numberCorrectAnswerInPart } from '../../../../../shared/function.js';
import { withTranslation } from 'react-i18next';

class ViewPartThree extends PureComponent {
  render() {
    const { listQuestionPart3, listResult, t } = this.props;
    const numberResult = numberCorrectAnswerInPart(listQuestionPart3.questions, listResult);

    if (listQuestionPart3 !== "undefined" && listQuestionPart3) {
      return (
        <section className="test-part">
          <div className="borderWidget">
            <h3 className="part-number">
              PART {listQuestionPart3.part_no}:
            <span className="number-correct-per-total">
                {numberResult.correct + ' / ' + numberResult.total} <i>{t('correctPerTotal')}</i> = {numberResult.percent} %
            </span>
            </h3>
            <div className="directions"><span className="directions-label">Directions: </span>{directionPartThree}</div>
          </div>
          <ScreenViewPartThree
            listQuestionPart3={listQuestionPart3.questions}
            listResult={listResult}
          />
        </section>
      )
    }
    return <p></p>;
  }
}

export default withTranslation()(ViewPartThree);