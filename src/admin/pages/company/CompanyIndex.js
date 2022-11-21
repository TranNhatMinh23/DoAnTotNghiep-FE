import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import NotFound from '../../components/not-found/NotFound';
import Loading from '../../components/loading/Loading'; 
import CompanyScreen from './CompanyScreen';

class CompanyIndex extends Component {
  componentDidMount() {
    this.props.getAllCompany();
  }

  render() {
    const { isLoaded, allCompany, err } = this.props;
    if (isLoaded && allCompany) { 
      return <CompanyScreen allCompany={allCompany} />
    }

    if (isLoaded && err) {
      return <NotFound />
    }

    return (
      <Loading />
    );
  }
}

const mapStateToProps = state => ({ 
  allCompany: state.companyReducer.allCompany,
  isLoaded: !state.companyReducer.isLoading,
  err: state.companyReducer.err,
  message: state.companyReducer.message,
});

const mapDispatchToProps = dispatch => ({ 
  getAllCompany: () => dispatch(actions.getAllCompany())
});

export default connect(mapStateToProps, mapDispatchToProps)(CompanyIndex);