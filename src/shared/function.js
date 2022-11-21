import $ from 'jquery';
import moment from 'moment'; 

//function to show image when input url imediately
export function readURL(idPreview, files) {
  if (files && files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      $(`#${idPreview}`).attr('src', e.target.result);
    }
    reader.readAsDataURL(files[0]);
  }
}

//function additional isFirstGroup attribute into each question
export function additionalIsFirstGroup(listQuestion) {
  var list = [];
  for (let index = 0; index < listQuestion.length; index++) {
    const element = listQuestion[index];
    element.isFirstGroup = (element.group_desc !== null && element.group_desc !== "") ? true : false;
    list.push(element);
  }
  return list;
}

//function export genarate object answer
export function genarateObjectAnswer(allParts) {
  var list = [];
  if (!allParts) return null;
  for (let index = 0; index < allParts.length; index++) {
    const element = allParts[index];
    element.questions.map(question => {
      var item = {
        questionId: question.id,
        position_1: null,
        position_2: null,
        position_3: null,
        position_4: null,
        yourAnswer: "",
        yourAnswerCode: null
      };
      let answersInQuestion = question.answers;
      answersInQuestion.map((ans, i) => {
        return item[`position_` + (i + 1)] = ans.id;
      });

      return list.push(item);
    })
  }
  return list;
}

//function return list empty answer 
export function checkEmptyAnswer(objectAnswer) {
  var list = [];
  for (let index = 0; index < objectAnswer.length; index++) {
    if (objectAnswer[index].yourAnswer === "") {
      list.push(objectAnswer[index]);
    }
  }
  return list;
}

//function update items in list
export function updateItemsInList(list, id, key, value) {
  var objIndex = list.findIndex((obj => obj.id === id));
  list[objIndex][`answer${key}`] = value;
  return list;
}

//function update question text items in list
export function updateQuestionTextInList(list, id, value) {
  var objIndex = list.findIndex((obj => obj.id === id));
  list[objIndex][`question_text`] = value;
  return list;
}

//Get value in html and tranfer to json
export function html2json(idTag) {
  var json = '[';
  var otArr = [];
  $('#' + idTag + ' tbody tr').each(function (e) {
    var idScore = $(this).attr('id');
    var x = $(this).children();
    var itArr = [];
    itArr.push('"id": ' + idScore + ', "num_of_question": ' + x[1].textContent + ', "listening_score": "' + x[0].textContent + '", "reading_score": "' + x[2].textContent + '"');
    otArr.push('{' + itArr.join(',') + '}');
  });
  json += otArr.join(",") + ']'
  return JSON.parse(json);
}

//FILTER CONTACTS BY STATUS
export const filterContactsByStatus = (list, status) => {
  return list.filter(item => item.status === status);
}

//function remove space 
export function removeSpace(text) {
  //exclude  start and end white-space
  text = text.replace(/(^\s*)|(\s*$)/gi, "");
  //convert 2 or more spaces to 1  
  text = text.replace(/[ ]{2,}/gi, " ");
  // exclude newline with a start spacing  
  text = text.replace(/\n /, "\n");
  return text;
}

//// function count words (exclude start, end, 2 or more space to one space)
export function count_words(text) {
  return removeSpace(text).split(' ').length;
}

export function limitText(text, limit) {
  if (count_words(text) > limit) {
    let arrWords = removeSpace(text).split(' ');
    let arrWordsLimit = arrWords.slice(0, limit);
    let arrToString = arrWordsLimit.join(' ');
    return arrToString + " ... ";
  }
  return text;
}

//Caculator between two day
// export function timeBetweenTwoDay(day1, day2){
//   const a = moment(day1, 'YYYY-MM-DD')
//   const b = moment(day2, 'YYYY-MM-DD')
//   // Tính khoảng cách giữa hai ngày theo phút
//   return a.diff(b, 'minutes');
// }

export function checkIsNew(day1, day2) {
  const a = moment(day1, 'DD/MM/YYYY HH:mm:ss');
  const b = moment(day2, 'DD/MM/YYYY HH:mm:ss');
  // // Tính khoảng cách giữa hai ngày theo phút
  let rangeTime = a.diff(b, 'minutes');
  return rangeTime >= 0 && rangeTime <= 1440;
}

export function getQuestionById(listQuestion, questionId) {
  let itemMatching = listQuestion.find(x => x.question_id === questionId);
  return itemMatching;
}

export function getAnswerKey(arrAnswers = []) {
  for (let index = 0; index < arrAnswers.length; index++) {
    if (arrAnswers[index].is_correct_flag === true) {
      return arrAnswers[index].id;
    }
  }
  return null;
}

