import gsap from "gsap";

export default function closeFloatingInput(onExit: () => void) {
  gsap.to('#add', {
    duration: 0.1,
    scale: 0,
    opacity: 0,
    onComplete: onExit,
  });
}