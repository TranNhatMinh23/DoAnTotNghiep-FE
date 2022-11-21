import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import { connect } from 'react-redux'; 
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import styles from './ScreenArticles.module.css'; 
import SearchComponent from '../../../components/common/search/Search';
import { searchByText } from '../../../../shared/utility';
import WidgetPage from '../../../components/common/widget-page/WidgetPage'; 
import ArticlesTable from './ArticlesTable';
import { withTranslation } from 'react-i18next';

class ScreenArticles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchingData: this.props.listAllArticles
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.listAllArticles !== this.state.searchingData) {
      this.setState({
        searchingData: nextProps.listAllArticles
      })
    }; 
  }

  handleSearch = (searchText = '') => {
    let matchingData = searchByText(this.props.listAllArticles, searchText);
    this.setState({
      searchingData: matchingData
    });
  }

  render() {
    const { searchingData } = this.state;
    const { t } = this.props;

    return (
      <DocumentTitle title={`Administrator - ${t('articlesManagement')}`}>
        <WidgetPage>
          <p className="title-widget">{t('articlesManagement')}</p>
          <div className={styles.topTable}>
            <Link to="/articles/add-new">
              <Button icon="plus" type="green" className={styles.btnAddNewUser}>
                {t('createNew')}
              </Button>
            </Link>
            <div className="pull-right">
              <SearchComponent placeholder={t('search')} onSearch={this.handleSearch} />
            </div>
          </div>
          <ArticlesTable listAllArticles={searchingData} />
        </WidgetPage>
      </DocumentTitle>
    );
  }
}

const mapStateToProps = state => ({
  listAllArticles: state.articlesReducer.listAllArticles,
  isLoaded: !state.articlesReducer.isLoading,
  err: state.articlesReducer.err,
  message: state.articlesReducer.message,
});

export default connect(mapStateToProps, null)(withTranslation()(ScreenArticles));