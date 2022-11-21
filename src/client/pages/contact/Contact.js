import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import styles from './Contact.module.css';
import { Icon } from 'antd';
import ContactForm from './ContactForm';
import Loading from '../../components/loading/Loading';
import { withTranslation } from 'react-i18next';

class Contact extends Component {
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
    const { t } = this.props;

    if(loading) {
      return <Loading />;
    }

    return (
      <DocumentTitle title='Contact us'>
        <div className={styles.content}>
          <p className="title-page"><i className="fa fa-drivers-license-o"></i>&nbsp; {t('contact')}</p>
          <div className="row">
            <div className="col-md-12">
              <iframe title="Maps" width="100%" height="400" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3833.844520295291!2d108.14780911416996!3d16.073556043593047!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314218d68dff9545%3A0x714561e9f3a7292c!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBCw6FjaCBLaG9hIC0gxJDhuqFpIGjhu41jIMSQw6AgTuG6tW5n!5e0!3m2!1svi!2s!4v1566979798631!5m2!1svi!2s" frameBorder="0" ></iframe>
            </div>
          </div>
          <div className={`row ${styles.contactWidget}`}>
            <div className={`col-md-5 ${styles.introduce}`}>
              <p>ENGLISH CENTER</p>
              <ul>
                <li><Icon type="home" />{t('companyAddress')}</li>
                <li><Icon type="phone" />0123 456 789</li>
                <li><Icon type="mobile" />0966 581 498</li>
                <li><Icon type="mail" />english.center@gmail.com</li>
                <li><Icon type="global" />https://englishcenter.herokuapp.com</li>
              </ul>
            </div>
            <div className={`col-md-7 ${styles.contactForm}`}> 
              <ContactForm />
            </div>
          </div>
        </div>
      </DocumentTitle>
    );
  }
}

export default withTranslation()(Contact);