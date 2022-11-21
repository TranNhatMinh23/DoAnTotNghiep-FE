import moment from 'moment';
import 'moment/locale/vi';

export const helpers = {
  renderGender: function(value) {
    return value === 1 ? "Nam": "Nữ"
  }, 

  formatMoney: function(value) {
    const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
    return priceSplitter(value) + "₫";
  },

  renderDayOfWeek: function(value) {
    let days = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"]
    return days[value];
  }, 
 
  formatHour: function(value) {
    return moment(value,'hh:mm:ss').format('h:mm a')
  },

  formatDate: function(value) { 
    return moment(value).format('ll', 'vi');
  }

}