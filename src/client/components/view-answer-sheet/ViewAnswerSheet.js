import React, { Component } from 'react';
import { Drawer } from 'antd';
import { withTranslation } from 'react-i18next';
import ItemAnswerViewAnswerSheet from './ItemAnswerViewAnswerSheet';
import styles from './ViewAnswerSheet.module.css';

class ViewAnswerSheet extends Component {
  render() {
    const { answerList, visible, t } = this.props;
    const listeningPart = answerList && answerList.slice(0, 100);
    const readingPart = answerList && answerList.slice(100, 200);

    return (
      <Drawer
        title={t('yourAnswerSheet')}
        placement="left"
        width={370}
        onClose={this.props.onCloseDrawer}
        visible={visible}
      >
        <div className="row">
          <div className="col-md-6">
            <p className={styles.titlePart}>{t('listeningPart')}</p>
            {listeningPart && listeningPart.map((item, index) => {
              return <ItemAnswerViewAnswerSheet key={index} item={item} orderNumber={index} />
            })}
          </div>
          <div className="col-md-6">
            <p className={styles.titlePart}>{t('readingPart')}</p>
            {readingPart && readingPart.map((item, index) => {
              return <ItemAnswerViewAnswerSheet key={index} item={item} orderNumber={100+index} />
            })}
          </div>
        </div>
      </Drawer>
    );
  }
}

export default withTranslation()(ViewAnswerSheet);