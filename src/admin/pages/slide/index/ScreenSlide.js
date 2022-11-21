import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions/index';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import styles from './ScreenSlide.module.css'; 
import SearchComponent from '../../../components/common/search/Search';
import { searchByText } from '../../../../shared/utility';
import WidgetPage from '../../../components/common/widget-page/WidgetPage';
import SlideTable from './SlideTable';
import { withTranslation } from 'react-i18next';

class ScreenSlide extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchingData: this.props.listAllSlides
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.listAllSlides !== this.state.searchingData) {
      this.setState({
        searchingData: nextProps.listAllSlides
      })
    }; 
  }

  handleSearch = (searchText = '') => {
    let matchingData = searchByText(this.props.listAllSlides, searchText);
    this.setState({
      searchingData: matchingData
    });
  }

  render() {
    const { searchingData } = this.state; 
    const { t } = this.props;

    return (
      <DocumentTitle title={`Administrator - ${t('slideManagement')} `}>
        <WidgetPage>
          <p className="title-widget">{t('slideManagement')}</p>
          <div className={styles.topTable}>
            <Link to="/slides/add-new">
              <Button icon="plus" type="green" className={styles.btnAddNewUser}>
                {t('createNew')}
              </Button>
            </Link>
            <div className="pull-right">
              <SearchComponent placeholder={t('search')} onSearch={this.handleSearch} />
            </div>
          </div>
          <SlideTable listAllSlides={searchingData} />
        </WidgetPage>
      </DocumentTitle>
    );
  }
}

const mapStateToProps = state => ({
  listAllSlides: state.slideReducer.listAllSlides,
  isLoaded: !state.slideReducer.isLoading,
  err: state.slideReducer.err,
  message: state.slideReducer.message,
});

const mapDispatchToProps = dispatch => ({
  getAllUsers: () => dispatch(actions.getAllUsers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(ScreenSlide));