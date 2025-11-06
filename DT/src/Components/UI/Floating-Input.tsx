import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import type { ReactNode } from "react";

interface AnimatedPageProps {
  children: ReactNode;
  className?: string;
  keyboardHeight: number;
}

const FloatingInput: React.FC<AnimatedPageProps> = ({ children, className = "", keyboardHeight = 0 }) => {
  useGSAP(()=>{
    gsap.to('#add',
    { 
      duration: 0.08, 
      opacity:1,
      scale: 1, 
      ease: "expo.out"
    }
  )
  },[])

  return (
    <div id="add" style={{bottom: `${keyboardHeight}px`}} className={`floating-input ${className}`}>
      {children}
    </div>
  );
}

export default FloatingInput;