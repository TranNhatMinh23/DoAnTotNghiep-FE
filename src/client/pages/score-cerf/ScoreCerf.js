import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import styles from './ScoreCerf.module.css';
import { arrLevelScore, 
  arrLevelScoreVi ,
  getArrayFromString ,
  defineCERF_vi,
  defineCERF_en,
  description_vi,
  description_en,
  desc_1_vi,
  desc_1_en,
  column1_en,
  column1_vi,
  column2_en,
  column2_vi,
  column3_en,
  column3_vi
} from '../../../constants/scoreAndCerf';
import Loading from '../../components/loading/Loading';
import { withTranslation } from 'react-i18next'; 

class ScoreCerf extends Component {
  state = {
    loading: true
  };

  componentDidMount(){
    setTimeout(()=> {
      this.setState({
        loading: false
      });
    }, 500);
  }

  render() {
    const { loading } = this.state;
    const { t, i18n } = this.props;
    const currentLanguage = i18n.language;

    const arrLevel = currentLanguage === "vi" ? arrLevelScoreVi : arrLevelScore;
    const defineCERF = currentLanguage === "vi" ? defineCERF_vi : defineCERF_en;
    const description = currentLanguage === "vi" ? description_vi : description_en;
    const desc_1 = currentLanguage === "vi" ? desc_1_vi : desc_1_en;
    const column_1 = currentLanguage === "vi" ? column1_vi : column1_en;
    const column_2 = currentLanguage === "vi" ? column2_vi : column2_en;
    const column_3 = currentLanguage === "vi" ? column3_vi : column3_en;

    if(loading) {
      return <Loading />;
    }

    return (
      <DocumentTitle title='Score and Cerf'>
        <div className={`row ${styles.screenScoreCerf}`}>
          <div className="col-md-12">
            <p className="title-page"><i className="fa fa-mortar-board"></i>&nbsp;{t('scoreAndCerf')}</p>
            <p className="highlight-title">{defineCERF}</p>
            <p>{description}</p>
            <p>{desc_1}</p>
            <table id="scoreAndCerf" className={styles.tableScoreCerf}>
              <thead>
                <tr>
                  <th>{column_1}</th>
                  <th>{column_2}</th>
                  <th>{column_3}</th>
                </tr>
              </thead>
              <tbody>
                {arrLevel.map(item => {
                  return (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>{item.minScore + " - " + item.maxScore}</td>
                      <td>
                      {getArrayFromString(item.description).map((li, index) => {
                        return <li key={index}>{li}.</li>
                      })}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </DocumentTitle>
    );
  }
}

export default withTranslation()(ScoreCerf);