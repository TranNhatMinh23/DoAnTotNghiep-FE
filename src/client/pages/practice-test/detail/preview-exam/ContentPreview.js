import React, { Component, Fragment } from 'react';
import styles from './ContentPreview.module.css';
import TitleFrame from '../../../../components/title-frame/TitleFrame';
import { withTranslation } from 'react-i18next';

class ContentPreview extends Component {
  render() {
    const { t } = this.props;
    return (
      <Fragment>
        <TitleFrame>{t('content')}</TitleFrame>
        <div className={styles.contentPreview}>
          <p>LISTENING TEST ( 45 {t('minutes')})</p>
          <ul>
            <li>{t('part')} 1: <span>6 {t('questions')}</span></li>
            <li>{t('part')} 2: <span>25 {t('questions')}</span></li>
            <li>{t('part')} 3: <span>39 {t('questions')}</span></li>
            <li>{t('part')} 4: <span>30 {t('questions')}</span></li>
          </ul>
          <p>READING TEST ( 75 {t('minutes')})</p>
          <ul>
            <li>{t('part')} 5: <span>30 {t('questions')}</span></li>
            <li>{t('part')} 6: <span>16 {t('questions')}</span></li>
            <li>{t('part')} 7: <span>54 {t('questions')}</span></li>
          </ul>
        </div>
      </Fragment>
    )
  }
}

export default withTranslation()(ContentPreview);
