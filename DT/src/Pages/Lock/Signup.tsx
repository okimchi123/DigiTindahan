import { useState } from "react";
import logo from "../../Assets/Signup/backImage.png";
import { User } from "lucide-react";
import { useRef } from "react";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import useRegisterUser from "../../Hooks/AuthAPI/RegisterUser";
import type { CreateUser } from "../../Model/User.interface";

export default function SignupPage() {
  const INPUT_LENGTH = 4;
  const [code, setCode] = useState(["", "", "", ""]);
  const [username, setUsername] = useState('');
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const isProgrammaticFocus = useRef(false);
  const navigate = useNavigate();

  const mutation = useRegisterUser();

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < INPUT_LENGTH - 1) {
      isProgrammaticFocus.current = true;
      inputRefs.current[index + 1]?.focus();
      setTimeout(() => {
        isProgrammaticFocus.current = false;
      }, 0);
    }
  };

  const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUsername(value);
  }

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      isProgrammaticFocus.current = true;
      inputRefs.current[index - 1]?.focus();
      setTimeout(() => {
        isProgrammaticFocus.current = false;
      }, 0);
    }
  };

  const handleFocus = (index: number) => {
    if (isProgrammaticFocus.current) return;

    if (index > 0) {
      const firstEmptyIndex = code.findIndex((digit) => digit === "");
      if (firstEmptyIndex !== -1 && firstEmptyIndex < index) {
        inputRefs.current[firstEmptyIndex]?.focus();
        return;
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const Form: CreateUser = {
      username: username,
      passcode: code.join(""),
    };
    mutation.mutate(Form);
  };

  const handleBack = () => {
    gsap.to("#cont", {
      x: "100%",
      duration: 0.2,
      ease: "power2.inOut",
      onComplete: () => {
        navigate("/login", { state: { fromBack: true } });
      },
    });
  };

  useGSAP(() => {
    gsap.fromTo(
      "#cont",
      { x: "100%" },
      {
        x: 0,
        duration: 0.2,
        ease: "power2.inOut",
      }
    );
  }, []);

  return (
    <div id="cont" className="container relative gap-5 items-start pt-5 px-5">
      {mutation.error && <p className="text-red-500 text-xl absolute right-5 top-5">Username already exists</p>}
      <header className="flex flex-col">
        <button className="self-start" onClick={handleBack} type="button">
          <img className="w-10 h-17 mb-5" src={logo} alt="Digitindahan" />
        </button>
        <h1 className="text-primary text-2xl font-bold">Create an account</h1>
        <p className="text-gray font-semibold">
          Welcome! Please enter your details.
        </p>
      </header>
      <form onSubmit={handleSubmit} className="w-full font-bold flex flex-col">
        <label htmlFor="username">Username</label>
        <div className="relative mt-1 mb-3">
          <input
            className="bg-input rounded-xl py-4 w-full pl-12 text-lg text-gray"
            value={username}
            onChange={handleUsername}
            name="username"
            type="text"
            id="username"
            placeholder="Enter your username"
          />
          <User size="26" color="gray" className="absolute left-3 top-4" />
        </div>
        <h3 className="mb-3">Passcode</h3>
        <div className="flex gap-2 w-full justify-center">
          {code.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              pattern="\d*"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onFocus={() => handleFocus(index)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="border-2 border-primary rounded-md w-13 h-13 text-center text-3xl text-black focus:outline-none focus:ring-2 focus:ring-primary"
            />
          ))}
        </div>
        <button
          disabled={!code[3] || !username || mutation.isPending}
          type="submit"
          className={clsx(
            "absolute bottom-5 left-5 w-[90%] transition-all text-white py-3 rounded-full",
            {
              "bg-primary/70": !code[3] || !username || mutation.isPending,
              "bg-primary": code[3] && username,
            }
          )}
        >
          Sign in
        </button>
      </form>
    </div>
  );
}
