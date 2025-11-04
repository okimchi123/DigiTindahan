import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import type { ReactNode } from "react";

interface AnimatedPageProps {
  children: ReactNode;
  className?: string;
}

const AnimatedPage: React.FC<AnimatedPageProps> = ({ children, className = "" }) => {
  useGSAP(() => {
    gsap.fromTo(
      "#animated-container",
      { x: "100%" },
      {
        x: 0,
        duration: 0.2,
        ease: "power2.inOut",
      }
    );
  }, []);

  return (
    <div id="animated-container" className={className}>
      {children}
    </div>
  );
}

export default AnimatedPage;