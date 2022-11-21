import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  directionPartSeven
} from '../../../../../constants/directionText';
import ScreenViewPartSeven from './ScreenViewPartSeven';
import { withTranslation } from 'react-i18next';
import { numberCorrectAnswerInPart } from '../../../../../shared/function';

class ViewPartSeven extends PureComponent {

  render() {
    const { listQuestionPart7, listResult, t } = this.props;
    const numberResult = numberCorrectAnswerInPart(listQuestionPart7.questions, listResult);

    return (
      <Fragment>
        <section>
          <div className="borderWidget">
            <div className="part-number">
              PART {listQuestionPart7.part_no}:
            <span className="number-correct-per-total">
                {numberResult.correct + ' / ' + numberResult.total} <i>{t('correctPerTotal')}</i> = {numberResult.percent} %
            </span>
            </div>
            <div className="direction-widget">
              <span className="directions-label"> Directions: </span>
              {directionPartSeven}
            </div>
          </div>
          <ScreenViewPartSeven
            listQuestionPart7={listQuestionPart7.questions}
            listResult={listResult}
          />
        </section>
      </Fragment>
    );
  }
}

ViewPartSeven.propTypes = {
  listQuestionPart7: PropTypes.object
};

export default withTranslation()(ViewPartSeven);