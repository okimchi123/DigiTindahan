import { useState } from "react";
import LockImage from "../../Assets/Signup/LockImage.png";
import { Delete } from "lucide-react";
import clsx from "clsx";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";

interface props {
  onClose: () => void;
}

const LockPage: React.FC<props> = ({ onClose }) => {
  const navigate = useNavigate();

  const [code, setCode] = useState<String>("");
  const [invalid, setInvalid] = useState(false);
  const INPUT_LENGTH = 4;
  const password = 1111;
  const numpadStyle = "h-17 w-17 border border-black text-[32px] rounded-full";

  const toggleErr = () => {
    setInvalid(true);
    const tl = gsap.timeline({
      onComplete: () => setInvalid(false),
    });
    tl.to(".bullets", {
      y: -8,
      stagger: 0.1,
      duration: 0.2,
    });
    tl.to(".bullets", {
      y: 0,
      stagger: 0.1,
      duration: 0.2,
    });
    tl.timeScale(3)
  };

  const btnClick = (num: number) => {
    if (code.length === INPUT_LENGTH) return;
    const newCode = code + num.toString();
    setCode(newCode);
    if (newCode.length === INPUT_LENGTH) {
      if (Number(newCode) === password) {
        navigate("/dashboard");
      } else {
        toggleErr();
      }
    }
  };

  useGSAP(() => {
    gsap.from("#container", {
      x: 400,
      duration: 0.6,
      ease: "expo.out",
    });
  }, []);

  const btnClose = () => {
    gsap.to("#container", {
      x: 400,
      duration: 0.3,
      onComplete: () => {
        onClose();
      },
    });
  };

  return (
    <div
      id="container"
      className="absolute flex-col-center gap-4 inset-0 z-1 bg-white"
    >
      <header className="flex flex-col gap-2 items-center">
        <img className="h-[130px] w-[72px]" src={LockImage} alt="" />
        <h1 className="text-[20px] tracking-wider">Enter Passcode</h1>
        <div className="flex gap-4">
          {[...Array(INPUT_LENGTH)].map((_, index) => (
            <div
              key={index}
              className={clsx(
                "bullets w-5 h-5 border-3 rounded-full transition-all",
                {
                  "bg-primary": index < code.length && !invalid,
                  "bg-gray border-gray": invalid,
                  "border-primary": !invalid,
                }
              )}
            ></div>
          ))}
        </div>
      </header>
      <div className="grid grid-cols-3 gap-5 mt-6">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <button
            key={num}
            className={`${numpadStyle}`}
            onClick={() => btnClick(num)}
          >
            {num}
          </button>
        ))}
        <div className="h-17" />
        <button onClick={() => btnClick(0)} className={`${numpadStyle}`}>
          0
        </button>
        <button
          onClick={() => setCode(code.slice(0, -1))}
          className={`h-17 w-17 border-black border rounded-full flex items-center justify-center`}
        >
          <Delete size="34" className="mr-1" />
        </button>
      </div>
      <button
        onClick={btnClose}
        className="absolute bottom-7 right-16 text-lg font-semibold"
      >
        Back
      </button>
    </div>
  );
};

export default LockPage;
