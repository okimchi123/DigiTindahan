import phoneImg from "../../Assets/landing/landing-illus.png";
import { ArrowRight } from "lucide-react";

function LandingPage() {
  return (
    <>
      <main className="w-full h-full relative flex justify-center items-center">
        <section className="flex flex-col items-center">
          <img className="w-[72px] h-[130px]" src={phoneImg} alt="Phone" />
          <h1 className="text-[36px] font-semibold leading-10 mt-1">
            <span className="text-primary">D</span>igi
            <span className="text-primary">T</span>indahan
          </h1>
          <button className="absolute bottom-5 bg-primary w-[90%] font-semibold text-black py-3 rounded-full">
            Continue
            <div className="absolute p-1 bg-black rounded-full right-4 top-2">
                <ArrowRight size="22" color="white"/>
            </div>
          </button>
        </section>
      </main>
    </>
  );
}

export default LandingPage;
