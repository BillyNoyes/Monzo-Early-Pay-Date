import { useState, useCallback } from 'react';

const usePayDateChecker = (bankHolidays) => {
  const [result, setResult] = useState('');

  const isWeekend = useCallback((date) => {
    const day = date.getDay();
    return day === 0 || day === 6;
  }, []);

  const formatDate = useCallback((date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-GB', options);
    return formattedDate.replace(/\b(\d{1})\b/g, '0$1')
      .replace(/(\d{2})(th|st|nd|rd)/, '$1$2,')
      .replace(/(\d{4})/, '$1')
      .replace(/(\d{1})(th|st|nd|rd)(\s)/, '$1$2$3')
      .replace(/(\d{2})(th|st|nd|rd)(\s)/, '$1$2$3')
      .replace(/(\d{1})(th|st|nd|rd)$/, '$1$2');
  }, []);

  const checkPayDate = useCallback((payDate) => {
    const inputDateObject = new Date(payDate);

    if (isNaN(inputDateObject.getTime())) {
      setResult("Invalid date format. Please enter in DD/MM/YYYY format.");
      return;
    }

    if (isWeekend(inputDateObject) || bankHolidays.includes(formatDate(inputDateObject))) {
      inputDateObject.setDate(inputDateObject.getDate() - 1);

      while (isWeekend(inputDateObject) || bankHolidays.includes(formatDate(inputDateObject))) {
        inputDateObject.setDate(inputDateObject.getDate() - 1);
      }
    }

    const earlyPayDay = new Date(inputDateObject);
    earlyPayDay.setDate(inputDateObject.getDate() - 1);

    while (isWeekend(earlyPayDay) || bankHolidays.includes(formatDate(earlyPayDay))) {
      earlyPayDay.setDate(earlyPayDay.getDate() - 1);
    }

    setResult(formatDate(earlyPayDay));
  }, [bankHolidays, isWeekend, formatDate]);

  return { result, checkPayDate };
};

export default usePayDateChecker;
