import phoneImg from "../../Assets/landing/landing-illus.png";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  useGSAP(() => {
    SplitText.create(".split-header", {
      type: "chars",
      autoSplit: true,
      onSplit(self) {
        return gsap.from(self.chars, {
          duration: 0.4,
          y: 55,
          autoAlpha: 0,
          stagger: 0.05,
        });
      },
    });
    gsap.fromTo(
      "#arrow",
      { x: -10 },
      {
        x: 5,
        yoyoEase: true,
        opacity: 0.5,
        duration: 1,
        delay: 0.7,
        repeat: -1,
      }
    );
  }, {});

  const onContinue = () => {
    gsap.to('#cont', {
          x:'-100%',
          duration:0.3,
          ease: 'power2.inOut',
          onComplete: ()=>{
            navigate('/login')
          },
        });
  }

  return (
    <>
      <main id="cont" className="w-full h-full relative flex justify-center items-center">
        <section className="flex flex-col items-center">
          <img className="w-[72px] h-[130px]" src={phoneImg} alt="Phone" />
          <h1 className="split-header text-[36px] font-semibold">
            <span className="text-primary">D</span>igi
            <span className="text-primary">T</span>indahan
          </h1>
          <button
            onClick={onContinue}
            className="absolute bottom-5 w-[90%] bg-primary text-lg font-semibold text-white py-3 rounded-full"
          >
            Continue
            <div
              id="arrow"
              className="absolute p-1 bg-white rounded-full right-4 top-2"
            >
              <ArrowRight size="22" color="black" />
            </div>
          </button>
        </section>
      </main>
    </>
  );
}