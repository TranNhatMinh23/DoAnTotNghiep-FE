import React, { PureComponent } from 'react';
import * as directionText from '../../../../../../../constants/directionText';
import WidgetQuestion from '../../../../../../components/common/widget-question/WidgetQuestion';  
import RenderQuestionPartSeven from './RenderQuestionPartSeven';
import WidgetPage from '../../../../../../components/common/widget-page/WidgetPage';
import CustomPageHeader from '../../../../../../components/common/custom-page-header/CustomPageHeader';
import { withTranslation } from 'react-i18next';

class ScreenDetailPartFive extends PureComponent {
  render(){
    const { detailPart, detailExamQuestion, t } = this.props;
    return (
      <WidgetPage>
        <CustomPageHeader to={`/exam-questions/${detailExamQuestion.id}`} title={`${t('detailPart')} 7 - ${detailExamQuestion.name}`} /> 
        <WidgetQuestion>
          <p className="part-name">PART {detailPart.part_no}</p>
          <p><strong>Directions: </strong>{directionText.directionPartSeven}</p>
        </WidgetQuestion>
        <RenderQuestionPartSeven partInfo={detailPart} />  
      </WidgetPage>
    )
  }
}

export default withTranslation()(ScreenDetailPartFive);