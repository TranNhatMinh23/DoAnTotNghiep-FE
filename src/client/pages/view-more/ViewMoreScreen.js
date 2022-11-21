import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import styles from './ViewMoreScreen.module.css';
import { Pagination, Icon } from 'antd';
import { withRouter } from 'react-router-dom';
import ItemNotification from '../homepage/item-notification/ItemNotification';
import ItemNews from '../homepage/item-news/ItemNews';
import { withTranslation } from 'react-i18next';

class ViewMoreScreen extends Component {
  onChangeCurrentPage = (page) => {
    const { type } = this.props;
    this.props.getAllArticleClient(type, page);
    this.props.history.push(`/view-all?type=${type}&page=${page}`);
  }

  render() {
    const { dataViewAll, type, t } = this.props;

    return (
      <DocumentTitle title={`English center - ${t('viewMore')}`}>
        <div className={`${styles.screenPractice}`}>
          <p className="title-page">
            <Icon className={styles.iconFolder} type="folder-open" /> &nbsp;
            <span className={styles.name}>{type === 'notifications' ? t('notifications') : t('news')}</span>
          </p>
          {dataViewAll.data.length === 0 && <p>{t('noPosts')}</p>}
          <div className={`row ${styles.listItemTips}`}>
            {dataViewAll.data.map(article => {
              return (
                type === "notifications" ?
                  <div className="col-md-4" key={article.id}><ItemNotification key={article.id} noti={article} /></div>
                  :  
                  <div className="col-md-4" key={article.id}><ItemNews key={article.id} detailNew={article} /></div>
              );
            })}
          </div>
          {
            dataViewAll.total > 0 &&
            <div className="pagination-class">
              <Pagination
                pageSize={dataViewAll.per_page}
                current={dataViewAll.current_page}
                onChange={this.onChangeCurrentPage}
                defaultCurrent={dataViewAll.current_page}
                total={dataViewAll.total}
              />
            </div>
          }
        </div>
      </DocumentTitle>
    )
  }
}

export default withRouter(withTranslation()(ViewMoreScreen));