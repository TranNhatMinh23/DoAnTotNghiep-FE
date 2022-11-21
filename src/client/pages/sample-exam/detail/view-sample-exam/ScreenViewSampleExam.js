import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../../../../store/actions/index';
import styles from './ScreenViewSampleExam.module.css';
import ExamClock from './ExamClock';
import { checkEmptyAnswer, genarateObjectAnswer } from '../../../../../shared/function';
import SmoothScrolling from '../../../../components/smooth-scrolling/SmoothScrolling';
import { Button, Icon } from 'antd';
import ConfirmDialog from '../../../../components/confirm-dialog/ConfirmDialog';
import ViewPartOne from '../part-one/ViewPartOne';
import ViewPartTwo from '../part-two/ViewPartTwo';
import ViewPartThree from '../part-three/ViewPartThree';
import ViewPartFour from '../part-four/ViewPartFour';
import ViewPartFive from '../part-five/ViewPartFive';
import ViewPartSix from '../part-six/ViewPartSix';
import ViewPartSeven from '../part-seven/ViewPartSeven';  
import { withTranslation } from 'react-i18next';
import { toastMessage } from '../../../../../shared/utils';
import ViewAnswerSheet from '../../../../components/view-answer-sheet/ViewAnswerSheet';

class ScreenViewSampleExam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: {},
      seconds: 7199, //7200s = 120p
      openConfirmSubmit: false,
      content: null,
      visibleDrawerAnwerSheet: false,
      objectAnswer: genarateObjectAnswer((this.props.detailSample && this.props.detailSample.parts) ? this.props.detailSample.parts : []),
    }
  }

  scrollToQuestion = (idToScroll) => {
    SmoothScrolling.scrollTo(idToScroll);
  }

  componentDidMount() {
    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar }, () => {
      this.startTimer()
    }); 
  }

  componentWillUnmount() {
    clearInterval(this.timer); 
  }

  componentWillReceiveProps(nextProps) { 
    if (nextProps.isLoadedSubmitAnswer && nextProps.err) {
      this.setState({
        openConfirmSubmit: false
      });
    }

    if (nextProps.isLoadedSubmitAnswer && nextProps.submitted) { 
      this.closeConfirmDialog();
      let reportId = nextProps.resultAfterSubmitted ? nextProps.resultAfterSubmitted.report : '';
      this.props.history.push(`/view-results?reportId=${reportId}`);
    }
  } 

  closeConfirmDialog = () => {
    let listQuestionEmpty = checkEmptyAnswer(this.state.objectAnswer);
    this.setState({
      openConfirmSubmit: false
    }, () => {
      if (listQuestionEmpty.length >= 1) {
        let firstEmptyAnswerQuestion = listQuestionEmpty[0];
        let nameNode = 'questionNo' + firstEmptyAnswerQuestion.questionId;
        this.scrollToQuestion(nameNode);
      }
    });
  }

  secondsToTime = (secs) => {
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      "h": hours,
      "m": minutes,
      "s": seconds
    };

    return obj;
  }

  startTimer() {
    this.timer = setInterval(() => {
      this.countDown();
    }, 1000);
  }

  countDown = () => {
    // Remove one second, set state so a re-render happens.
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
    });

    // Check if we're at zero.
    if (seconds === 0) {
      this.submitAnswer();
      clearInterval(this.timer);
      toastMessage("info", "Time out!");
    }
  }

  onChangeAnswer = (e, questionId) => { 
    let value = e.target.value; 
    let yourAnswer = value.slice(0, 1);
    let yourAnswerCode = Number(value.slice(1));  
    let objectAnswerNew = this.state.objectAnswer;
    let objIndex = objectAnswerNew.findIndex((obj => obj.questionId === questionId));
    objectAnswerNew[objIndex]['yourAnswer'] = yourAnswer;
    objectAnswerNew[objIndex]['yourAnswerCode'] = yourAnswerCode;
    this.setState({
      objectAnswer: objectAnswerNew,
    });  
  }

  beforeSubmit = () => {
    let listQuestionEmpty = checkEmptyAnswer(this.state.objectAnswer);
    if (listQuestionEmpty.length !== 0) {
      this.setState({
        openConfirmSubmit: true,
        content: listQuestionEmpty.length
      });
    } else if (this.state.seconds > 60) {
      this.setState({
        openConfirmSubmit: true,
        content: "hasTime"
      });
    } else {
      this.submitAnswer();
    }
  }

  submitAnswer = () => { 
    let examId = this.props.detailSample.exam_id;   
    let data = {
      data:  this.state.objectAnswer
    };
    this.props.submitExamAnswer(examId, data); 
  }

  showDrawerAnwerSheet = () => {
    this.setState({ visibleDrawerAnwerSheet: !this.state.visibleDrawerAnwerSheet });
  }

  onCloseDrawer = () => {
    this.setState({ visibleDrawerAnwerSheet: false });
  }

  render() {
    const { openConfirmSubmit, content, objectAnswer, visibleDrawerAnwerSheet } = this.state;
    const { detailSample, isLoading, t } = this.props; 

    return (
      <DocumentTitle title={`${detailSample.exam_name}`}>
        <div className={`${styles.viewExam}`}>
          <div id="TopExam"></div>
          <div className={`preventcopy ${styles.mainContentOfExam}`}>
            <div className={styles.titleExam}>
              <span>{detailSample.exam_name}</span>
            </div>
            <div className={`test-content ${styles.mainViewOfContentExam}`}>
              <ViewPartOne
                audio={detailSample.audio}
                listQuestionPart1={detailSample.parts[0]}
                onChangeAnswer={this.onChangeAnswer}
              />
              <ViewPartTwo
                listQuestionPart2={detailSample.parts[1]}
                onChangeAnswer={this.onChangeAnswer}
              />
              <ViewPartThree
                listQuestionPart3={detailSample.parts[2]}
                onChangeAnswer={this.onChangeAnswer}
              />
              <ViewPartFour
                listQuestionPart4={detailSample.parts[3]}
                onChangeAnswer={this.onChangeAnswer}
              />
              <ViewPartFive
                listQuestionPart5={detailSample.parts[4]}
                onChangeAnswer={this.onChangeAnswer}
              />
              <ViewPartSix
                listQuestionPart6={detailSample.parts[5]}
                onChangeAnswer={this.onChangeAnswer}
              />
              <ViewPartSeven
                listQuestionPart7={detailSample.parts[6]}
                onChangeAnswer={this.onChangeAnswer}
              />
              <Button onClick={this.beforeSubmit} className={styles.finishBtn}>
                {t('finish')}
              </Button>
            </div>
          </div>
          <div id="BottomExam"></div>
          <div className={styles.groupBtnNavigate}>
            <button className={styles.btnToTop} onClick={() => this.scrollToQuestion("TopExam")} title={t('goToTop')}><i className="fa fa-angle-double-up"></i></button>
            <button className={styles.btnToBottom} onClick={() => this.scrollToQuestion("BottomExam")} title={t('goToDown')}><i className="fa fa-angle-double-down"></i></button>
          </div>
          <button className={styles.btnShowAnswerSheet} title={t('viewAnswerSheet')} onClick={this.showDrawerAnwerSheet}>
            <Icon type="unordered-list" />
          </button>
          {visibleDrawerAnwerSheet && <ViewAnswerSheet answerList={objectAnswer} visible={visibleDrawerAnwerSheet} onCloseDrawer={this.onCloseDrawer} />}
          <ExamClock time={this.state.time} />
          <ConfirmDialog
            content={content}
            visible={openConfirmSubmit}
            handleClose={this.closeConfirmDialog}
            onSubmit={this.submitAnswer}
            isLoading={isLoading}
          />
        </div>
      </DocumentTitle>
    )
  }
}

const mapStateToProps = state => ({
  isLoadedSubmitAnswer: !state.submitAnswerResultReducer.loadingSubmitAnswer,
  resultAfterSubmitted: state.submitAnswerResultReducer.resultAfterSubmitted,
  isLoading: state.submitAnswerResultReducer.loadingSubmitAnswer,
  submitted: state.submitAnswerResultReducer.submitted,
  err: state.submitAnswerResultReducer.err,
  message: state.submitAnswerResultReducer.message
});

const mapDispatchToProps = dispatch => ({
  submitExamAnswer: (examId, listAnswer) => dispatch(actions.submitExamAnswer(examId, listAnswer))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withTranslation()(ScreenViewSampleExam)));
