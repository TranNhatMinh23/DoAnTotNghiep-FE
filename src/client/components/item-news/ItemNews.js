import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './ItemNews.module.css';
import {limitText} from '../../../shared/function';
import preview from '../../../assets/preview/preview3.jpg';
import moment from 'moment';

class ItemNews extends Component {
  render() {
    const { itemRelated } = this.props;
    return (
      <Link to={`/tips/detail?id=${itemRelated.id}`}>
        <div className={styles.item}>
          <img src={itemRelated.image_url ? process.env.REACT_APP_URL_API + itemRelated.image_url : preview} alt="" />
          <div className={styles.rightContent}>
            <p className={styles.title}>
              {limitText(itemRelated.title, 12)} 
            </p>
            <p className={styles.date}><i className="fa fa-calendar"></i>&nbsp;{moment(itemRelated.created_at).format("DD/MM/YYYY")}</p>
          </div>
        </div>
      </Link>
    );
  }
}

export default ItemNews;