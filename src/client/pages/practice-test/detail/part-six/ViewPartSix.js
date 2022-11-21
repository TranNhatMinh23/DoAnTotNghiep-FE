import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  directionPartSix
} from '../../../../../constants/directionText';
import RenderQuestionPartSix from './RenderQuestionPartSix';

class ViewPartSix extends PureComponent {

  render() {
    const { listQuestionPart6 } = this.props;
    return (
      <Fragment>
        <section>
          <div className="borderWidget">
            <div className="part-number">PART {listQuestionPart6.part_no}</div>
            <div className="direction-widget">
              <span className="directions-label"> Directions: </span>
              {directionPartSix}
            </div>
          </div>
          <RenderQuestionPartSix
            listQuestionPart6={listQuestionPart6.questions}
            onChangeAnswer={this.props.onChangeAnswer}
          />
        </section>
      </Fragment>
    );
  }
}

ViewPartSix.propTypes = {
  listQuestionPart6: PropTypes.object,
  onChangeAnswer: PropTypes.func
};

export default ViewPartSix;