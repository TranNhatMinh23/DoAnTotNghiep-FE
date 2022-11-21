import { toast } from 'react-toastify';

//get active or non-active pathname
export function getActiveClass(currentpath, goalpath) {
  return currentpath === goalpath ? "active-route" : "";
}

//get active or non-active pathname in admin 
export function getActiveRouteAdminClass(currentpath, goalpath) {
  return currentpath === goalpath ? "ant-menu-item-selected" : "";
}
//function check object has atrribute or no
export function hasObjKey(object, key) {
  return object.hasOwnProperty(key);
}

//Format name from first_name and last_name
export const formatName = (user) => {
  return user.first_name + ' ' + user.last_name;
}

//display toast message
export const toastMessage = (type, message) => {
  if (type === 'success') {
    return toast.success(message, { position: toast.POSITION.BOTTOM_RIGHT });
  } else if (type === 'error') {
    return toast.error(message, { position: toast.POSITION.BOTTOM_RIGHT });
  } else if (type === 'info') {
    return toast.info(message, { position: toast.POSITION.BOTTOM_RIGHT });
  } else {
    return toast.warn("Not valid", { position: toast.POSITION.BOTTOM_RIGHT });
  }
}

//check valid input into table score mapping
const checkLessAndGreater = (number, landmarkLess = 0, landmarkGreater = 495) => {
  if(Number(number) < landmarkLess || Number(number) > landmarkGreater) return true;
  return false;
}

const checkNotNumber = (number) => {
  return isNaN(number);
}

export const checkValidInputScoreMapping = (listData = []) => {
  var result = "";
  for (let i = 0; i < listData.length; i++) {
    const item = listData[i];
    var num_of_question = item.num_of_question;
    var listening_score = item.listening_score;
    var reading_score = item.reading_score;
    if(checkNotNumber(listening_score) || checkNotNumber(reading_score) || checkLessAndGreater(listening_score) || checkLessAndGreater(reading_score)) {
      return result = num_of_question;
    }
  }
  return result;
}