export function getAnswerById(arrAnswers = [], anwserId) {
  return arrAnswers.find(item => item.id === anwserId);
}

//get item from array by id
export function getItemById(arrayInput, itemId) {
  let itemMatching = arrayInput.find(x => x.id === itemId);
  return itemMatching;
}

//Search by exam name
export const searchByExamName = (data = [], searchText = '') => {
  let searchingData = [...data];
  return searchingData.filter((item) => {
    const matchingItem = Object.values(item).find(value => {
      if (typeof value === 'object') {
        return value.name.toString().toLowerCase().includes(searchText.toString().toLowerCase());
      };
      return null;
    });
    return matchingItem;
  });
}


//Function get number correct answer in each part
export const numberCorrectAnswerInPart = (listQuestionInpart = [], listResult = []) => {
  if (!(listQuestionInpart instanceof Array)) {
    listQuestionInpart = [];
  }
  let count = 0;
  const total = listQuestionInpart.length;
  listQuestionInpart.forEach(ques => {
    const answerKey = ques.answers.find(x => x.is_correct_flag === true);
    const yourAnswer = listResult.find(x => x.question_id === ques.id);
    if (answerKey !== 'undefined' && answerKey) {
      if (answerKey.id === yourAnswer.your_answer_code) count++;
    }
  });
  const percent = ((count / total) * 100).toFixed(2);
  return { 'correct': count, 'total': total, 'percent': percent };
}
//Compare
export const myCompare = (a, b) => {
  if (a.total_score < b.total_score)
    return -1;
  if (a.total_score > b.total_score)
    return 1;
  return 0;
}
//Check email in array, so get item that object belong to
function getItemObjectBelong(value, arr) {
  return arr.find(x => x.email === value);
}
//Function group data by collumn name in object
export const groupDataByColumnName = (listData) => {
  let resultData = [];
  let sortedData = [];
  for (let i = 0; i < listData.length; i++) {
    let object = listData[i];
    let key = object["email"].toString();
    if (Object.keys(sortedData).indexOf(key) === -1) {
      sortedData[key] = [];
      object['children'] = [];
      resultData.push(object);
    } else {
      let item = getItemObjectBelong(key, resultData);
      item.children.push(object);
    }
    sortedData[key].push(object);
  }
  return resultData;
}
//Check value in range 
function between(x, min, max) {
  return x >= min && x <= max;
}
//Group data
export const groupDataExamReportChart = (listData) => {
  let sortedData = [
    { 'min': 0, 'max': 100, 'label': '0-100', 'count': 0 },
    { 'min': 105, 'max': 200, 'label': '105-200', 'count': 0 },
    { 'min': 205, 'max': 300, 'label': '205-300', 'count': 0 },
    { 'min': 305, 'max': 400, 'label': '305-400', 'count': 0 },
    { 'min': 405, 'max': 500, 'label': '405-500', 'count': 0 },
    { 'min': 505, 'max': 600, 'label': '505-600', 'count': 0 },
    { 'min': 605, 'max': 700, 'label': '605-700', 'count': 0 },
    { 'min': 705, 'max': 800, 'label': '705-800', 'count': 0 },
    { 'min': 805, 'max': 900, 'label': '805-900', 'count': 0 },
    { 'min': 905, 'max': 990, 'label': '905-990', 'count': 0 }
  ];
  for (let i = 0; i < listData.length; i++) {
    let object = listData[i];
    let value = object['total_score'];
    sortedData.forEach(element => {
      if (between(value, element.min, element.max)) return element.count += 1;
    });
  }
  return sortedData;
}

//Group data for statistical of user
export const groupDataStatisticalOfUserChart = (listData = []) => {
  var resultData = []; 
  let arrData = listData.reverse().slice(0, 10)
  for (let i = 0; i < arrData.length; i++) {
    let object = arrData[i];
    let data = {
      label: moment(object.created_at).format('DD-MM-YYYY'),
      listening_score: object.listening_score,
      num_listening: object.num_listening,
      num_reading: object.num_reading,
      reading_score: object.reading_score,
      total_score: object.listening_score + object.reading_score,
      detailExam: object.exams,
      dateTaken: object.created_at
    };
    resultData.push(data);
  }
  return resultData;
}

//Disabled day
export const disabledDate = (currentDate, dateCompare) => {
  let formatDate = "YYYY-MM-DD";
  return moment(currentDate).format(formatDate) < moment(dateCompare).format(formatDate);
}

//Search by email in list
export const searchByEmail = (data, searchText) => {
  let searchingData = [...data];
  return searchingData.filter((item) => {
    const matchingItem = Object.values(item).find(value => {
      return value.toString().toLowerCase().includes(searchText.toString().toLowerCase());
    });
    return matchingItem;
  });
}