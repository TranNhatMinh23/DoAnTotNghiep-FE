import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions/index'; 
import { Button } from 'antd';
import styles from './ScreenCategory.module.css';
import SearchComponent from '../../../components/common/search/Search';
import { searchByText } from '../../../../shared/utility';
import WidgetPage from '../../../components/common/widget-page/WidgetPage';
import CategoryTable from './CategoryTable';
import ModalAddCategory from '../detail/modal-add-category/ModalAddCategory';
import { withTranslation } from 'react-i18next';

class ScreenCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchingData: this.props.listAllCategories,
      visibleModalAdd: false
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.listAllCategories !== this.state.searchingData) {
      this.setState({
        searchingData: nextProps.listAllCategories
      })
    };
  }

  handleSearch = (searchText = '') => {
    let matchingData = searchByText(this.props.listAllCategories, searchText);
    this.setState({
      searchingData: matchingData
    });
  }

  showModalAddCategory = () => {
    this.setState({
      visibleModalAdd: true
    })
  }

  closeModalAddCategory = () => {
    this.setState({
      visibleModalAdd: false
    })
  }

  render() {
    const { searchingData, visibleModalAdd } = this.state;
    const { t } = this.props;

    return (
      <DocumentTitle title={`Administrator - ${t('categoryManagement')}`}>
        <WidgetPage>
          <p className="title-widget">{t('categoryManagement')}</p>
          <div className={styles.topTable}>
            <Button onClick={this.showModalAddCategory} icon="plus" type="green" className={styles.btnAddNewUser}>
              {t('createNew')}
            </Button>
            <div className="pull-right">
              <SearchComponent placeholder={t('search')} onSearch={this.handleSearch} />
            </div>
          </div>
          <CategoryTable listAllCategories={searchingData} />
          {visibleModalAdd && <ModalAddCategory visible={visibleModalAdd} onCloseDialog={this.closeModalAddCategory} />}
        </WidgetPage>
      </DocumentTitle>
    );
  }
}

const mapStateToProps = state => ({
  listAllCategories: state.categoryReducer.listAllCategories,
  isLoaded: !state.categoryReducer.isLoading,
  err: state.categoryReducer.err,
  message: state.categoryReducer.message,
});

const mapDispatchToProps = dispatch => ({
  getAllUsers: () => dispatch(actions.getAllUsers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(ScreenCategory));