import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import ReactHtmlParser from 'react-html-parser';
import styles from './DetailArticleScreen.module.css';
import moment from 'moment'; 
import { withTranslation } from 'react-i18next';

const dateFormat = "DD MMM YYYY HH:MM:SS";

class DetailArticleScreen extends Component {
  render() {
    const { detailArticle, t } = this.props; 
    
    return (
      <DocumentTitle title={`Tips - ${detailArticle.title}`}>
        <div className={`row ${styles.widgetdetailArticle}`}>
          <div className="col-md-12">
            <p className={styles.titleTip}>{detailArticle.title}</p>
            <p className={styles.dateCreated}>
              <i className="fa fa-calendar"></i>&nbsp;
              {moment(detailArticle.created_at).format(dateFormat)} - {t('by')} <b>Admin</b>
            </p>
            <p className={styles.tipDescription}>{detailArticle.description}</p>
            <div className={styles.contentTip}>
              {ReactHtmlParser(detailArticle.content)}
            </div>
          </div> 
        </div>
      </DocumentTitle>
    );
  }
}

export default withTranslation()(DetailArticleScreen);