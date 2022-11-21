import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import ReactHtmlParser from 'react-html-parser';
import styles from './ScreenDetailTip.module.css';
import moment from 'moment';
import ItemNews from '../../../components/item-news/ItemNews';
import { withTranslation } from 'react-i18next';

const dateFormat = "DD MMM YYYY HH:MM:SS";

class ScreenDetailTip extends Component {
  render() {
    const { detailTip, releatedTips, t } = this.props;
    return (
      <DocumentTitle title={`Tips - ${detailTip.title}`}>
        <div className={`row ${styles.widgetDetailTip}`}>
          <div className="col-md-8">
            <p className={styles.titleTip}>{detailTip.title}</p>
            <p className={styles.dateCreated}>
              <i className="fa fa-calendar"></i>&nbsp;
              {moment(detailTip.created_at).format(dateFormat)} - {t('by')} <b>Admin</b>
            </p>
            <p className={styles.tipDescription}>{detailTip.description}</p>
            <div className={styles.contentTip}>
              {ReactHtmlParser(detailTip.content)}
            </div>
          </div>
          <div className="col-md-4">
            <label className={styles.labelTab}>{t('relatedTips')}</label>
            {
              releatedTips.map(item => {
                return <ItemNews key={item.id} itemRelated={item} />
              })
            }
          </div>
        </div>
      </DocumentTitle>
    );
  }
}

export default withTranslation()(ScreenDetailTip);