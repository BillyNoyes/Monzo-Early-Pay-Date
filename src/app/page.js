import BankHolidaysForm from './BankHolidaysForm';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-900">
      <h1 className="text-4xl font-bold text-red-500 text-center mb-14">
        Monzo Paid Early Calculator
      </h1>

      <BankHolidaysForm />
    </main>
  );
}
