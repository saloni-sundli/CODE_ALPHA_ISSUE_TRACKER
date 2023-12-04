import axios from "axios";
import { useEffect, useState } from "react";
import tw from "tailwind-styled-components";
import { getAllUsers } from "../api";
import { motion } from "framer-motion";

const Sidebar = () => {
  const [admin, setAdmin] = useState();
  const [users, setUsers] = useState();

  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';

    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
  }
  const fetchAllUsers = async () => {
    const { data } = await axios.get(getAllUsers);
    setUsers(data.users);
    console.log(data.users);
    data.users.map((user)=>{
      if (user.role=='admin') {
        setAdmin(user);
      }
    })
  }
  useEffect(() => {

    fetchAllUsers();

  }, []);
  return (
    <Wrapper>
      <ul className="p-2 flex flex-col gap-2">
        <h1 className="font-extrabold text-gray-600">Admin</h1>
        <motion.div initial={{
                  scale: 0,
                  opacity: 0,
                }}
                animate={{
                  scale: 1,
                  opacity: 1,
                }}
                transition={{
                  duration: 0.6,
                }} className="bg-gray-600 bg-opacity-40 p-4 rounded-md capitalize text-center">
          {admin && admin.username}
        </motion.div>
      </ul>
      <div className="p-2 flex flex-col gap-2">
        <h1 className="font-extrabold text-gray-600">Team Members</h1>
        <div className="bg-gray-600 bg-opacity-40 p-4 rounded-md flex flex-col gap-4">
          {users && users.map((user)=>(
          <motion.div initial={{
            scale: 0,
            opacity: 0,
          }}
          animate={{
            scale: 1,
            opacity: 1,
          }}
          transition={{
            duration: 0.6,
          }} className="flex gap-2 items-center" key={user._id}><div className=" rounded-full w-8 h-8 flex justify-center items-center uppercase tracking-wider text-xs border-2 border-gray-400" style={{ backgroundColor: user.color }}>{user.username && user.username.split(" ").map((i)=>i[0])}</div><span className="text-xs">{user.email}</span></motion.div>
          ))}
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = tw.div`p-4 w-[20vw] bg-[#201F2D] text-[#F6F5FB]`
export default Sidebar