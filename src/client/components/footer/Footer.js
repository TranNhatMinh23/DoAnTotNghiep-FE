import React, { Component } from 'react';
import styles from './Footer.module.css';
import { withTranslation } from 'react-i18next';

class Footer extends Component {
  render() {
    const { t } = this.props;
    return (
      <div className={`container-fluid ${styles.footer}`}>
        <div className={`row ${styles.topFooter}`}>
          <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4">
            <h4>English center</h4>
            <ul>
              <li><i className="fa fa-home"></i>{t('address')}: {t('companyAddress')}</li>
              <li><i className="fa fa-phone"></i>{t('phone')}: 0342 996 574</li>
              <li><i className="fa fa-envelope"></i>Gmail: englishcenter@gmail.com</li>
            </ul>
          </div>
          <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4">
            <h4>{t('group')}</h4>
            <ul>
              <li><i className="fa fa-home"></i>{t('address')}: {t('specifiAddress')}</li>
              <li><i className="fa fa-phone"></i>{t('phone')}: 0966 581 498</li>
              <li><i className="fa fa-envelope"></i>Gmail: tranhuutrung1408@gmail.com</li>
            </ul>
          </div>
          <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4">
            <h4>{t('link')}</h4>
            <ul>
              <li><i className="fa fa-angle-double-right"></i>Prepare for the TOEIC tests</li>
              <li><i className="fa fa-angle-double-right"></i>TOEIC Listening & Reading Test</li>
              <li><i className="fa fa-angle-double-right"></i>TOEIC Speaking & Writing Tests</li>
              <li><i className="fa fa-angle-double-right"></i>TOEIC Bridge Test</li>
              <li><i className="fa fa-angle-double-right"></i>General Terms and Conditions</li>
            </ul>
          </div>
        </div>
        <div className={`row ${styles.copyright}`}>
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center">
            Copyright @2019 ENGLISH CENTER - All rights reserved
          </div>
        </div>
      </div>
    )
  }
}

export default withTranslation()(Footer);