import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import gsap from "gsap";
import { useState, useEffect } from "react";
import Calculate from "../../Components/Calcu-Profit/Calculate";

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

  useEffect(() => {
    if (form.POR && form.QTY && form.SP && form.PP) {
      const newTotal = Math.floor((form.QTY / form.PP) * form.SP - form.POR);
      setTotal(newTotal);
      if (newTotal > 0) {
        setProfit("win");
      } else if (newTotal < 0) {
        setProfit("lose");
      } else if (newTotal === 0) {
        setProfit("noProfit");
      }
    }
  }, [form.POR, form.QTY, form.SP, form.PP]);

  useGSAP(() => {
    gsap.fromTo(
      "#cont",
      { x: "100%" },
      {
        x: 0,
        duration: 0.2,
        ease: "power2.inOut",
      }
    );
  }, []);

  return (
    <div id="cont" className="container">
      <header className="header-cont">
        <h1 className="header-font">Calculate Profit</h1>
        <h2
          className={clsx("text-[36px] text-gray", {
            "text-light-green": profit === "win",
            "text-red-500": profit === "lose",
            "text-gray": profit === "noProfit",
          })}
        >
          ₱<span className="header-font">{total}</span>
        </h2>
        <p className="font-semibold text-[18px]">
          {profit === "win"
            ? "Made Profit"
            : profit === "lose"
            ? "Loss Made"
            : "No Profit"}
        </p>
      </header>
      <Calculate
        form={form}
        setForm={setForm}
        setTotal={setTotal}
        setProfit={setProfit}
      />
    </div>
  );
}
