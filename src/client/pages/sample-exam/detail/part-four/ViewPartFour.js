import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  directionPartFour
} from '../../../../../constants/directionText';
import RenderQuestionPartFour from './RenderQuestionPartFour';

class ViewPartFour extends PureComponent {

  render() {
    const { listQuestionPart4 } = this.props;
    return (
      <Fragment>
        <section>
          <div className="borderWidget">
            <div className="part-number">PART {listQuestionPart4.part_no}</div>
            <div className="direction-widget">
              <span className="directions-label"> Directions: </span>
              {directionPartFour}
            </div>
          </div>
          <RenderQuestionPartFour
            listQuestionPart4={listQuestionPart4.questions}
            onChangeAnswer={this.props.onChangeAnswer}
          />
        </section>
      </Fragment>
    );
  }
}

ViewPartFour.propTypes = {
  listQuestionPart4: PropTypes.object,
  onChangeAnswer: PropTypes.func
};

export default ViewPartFour;