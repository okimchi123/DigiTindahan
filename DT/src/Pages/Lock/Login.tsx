import LoginImage from '../../Assets/Signup/LoginImage.png';
import FloatingInput from '../../Components/UI/Floating-Input';
import { useNavigate } from 'react-router-dom';
import LockPage from './Page';
import { useKeyboardHeight } from '../../Hooks/CustomKH';
import { useRef, useEffect, useState } from 'react';
import clsx from 'clsx';
import gsap from 'gsap';

export default function LoginPage () {
  const keyboardHeight = useKeyboardHeight();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [username, setUsername] = useState('');
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
      if (inputRef.current) {
        inputRef.current?.focus();
      }
    }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUsername(value);
  }

  const handleEnter = () => {
    setModal(true);
  }

  const onClose = () => {
    gsap.to('#add',{
      duration: 0.1,
      scale: 0,
      opacity: 0,
      onComplete: ()=>{
        navigate('/');
      }
    })
  };

  return (
    <>
    {modal && <LockPage onClose={(()=>setModal(false))}/>}
    <div className="container justify-center">
      <header className="flex flex-col gap-2 items-center">
        <img className="h-[130px] w-[72px]" src={LoginImage} alt="" />
        <h1 className="text-[20px] font-semibold tracking-wider">Login</h1>
      </header>
    </div>
    <FloatingInput
        className= "bg-primary z-20"
        keyboardHeight={keyboardHeight}
      >
        <nav
          aria-label="Close dialog"
          className="w-full flex items-center gap-1"
        >
          <h1 className="floating-h1  text-white">Username</h1>
        </nav>
        <input
          name="username"
          ref={inputRef}
          type="text"
          onChange={handleChange}
          value={username}
          className="p-2 rounded-lg bg-white font-bold text-lg text-black"
        />
        <div className='flex justify-between text-white'>
            <button onClick={onClose}>back</button>
        <button disabled={!username} onClick={handleEnter} className={clsx("font-bold p-1 transition-all",{
            "text-black/50 text-md":!username,
            "text-white text-lg":username,
        })}>
          Enter
        </button>   
        </div>
      </FloatingInput>
    </>
    
  );
}
