import React, { Component } from 'react'; 
import DocumentTitle from 'react-document-title'; 
import TableDetailParts from './table-detail-parts/TableDetailParts';
import EditInfoExamQuestion from './edit-info-exam-questions/EditInfoExamQuestion';
import WidgetPage from '../../../../components/common/widget-page/WidgetPage';
import CustomPageHeader from '../../../../components/common/custom-page-header/CustomPageHeader';
import { withTranslation } from 'react-i18next';

class ScreenExamQuestionModule extends Component {
  render() {
    const { detailExamQuestion, t } = this.props;
    return (
      <DocumentTitle title={`Administrator - ${t('detailExamQuestion')}`}>
        <WidgetPage> 
          <CustomPageHeader to="/exam-questions" title={t('detailExamQuestion')} subTitle={detailExamQuestion.name} />
          <TableDetailParts examQuestionId={detailExamQuestion.id} detailExamQuestionParts={detailExamQuestion.parts} />
          <EditInfoExamQuestion detailExamQuestion={detailExamQuestion} />
        </WidgetPage>
      </DocumentTitle>
    )
  }
}

export default withTranslation()(ScreenExamQuestionModule);