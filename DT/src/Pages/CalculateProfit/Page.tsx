import Calculate from "../../Components/Calculate-Profit/Calculate";

export default function CalculateProfit () {
  return (
    <>
      <header className="flex flex-col items-center py-8">
        <h1 className="header-font">Calculate Profit</h1>
        <h2 className="text-[36px] text-gray">₱<span className="header-font">0</span></h2>
        <p className="font-semibold">No Profit</p>
      </header>
      <Calculate />
    </>
  );
}
