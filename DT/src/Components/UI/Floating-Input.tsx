import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import type { ReactNode, FormEventHandler } from "react";

interface AnimatedPageProps {
  children: ReactNode;
  className?: string;
  keyboardHeight: number;
  onSubmit?: FormEventHandler<HTMLFormElement>;
}

const FloatingInput: React.FC<AnimatedPageProps> = ({ children, className = "", keyboardHeight = 0, onSubmit }) => {
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
    <form id="add" style={{bottom: `${keyboardHeight}px`}} className={`floating-input ${className}`} onSubmit={onSubmit}>
      {children}
    </form>
  );
}

export default FloatingInput;