import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  directionPartSix
} from '../../../../../constants/directionText';
import ScreenViewPartSix from './ScreenViewPartSix';
import { withTranslation } from 'react-i18next';
import { numberCorrectAnswerInPart } from '../../../../../shared/function';

class ViewPartSix extends PureComponent {

  render() {
    const { listQuestionPart6, listResult, t } = this.props;
    const numberResult = numberCorrectAnswerInPart(listQuestionPart6.questions, listResult);

    return (
      <Fragment>
        <section>
          <div className="borderWidget">
            <div className="part-number">
              PART {listQuestionPart6.part_no}:
            <span className="number-correct-per-total">
                {numberResult.correct + ' / ' + numberResult.total} <i>{t('correctPerTotal')}</i> = {numberResult.percent} %
            </span>
            </div>
            <div className="direction-widget">
              <span className="directions-label"> Directions: </span>
              {directionPartSix}
            </div>
          </div>
          <ScreenViewPartSix
            listQuestionPart6={listQuestionPart6.questions}
            listResult={listResult}
          />
        </section>
      </Fragment>
    );
  }
}

ViewPartSix.propTypes = {
  listQuestionPart6: PropTypes.object
};

export default withTranslation()(ViewPartSix);