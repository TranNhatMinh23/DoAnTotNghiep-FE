import * as actionTypes from '../../constants/actionTypes';
import axios from '../../shared/api';
import { toastMessage } from '../../shared/utils';
import { 
  getAllExamPracticeFailMessage, 
  getExamBeforeTakenByIdFailMessage, 
  getExamByIdClientFailMessage,
  // submitExamAnswerFailMessage,
  // getResultAfterSubmitFailMessage
} from '../../constants/messageResponseClient';

// GET_ALL_EXAM_PRACTICE
const getAllExamPracticeSuccess = (data) => ({
  type: actionTypes.GET_ALL_EXAM_PRACTICE.SUCCESS,
  data,
})

const getAllExamPracticeFail = (err) => ({
  type: actionTypes.GET_ALL_EXAM_PRACTICE.FAIL,
  err,
})

export const getAllExamPractice = (page = 1, by = "all") => {
  return dispatch => {
    dispatch({ type: actionTypes.GET_ALL_EXAM_PRACTICE.PENDING });
    axios.get(`/api/exams?by=${by}&page=${page}`)
      .then((response) => { 
        dispatch(getAllExamPracticeSuccess(response.data));
      })
      .catch(err => {
        let error = err.response ? err.response.data.error : getAllExamPracticeFailMessage;
        dispatch(getAllExamPracticeFail(error));
        toastMessage("error", error);
      });
  };
}

//// GET_EXAM_BEFORE_TAKEN_BY_ID
const getExamBeforeTakenByIdSuccess = (data) => ({
  type: actionTypes.GET_EXAM_BEFORE_TAKEN_BY_ID.SUCCESS,
  data,
})

const getExamBeforeTakenByIdFail = (err) => ({
  type: actionTypes.GET_EXAM_BEFORE_TAKEN_BY_ID.FAIL,
  err,
})

export const getExamBeforeTakenById = (examId) => {
  return dispatch => {
    dispatch({ type: actionTypes.GET_EXAM_BEFORE_TAKEN_BY_ID.PENDING });
    axios.get(`/api/exams/${examId}/before_test`)
      .then((response) => {
        dispatch(getExamBeforeTakenByIdSuccess(response.data));
      })
      .catch(err => {
        let error = err.response ? err.response.data.error : getExamBeforeTakenByIdFailMessage;
        dispatch(getExamBeforeTakenByIdFail(error));
        toastMessage("error", error);
      });
  };
}

//GET_EXAM_BY_ID
const getExamByIdClientSuccess = (data) => ({
  type: actionTypes.GET_EXAM_BY_ID_CLIENT.SUCCESS,
  data,
})

const getExamByIdClientFail = (err) => ({
  type: actionTypes.GET_EXAM_BY_ID_CLIENT.FAIL,
  err,
})

export const getExamByIdClient = (examId) => {
  return dispatch => {
    dispatch({ type: actionTypes.GET_EXAM_BY_ID_CLIENT.PENDING });
    axios.get(`/api/exams/${examId}`)
      .then((response) => {
        dispatch(getExamByIdClientSuccess(response.data));
      })
      .catch(err => {
        let error = err.response ? err.response.data.error : getExamByIdClientFailMessage;
        dispatch(getExamByIdClientFail(error));
        toastMessage("error", error);
      });
  };
}


// //SUBMIT_EXAM_ANSWER
// const submitExamAnswerSuccess = (data) => ({
//   type: actionTypes.SUBMIT_EXAM_ANSWER.SUCCESS,
//   data,
// })

// const submitExamAnswerFail = (err) => ({
//   type: actionTypes.SUBMIT_EXAM_ANSWER.FAIL,
//   err
// })

// export const submitExamAnswer = (examId, listAnswer) => {
//   return dispatch => {
//     dispatch({ type: actionTypes.SUBMIT_EXAM_ANSWER.PENDING });
//     axios.post(`/api/submit_answers/${examId}`, listAnswer)
//       .then((response) => {
//         dispatch(submitExamAnswerSuccess(response.data)); 
//       })
//       .catch(err => {
//         let error = err.response ? err.response.data.error : submitExamAnswerFailMessage;
//         dispatch(submitExamAnswerFail(error));
//         toastMessage("error", error);
//       });
//   };
// }

// //GET_RESULT_AFTER_SUBMIT
// const getResultAfterSubmitSuccess = (data) => ({
//   type: actionTypes.GET_RESULT_AFTER_SUBMIT.SUCCESS,
//   data,
// })

// const getResultAfterSubmitFail = (err) => ({
//   type: actionTypes.GET_RESULT_AFTER_SUBMIT.FAIL,
//   err
// })

// export const getResultAfterSubmit = (reportId) => {
//   return dispatch => {
//     dispatch({ type: actionTypes.GET_RESULT_AFTER_SUBMIT.PENDING });
//     axios.get(`/api/submit_answers/${reportId}`)
//       .then((response) => {
//         dispatch(getResultAfterSubmitSuccess(response.data)); 
//       })
//       .catch(err => {
//         let error = err.response ? err.response.data.error : getResultAfterSubmitFailMessage;
//         dispatch(getResultAfterSubmitFail(error));
//         toastMessage("error", error);
//       });
//   };
// }