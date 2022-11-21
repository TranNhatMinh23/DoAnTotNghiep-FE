import React, { Component, Fragment } from 'react';
import TitleFrame from '../../../../components/title-frame/TitleFrame';
import styles from './CompletionRules.module.css';
import { withTranslation } from 'react-i18next';

class CompletionRules extends Component {
  render() {
    const  { t } = this.props;
    return (
      <Fragment>
        <TitleFrame>{t('rules')}</TitleFrame>
        <div className={styles.contentCompletionRole}>
          <p>{t('contentRules')}</p>
        </div>
      </Fragment>
    )
  }
}

export default withTranslation()(CompletionRules);
