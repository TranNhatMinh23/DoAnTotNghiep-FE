import * as actionTypes from '../../constants/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  isLoading: false,
  err: false,
  message: '',
  detailPart: null,
  isUploadExampleImage: false,
  isUpdateAnswerExample: false,
  isUpdateQuestion: false,
  isUploadQuestionImage: false,
  isUploadParagraphImage: false
};

//GET_DETAIL_INFO_PART 
const getDetailInfoPartPending = (state, action) => {
  return updateObject(state, {
    isLoading: true,
    err: false,
    message: '',
    detailPart: null
  });
}

const getDetailInfoPartSuccess = (state, action) => {
  let detailPartNew = action.data;
  if(parseInt(action.data.part_no, 10) === 7){
    let addFieldIsFirstGroup = action.data.questions.map(items => {
      items.isFirstGroup = (items.group_desc && items.group_desc !== "false") ? true : false;
      return items; 
    });
    detailPartNew = updateObject(action.data, {questions: addFieldIsFirstGroup});
  } else if(parseInt(action.data.part_no, 10) === 6){
    let addFieldIsFirstGroup = action.data.questions.map((items, index) => {
      items.isFirstGroup = (index % 4 === 0) ? true : false; 
      return items;
    });
    detailPartNew = updateObject(action.data, {questions: addFieldIsFirstGroup});
  }
  return updateObject(state, {
    isLoading: false,
    detailPart: detailPartNew
  });
}

const getDetailInfoPartFail = (state, action) => {
  return updateObject(state, {
    isLoading: false,
    err: true,
    message: action.err
  });
}

//UPLOAD_EXAMPLE_IMAGE_FOR_PART
const uploadExampleImageForPartPending = (state, action) => {
  return updateObject(state, {
    isUploadExampleImage: true,
    err: false,
    message: ''
  });
}

const uploadExampleImageForPartSuccess = (state, action) => {
  let detailPartUpdate = updateObject(state.detailPart, {
    ex_question_image: action.data
  });

  return updateObject(state, {
    isUploadExampleImage: false,
    detailPart: detailPartUpdate
  });
}

const uploadExampleImageForPartFail = (state, action) => {
  return updateObject(state, {
    isUploadExampleImage: false,
    err: true,
    message: action.err
  });
}

//DELETE_EXAMPLE_IMAGE
const deleteExampleImagePending = (state, action) => {
  return updateObject(state, {
    isUploadExampleImage: true,
    err: false,
    message: ''
  });
}

const deleteExampleImageSuccess = (state, action) => {
  let detailPartUpdate = updateObject(state.detailPart, {
    ex_question_image: null
  });

  return updateObject(state, {
    isUploadExampleImage: false,
    detailPart: detailPartUpdate
  });
}

const deleteExampleImageFail = (state, action) => {
  return updateObject(state, {
    isUploadExampleImage: false,
    err: true,
    message: action.err
  });
}

//UPDATE_ANSWER_EXAMPLE
const updateAnswerExamplePending = (state, action) => {
  return updateObject(state, {
    isUpdateAnswerExample: true,
    err: false,
    message: ''
  });
}

const updateAnswerExampleSuccess = (state, action) => {
  let detailPartUpdate = updateObject(state.detailPart, {
    ex_answer_key: action.data.ex_answer_key
  });

  return updateObject(state, {
    isUpdateAnswerExample: false,
    detailPart: detailPartUpdate
  });
}

const updateAnswerExampleFail = (state, action) => {
  return updateObject(state, {
    isUpdateAnswerExample: false,
    err: true,
    message: action.err
  });
}

//UPDATE_QUESTION
const updateQuestionPending = (state, action) => {
  return updateObject(state, {
    isUpdateQuestion: true,
    err: false,
    message: ''
  });
}

const updateQuestionSuccess = (state, action) => { 
  let questionsUpdated = state.detailPart.questions.map(question => {
    if (question.id === action.data.id) return updateObject(question, { 
      answers: action.data.answers,
      group_desc: action.data.group_desc
    });
    return question;
  });

  let detailPartUpdated = updateObject(state.detailPart, { questions: questionsUpdated });

  return updateObject(state, {
    isUpdateQuestion: false,
    detailPart: detailPartUpdated
  });
}

