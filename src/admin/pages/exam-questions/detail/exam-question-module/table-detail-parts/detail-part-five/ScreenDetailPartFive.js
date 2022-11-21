import React, { Component } from 'react';
import * as directionText from '../../../../../../../constants/directionText';
import WidgetQuestion from '../../../../../../components/common/widget-question/WidgetQuestion';  
import RenderQuestionPartFive from './RenderQuestionPartFive';
import WidgetPage from '../../../../../../components/common/widget-page/WidgetPage';
import CustomPageHeader from '../../../../../../components/common/custom-page-header/CustomPageHeader';
import { withTranslation } from 'react-i18next';

class ScreenDetailPartFive extends Component {
  render(){
    const { detailPart, detailExamQuestion, t } = this.props;
    return (
      <WidgetPage>
        <CustomPageHeader to={`/exam-questions/${detailExamQuestion.id}`} title={`${t('detailPart')} 5 - ${detailExamQuestion.name}`} /> 
        <p className="title-part">READING</p>
        <div className="introduction">
          {directionText.introductionReadingPart}
        </div>
        <WidgetQuestion>
          <p className="part-name">PART {detailPart.part_no}</p>
          <p><strong>Directions: </strong>{directionText.directionPartFive}</p>
        </WidgetQuestion>
        <RenderQuestionPartFive partInfo={detailPart} />  
      </WidgetPage>
    )
  }
}

export default withTranslation()(ScreenDetailPartFive);