import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  directionPartTwo
} from '../../../../../constants/directionText';
import ScreenViewPartOneAndTwo from '../common/ScreenViewPartOneAndTwo';
import { numberCorrectAnswerInPart } from '../../../../../shared/function';
import { withTranslation } from 'react-i18next';

class ViewPartTwo extends PureComponent {

  render() {
    const { listQuestionPart2, listResult, t } = this.props;
    const numberResult = numberCorrectAnswerInPart(listQuestionPart2.questions, listResult);

    return (
      <Fragment>
        <section>
          <div className="borderWidget">
            <div className="part-number">
              PART {listQuestionPart2.part_no}:
            <span className="number-correct-per-total">
                {numberResult.correct + ' / ' + numberResult.total} <i>{t('correctPerTotal')}</i> = {numberResult.percent} %
            </span>
            </div>
            <div className="direction-widget">
              <span className="directions-label"> Directions: </span>
              {directionPartTwo}
            </div>
          </div>
          <ScreenViewPartOneAndTwo
            listQuestionInPart={listQuestionPart2.questions}
            listResult={listResult}
            partNo="2"
          />
        </section>
      </Fragment>
    );
  }
}

ViewPartTwo.propTypes = {
  listQuestionPart2: PropTypes.object
};

export default withTranslation()(ViewPartTwo);