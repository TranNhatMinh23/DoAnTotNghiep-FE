import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import SearchComponent from '../../../components/common/search/Search';
import { searchByText } from '../../../../shared/utility';
import { Button } from 'antd';
import styles from './ExamQuestionScoreIndex.module.css';
import ModalAddExamQuestionScore from '../detail/modal-add-exam-question-score/ModalAddExamQuestionScore';
import ExamQuestionScoreTable from './ExamQuestionScoreTable';
import WidgetPage from '../../../components/common/widget-page/WidgetPage';
import { withTranslation } from 'react-i18next';

class ScreenExamQuestionScore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchingData: this.props.listExamQuestionScore,
      visibleModalAdd: false
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.listExamQuestionScore !== this.state.searchingData) {
      this.setState({
        searchingData: nextProps.listExamQuestionScore
      })
    };
  }

  handleSearch = (searchText = '') => {
    let matchingData = searchByText(this.props.listExamQuestionScore, searchText);
    this.setState({
      searchingData: matchingData
    });
  }

  showModalAddExamQuestionScore = () => {
    this.setState({
      visibleModalAdd: true
    })
  }


  closeModalAddExamQuestionScore = () => {
    this.setState({
      visibleModalAdd: false
    })
  }

  render() {
    const { searchingData, visibleModalAdd } = this.state;
    const { t } = this.props;
    return (
      <DocumentTitle title='Administrator - Score mapping management'>
        <WidgetPage>
          <p className="title-widget">{t('scoreMappingManagement')}</p>
          <div className={styles.topTable}>
            <Button onClick={this.showModalAddExamQuestionScore} icon="plus" type="green" className={styles.btnAdd}>
              {t('createNew')}
            </Button>
            <div className="pull-right">
              <SearchComponent placeholder={t('search')} onSearch={this.handleSearch} />
            </div>
          </div>
          <ExamQuestionScoreTable listExamQuestionScore={searchingData} />
          {visibleModalAdd && <ModalAddExamQuestionScore visible={visibleModalAdd} onCloseDialog={this.closeModalAddExamQuestionScore} />}
        </WidgetPage>
      </DocumentTitle>
    )
  }
}

export default withTranslation()(ScreenExamQuestionScore);