import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  introductionListeningPart,
  directionPartOne
} from '../../../../../constants/directionText';
import styles from './ViewPartOne.module.css';
import ViewAudio from './ViewAudio';
import ViewExample from './ViewExample';
import RenderQuestionPartOne from './RenderQuestionPartOne';

class ViewPartOne extends PureComponent {

  render() {
    const { listQuestionPart1, audio } = this.props;
    return (
      <Fragment>
        <div className="borderWidget">
          <p className={styles.titlePart}>LISTENING TEST</p>
          <div className="direction">{introductionListeningPart}</div>
        </div>
        <ViewAudio audio={audio} />
        <section>
          <div className="borderWidget">
            <div className="part-number">PART {listQuestionPart1.part_no}</div>
            <div className="direction-widget">
              <span className="directions-label"> Directions: </span>
              {directionPartOne}
            </div>
          </div>
          <ViewExample listQuestionPart1={listQuestionPart1} />
          <RenderQuestionPartOne
            listQuestionPart1={listQuestionPart1.questions}
            onChangeAnswer={this.props.onChangeAnswer}
          />
        </section>
      </Fragment>
    );
  }
}

ViewPartOne.propTypes = {
  listQuestionPart1: PropTypes.object,
  audio: PropTypes.string
};

export default ViewPartOne;