import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  directionPartThree
} from '../../../../../constants/directionText';
import RenderQuestionPartThree from './RenderQuestionPartThree';

class ViewPartThree extends PureComponent {

  render() {
    const { listQuestionPart3 } = this.props;
    return (
      <Fragment>
        <section>
          <div className="borderWidget">
            <div className="part-number">PART {listQuestionPart3.part_no}</div>
            <div className="direction-widget">
              <span className="directions-label"> Directions: </span>
              {directionPartThree}
            </div>
          </div>
          <RenderQuestionPartThree
            listQuestionPart3={listQuestionPart3.questions}
            onChangeAnswer={this.props.onChangeAnswer}
          />
        </section>
      </Fragment>
    );
  }
}

ViewPartThree.propTypes = {
  listQuestionPart3: PropTypes.object,
  onChangeAnswer: PropTypes.func
};

export default ViewPartThree;