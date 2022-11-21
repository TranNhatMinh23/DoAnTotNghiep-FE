import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import ExamQuestionsTable from './ExamQuestionsTable';
import SearchComponent from '../../../components/common/search/Search';
import { searchByText } from '../../../../shared/utility';
import { Button } from 'antd';
import styles from './ScreenExamQuestions.module.css';
import ModalAddExamQuestion from '../detail/modal-add-exam-question/ModalAddExamQuestion';
import WidgetPage from '../../../components/common/widget-page/WidgetPage';
import { withTranslation } from 'react-i18next';

class ScreenExamQuestions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchingData: this.props.listExamQuestions,
      visibleModalAdd: false
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.listExamQuestions !== this.state.searchingData) {
      this.setState({
        searchingData: nextProps.listExamQuestions
      })
    };
  }

  handleSearch = (searchText = '') => {
    let matchingData = searchByText(this.props.listExamQuestions, searchText);
    this.setState({
      searchingData: matchingData
    });
  }

  showModalAddexamQuestion = () => {
    this.setState({
      visibleModalAdd: true
    })
  }


  closeModalAddExamQuestion = () => {
    this.setState({
      visibleModalAdd: false
    })
  }

  render() {
    const { searchingData, visibleModalAdd } = this.state; 
    const { t } = this.props;
    return (
      <DocumentTitle title={`Administrator - ${t('examQuestionsManagement')}`}>
        <WidgetPage>
          <p className="title-widget">{t('examQuestionsManagement')}</p>
          <div className={styles.topTable}>
            <Button onClick={this.showModalAddexamQuestion} icon="plus" type="green" className={styles.btnAddNewUser}>
              {t('createNew')}
            </Button>
            <div className="pull-right">
              <SearchComponent placeholder={t('search')} onSearch={this.handleSearch} />
            </div>
          </div>
          <ExamQuestionsTable listExamQuestions={searchingData} />
          {visibleModalAdd && <ModalAddExamQuestion visible={visibleModalAdd} onCloseDialog={this.closeModalAddExamQuestion} />}
        </WidgetPage>
      </DocumentTitle>
    )
  }
}

export default withTranslation()(ScreenExamQuestions);