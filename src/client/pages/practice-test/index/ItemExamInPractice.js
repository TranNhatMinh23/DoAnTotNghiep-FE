import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './ItemExamInPractice.module.css';
import preview from '../../../../assets/preview/preview3.jpg';
import { Button } from 'antd/lib/radio';
import { Card, Icon } from 'antd';
import moment from 'moment';
import { limitText } from '../../../../shared/function';
import { withTranslation } from 'react-i18next';

const dateFormat = "DD/MM/YYYY";
class ItemExamInPractice extends Component {
  _checkRenderNotification = (detailExam) => {
    const currentDate = new Date();
    const fromDate = new Date(detailExam.from_date);
    const toDate = new Date(detailExam.to_date);

    let isRunningExam = fromDate <= currentDate && currentDate <= toDate;
    let isCommingExam = currentDate < fromDate;

    if (isRunningExam) {
      return (
        <Link to={`/preview-exam?examId=${detailExam.exam_id}`}>
          <Button className={styles.btnTakeTest}>{this.props.t('takeTest')}</Button>
        </Link>
      );
    } else if (isCommingExam) {
      return (
        <Button className={styles.isCommingExam}>{this.props.t('isCommingExam')}</Button>
      );
    } else {
      return (
        <Button className={styles.expiredColor}>{this.props.t('expiredExam')}</Button>
      );
    }
  }

  render() {
    const { detailExam, t } = this.props;
    return (
      <div className={`col-sm-6 col-md-4 col-lg-3 ${styles.itemExamPractice}`}>
        <Card
          className={styles.cardItem}
          hoverable
          cover={<img src={detailExam.image_preview ? process.env.REACT_APP_URL_API + detailExam.image_preview : preview} alt="" />}
        >
          <p className={styles.titleExamPractice}>{limitText(detailExam.name, 20)}</p>
          <p className={styles.descriptionExam}>{limitText(detailExam.description, 15)}</p>
          <p className={`${styles.posted} ${styles.fromToDate}`}>
            <i className="fa fa-clock-o"></i>&nbsp;
            {t('from')}
            <span>{moment(detailExam.from_date).format(dateFormat)}</span>
            {t('to')}
            <span>{moment(detailExam.to_date).format(dateFormat)}</span>
          </p>
          <p className={styles.posted}><Icon type="bank" />&nbsp;{t('hosted')}<b>{detailExam.company.name}</b></p>
          {
            detailExam.status ?
              this._checkRenderNotification(detailExam)
              :
              <Button className={styles.btnStopExam}>{t('closeExam')}</Button>
          }

        </Card>
      </div>
    )
  }
}

export default withTranslation()(ItemExamInPractice);