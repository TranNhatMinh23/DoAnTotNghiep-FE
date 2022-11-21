import React, { Component } from 'react'; 

class ItemAnswerViewAnswerSheet extends Component {
  render() {
    const { item, orderNumber } = this.props; 
    let arr = [
      {key: "A", "value": item.position_1},
      {key: "B", "value": item.position_2},
      {key: "C", "value": item.position_3}, 
    ]; 

    item.position_4 && arr.push({key: "D", "value": item.position_4});

    return (
      <div className="viewAnswerSheet"> 
        <p className="exAnswer">
          <i>{orderNumber+1}.</i>
          {arr.map(a => {
            return (
              <label key={orderNumber + '' + a.value}>
                <span className={a.value === item.yourAnswerCode ? 'checked' : ''}>{a.key}</span>
              </label>
            )
          })}
        </p>
      </div>
    );
  }
} 

export default ItemAnswerViewAnswerSheet;