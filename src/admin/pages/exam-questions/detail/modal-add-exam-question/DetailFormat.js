import React, { Component } from 'react';
import {
  NEW_FORMAT,
  DETAIL_NEW_FORMAT,
  DETAIL_OLD_FORMAT
} from '../../../../../constants/defineConst';
import styles from './ModalAddExamQuestion.module.css';
import { withTranslation } from 'react-i18next';

class DetailFormat extends Component {
  render() {
    const { formatCode, t } = this.props;
    return (
      <>
        {
          formatCode === NEW_FORMAT ?
            <div className={`row ${styles.detailFormatInfo}`}>
              <div className="col-6">
                <p>Part one: {DETAIL_NEW_FORMAT.PART_1} {t('question')}</p>
                <p>Part two: {DETAIL_NEW_FORMAT.PART_2} {t('question')}</p>
                <p>Part three: {DETAIL_NEW_FORMAT.PART_3} {t('question')}</p>
                <p>Part four: {DETAIL_NEW_FORMAT.PART_4} {t('question')}</p>
              </div>
              <div className="col-6">
                <p>Part five: {DETAIL_NEW_FORMAT.PART_5} {t('question')}</p>
                <p>Part six: {DETAIL_NEW_FORMAT.PART_6} {t('question')}</p>
                <p>Part seven: {DETAIL_NEW_FORMAT.PART_7} {t('question')}</p>
              </div>
            </div>
            :
            <div className={`row ${styles.detailFormatInfo}`}>
              <div className="col-6">
                <p>Part one: {DETAIL_OLD_FORMAT.PART_1} {t('question')}</p>
                <p>Part two: {DETAIL_OLD_FORMAT.PART_2} {t('question')}</p>
                <p>Part three: {DETAIL_OLD_FORMAT.PART_3} {t('question')}</p>
                <p>Part four: {DETAIL_OLD_FORMAT.PART_4} {t('question')}</p>
              </div>
              <div className="col-6">
                <p>Part five: {DETAIL_OLD_FORMAT.PART_5} {t('question')}</p>
                <p>Part six: {DETAIL_OLD_FORMAT.PART_6} {t('question')}</p>
                <p>Part seven: {DETAIL_OLD_FORMAT.PART_7} {t('question')}</p>
              </div>
            </div>
        }
      </>
    );
  }
}

export default withTranslation()(DetailFormat);