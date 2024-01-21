import moment from 'moment';

export const isValidDateFormat = (value) => {
    const parsedDate = moment(value, 'YYYY-MM-DD', true);
    return parsedDate.isValid();
};

export const isValidTimeFormat = (value) => {
    const parsedTime = moment(value, 'HH:mm', true);
    return parsedTime.isValid();
};
