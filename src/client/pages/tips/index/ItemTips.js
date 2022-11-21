import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './ItemTips.module.css'; 
import preview from '../../../../assets/preview/preview3.jpg';
import { limitText, checkIsNew } from '../../../../shared/function';
import moment from 'moment';
import { withTranslation } from 'react-i18next';

const dateFormat = "DD MMM YYYY HH:MM"; 
const dateCheck = "DD/MM/YYYY HH:MM:SS";

class ItemTips extends Component {
  render() {
    const { tip, t } = this.props;
    return (
      <div className={`col-sm-12 col-lg-6`}>
        <div className={styles.itemTips}>
          <Link to={`/tips/detail?id=${tip.id}`}>
            <img src={tip.image_url ? process.env.REACT_APP_URL_API + tip.image_url : preview} alt="" />
          </Link>
          <div>
            <Link to={`/tips/detail?id=${tip.id}`}>
              <p className={styles.title}>
                {limitText(tip.title, 15)}
              </p>
              {checkIsNew(moment().format(dateCheck), moment(tip.created_at).format(dateCheck)) && <span className="wd-notify wd-notify-new">NEW</span>} 
            </Link>
            <p className={styles.date}><i className="fa fa-calendar"></i>{moment(tip.created_at).format(dateFormat)}</p>
            <p className={styles.description}>
              {limitText(tip.description, 20)}
              <Link className={styles.detailMore} to={`/tips/detail?id=${tip.id}`}> [ {t('detail')} ]</Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation()(ItemTips);