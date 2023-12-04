import tw from "tailwind-styled-components";
import { LiaSortSolid } from "react-icons/lia";
import { BsReverseLayoutTextWindowReverse } from "react-icons/bs";
import { FaCaretDown } from "react-icons/fa";
import { useEffect, useState } from "react";
import SubmitIssue from "./SubmitIssue";
import axios from "axios";
import { getAllUsers, getIssues } from "../api";
import CommentComponent from "./CommentComponent";
import { motion } from "framer-motion";

const Main = () => {
    const [show, setShow] = useState(false);
    const [toggle, setToggle] = useState(false);
    const [activeComment, setActiveComment] = useState("");
    const [issue, setIssue] = useState([]);
    const [users, setUsers] = useState([]);
    const [projectNames, setProjectNames] = useState([]);
    const getAllIssue = async () => {
        const {data} = await axios.get(getIssues);
        setProjectNames(data.map((i)=>i.projectTitle))
        console.log(projectNames)
        setIssue(data);
    }
    const fetchAllUsers = async () => {
        const { data } = await axios.get(getAllUsers);
        setUsers(data.users);
      }
    useEffect(()=>{
        fetchAllUsers();
        getAllIssue();
    }, []);

    const userInfo = (id) => {
        const info = users.filter((i)=>i._id==id);
        return info;
    }
  return (
    <Wrapper>
        {show ? (<SubmitIssue setShow={setShow}/>) : (
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
            <Head>
                <button className="text-[#1B77F2] font-semibold tracking-wide flex items-center gap-1 cursor-pointer">All Issues <FaCaretDown/></button>
                <button className="bg-[#1B77F2] text-[#1B77F2] bg-opacity-5 text-sm rounded-full px-3 py-2 tracking-wide font-semibold" onClick={()=>setShow(true)}>Submit Issues</button>
            </Head>
            <Columns>
            <Column><BsReverseLayoutTextWindowReverse className="mr-1 -ml-1"/>Issues</Column>
            <Column>Status<LiaSortSolid/></Column>
            <Column>Severity<LiaSortSolid/></Column>
            <Column>By<LiaSortSolid/></Column>
            </Columns>
        <Container className="relative">
        {
  projectNames.map((name) => (
    <div key={name}>
      <Heading>{name}</Heading>
      {console.log(issue)}
      {issue &&
        users.length > 0 &&
        issue.map((i) =>
          name === i.projectTitle ? (
            <Info key={i._id}>
              <DetailContainer>
                <Details
                  onClick={() => {
                    setToggle(!toggle);
                    setActiveComment(i._id);
                  }}
                  className="cursor-pointer"
                >
                  {i.title}
                  {toggle && i._id === activeComment && (
                    <CommentComponent i={i} toggle={toggle} setToggle={setToggle} users={users} />
                  )}
                </Details>
              </DetailContainer>
              <DetailContainer>
                <Details
                  className="text-white font-light px-2 py-1 rounded-full"
                  style={{
                    background: `${
                      i.status === 'Open'
                        ? '#83bf6e'
                        : i.status === 'In Progress'
                        ? '#d9b641'
                        : '#d94841'
                    }`,
                  }}
                >
                  {i.status}
                </Details>
              </DetailContainer>
              <DetailContainer>
                <Details>{i.severity}</Details>
              </DetailContainer>
              <DetailContainer>
                <Details
                  className="border-2 border-gray-600 rounded-full w-8 h-8 text-white flex justify-center items-center uppercase"
                  style={{ backgroundColor: `${users && userInfo(i.createdBy)[0].color}` }}
                >
                  {userInfo(i.createdBy)[0].username.split(' ').map((name) => name[0])}
                </Details>
              </DetailContainer>
            </Info>
          ) : null
        )}
    </div>
  ))
}

        
        </Container>
        </motion.div>
        )}
    </Wrapper>
  )
}

const Wrapper = tw.div`p-4 bg-white w-[80vw] flex flex-col gap-2`

const Head = tw.div`uppercase flex justify-between items-center mb-2 px-2`

const Columns = tw.div`w-full flex justify-between items-center text-sm text-gray-400 px-4 font-bold tracking-wide mb-2`
const Column = tw.div`flex items-center cursor-pointer w-full justify-center`


const Container = tw.div`w-full flex flex-col`

const Heading = tw.div`font-semibold bg-[#F8F8F8] text-sm text-[#333] px-4 py-2 rounded-md tracking-wide text-center`
const Info = tw.div`w-full flex justify-between  text-sm items-center px-4 capitalize border-b-2 py-4 border-[#F8F8F8]`
const Details = tw.div`text-xs font-semibold w-fit`
const DetailContainer = tw.div`flex items-center w-full justify-center`


export default Main