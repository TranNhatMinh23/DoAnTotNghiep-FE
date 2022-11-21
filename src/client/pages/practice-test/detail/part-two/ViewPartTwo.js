import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  directionPartTwo
} from '../../../../../constants/directionText';
import RenderQuestionPartTwo from './RenderQuestionPartTwo';

class ViewPartTwo extends PureComponent {

  render() {
    const { listQuestionPart2 } = this.props;
    return (
      <Fragment>
        <section>
          <div className="borderWidget">
            <div className="part-number">PART {listQuestionPart2.part_no}</div>
            <div className="direction-widget">
              <span className="directions-label"> Directions: </span>
              {directionPartTwo}
            </div>
          </div>
          <RenderQuestionPartTwo
            listQuestionPart2={listQuestionPart2.questions}
            onChangeAnswer={this.props.onChangeAnswer}
          />
        </section>
      </Fragment>
    );
  }
}

ViewPartTwo.propTypes = {
  listQuestionPart2: PropTypes.object,
  onChangeAnswer: PropTypes.func
};

export default ViewPartTwo;