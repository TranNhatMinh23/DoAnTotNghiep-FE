import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  directionPartSeven
} from '../../../../../constants/directionText';
import RenderQuestionPartSeven from './RenderQuestionPartSeven';

class ViewPartSeven extends PureComponent {

  render() {
    const { listQuestionPart7 } = this.props;
    return (
      <Fragment>
        <section>
          <div className="borderWidget">
            <div className="part-number">PART {listQuestionPart7.part_no}</div>
            <div className="direction-widget">
              <span className="directions-label"> Directions: </span>
              {directionPartSeven}
            </div>
          </div>
          <RenderQuestionPartSeven
            listQuestionPart7={listQuestionPart7.questions}
            onChangeAnswer={this.props.onChangeAnswer}
          />
        </section>
      </Fragment>
    );
  }
}

ViewPartSeven.propTypes = {
  listQuestionPart7: PropTypes.object,
  onChangeAnswer: PropTypes.func
};

export default ViewPartSeven;