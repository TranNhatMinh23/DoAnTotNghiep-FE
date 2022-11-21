import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import styles from './NotFound.module.css';
import { withTranslation } from 'react-i18next'; 

class NotFoundPage extends Component {
  render(){
    const { t } = this.props;

    return (
      <DocumentTitle title={t('notFoundPage')}> 
        <div className={styles.notfound}>
          {t('notFoundPage')} 
          <p><i className="fa fa-frown-o"></i></p>
        </div>
      </DocumentTitle>
    );
  }
}

export default withTranslation()(NotFoundPage);