import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  directionPartFive, introductionReadingPart
} from '../../../../../constants/directionText';
import styles from './ViewPartFive.module.css';
import RenderQuestionPartFive from './RenderQuestionPartFive';

class ViewPartFive extends PureComponent {

  render() {
    const { listQuestionPart5 } = this.props;
    return (
      <Fragment>
        <div className="borderWidget">
          <p className={styles.titlePart}>READING TEST</p>
          <div className="direction">{introductionReadingPart}</div>
          <div className="part-number">PART {listQuestionPart5.part_no}</div>
          <div className="direction-widget">
            <span className="directions-label"> Directions: </span>
            {directionPartFive}
          </div>
        </div>
        <section>
          <RenderQuestionPartFive
            listQuestionPart5={listQuestionPart5.questions}
            onChangeAnswer={this.props.onChangeAnswer}
          />
        </section>
      </Fragment>
    );
  }
}

ViewPartFive.propTypes = {
  listQuestionPart5: PropTypes.object,
  onChangeAnswer: PropTypes.func
};

export default ViewPartFive;