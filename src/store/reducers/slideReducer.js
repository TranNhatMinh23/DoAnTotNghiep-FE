import * as actionTypes from '../../constants/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  isLoading: false,
  err: false,
  message: '',
  listAllSlides: [],
  detailSlide: null,
  isLoadingEdit: false,
  isLoadingCreate: false,
  isUpdatingStatus: false
};

//GET ALL SLIDES
const getAllSlidesPending = (state, action) => {
  return updateObject(state, {
    isLoading: true,
    err: false,
    message: '',
    listAllSlides: [] 
  })
}

const getAllSlidesSuccess = (state, action) => {
	return updateObject(state, {
    isLoading: false,
    listAllSlides: action.data,
	});
}

const getAllSlidesFail = (state, action) => {
  return updateObject(state, {
    isLoading: false,
    message: action.err,
    err: true,
  })
}

//ADD_SLIDE
const addSlidePending = (state, action) => {
  return updateObject(state, {
    isLoadingCreate: true,
    err: false,
    message: ''
  })
}

const addSlideSuccess = (state, action) => {
  let listAllSlidesNew = state.listAllSlides.concat(action.data);
	return updateObject(state, {
    isLoadingCreate: false,
    listAllSlides: listAllSlidesNew
	});
}

const addSlideFail = (state, action) => {
  return updateObject(state, {
    isLoadingCreate: false,
    message: action.err,
    err: true,
  })
}

//DELETE_SLIDE
const deleteSlidePending = (state, action) => {
  return updateObject(state, {
    isLoading: true,
    err: false,
    message: ''
  })
}

const deleteSlideSuccess = (state, action) => {
  let objIndex = state.listAllSlides.findIndex((obj => obj.id === action.slideId));
  let tempObjSlides = state.listAllSlides;
  tempObjSlides.splice(objIndex, 1);
	return updateObject(state, {
    isLoading: false,
    listAllSlides: tempObjSlides
	});
}

const deleteSlideFail = (state, action) => {
  return updateObject(state, {
    isLoading: false,
    message: action.err,
    err: true,
  })
}

//CHANGE_SLIDE_STATUS
const changeSlideStatusPending = (state, action) => {
  return updateObject(state, {
    isUpdatingStatus: true,
    err: false,
    message: ''
  })
}

const changeSlideStatusSuccess = (state, action) => {
  let slideUpdated = state.listAllSlides.map(item => {
    if (item.id === action.slideId) return updateObject(item, {status: !item.status});
    return item;
  });

	return updateObject(state, {
    isUpdatingStatus: false,
    listAllSlides: slideUpdated,
	});
}

const changeSlideStatusFail = (state, action) => {
  return updateObject(state, {
    isUpdatingStatus: false,
    message: action.err,
    err: true,
  })
}

//GET_SLIDE_BY_ID
const getSlideByIdPending = (state, action) => {
  return updateObject(state, {
    isLoading: true,
    err: false,
    message: '',
    detailSlide: null
  })
}

const getSlideByIdSuccess = (state, action) => {
	return updateObject(state, {
    isLoading: false,
    detailSlide: action.data,
	});
}

const getSlideByIdFail = (state, action) => {
  return updateObject(state, {
    isLoading: false,
    message: action.err,
    err: true,
  })
}

//EDIT_SLIDE
const editSlidePending = (state, action) => {
  return updateObject(state, {
    isLoadingEdit: true,
    err: false,
    message: ''
  })
}

const editSlideSuccess = (state, action) => {
	return updateObject(state, {
    isLoadingEdit: false
	});
}

const editSlideFail = (state, action) => {
  return updateObject(state, {
    isLoadingEdit: false,
    message: action.err,
    err: true,
  })
}


const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.GET_ALL_SLIDE.PENDING: return getAllSlidesPending(state, action);
    case actionTypes.GET_ALL_SLIDE.SUCCESS: return getAllSlidesSuccess(state, action);
    case actionTypes.GET_ALL_SLIDE.FAIL: return getAllSlidesFail(state, action);

    case actionTypes.ADD_SLIDE.PENDING: return addSlidePending(state, action);
    case actionTypes.ADD_SLIDE.SUCCESS: return addSlideSuccess(state, action);
    case actionTypes.ADD_SLIDE.FAIL: return addSlideFail(state, action);

    case actionTypes.DELETE_SLIDE.PENDING: return deleteSlidePending(state, action);
    case actionTypes.DELETE_SLIDE.SUCCESS: return deleteSlideSuccess(state, action);
    case actionTypes.DELETE_SLIDE.FAIL: return deleteSlideFail(state, action);

    case actionTypes.CHANGE_SLIDE_STATUS.PENDING: return changeSlideStatusPending(state, action);
    case actionTypes.CHANGE_SLIDE_STATUS.SUCCESS: return changeSlideStatusSuccess(state, action);
    case actionTypes.CHANGE_SLIDE_STATUS.FAIL: return changeSlideStatusFail(state, action);

    case actionTypes.GET_SLIDE_BY_ID.PENDING: return getSlideByIdPending(state, action);
    case actionTypes.GET_SLIDE_BY_ID.SUCCESS: return getSlideByIdSuccess(state, action);
    case actionTypes.GET_SLIDE_BY_ID.FAIL: return getSlideByIdFail(state, action);

    case actionTypes.EDIT_SLIDE.PENDING: return editSlidePending(state, action);
    case actionTypes.EDIT_SLIDE.SUCCESS: return editSlideSuccess(state, action);
    case actionTypes.EDIT_SLIDE.FAIL: return editSlideFail(state, action);

		default: return state;
	}
};

export default reducer;