import * as actionTypes from '../../constants/actionTypes';
import axios from '../../shared/api';
import { toastMessage } from '../../shared/utils';  
import { 
  getAllContactsFailMessage, 
  deleteContactFailMessage, 
  deleteContactSuccessMessage,
  changeContactStatusSuccessMessage,
  changeContactStatusFailMessage
} from '../../constants/messageResponse';
import { message } from 'antd';

//GET_ALL_CONTACTS
const getAllContactsSuccess = (data) => ({
  type: actionTypes.GET_ALL_CONTACTS.SUCCESS,
  data
});

const getAllContactsFail = (err) => ({
  type: actionTypes.GET_ALL_CONTACTS.FAIL,
  err,
});

export const getAllContacts = () => {
  return dispatch => {
    dispatch({ type: actionTypes.GET_ALL_CONTACTS.PENDING });
    axios.get(`/api/contacts`)
      .then((response) => { 
        dispatch(getAllContactsSuccess(response.data)); 
      })
      .catch(err => {
        let error = err.response ? err.response.data.error : getAllContactsFailMessage;
        dispatch(getAllContactsFail(error));
        toastMessage("error", error);
      });
  }
}

//DELETE_CONTACT
const deleteContactSuccess = (contactId, contactType) => ({
  type: actionTypes.DELETE_CONTACT.SUCCESS,
  contactId,
  contactType
})

const deleteContactFail = (err) => ({
  type: actionTypes.DELETE_CONTACT.FAIL,
  err,
})

export const deleteContact = (contactId, contactType) => {
  return dispatch => {
    dispatch({ type: actionTypes.DELETE_CONTACT.PENDING });
    axios.delete(`/api/contacts/${contactId}`)
      .then((response) => {
        message.success(deleteContactSuccessMessage);
        dispatch(deleteContactSuccess(contactId, contactType));
      })
      .catch(err => {
        message.error(deleteContactFailMessage);
        dispatch(deleteContactFail(deleteContactFailMessage));
      });
  };
}

// CHANGE_CONTACT_STATUS
const changeContactStatusSuccess = (contactId) => ({
  type: actionTypes.CHANGE_CONTACT_STATUS.SUCCESS,
  contactId
})

const changeContactStatusFail = (err) => ({
  type: actionTypes.CHANGE_CONTACT_STATUS.FAIL,
  err,
})

export const changeContactStatus = (contactId) => {
  return dispatch => {
    dispatch({ type: actionTypes.CHANGE_CONTACT_STATUS.PENDING });
    axios.put(`/api/contacts/${contactId}/status`)
      .then((response) => {
        message.success(changeContactStatusSuccessMessage);
        dispatch(changeContactStatusSuccess(contactId));
      })
      .catch(err => {
        message.error(changeContactStatusFailMessage);
        dispatch(changeContactStatusFail(changeContactStatusFailMessage));
      });
  };
}
