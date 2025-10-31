import exchange from '../../Assets/SVG/exchange.svg'

export default function Calculate() {
  return (
    <form className="flex-col-center gap-3">
        <div className="flex flex-col items-start">
            <label className="font-semibold text-[18px]" htmlFor="ogprice">Product Original Price</label>
            <input id="ogprice" className="input-design" type="text" placeholder="0" />
        </div>
        <div className="flex flex-col items-start">
            <label className="font-semibold text-[18px]" htmlFor="qnt">Quantity</label>
            <input id="qnt" className="input-design" type="text" placeholder="0" />
        </div>
        <div className="flex flex-col items-start">
            <label className="font-semibold text-[18px]" htmlFor="sp">Selling Price</label>
            <input id="sp" className="input-design" type="text" placeholder="0" />
        </div>
        <div className="flex flex-col items-start">
            <label className="font-semibold text-[18px]" htmlFor="pp">Per Piece</label>
            <input id="pp" className="input-design" type="text" placeholder="0" />
        </div>
        <button type='submit' className='mt-5 button-calc-design'><img src={exchange} /> Calculate</button>
        <button type='button' className='font-bold text-gray p-2'>Clear all</button>
    </form>
  );
}
