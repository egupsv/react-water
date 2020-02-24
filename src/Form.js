import React from 'react';
import './App.css';
import bigBottle from './images/18,9.svg';
import bigBottleActive from './images/18,9active.svg';
import averageBottle from './images/1,5.svg';
import averageBottleActive from './images/1,5active.svg';
import smallBottle from './images/0,5.svg';
import smallBottleActive from './images/0,5active.svg';
import plus from './images/plus.svg';
import minus from './images/minus.svg';
import toTheLeft from './images/to_the_left.svg';
import toTheRight from './images/to_the_right.svg';
import checkmark from './images/checkmark.svg';
import makeDays from './days';

const sourceState = {
  form: {
    name: '',
    phone: '',
    email: '',
    address: '',
    consent: false,
    bottles: {
      big: { amount: 0, active: false, price: 220 },
      average: { amount: 0, active: false, price: 175 },
      small: { amount: 0, active: false, price: 270 },
    },
    day: '',
    time: '',
  },
  submitted: false,
};

const weekends = ['сб', 'вс'];
const hours = [['early', '10:00 - 11:00'], ['middle', '12:00 - 13:00'], ['late', '14:00 - 15:00']];
const days = makeDays();

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = sourceState;
  }

  handleConsent = () => {
    const { form } = this.state;
    this.setState({ form: { ...form, consent: !form.consent } });
  }

  handleInput = ({ target }) => {
    const { form } = this.state;
    this.setState({ form: { ...form, [target.name]: target.value } });
  }

  handleSubmit = () => {
    this.setState({ submitted: true });
  }

  handleReset = (e) => {
    e.preventDefault();
    this.setState({ form: sourceState.form, submitted: false });
  }

  handleChangeImage = ({ target }) => {
    const { form } = this.state;
    const newBottles = form.bottles;
    const keys = Object.keys(newBottles);
    keys.reduce((acc, el) => {
      acc[el].active = (el === target.alt);
      return acc;
    }, newBottles);
    this.setState({ form: { ...form, bottles: newBottles } });
  }

  handleIncrease = ({ target }) => {
    const { form } = this.state;
    const newBottles = form.bottles;
    newBottles[target.dataset.size].amount += 1;
    this.setState({ form: { ...form, bottles: newBottles } });
  }

  handleDecrease = ({ target }) => {
    const { form } = this.state;
    const newBottles = form.bottles;
    if (newBottles[target.dataset.size].amount > 0) {
      newBottles[target.dataset.size].amount -= 1;
    }
    this.setState({ form: { ...form, bottles: newBottles } });
  }

  handleLeft = () => {
    const { form } = this.state;
    const firstDay = days[0][0];
    if (form.day === '') {
      this.setState({ form: { ...form, day: firstDay, time: '' } });
    } else if (form.day !== firstDay) {
      const index = days.findIndex((el) => el[0] === form.day);
      const orderDay = days[index - 1][0];
      this.setState({ form: { ...form, day: orderDay, time: '' } });
    }
  }

  handleRight = () => {
    const { form } = this.state;
    const lastDay = days[days.length - 1][0];
    if (form.day === '') {
      this.setState({ form: { ...form, day: lastDay, time: '' } });
    } else if (form.day !== lastDay) {
      const index = days.findIndex((el) => el[0] === form.day);
      const orderDay = days[index + 1][0];
      this.setState({ form: { ...form, day: orderDay, time: '' } });
    }
  }

  handleChooseDate = ({ target }) => {
    const { form } = this.state;
    const index = days.findIndex((el) => String(el[0]) === target.dataset.date);
    this.setState({ form: { ...form, day: days[index][0] } });
  }

  handleChooseTime = ({ target }) => {
    const { form } = this.state;
    const index = hours.findIndex((el) => el[0] === target.dataset.time);
    this.setState({ form: { ...form, time: hours[index][1] } });
  }

  onClickSubmit = () => {
    const { form } = this.state;
    if (form.bottles.big.amount === 0
      && form.bottles.average.amount === 0
      && form.bottles.small.amount === 0) {
      // eslint-disable-next-line no-undef
      alert('не выбраны объем тары и количество');
    } else if (form.day === '') {
      // eslint-disable-next-line no-undef
      alert('не выбрана дата доставки');
    } else if (form.time === '') {
      // eslint-disable-next-line no-undef
      alert('не выбрано время доставки');
    }
  }

  renderBottles() {
    const { form } = this.state;
    const listOfImages = [
      ['big', bigBottle, bigBottleActive],
      ['average', averageBottle, averageBottleActive],
      ['small', smallBottle, smallBottleActive],
    ];
    return <>
      {listOfImages.map(([size, el, elActive]) => (<div className="bottle-column">
        <div className="bottle" onClick={this.handleChangeImage}>
          <img className={!form.bottles[size].active ? 'shown' : 'hidden'} src={el} alt={size}></img>
          <img className={form.bottles[size].active ? 'shown' : 'hidden'} src={elActive} alt={size}></img>
        </div>
        <div className={form.bottles[size].active ? 'shown' : 'hidden'}>
          <div className="counter">
            <img data-size={size} src={minus} onClick={this.handleDecrease} alt="minus"></img>
            <p className="amount">{form.bottles[size].amount}</p>
            <img data-size={size} src={plus} onClick={this.handleIncrease} alt="plus"></img>
          </div>
        </div>
      </div>))}</>;
  }

  renderDays() {
    const { form } = this.state;
    return <>
      <img src={toTheLeft} onClick={this.handleLeft} alt="to-the-left"></img>
      {days.map(([date, , weekday]) => <div className={date === form.day ? 'date-circle circle-order' : 'date-circle'} data-date={date} onClick={this.handleChooseDate}>
        <p className={date === form.day ? 'date order' : 'date'} data-date={date}>{date}</p>
        {/* eslint-disable-next-line no-nested-ternary */}
        <p className={weekends.includes(weekday) ? 'day weekend' : (date === form.day ? 'day order' : 'day')} data-date={date}>{weekday}</p>
      </div>)}
      <img src={toTheRight} onClick={this.handleRight} alt="to-the-right"></img>
    </>;
  }

  renderHours() {
    const { form } = this.state;
    const weekendHours = hours.slice(1);
    const index = days.findIndex((el) => el[0] === form.day);
    const weekday = (index === -1 ? '' : days[index][2]);
    const current = (weekends.includes(weekday) ? weekendHours : hours);
    return <>
      {current.map(([name, time]) => <div onClick={this.handleChooseTime}>
        <div className={form.time === time ? 'time-circle circle-order' : 'time-circle'} data-time={name}>
          <div className={time === form.time ? 'time order' : 'time' } data-time={name}>{time}</div>
        </div>
      </div>)}
    </>;
  }

  getTotalPrice() {
    const { bottles } = this.state.form;
    const keys = Object.keys(bottles);
    return keys.reduce((acc, key) => acc + bottles[key].amount * bottles[key].price, 0);
  }

  isDisabledSubmit() {
    const { form } = this.state;
    if (form.bottles.big.amount === 0
      && form.bottles.average.amount === 0
      && form.bottles.small.amount === 0) {
      return true;
    }
    if (form.day === '' || form.time === '') {
      return true;
    }
    return false;
  }

  renderForm() {
    const { form } = this.state;
    return (
      <form className="main-block" onSubmit={this.handleSubmit}>
        <div className="form-header">Заполните данные</div>
        <div className="form-table">
          <div className="form-column">
            <div className="inputs">
              <input
                required
                type="text"
                name="name"
                onChange={this.handleInput}
                value={form.name}
                className="field"
                placeHolder="ФИО"
              />
            </div>
          <div className="inputs">
            <input
              required
              type="text"
              name="phone"
              pattern="\d{11}|\d{7}"
              onChange={this.handleInput}
              value={form.phone}
              className="field"
              placeHolder="Телефон"
              title="используйте 7-значный номер или 10-значный номер с 8 в начале"
            />
          </div>
        </div>
        <div className="form-column">
          <div className="inputs">
            <input
              required
              type="email"
              name="email"
              onChange={this.handleInput}
              value={form.email}
              className="field"
              placeHolder="Email"
            />
          </div>
          <div className="inputs">
            <input
              required
              type="text"
              name="address"
              onChange={this.handleInput}
              value={form.address}
              className="field"
              placeHolder="Адрес доставки"
            />
          </div>
        </div>
      </div>
      <div className="form-group">
        <div className="form-check">
          <input
            required
            id="rules"
            name="consent"
            className="form-check-input"
            onChange={this.handleConsent}
            type="checkbox"
            checked={form.consent}
          />
          <label className="form-check-label" htmlFor="rules">
            Я согласен на обработку персональных данных
          </label>
        </div>
      </div>
      <div className="form-table">
        <div>
          <div className="text">Вода</div>
          <div className="bottle-table">
            {this.renderBottles()}
          </div>
        </div>
        <div className="text">
          <div>Дата и время доставки</div>
          <div className="accessory-text">ДЕНЬ</div>
          <div className="time-table">
            {this.renderDays()}
          </div>
          <div className="accessory-text">ВРЕМЯ</div>
          <div className="time-table hours">
            {this.renderHours()}
          </div>
        </div>
      </div>
      <div className="form-table with-border">
        <div className="text">Итого</div>
        <div className="right-text ">
          <span>{this.getTotalPrice()},</span><span className="grey">00 {String.fromCharCode(8381)}</span>
        </div>
      </div>
      <input type="submit" id="makeOrder" disabled={this.isDisabledSubmit()}/>
      <label htmlFor="makeOrder" onClick={this.onClickSubmit}></label>
    </form>
    );
  }

  renderResult() {
    const { form } = this.state;
    const index = days.findIndex((el) => el[0] === form.day);
    return (
      <div className="main-block">
        <div className="form-header">
          <img src={checkmark} alt="checkmark"></img>
          <span className="tab">Заказ оформлен</span>
        </div>
        <div className="order-list">
          <div className={form.bottles.big.amount === 0 ? 'result-hidden' : 'form-table'}>
            <span className="left">Бутыль 18,9л</span>
            <span className="right">{form.bottles.big.amount} шт.</span>
          </div>
          <div className={form.bottles.average.amount === 0 ? 'result-hidden' : 'form-table'}>
            <span className="left">Упаковка бутылей 1,5л</span>
            <span className="right">{form.bottles.average.amount} шт.</span>
          </div>
          <div className={form.bottles.small.amount === 0 ? 'result-hidden' : 'form-table'}>
            <span className="left">Упаковка бутылей 0,5л</span>
            <span className="right">{form.bottles.small.amount} шт.</span>
          </div>
          <div className="form-table">
            <span className="left">{form.day} {days[index][1]}</span>
            <span className="right">{form.time}</span>
          </div>
          <div className="form-table">
            <span className="left">Адрес доставки</span>
            <span className="right">{form.address}</span>
          </div>
          <div className="form-table">
            <span className="left">Телефон</span>
            <span className="right">{form.phone}</span>
          </div>
        </div>
        <div className="form-table with-border">
          <div className="text">Итого</div>
          <div className="right-text ">
            <span>{this.getTotalPrice()},</span><span className="grey">00 {String.fromCharCode(8381)}</span>
          </div>
        </div>
        <div className="message">Ваш заказ №1 успешно оформлен. В ближайшее время по указанному телефону с Вами свяжется наш менеджер</div>
        <input type="submit" id="reset"/>
      <label htmlFor="reset" onClick={this.handleReset}></label>
    </div>
    );
  }

  render() {
    const { submitted } = this.state;
    return submitted === false ? this.renderForm() : this.renderResult();
  }
}
