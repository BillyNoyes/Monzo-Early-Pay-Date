'use client';

import { useState } from 'react';
import useBankHolidays from '../hooks/useBankHolidays';
import usePayDateChecker from '../hooks/usePayDateChecker';

function BankHolidaysComponent() {
  const { bankHolidays, error } = useBankHolidays();
  const { result, checkPayDate } = usePayDateChecker(bankHolidays);
  const [payDate, setPayDate] = useState('');

  const handleCheckPayDate = () => {
    checkPayDate(payDate);
  };

  return (
    <div className="flex flex-col gap-3 mb-3 max-w-96 w-full">
      <label
        className="text-white"
        htmlFor="pay-date"
      >
        Enter your pay date:
      </label>

      <input
        type="date"
        id="pay-date"
        className="py-3 px-6"
        value={payDate}
        onChange={(e) => setPayDate(e.target.value)}
      />

      <button
        className="py-3 px-6 rounded-md bg-sky-800 text-white"
        onClick={handleCheckPayDate}
      >
        Check Pay Date
      </button>

      {error && <div className="text-red-500">{error}</div>}

      <div className="text-2xl font-bold text-center text-white mt-5">
        {result}
      </div>
    </div>
  );
}

export default BankHolidaysComponent;
