import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import queryString from 'query-string';
import styles from './ViewResultExam.module.css';
import moment from 'moment';
import NotFoundPage from '../not-found/NotFound';
import Loading from '../loading/Loading';
import defaultAvatar from '../../../assets/avatars/default.jpg';
import { getLevelDescriptionByScore, getArrayFromString, getLevelDescriptionViByScore } from '../../../constants/scoreAndCerf';
import { withTranslation } from 'react-i18next';

class ViewResultExam extends Component {
  componentDidMount() {
    const { reportId } = queryString.parse(this.props.location.search);
    this.props.getResultAfterSubmit(reportId);
  }

  render() {
    const { infomation, resultAfterSubmitted, isLoaded, t, i18n } = this.props;
    if (isLoaded && resultAfterSubmitted === null) {
      return <NotFoundPage />
    }

    if (isLoaded && resultAfterSubmitted) {
      return (
        <div className={styles.reports}>
          <section className={styles.titleReports}>
            <p>{t('congrats')}</p>
            <span className={styles.nameOfExam}>{resultAfterSubmitted ? resultAfterSubmitted.exam.name : ''}</span>
          </section>
          <section className={styles.scoreReport}>
            <div className={styles.infoParticipant}>
              <ul>
                <li>
                  <img src={infomation.avatar_url ? process.env.REACT_APP_URL_API + infomation.avatar_url : defaultAvatar} alt="" />
                </li>
                <li>{infomation.name}</li>
                <li><i className="fa fa-envelope"></i>{infomation.email}</li>
                <li><i className="fa fa-calendar-check-o"></i>{moment(new Date()).format('DD/MM/YYYY')}</li>
              </ul>
            </div>
            <div>
              <div className={styles.scoreWrapper}>
                <label>{t('listening')}</label>
                <p>{resultAfterSubmitted.listening_score}</p>
              </div>
              <div className={styles.scoreWrapper}>
                <label>{t('reading')}</label>
                <p>{resultAfterSubmitted.reading_score}</p>
              </div>
            </div>
            <div>
              <div className={styles.scoreWrapper}>
                <label>{t('total')}</label>
                <p>{resultAfterSubmitted.total_score}</p>
              </div>
            </div>
          </section>
          <div className={styles.levelDescription}>
            <p>{t('levelDesc')}</p>
            <ul>
              {
                i18n.language === 'vi' ?
                  getArrayFromString(getLevelDescriptionViByScore(resultAfterSubmitted.total_score).description).map((item, index) => {
                    return <li key={index}>{item}.</li>
                  })
                  :
                  getArrayFromString(getLevelDescriptionByScore(resultAfterSubmitted.total_score).description).map((item, index) => {
                    return <li key={index}>{item}.</li>
                  })
              }
            </ul>
          </div>
        </div>
      )
    }

    return <Loading />
  }
}

ViewResultExam.propTypes = {
  resultAfterSubmitted: PropTypes.object,
  infomation: PropTypes.object,
  isLoaded: PropTypes.bool,
  err: PropTypes.bool,
  message: PropTypes.string
};

const mapStateToProps = state => ({
  infomation: state.authReducer.userInfo.user,
  isLoaded: !state.submitAnswerResultReducer.isLoading,
  err: state.submitAnswerResultReducer.err,
  message: state.submitAnswerResultReducer.message,
  resultAfterSubmitted: state.submitAnswerResultReducer.resultAfterSubmitted,
});

const mapDispatchToProps = dispatch => ({
  getResultAfterSubmit: (reportId) => dispatch(actions.getResultAfterSubmit(reportId))
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(ViewResultExam));