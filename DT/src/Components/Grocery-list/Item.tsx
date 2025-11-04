import AnimatedPage from "../UI/Animated-Container";
import gsap from "gsap";

interface props {
  onClose: () => void;
}

const Item: React.FC<props> = ({ onClose }) => {
  const closeModal = () => {
    gsap.to('.modal', {
      x: "100%",
      duration: 0.2,
      ease: "power2.inOut",
      onComplete: () => {
        onClose();
      },
    });
  };

  return (
    <AnimatedPage className="modal">
      <h1>Item</h1>
      <button onClick={closeModal}>close</button>
    </AnimatedPage>
  );
};

export default Item;
