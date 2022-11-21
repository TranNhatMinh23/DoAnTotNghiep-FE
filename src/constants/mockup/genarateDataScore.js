import dataSample from './dataScoreMapping.json';
export function genarateDataScore(startQuestionId) {
  let data = [];
  dataSample.data.map((item, index) => { 
    let dataItem = {
      id: '',
      num_of_question: '',
      listening_score: 0,
      reading_score: 0
    };
    dataItem.id = startQuestionId + index;
    dataItem.num_of_question = item.num_of_question;
    dataItem.listening_score = item.listening_score;
    dataItem.reading_score = item.reading_score;
    data.push(dataItem);
  });
  return JSON.stringify(data); 
}