import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ItemNews from '../item-news/ItemNews';
import styles from './ListNews.module.css';
import { Icon } from 'antd';
import { withTranslation } from 'react-i18next';

class ListNews extends Component {
  render() {
    const { news, t } = this.props;
    return (
      <div>
        {news && news.map(n => {
          return <ItemNews key={n.id} detailNew={n} />
        })}

        {
          news.length > 0 &&
          <p className={styles.viewmore}>
            <Link to={`/view-all?type=news`}>{t('seeAll')}<Icon type="arrow-right" /></Link>
          </p>
        }
      </div>
    );
  }
}

export default withTranslation()(ListNews);