import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions/index';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import styles from './UsersManagementIndex.module.css';
import UsersManagementTable from './UsersManagementTable';
import SearchComponent from '../../../components/common/search/Search';
import { searchByText } from '../../../../shared/utility';
import WidgetPage from '../../../components/common/widget-page/WidgetPage';
import { withTranslation } from 'react-i18next';

class ScreenUsersManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchingData: this.props.listAllUsers
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.listAllUsers !== this.state.searchingData) {
      this.setState({
        searchingData: nextProps.listAllUsers
      })
    };

  }

  handleSearch = (searchText = '') => {
    let matchingData = searchByText(this.props.listAllUsers, searchText);
    this.setState({
      searchingData: matchingData
    });
  }

  render() {
    const { searchingData } = this.state;
    const { t } = this.props;

    return (
      <DocumentTitle title={`Administrator - ${t('usersManagement')}`}>
        <WidgetPage>
          <p className="title-widget">{t('usersManagement')}</p>
          <div className={styles.topTable}>
            <Link to="/users-management/add-new-user">
              <Button icon="plus" type="green" className={styles.btnAddNewUser}>
                {t('createNew')}
              </Button>
            </Link>
            <div className="pull-right">
              <SearchComponent placeholder={t('search')} onSearch={this.handleSearch} />
            </div>
          </div>
          <UsersManagementTable listAllUsers={searchingData} />
        </WidgetPage>
      </DocumentTitle>
    );
  }
}

const mapStateToProps = state => ({
  listAllUsers: state.userReducer.listAllUsers,
  isLoaded: !state.userReducer.isLoading,
  err: state.userReducer.err,
  message: state.userReducer.message,
});

const mapDispatchToProps = dispatch => ({
  getAllUsers: () => dispatch(actions.getAllUsers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(ScreenUsersManagement));