import tw from "tailwind-styled-components";
import LogoIcon from "../assets/logo.png";
import { useEffect, useState } from "react";

const Header = () => {
  const [user, setUser] = useState([]);
  useEffect(()=>{
    if(localStorage.getItem("current-user")){
      setUser(JSON.parse(localStorage.getItem("current-user")).user);
    }
  },[]);
  console.log(user);
  return (<>
    {user && (<Wrapper>
        <Logo><img src={LogoIcon} alt="logo" className="w-56" /></Logo>
        <div>
        <Button style={{ backgroundColor: user.color }} className="rounded-full w-10 h-10 flex justify-center items-center uppercase font-normal p-2 text-sm border-2 border-gray-400 tracking-wider">
          {user.username && user.username.split(" ").map((i)=>i[0])}
        </Button>
        </div>
    </Wrapper>)}
    </>
  )
}

const Wrapper = tw.div`h-[10vh] flex p-4 justify-between items-center bg-[#201F2D] text-[#F6F5FB]`;
const Logo = tw.h1``;
const Button = tw.button`font-bold text-xl`;
export default Header 