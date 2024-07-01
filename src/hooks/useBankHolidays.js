import { useState, useEffect } from 'react';

const useBankHolidays = () => {
  const [bankHolidays, setBankHolidays] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBankHolidays = async () => {
      try {
        const response = await fetch('https://www.gov.uk/bank-holidays.json');

        if (!response.ok) {
          throw new Error('Failed to fetch bank holidays data');
        }

        const data = await response.json();
        const englandAndWalesHolidays = data['england-and-wales'].events.map(event => event.date);

        setBankHolidays(englandAndWalesHolidays);
      } catch (error) {
        setError(error.message);
        console.error('Error fetching bank holidays:', error);
      }
    };

    fetchBankHolidays();
  }, []);

  return { bankHolidays, error };
};

export default useBankHolidays;