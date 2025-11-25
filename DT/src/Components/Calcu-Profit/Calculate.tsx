import type { Dispatch, SetStateAction } from "react";

interface props {
  form: { POR: number; QTY: number; SP: number; PP: number };
  setForm: Dispatch<
    SetStateAction<{ POR: number; QTY: number; SP: number; PP: number }>
  >;
  setTotal: Dispatch<SetStateAction<number>>;
  setProfit: Dispatch<SetStateAction<string>>;
}

const Calculate: React.FC<props> = ({ form, setForm, setTotal, setProfit }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const Clear = () => {
    setTotal(0);
    setProfit("noProfit");
    setForm({
      POR: 0,
      QTY: 0,
      SP: 0,
      PP: 0,
    });
  };

  return (
    <form name="calcu-form" className="flex-col-center py-1 gap-3">
      <div className="input-label-cont">
        <label className="font-semibold text-[18px]" htmlFor="ogprice">
          Product Original Price
        </label>
        <input
          type="number"
          onChange={handleChange}
          name="POR"
          value={form.POR || ""}
          id="ogprice"
          className="input-design"
          placeholder="0"
          min="0"
        />
      </div>
      <div className="input-label-cont">
        <label className="font-semibold text-[18px]" htmlFor="qnt">
          Quantity
        </label>
        <input
          type="number"
          onChange={handleChange}
          name="QTY"
          value={form.QTY || ""}
          id="qnt"
          className="input-design"
          placeholder="0"
        />
      </div>
      <div className="input-label-cont">
        <label className="font-semibold text-[18px]" htmlFor="sp">
          Selling Price
        </label>
        <input
          type="number"
          onChange={handleChange}
          name="SP"
          value={form.SP || ""}
          id="sp"
          className="input-design"
          placeholder="0"
        />
      </div>
      <div className="input-label-cont">
        <label className="font-semibold text-[18px]" htmlFor="pp">
          Per Piece
        </label>
        <input
          type="number"
          onChange={handleChange}
          name="PP"
          value={form.PP || ""}
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
  );
};

export default Calculate;
