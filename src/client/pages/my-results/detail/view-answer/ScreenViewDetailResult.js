import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import SmoothScrolling from '../../../../components/smooth-scrolling/SmoothScrolling';
import DocumentTitle from 'react-document-title';
import styles from './ScreenViewDetailResult.module.css';
import ViewPartOne from '../partone/ViewPartOne';
import ViewPartTwo from '../part-two/ViewPartTwo';
import ViewPartThree from '../part-three/ViewPartThree';
import ViewPartFour from '../part-four/ViewPartFour';
import ViewPartFive from '../part-five/ViewPartFive';
import ViewPartSix from '../part-six/ViewPartSix';
import ViewPartSeven from '../part-seven/ViewPartSeven';
import { withTranslation } from 'react-i18next';
import { Icon } from 'antd';
import moment from 'moment';

class ScreenViewDetailResult extends Component {
  scrollToQuestion = (idToScroll) => {
    SmoothScrolling.scrollTo(idToScroll);
  }

  render() {
    const { resultAnswer, authInfo, t } = this.props;
    const listResult = resultAnswer.results;
    const arrParts = resultAnswer.parts;
    return (
      <DocumentTitle title={`Detail answer - ${resultAnswer.exam_name}`}>
        <div className={`${styles.viewExam}`}>
          <div id="TopExam"></div>
          <div className={`${styles.mainContentOfExam}`}>
            <div className={styles.titleExam}>
              {authInfo.id === resultAnswer.userHasReport.id && <Link to="/my-reports" className={styles.backIcon}><Icon type="arrow-left" /></Link>}
              <span>{resultAnswer.exam_name}</span>
            </div>
            {
              authInfo.id !== resultAnswer.userHasReport.id &&
              <div className={styles.infoUserHasReports}>
                <p>{t('fullName')}: {resultAnswer.userHasReport.name}</p>
                <p>Email: {resultAnswer.userHasReport.email}</p>
                <p>{t('timeTaken')}: {moment(resultAnswer.timeTaken.date).format("HH:mm:ss A - DD/MM/YYYY")}</p>
              </div>
            }
            <div className={`test-content ${styles.mainViewOfContentExam}`}>
              <ViewPartOne
                listQuestionPart1={arrParts[0]}
                audio={resultAnswer.audio}
                listResult={listResult}
              />
              <ViewPartTwo
                listQuestionPart2={arrParts[1]}
                listResult={listResult}
              />
              <ViewPartThree
                listQuestionPart3={arrParts[2]}
                listResult={listResult}
              />
              <ViewPartFour
                listQuestionPart4={arrParts[3]}
                listResult={listResult}
              />
              <ViewPartFive
                listQuestionPart5={arrParts[4]}
                listResult={listResult}
              />
              <ViewPartSix
                listQuestionPart6={arrParts[5]}
                listResult={listResult}
              />
              <ViewPartSeven
                listQuestionPart7={arrParts[6]}
                listResult={listResult}
              />
            </div>
          </div>
          <div id="BottomExam"></div>
          <div className={styles.groupBtnNavigate}>
            <button className={styles.btnToTop} onClick={() => this.scrollToQuestion("TopExam")} title="Go to top"><i className="fa fa-angle-double-up"></i></button>
            <button className={styles.btnToBottom} onClick={() => this.scrollToQuestion("BottomExam")} title="Go to down"><i className="fa fa-angle-double-down"></i></button>
          </div>
        </div>
      </DocumentTitle>
    );
  }
}

ScreenViewDetailResult.propTypes = {
  resultAnswer: PropTypes.object
}

ScreenViewDetailResult.defaultProps = {
  resultAnswer: {
    results: {},
    parts: {}
  }
}

export default withTranslation()(ScreenViewDetailResult);