const updateQuestionFail = (state, action) => {
  return updateObject(state, {
    isUpdateQuestion: false,
    err: true,
    message: action.err
  });
}

//UPLOAD_QUESTION_IMAGE
const updateQuestionImagePending = (state, action) => {
  return updateObject(state, {
    isUploadQuestionImage: true,
    err: false,
    message: ''
  });
}

const updateQuestionImageSuccess = (state, action) => {
  let questionsUpdated = state.detailPart.questions.map(item => {
    if (item.id === action.questionId) return updateObject(item, {
      question_image: action.data
    });
    return item;
  });

  let detailPartUpdated = updateObject(state.detailPart, { questions: questionsUpdated });

  return updateObject(state, {
    isUploadQuestionImage: false,
    detailPart: detailPartUpdated
  });
}

const updateQuestionImageFail = (state, action) => {
  return updateObject(state, {
    isUploadQuestionImage: false,
    err: true,
    message: action.err
  });
}

//DELETE_QUESTION_IMAGE
const deleteQuestionImagePending = (state, action) => {
  return updateObject(state, {
    isUploadQuestionImage: true,
    err: false,
    message: ''
  });
}

const deleteQuestionImageSuccess = (state, action) => {
  let questionsUpdated = state.detailPart.questions.map(item => {
    if (item.id === action.questionId) return updateObject(item, {
      question_image: null
    });
    return item;
  });

  let detailPartUpdated = updateObject(state.detailPart, { questions: questionsUpdated });

  return updateObject(state, {
    isUploadQuestionImage: false,
    detailPart: detailPartUpdated
  });
}

const deleteQuestionImageFail = (state, action) => {
  return updateObject(state, {
    isUploadQuestionImage: false,
    err: true,
    message: action.err
  });
}

//UPLOAD_PARAGRAPH_IMAGE
const uploadParagraphImagePending = (state, action) => {
  return updateObject(state, {
    isUploadParagraphImage: true,
    err: false,
    message: ''
  });
}

const uploadParagraphImageSuccess = (state, action) => {
  let objIndex = state.detailPart.questions.findIndex((obj => obj.id === action.questionId));
  let tempObjQuestions = state.detailPart.questions;
  tempObjQuestions[objIndex][`paragraph_image${action.paragraphNo}`] = action.data;
  let detailPartUpdated = updateObject(state.detailPart, { questions: tempObjQuestions });

  return updateObject(state, {
    isUploadParagraphImage: false,
    detailPart: detailPartUpdated,
  });
}

const uploadParagraphImageFail = (state, action) => {
  return updateObject(state, {
    isUploadParagraphImage: false,
    err: true,
    message: action.err
  });
}

//DELETE_PARAGRAPH_IMAGE
const deleteParagraphImagePending = (state, action) => {
  return updateObject(state, {
    isUploadParagraphImage: true,
    err: false,
    message: ''
  });
}

const deleteParagraphImageSuccess = (state, action) => {
  let objIndex = state.detailPart.questions.findIndex((obj => obj.id === action.questionId));
  let tempObjQuestions = state.detailPart.questions;
  tempObjQuestions[objIndex][`paragraph_image${action.paragraphNo}`] = null;
  let detailPartUpdated = updateObject(state.detailPart, { questions: tempObjQuestions });

  return updateObject(state, {
    isUploadParagraphImage: false,
    detailPart: detailPartUpdated,
  });
}

const deleteParagraphImageFail = (state, action) => {
  return updateObject(state, {
    isUploadParagraphImage: false,
    err: true,
    message: action.err
  });
}

