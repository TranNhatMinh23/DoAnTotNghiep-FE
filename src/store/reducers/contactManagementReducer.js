import * as actionTypes from '../../constants/actionTypes';
import { updateObject } from '../../shared/utility';
import { filterContactsByStatus } from '../../shared/function';

const initialState = {
	isLoading: false,
	err: false,
	message: '',
  listPenddingContacts: [],
  listProcessedContacts: [],
	detailContact: null,
	isUpdating: false
};

//GET_ALL_CONTACTS
const getAllContactsPendding = (state, action) => {
	return updateObject(state, {
		isLoading: true,
		err: false,
		message: '',
		listPenddingContacts: [],
    listProcessedContacts: [],
	});
}

const getAllContactsSuccess = (state, action) => {
	return updateObject(state, {
		isLoading: false,
		listPenddingContacts: filterContactsByStatus(action.data, true),
    listProcessedContacts: filterContactsByStatus(action.data, false)
	});
}

const getAllContactsFail = (state, action) => {
	return updateObject(state, {
		isLoading: false,
		err: true,
		message: action.err
	});
}

//DELETE_CONTACT
const deleteContactPendding = (state, action) => {
  return updateObject(state, {
    isLoading: true,
    err: false,
    message: ''
  })
}

const deleteContactSuccess = (state, action) => {
	let objIndex = -1;
	let tempObjContactPendding = state.listPenddingContacts;
	let tempObjContactProcessed = state.listProcessedContacts; 
	if(action.contactType === "Pending"){
		objIndex = state.listPenddingContacts.findIndex((obj => obj.id === action.contactId));
		tempObjContactPendding.splice(objIndex, 1);
		return updateObject(state, {
			isLoading: false,
			listPenddingContacts: tempObjContactPendding
		});  
	} else {
		objIndex = state.listProcessedContacts.findIndex((obj => obj.id === action.contactId));
		tempObjContactProcessed.splice(objIndex, 1); 
		return updateObject(state, {
			isLoading: false, 
			listProcessedContacts: tempObjContactProcessed
		});
	} 
}

const deleteContactFail = (state, action) => {
  return updateObject(state, {
    isLoading: false,
    message: action.err,
    err: true,
  })
}

// CHANGE_CONTACT_STATUS
const changeContactStatusPendding = (state, action) => {
  return updateObject(state, {
    isLoading: true,
    err: false,
    message: ''
  })
}

const changeContactStatusSuccess = (state, action) => {
	let objIndex = state.listPenddingContacts.findIndex((obj => obj.id === action.contactId));
	let currentContact = state.listPenddingContacts[objIndex];
	let currentContactUpdate = updateObject(currentContact, {status: false});
	let tempObjContactPendding = state.listPenddingContacts; 
	tempObjContactPendding.splice(objIndex, 1); 
	state.listProcessedContacts.push(currentContactUpdate);  
	return updateObject(state, {
    isLoading: false,
    listPenddingContacts: tempObjContactPendding 
	});
}

const changeContactStatusFail = (state, action) => {
  return updateObject(state, {
    isLoading: false,
    message: action.err,
    err: true,
  })
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.GET_ALL_CONTACTS.PENDING: return getAllContactsPendding(state, action);
		case actionTypes.GET_ALL_CONTACTS.SUCCESS: return getAllContactsSuccess(state, action);
		case actionTypes.GET_ALL_CONTACTS.FAIL: return getAllContactsFail(state, action);

		case actionTypes.DELETE_CONTACT.PENDING: return deleteContactPendding(state, action);
		case actionTypes.DELETE_CONTACT.SUCCESS: return deleteContactSuccess(state, action);
		case actionTypes.DELETE_CONTACT.FAIL: return deleteContactFail(state, action);

		case actionTypes.CHANGE_CONTACT_STATUS.PENDING: return changeContactStatusPendding(state, action);
		case actionTypes.CHANGE_CONTACT_STATUS.SUCCESS: return changeContactStatusSuccess(state, action);
		case actionTypes.CHANGE_CONTACT_STATUS.FAIL: return changeContactStatusFail(state, action);

		default: return state;
	}
};

export default reducer;