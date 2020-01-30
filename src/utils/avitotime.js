const moment = require('moment');
moment.locale('ru');
module.exports = str => {
    const inputTime = str.match(/(\d{2}):(\d{2})/);
    const relativeArray = str.match(/(Сегодня|Вчера)/i);
    const relativeDay = relativeArray&&relativeArray.length?relativeArray[0]:'';
    switch (relativeDay) {
        case 'Сегодня':
            if (inputTime&&inputTime.length===3){
                moment().hours(Number(inputTime[1])).minutes(Number(inputTime[2]));
            }
            break;
        case 'Вчера':
            if (inputTime&&inputTime.length===3) {
                moment().date(moment().date() - 1).hours(Number(inputTime[1])).minutes(Number(inputTime[2]));
            }
            break;
        default:
            moment(str, 'DD MMMM HH:mm');
            break;
    }
    return moment().unix();
};