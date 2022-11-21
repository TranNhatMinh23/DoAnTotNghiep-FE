import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  directionPartFive, introductionReadingPart
} from '../../../../../constants/directionText';
import styles from './ViewPartFive.module.css';
import ScreenViewPartFive from './ScreenViewPartFive';
import { withTranslation } from 'react-i18next';
import { numberCorrectAnswerInPart } from '../../../../../shared/function';

class ViewPartFive extends PureComponent {

  render() {
    const { listQuestionPart5, listResult, t } = this.props;
    const numberResult = numberCorrectAnswerInPart(listQuestionPart5.questions, listResult);

    return (
      <Fragment>
        <div className="borderWidget">
          <p className={styles.titlePart}>READING TEST</p>
          <div className="direction">{introductionReadingPart}</div>
          <div className="part-number">
            PART {listQuestionPart5.part_no}:
            <span className="number-correct-per-total">
              {numberResult.correct + ' / ' + numberResult.total} <i>{t('correctPerTotal')}</i> = {numberResult.percent} %
            </span>
          </div>
          <div className="direction-widget">
            <span className="directions-label"> Directions: </span>
            {directionPartFive}
          </div>
        </div>
        <section>
          <ScreenViewPartFive
            listQuestionPart5={listQuestionPart5.questions}
            listResult={listResult}
          />
        </section>
      </Fragment>
    );
  }
}

ViewPartFive.propTypes = {
  listQuestionPart5: PropTypes.object
};

export default withTranslation()(ViewPartFive);