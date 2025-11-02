import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import gsap from "gsap";
import { useState, useEffect } from "react";

interface formProp {
  POR: number;
  QTY: number;
  SP: number;
  PP: number;
}
export default function CalculateProfit() {
  const [form, setForm] = useState<formProp>({
    POR: 0,
    QTY: 0,
    SP: 0,
    PP: 0,
  });
  const [profit, setProfit] = useState("");
  const [total, setTotal] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (form.POR && form.QTY && form.SP && form.PP) {
      const newTotal = Math.floor((form.QTY / form.PP) * form.SP - form.POR);
      setTotal(newTotal);
    }
  };

  const Clear = () => {
    setTotal(0);
    setProfit("noProfit")
    setForm({
      POR: 0,
      QTY: 0,
      SP: 0,
      PP: 0,
    });
  };

  useEffect(() => {
    if (form.POR && form.QTY && form.SP && form.PP) {
      const newTotal = Math.floor((form.QTY / form.PP) * form.SP - form.POR);
      setTotal(newTotal);
      if(newTotal>0){
        setProfit("win");
      }else if(newTotal<0){
        setProfit("lose");
      }else if(newTotal===0){
        setProfit("noProfit")
      }
    }
  }, [form.POR, form.QTY, form.SP, form.PP]);

  useGSAP(()=>{
    gsap.fromTo('#cont',
      { x: '100%' },
      { 
        x: 0,
        duration: 0.2,
        ease: 'power2.inOut'
      });
  },[])

  return (
    <div id="cont" className="container">
      <header className="flex flex-col items-center py-8">
        <h1 className="header-font">Calculate Profit</h1>
        <h2 className={clsx("text-[36px] text-gray",{
            "text-light-green":profit==='win',
            "text-red-500":profit==='lose',
            "text-gray":profit==='noProfit',
          })}>
          ₱<span className="header-font">{total}</span>
        </h2>
        <p className="font-semibold text-[18px]">{profit==='win' ? "Made Profit" : profit==='lose' ? "Loss Made" : "No Profit"}</p>
      </header>
      <form className="flex-col-center gap-3">
        <div className="flex flex-col items-start">
          <label className="font-semibold text-[18px]" htmlFor="ogprice">
            Product Original Price
          </label>
          <input
            type="number"
            onChange={handleChange}
            name="POR"
            value={form.POR}
            id="ogprice"
            className="input-design"
            placeholder="0"
            min="0"
          />
        </div>
        <div className="flex flex-col items-start">
          <label className="font-semibold text-[18px]" htmlFor="qnt">
            Quantity
          </label>
          <input
            type="number"
            onChange={handleChange}
            name="QTY"
            value={form.QTY}
            id="qnt"
            className="input-design"
            placeholder="0"
          />
        </div>
        <div className="flex flex-col items-start">
          <label className="font-semibold text-[18px]" htmlFor="sp">
            Selling Price
          </label>
          <input
            type="number"
            onChange={handleChange}
            name="SP"
            value={form.SP}
            id="sp"
            className="input-design"
            placeholder="0"
          />
        </div>
        <div className="flex flex-col items-start">
          <label className="font-semibold text-[18px]" htmlFor="pp">
            Per Piece
          </label>
          <input
            type="number"
            onChange={handleChange}
            name="PP"
            value={form.PP}
            id="pp"
            className="input-design"
            placeholder="0"
          />
        </div>
        <button
          onClick={Clear}
          type="button"
          className="font-bold text-[18px] text-gray p-2 mt-5"
        >
          Clear all
        </button>
      </form>
    </div>
  );
}
