import Header from "./components/header"
import Sidebar from "./components/sidebar"
import Main from "./components/main"
import SignupSignin from "./components/SignupSignin"
import { useEffect, useState } from "react"

const App = () => {
  const [isLogin, setIsLogin] = useState(false);
  useEffect(()=>{
    if(localStorage.getItem("current-user")){
      setIsLogin(true);
    }
  },[]);
  return (
   <>
    {!isLogin ?
      (<SignupSignin setIsLogin={setIsLogin} isLogin={isLogin}/>)
      :
      (
        <div className="flex flex-col h-screen">
    <Header/>
    <div className="flex h-[90vh]">
    <Sidebar/>
    <Main/>
    </div>
    </div>
      )
    }
   </>
  )
}

export default App