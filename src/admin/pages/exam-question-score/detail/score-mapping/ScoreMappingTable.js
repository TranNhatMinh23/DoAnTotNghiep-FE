import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';

class ScoreMappingTable extends Component {
  renderListScore = () => {
    let res = this.props.detailScore.map(item => {
      return (
        <tr key={item.id} id={item.id}>
          <td className="center" contentEditable={true} suppressContentEditableWarning={true}>{item.listening_score}</td>
          <td className="center brownColumn">{item.num_of_question}</td>
          <td className="center" contentEditable={true} suppressContentEditableWarning={true}>{item.reading_score}</td>
        </tr>
      )
    })
    return res;
  }

  render() {
    const { id, t } = this.props;
    return (
      <table className="table table-bordered table-hover table-score-mapping" id={`tableScoreDetail${id}`}>
        <thead>
          <tr>
            <th className="center">{t('_listening')}</th>
            <th className="center">{t('amount')}</th>
            <th className="center">{t('_reading')}</th>
          </tr>
        </thead>
        <tbody >
          {this.renderListScore()}
        </tbody>
      </table>
    )
  }
}

export default withTranslation()(ScoreMappingTable);