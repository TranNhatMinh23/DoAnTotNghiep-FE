import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './ItemNews.module.css';
import defaultImage from '../../../../assets/preview/preview1.jpg';
import { checkIsNew, limitText } from '../../../../shared/function';
import { withTranslation } from 'react-i18next';
import moment from 'moment';
import { Icon } from 'antd';

const dateCheck = "DD/MM/YYYY HH:mm:ss";

class ItemNews extends Component {
  render() {
    const { detailNew, t } = this.props; 
    
    return (
      <div className={styles.wdItem}>
        <Link to={`/view-detail-article?id=${detailNew.id}`}>
          <img className={styles.image} src={detailNew.image_url ? process.env.REACT_APP_URL_API + detailNew.image_url : defaultImage} alt="" />
        </Link>
        <div className={styles.rightContent}>
          <Link to={`/view-detail-article?id=${detailNew.id}`}>
            <p className="title-with-notify">{limitText(detailNew.title, 20)}</p>  
            {checkIsNew(moment().format(dateCheck), moment(detailNew.created_at).format(dateCheck)) && <span className="wd-notify wd-notify-new">{t('new')}</span>} 
          </Link>
          <p className={styles.date}>
            <i className="fa fa-calendar"></i>&nbsp;
            {moment(detailNew.created_at).format("DD-MM-YYYY HH:mm:ss")}
            <span><Icon type="folder" />{detailNew.category_name}</span>
          </p>
        </div>
      </div>
    );
  }
}

export default withTranslation()(ItemNews);