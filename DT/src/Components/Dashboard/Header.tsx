import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function DashHeader() {
  useGSAP(() => {
    const tl = gsap.timeline();

    tl.from("#text1", {
      duration: 0.5,
      y: 40,
      autoAlpha:0,
    })
      .from(
        "#text2",
        {
          duration: 0.5,
          y: 40,
          autoAlpha:0,
        },
        "-=0.2"
      )
      .from(
        "#text3",
        {
          duration: 0.5,
          y: 40,
          autoAlpha:0,
        },
        "-=0.2"
      );
  }, []);

  return (
    <header className="flex flex-col items-center py-8 ">
      <h3 id="text1" className="font-semibold">
        Good Morning
      </h3>
      <h1 id="text2" className="text-[36px] leading-8 font-bold">
        Mom
      </h1>
      <p id="text3" className="font-bold text-secondary">
        I hope you're having a good day
      </p>
    </header>
  );
}
