import React, { Component } from 'react'; 
import * as directionText from '../../../../../../../constants/directionText';
import WidgetQuestion from '../../../../../../components/common/widget-question/WidgetQuestion';
import RenderExampleQuestion from './RenderExampleQuestion';
import AudioWidget from './AudioWidget';
import RenderQuestion from './RenderQuestion';
import WidgetPage from '../../../../../../components/common/widget-page/WidgetPage';
import CustomPageHeader from '../../../../../../components/common/custom-page-header/CustomPageHeader';
import { withTranslation } from 'react-i18next';

class ScreenDetailPartOne extends Component {
  render() {
    const { detailPart, detailExamQuestion, t } = this.props; 
    return (
      <WidgetPage>
        <CustomPageHeader to={`/exam-questions/${detailExamQuestion.id}`} title={`${t('detailPart')} 1 - ${detailExamQuestion.name}`} />
        <p className="title-part">LISTENING</p>
        <div className="introduction">
          {directionText.introductionListeningPart}
        </div>
        <WidgetQuestion>
          <p className="part-name">PART {detailPart.part_no}</p>
          <p><strong>Directions: </strong>{directionText.directionPartOne}</p>
          <p className="question-name">Example</p>
          <RenderExampleQuestion partInfo={detailPart} />
        </WidgetQuestion>
        <AudioWidget audio={detailExamQuestion.audio} examQuestionId={detailExamQuestion.id} />
        <RenderQuestion partInfo={detailPart} />
      </WidgetPage>
    )
  }
}

export default withTranslation()(ScreenDetailPartOne);