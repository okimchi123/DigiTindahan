import gsap from "gsap";

export function closeFloatingInput(onExit: () => void) {
  gsap.to('#add', {
    duration: 0.1,
    scale: 0,
    opacity: 0,
    onComplete: onExit,
  });
}

export function closeModal(onExit: ()=>void){
    gsap.to(".modal", {
      x: "100%",
      duration: 0.2,
      ease: "power2.inOut",
      onComplete: onExit,
    });
};