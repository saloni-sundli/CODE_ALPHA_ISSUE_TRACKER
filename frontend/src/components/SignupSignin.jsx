import axios from "axios";
import { useState } from "react";
import tw from "tailwind-styled-components";
import { MdOutlineAccountTree } from "react-icons/md";
import Logo from "../assets/logo.png"
import { signin, signup } from "../api";
import {motion} from "framer-motion"

const Register = ({isLogin, setIsLogin}) => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isSignInForm, setIsSignInForm] = useState(false);

  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';

    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(isSignInForm){
        if (handleValidation()) {
            const { email, password } = values;
            const { data } = await axios.post(signin, {
              email,
              password,
            });
            console.log(data);
            if(data){
                localStorage.setItem("current-user", JSON.stringify(data));
                setIsLogin(!isLogin);
            }else{
                alert("re-enter your login details");
            }
          }
    }else{
    if (handleValidation()) {
      const { username, email, password } = values;
      const color = getRandomColor();
      const { data } = await axios.post(signup, {
        username,
        email,
        password,
        color,
      });
      console.log(data);
      console.log(data);
      if(data){
        localStorage.setItem("current-user", JSON.stringify(data));
          setIsLogin(!isLogin);
      }else{
          alert("re-enter your sign up details");
      }
    }
}
  };

  const handleValidation = () => {
    const { username, email, password, confirmPassword } = values;
    console.log("here")
    if(!isSignInForm){
      console.log("above here in")
      console.log(password)
      console.log(confirmPassword)
        if (password != confirmPassword) return false;
        else if (username.length < 4) return false;
    console.log("here in")

    }
    if (password.length < 8) return false;
    else if (email === "") return false;
    return true;
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <motion.div initial={{
      y: 100,
      scale: 0
    }}
    animate={{
      y: 0,
      scale:1
    }}
    transition={{
      duration: 0.6,
      delay: 0.6,
      type: 'spring', stiffness: 120, damping: 10
    }}>
    <Wrapper>
        <img src={Logo} alt="logo" className="w-64 absolute top-10 left-1/2 -translate-x-1/2" />
      <Form  onSubmit={(e) => handleSubmit(e)}>
        {isSignInForm ? null : <Input
          type="text"
          name="username"
          placeholder="Enter Your Username"
          onChange={(e) => handleChange(e)}
        />}
        
        <Input
          type="email"
          name="email"
          placeholder="Enter Your Email"
          onChange={(e) => handleChange(e)}
        />
        <Input
          type="password"
          name="password"
          placeholder="Enter Your Password"
          onChange={(e) => handleChange(e)}
        />
        {isSignInForm ? null : <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          onChange={(e) => handleChange(e)}
        />}
        
        <Button type="submit">{isSignInForm ? "Sign In" : "Sign Up"}</Button>
        <Span>
        {isSignInForm ? "Create New Account!" : "Already Have An Account?"}{" "}
          <p className="text-[#38BDF8] text-lg font-semibold hover:animate-pulse cursor-pointer" onClick={()=>setIsSignInForm(!isSignInForm)}>
          {isSignInForm ? "Sign Up" : "Sign In"}
          </p>
        </Span>

        <MdOutlineAccountTree className="z-0 absolute text-gray-400 mix-blend-overlay opacity-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  " size={200} />
      </Form>
    </Wrapper>
    </motion.div>
  );
};

const Wrapper = tw.div`bg-[#201F2D] text-[#F6F5FB] flex justify-center w-screen h-screen relative`
const Form = tw.form`flex flex-col gap-4 mt-32 w-1/3`
const Input = tw.input`bg-transparent p-3 border-2 rounded-md border-gray-400 z-10`
const Button = tw.button`bg-[#1B77F2] p-3 rounded-md text-xl z-10`
const Span = tw.span`flex justify-between`

export default Register;
