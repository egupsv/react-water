export default () => {
  const weekDays = ['вс', 'пн', 'вт', 'ср',	'чт', 'пт',	'сб'];
  const monthes = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']; 
  const days = [];
  let i = 0;
  const visibleDateArea = 6;
  while (i < visibleDateArea) {
    i += 1;
    const today = new Date(); 
    today.setDate(today.getDate() + i);
    days.push([today.getDate(), monthes[today.getMonth()], weekDays[today.getDay()]]);
  }
  return days;
}