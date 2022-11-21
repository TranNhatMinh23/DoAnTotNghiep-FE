import React, { Component, Fragment } from 'react';
import { introductionListeningPart, directionPartOne } from '../../../../../constants/directionText';
import styles from './ViewPartOne.module.css';
import ViewAudio from './ViewAudio';
import ViewExample from './ViewExample';
import ScreenViewPartOneAndTwo from '../common/ScreenViewPartOneAndTwo';
import { numberCorrectAnswerInPart } from '../../../../../shared/function';
import { withTranslation } from 'react-i18next';

class ViewPartOne extends Component {
  render() {
    const { listQuestionPart1, audio, listResult, t } = this.props;
    const numberResult = numberCorrectAnswerInPart(listQuestionPart1.questions, listResult);

    return (
      <Fragment>
        <div className="borderWidget">
          <p className={styles.titlePart}>LISTENING TEST</p>
          <div className="direction">{introductionListeningPart}</div>
        </div>
        <ViewAudio audio={audio} />
        <section>
          <div className="borderWidget">
            <div className="part-number">
              PART {listQuestionPart1.part_no}:
            <span className="number-correct-per-total">
                {numberResult.correct + ' / ' + numberResult.total} <i>{t('correctPerTotal')}</i> = {numberResult.percent} %
            </span>
            </div>
            <div className="direction-widget">
              <span className="directions-label"> Directions: </span>
              {directionPartOne}
            </div>
          </div>
          <ViewExample listQuestionPart1={listQuestionPart1} />
          <ScreenViewPartOneAndTwo
            listQuestionInPart={listQuestionPart1.questions}
            listResult={listResult}
            partNo="1"
          />
        </section>
      </Fragment>
    );
  }
}

export default withTranslation()(ViewPartOne);