//CHANGE_STATUS_IS_FIRST_GROUP_QUESTION
const changeStateIsFirstGroupQuestion = (state, action) => {
  let objIndex = state.detailPart.questions.findIndex((obj => obj.id === action.questionId));
  let tempObjQuestions = state.detailPart.questions;
  
  if (tempObjQuestions[objIndex].isFirstGroup === null || tempObjQuestions[objIndex].isFirstGroup === false) {
    tempObjQuestions[objIndex].isFirstGroup = true;
  } else {
    tempObjQuestions[objIndex].isFirstGroup = false;
  }

  let detailPartNew = updateObject(state.detailPart, {
    questions: tempObjQuestions,
  });

  return updateObject(state, {
    detailPart: detailPartNew,
  });
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_DETAIL_INFO_PART.PENDING: return getDetailInfoPartPending(state, action);
    case actionTypes.GET_DETAIL_INFO_PART.SUCCESS: return getDetailInfoPartSuccess(state, action);
    case actionTypes.GET_DETAIL_INFO_PART.FAIL: return getDetailInfoPartFail(state, action);

    case actionTypes.UPLOAD_EXAMPLE_IMAGE_FOR_PART.PENDING: return uploadExampleImageForPartPending(state, action);
    case actionTypes.UPLOAD_EXAMPLE_IMAGE_FOR_PART.SUCCESS: return uploadExampleImageForPartSuccess(state, action);
    case actionTypes.UPLOAD_EXAMPLE_IMAGE_FOR_PART.FAIL: return uploadExampleImageForPartFail(state, action);

    case actionTypes.DELETE_EXAMPLE_IMAGE.PENDING: return deleteExampleImagePending(state, action);
    case actionTypes.DELETE_EXAMPLE_IMAGE.SUCCESS: return deleteExampleImageSuccess(state, action);
    case actionTypes.DELETE_EXAMPLE_IMAGE.FAIL: return deleteExampleImageFail(state, action);

    case actionTypes.UPDATE_ANSWER_EXAMPLE.PENDING: return updateAnswerExamplePending(state, action);
    case actionTypes.UPDATE_ANSWER_EXAMPLE.SUCCESS: return updateAnswerExampleSuccess(state, action);
    case actionTypes.UPDATE_ANSWER_EXAMPLE.FAIL: return updateAnswerExampleFail(state, action);

    case actionTypes.UPDATE_QUESTION.PENDING: return updateQuestionPending(state, action);
    case actionTypes.UPDATE_QUESTION.SUCCESS: return updateQuestionSuccess(state, action);
    case actionTypes.UPDATE_QUESTION.FAIL: return updateQuestionFail(state, action);

    case actionTypes.UPLOAD_QUESTION_IMAGE.PENDING: return updateQuestionImagePending(state, action);
    case actionTypes.UPLOAD_QUESTION_IMAGE.SUCCESS: return updateQuestionImageSuccess(state, action);
    case actionTypes.UPLOAD_QUESTION_IMAGE.FAIL: return updateQuestionImageFail(state, action);

    case actionTypes.DELETE_QUESTION_IMAGE.PENDING: return deleteQuestionImagePending(state, action);
    case actionTypes.DELETE_QUESTION_IMAGE.SUCCESS: return deleteQuestionImageSuccess(state, action);
    case actionTypes.DELETE_QUESTION_IMAGE.FAIL: return deleteQuestionImageFail(state, action);

    case actionTypes.UPLOAD_PARAGRAPH_IMAGE.PENDING: return uploadParagraphImagePending(state, action);
    case actionTypes.UPLOAD_PARAGRAPH_IMAGE.SUCCESS: return uploadParagraphImageSuccess(state, action);
    case actionTypes.UPLOAD_PARAGRAPH_IMAGE.FAIL: return uploadParagraphImageFail(state, action);

    case actionTypes.DELETE_PARAGRAPH_IMAGE.PENDING: return deleteParagraphImagePending(state, action);
    case actionTypes.DELETE_PARAGRAPH_IMAGE.SUCCESS: return deleteParagraphImageSuccess(state, action);
    case actionTypes.DELETE_PARAGRAPH_IMAGE.FAIL: return deleteParagraphImageFail(state, action);

    case actionTypes.CHANGE_STATUS_IS_FIRST_GROUP_QUESTION: return changeStateIsFirstGroupQuestion(state, action);

    default: return state;
  }
};

export default reducer;