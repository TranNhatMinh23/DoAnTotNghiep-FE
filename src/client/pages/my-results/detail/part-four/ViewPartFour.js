import React, { PureComponent } from 'react';
import ScreenViewPartFour from './ScreenViewPartFour';
import NotFoundPage from '../../../../components/not-found/NotFound';
import { directionPartFour } from '../../../../../constants/directionText';
import { numberCorrectAnswerInPart } from '../../../../../shared/function';
import { withTranslation } from 'react-i18next';

class ViewPartFour extends PureComponent {
  render() {
    const { listQuestionPart4, listResult, t } = this.props;
    const numberResult = numberCorrectAnswerInPart(listQuestionPart4.questions, listResult);

    if (listQuestionPart4 !== "undefined" && listQuestionPart4) {
      return (
        <section className="test-part">
          <div className="borderWidget">
            <h3 className="part-number">
              PART {listQuestionPart4.part_no}:
            <span className="number-correct-per-total">
                {numberResult.correct + ' / ' + numberResult.total} <i>{t('correctPerTotal')}</i> = {numberResult.percent} %
            </span>
            </h3>
            <div className="directions"><span className="directions-label">
              Directions: </span>{directionPartFour}
            </div>
          </div>
          <ScreenViewPartFour
            listQuestionPart4={listQuestionPart4.questions}
            listResult={listResult}
          />
        </section>
      )
    }
    return <NotFoundPage />
  }
}

export default withTranslation()(ViewPartFour);