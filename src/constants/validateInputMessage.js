export const incorrectEmailFormat = "Incorrect email format!";
export const emptyMessage = (field) => {
  var message = field + " cannot be empty!";
  return message;
};
export const confirmNoMatchMessage = "Confirm password does not match!";
export const minInvalidMessage = (field , number) => {
  var message = field + " has at least " + number + " characters!";
  return message;
};
export const maxInvalidMessage = (field , number) => {
  var message = field + " has maximum " + number + " characters!";
  return message;
};