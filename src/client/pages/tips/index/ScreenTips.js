import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import styles from './ScreenTips.module.css';
import { Pagination } from 'antd';
import { withRouter } from 'react-router-dom';
import ItemTips from './ItemTips';
import { withTranslation } from 'react-i18next';

class ScreenTips extends Component {
  onChangeCurrentPage = (page) => {
    this.props.getAllTips(page);
    this.props.history.push(`/tips?page=${page}`);
  }

  render() {
    const { listTips, t } = this.props;

    return (
      <DocumentTitle title='Tips'>
        <div className={`${styles.screenPractice}`}> 
          <p className="title-page"><i className="fa fa-book"></i> &nbsp;{t('titleTips')}</p> 
          {listTips.data.length === 0 && <p>{t('noPosts')}</p>}
          <div className={`row ${styles.listItemTips}`}>
            {listTips.data.map(tip => {
              return <ItemTips key={tip.id} tip={tip} />
            })}
          </div>
          {
            listTips.total > 0 &&
            <div className="pagination-class">
              <Pagination
                pageSize={listTips.per_page}
                current={listTips.current_page}
                onChange={this.onChangeCurrentPage}
                defaultCurrent={listTips.current_page}
                total={listTips.total}
              />
            </div>
          }
        </div>
      </DocumentTitle>
    )
  }
}

export default withRouter(withTranslation()(ScreenTips));