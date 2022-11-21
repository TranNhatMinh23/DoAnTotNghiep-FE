const errorApiResponse = (message) => {
  return `Something went wrong so you cannot ${message}`;
};
const successApiResponse = (message) => {
  return `Well done! ${message} successfully!`;
};

export const getAllExamPracticeFailMessage = errorApiResponse("get exams");
export const getExamBeforeTakenByIdFailMessage = errorApiResponse("get exams before taken");
export const getExamByIdClientFailMessage = errorApiResponse("get detail exam");
export const submitExamAnswerFailMessage = errorApiResponse("submit your answer");
export const getResultAfterSubmitFailMessage = errorApiResponse("get your result");
export const sendContactFailMessage = errorApiResponse("send contact for us");
export const sendContactSuccessMessage = successApiResponse("You have sent contact for us");
export const myReportsFailMessage = errorApiResponse("get your reports");
export const getSampleExamsClientFailMessage = errorApiResponse("get sample exams");
export const getSampleExamClientBeforeTakenByIdFailMessage = errorApiResponse("get sample exam");
export const getSampleExamClientByIdFailMessage = errorApiResponse("get detail sample exam");
export const getAllTipsFailMessage = errorApiResponse("Get tips");
export const getDetailTipFailMessage = errorApiResponse("get detail tip");
export const getResultByReportIdFailMessage = errorApiResponse("get your answer");
export const getInfoHomeClientFailMessage = errorApiResponse("get informations");
export const getAllArticleClientFailMessage = errorApiResponse("view all article");
export const viewDetailArticleClientByIdFailMessage = errorApiResponse("view detail article");