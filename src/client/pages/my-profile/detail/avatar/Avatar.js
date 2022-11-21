import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../../../../../store/actions/index';
import styles from './Avatar.module.css';
import {
  Button,
  Icon,
} from 'antd';
import { readURL } from '../../../../../shared/function';
import avatarDefault from '../../../../../assets/avatars/default.jpg';
import loadingGif from '../../../../../assets/icons/spinner2.gif';
import { toastMessage } from '../../../../../shared/utils';
import { withTranslation } from 'react-i18next';

class Avatar extends Component {
  state = {
    currentFile: null
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.isLoadingUploadAvatar && !nextProps.err) {
      readURL("avatarImg", this.state.currentFile);
    }
  }

  changeImageFromClient = (e) => {
    let files = e.target.files;
    if(files.length !== 0) {
      this.setState({ currentFile: files }, () => {
        let userId = this.props.userInfo.id;
        this.props.updateAvatar(userId, files[0]);
      });
    } else {
      toastMessage("error", "You have not selected any photos");
    }
  }

  render() {
    let { isLoadingUploadAvatar, userInfo, t } = this.props;
    return (
      <div className={styles.widgetAvatar}>
        <div className={styles.previewAvatar}>
          {
            isLoadingUploadAvatar ?
              <img src={loadingGif} alt="" />
              : userInfo.avatar_url ?
                <img id="avatarImg" src={process.env.REACT_APP_URL_API+ userInfo.avatar_url} alt="" />
                :
                <img src={avatarDefault} alt="" />
          }
        </div>
        <input
          id="avatar"
          accept="image/*"
          onChange={this.changeImageFromClient}
          className="input-file"
          type="file"
        />
        <Button type="primary">
          <label htmlFor="avatar" className={styles.labelInputFile}>
            <Icon type="upload" /> {t('uploadAvatar')}
            </label>
        </Button>
      </div>
    )
  }
}

Avatar.propTypes = {
  userInfo: PropTypes.object,
}

const mapStateToProps = state => ({
  err: state.authReducer.err,
  message: state.authReducer.message,
  isLoadingUploadAvatar: state.authReducer.isLoadingUploadAvatar
});

const mapDispatchToProps = dispatch => ({
  updateAvatar: (userId, files) => dispatch(actions.updateAvatar(userId, files))
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(Avatar));