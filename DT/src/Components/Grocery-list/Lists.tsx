import CustomSearch from "../UI/Search";

export default function Lists() {
  return (
    <section className="flex flex-col gap-2 w-[80%]">
      <CustomSearch />
      <ul className="flex flex-col gap-4">
        <li>
          <button className="bg-input w-full flex flex-col items-start py-4 pl-2 rounded-xl">
            <h2 className="font-bold text-xl">Sunday, October 26, 2025</h2>
            <p className="font-semibold text-gray text-lg">Piatos blue - 10</p>
          </button>
        </li>
        <li>
          <button className="bg-input w-full flex flex-col items-start py-4 pl-2 rounded-xl">
            <h2 className="font-bold text-xl">Wed, October 15, 2025</h2>
            <p className="font-semibold text-gray text-lg">555 green - 8</p>
          </button>
        </li>
      </ul>
    </section>
  );
}
