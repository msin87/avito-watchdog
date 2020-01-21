const moment = require('moment');
moment.locale('ru');
module.exports = str => {
    const inputTime = str.match(/(\d{2}):(\d{2})/);
    const relativeDay = str.match(/(Сегодня|Вчера)/i) && str.match(/(Сегодня|Вчера)/i)[0];
    switch (relativeDay) {
        case 'Сегодня':
            moment().hours(inputTime[1]).minutes(inputTime[2]);
            break;
        case 'Вчера':
            moment().date(moment().date() - 1).hours(inputTime[1]).minutes(inputTime[2]);
            break;
        default:
            moment(str, 'DD MMMM HH:mm');
            break;
    }
    return moment().unix();
};