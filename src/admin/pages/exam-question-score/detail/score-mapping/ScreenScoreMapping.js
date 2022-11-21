import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import { connect } from 'react-redux';
import * as actions from '../../../../../store/actions/index';
import { Button, message } from 'antd';
import CustomPageHeader from '../../../../components/common/custom-page-header/CustomPageHeader';
import ScoreMappingTable from './ScoreMappingTable';
import styles from './ScreenScoreMapping.module.css';
import { html2json } from '../../../../../shared/function';
import { checkValidInputScoreMapping } from '../../../../../shared/utils';
import { typeScoreErrorMessage } from '../../../../../constants/validScoreResponse';
import WidgetPage from '../../../../components/common/widget-page/WidgetPage';
import { withTranslation } from 'react-i18next';

class ScreenScoreMapping extends Component {

  onUpdateScore = () => {
    let jsonScoreTable1 = html2json("tableScoreDetail1");
    let jsonScoreTable2 = html2json("tableScoreDetail2");
    let jsonScoreTable3 = html2json("tableScoreDetail3");
    let jsonScoreTable4 = html2json("tableScoreDetail4");

    let arrScoreResult = jsonScoreTable1.concat(jsonScoreTable2, jsonScoreTable3, jsonScoreTable4);

    let positionError = checkValidInputScoreMapping(arrScoreResult);
    if (!positionError) {
      let examQuestionScoreId = this.props.detailExamQuestionScore.id;
      let data = {
        data: arrScoreResult
      };
      this.props.updateDetailExamQuestionScore(examQuestionScoreId, data);
    } else {
      message.error("Position get error (Amount) : " + positionError + " ( " + typeScoreErrorMessage + " )");
    }
  } 

  onImportFile = (e) => {
    let file = e.target.files[0];
    this.props.importScoreMappingFile(this.props.detailExamQuestionScore.id, file);
  }

  render() {
    const { detailExamQuestionScore, isLoading, isLoadingUpdateDetailScore, t } = this.props;
    const splitScoreMapping = [
      { id: 1, detail: detailExamQuestionScore.detail.slice(0, 26) },
      { id: 2, detail: detailExamQuestionScore.detail.slice(26, 51) },
      { id: 3, detail: detailExamQuestionScore.detail.slice(51, 76) },
      { id: 4, detail: detailExamQuestionScore.detail.slice(76, 101) }
    ];

    return (
      <DocumentTitle title='Administrator - Detail score mapping'>
        <WidgetPage>
          <CustomPageHeader to="/exam-question-scores" title={t('detailScoreMapping')} />
          <Button loading={isLoading} type="primary" icon="file-sync" className={`pull-left ${styles.btnUpdateScore}`} onClick={this.onUpdateScore}>{t('update')}</Button>
          <a className={`pull-right ${styles.btnUpdateScore}`} href={process.env.REACT_APP_AXIOS_API + `/api/exam_question_scores/export/${detailExamQuestionScore.id}?token=${this.props.token}`}>
            <Button type="default"><i className="fa fa-external-link"></i>&nbsp;{t('exportFile')}</Button>
          </a>
          <Button loading={isLoadingUpdateDetailScore} icon="download" type="default" className={`pull-right ${styles.btnImportScoreFile}`}>
            <label htmlFor="import-score-mapping" className={styles.labelInputFile}>
              &nbsp;{t('importFile')}
            </label>
          </Button>
          <input
            id="import-score-mapping"
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            onChange={this.onImportFile}
            className="input-file"
            type="file"
          />
          <div className={`row ${styles.tableDetailScoreMapping}`}>
            {splitScoreMapping.map(scorePart => {
              return (
                <div key={scorePart.id} className="col-md-3">
                  <ScoreMappingTable id={scorePart.id} detailScore={scorePart.detail} />
                </div>
              )
            })}
          </div>
        </WidgetPage>
      </DocumentTitle>
    )
  }
}

const mapStateToProps = state => ({
  isLoading: state.examquestionScoreReducer.isLoadingUpdateDetailScore,
  isLoadingUpdateDetailScore: state.examquestionScoreReducer.isLoadingImportDetailScore,
  err: state.examquestionScoreReducer.err,
  message: state.examquestionScoreReducer.message,
  token: state.authReducer.userInfo.token
});

const mapDispatchToProps = dispatch => ({
  updateDetailExamQuestionScore: (examQuestionScoreId, data) => dispatch(actions.updateDetailExamQuestionScore(examQuestionScoreId, data)),
  importScoreMappingFile: (idExamQuestionScore, files) => dispatch(actions.importScoreMappingFile(idExamQuestionScore, files))
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(ScreenScoreMapping));