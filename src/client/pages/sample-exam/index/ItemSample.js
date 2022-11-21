import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './ItemSample.module.css';
import preview from '../../../../assets/preview/preview3.jpg';
import { Button } from 'antd/lib/radio';
import { Card } from 'antd';
import moment from 'moment';
import { limitText } from '../../../../shared/function';
import { withTranslation } from 'react-i18next';

const dateFormat = "DD/MM/YYYY";

class ItemSample extends Component {
  render() {
    const { sampleExam, t } = this.props;
    return (
      <div className={`col-sm-6 col-md-4 col-lg-3 ${styles.itemExamPractice}`}>
        <Card
          className={styles.cardItem}
          hoverable
          cover={<img src={sampleExam.image_preview ? process.env.REACT_APP_URL_API + sampleExam.image_preview : preview} alt="" />}
        >
          <p className={styles.titleExamPractice}>{sampleExam.name}</p>
          <p className={styles.descriptionExam}>{limitText(sampleExam.description, 20)}</p>
          <p className={styles.posted}><i className="fa fa-clock-o"></i>&nbsp;{t('dateCreated')}&nbsp;{moment(sampleExam.updated_at).format(dateFormat)}</p>
          <Link to={`/preview-sample-exam?sampleExamId=${sampleExam.id}`}>
            <Button className={styles.btnTakeTest}>{t('takeTest')}</Button>
          </Link>
        </Card>
      </div>
    )
  }
}

export default withTranslation()(ItemSample);