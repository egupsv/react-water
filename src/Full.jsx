import React from 'react';
import './App.css';
import Form from './Form';

export default class Full extends React.Component {
  
  render() {
    return (
      <div>
      <aside>
        <img src={require('./images/bottle.svg')} alt="bottle"></img>
        <div className="cleanWater">Чистая Вода</div>
        <div className="waterText">Питьевая вода, предназначенная для ежедневного потребления, идеально подходит для кулеров. Закажите доставку воды и мы привезем её на дом или в офис.</div>
        </aside>
      <Form /></div>
    );
    
  }
}
