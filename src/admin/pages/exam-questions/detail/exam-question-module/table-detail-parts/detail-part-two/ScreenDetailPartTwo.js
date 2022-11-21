import React, { Component } from 'react'; 
import * as directionText from '../../../../../../../constants/directionText';
import WidgetQuestion from '../../../../../../components/common/widget-question/WidgetQuestion'; 
import RenderQuestion from './RenderQuestion';
import WidgetPage from '../../../../../../components/common/widget-page/WidgetPage';
import CustomPageHeader from '../../../../../../components/common/custom-page-header/CustomPageHeader';
import { withTranslation } from 'react-i18next';

class ScreenDetailPartTwo extends Component {
  render() {
    const { detailPart, detailExamQuestion, t } = this.props;

    return (
      <WidgetPage>
        <CustomPageHeader to={`/exam-questions/${detailExamQuestion.id}`} title={`${t('detailPart')} 2 - ${detailExamQuestion.name}`} />
        <WidgetQuestion>
          <p className="part-name">PART {detailPart.part_no}</p>
          <p><strong>Directions: </strong>{directionText.directionPartTwo}</p>
        </WidgetQuestion>
        <RenderQuestion partInfo={detailPart} />  
      </WidgetPage>
    )
  }
}

export default withTranslation()(ScreenDetailPartTwo);