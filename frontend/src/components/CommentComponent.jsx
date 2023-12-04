import axios from "axios";
import { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import tw from "tailwind-styled-components";
import { newComment } from "../api";

const CommentComponent = ({toggle, setToggle, i, users}) => {
  const [commentValue, setCommentValue] = useState("");
  const [user, setUser] = useState([]);
  const dateString = i.createdAt;
  const date = new Date(dateString);

const readableFormat = date.toLocaleDateString("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

const updateComment = async (id) => {
  if(commentValue.length>0){
    const ids = user._id;
    const {data} = await axios.put(newComment+id,{
      commentValue,
      ids
    })
    console.log(commentValue);
    setCommentValue("");
  }
}
const userInfo = (id) => {
  console.log(id)
  const info = users.filter((i)=>i._id==id);
  console.log(users)
  console.log(info)
  return info;
}

useEffect(() => {
  if (localStorage.getItem("current-user")) {
      setUser(JSON.parse(localStorage.getItem("current-user")).user);
  }
}, []);

  return (
    <SubData onClick={(e)=>e.stopPropagation()}>
                        <div  className='absolute right-4 top-4 text-[#666] text-sm z-20' onClick={()=>setToggle(!toggle)}><ImCross /></div>
                    <CreatedDate>{readableFormat}</CreatedDate>
                    <Description>{i.description}</Description>
                    <div className="flex items-center rounded-md overflow-hidden">
                    <input type="text" className="w-full focus:outline-none" placeholder="comment here..." value={commentValue} onChange={(e) => setCommentValue(e.target.value)}/>
                    <div className="bg-[#57b6f0] text-white p-2" onClick={()=>{updateComment(i._id); setToggle(!toggle)}}>Send</div>
                    </div>
                    {
                      i.comments.length>0 && (<Comments className="flex">
                      { i.comments.map((comment)=>(
                          <Comment key={comment.commentedBy}>{comment.comment} <Commentor className="border-2 border-gray-600 rounded-full w-8 h-8 text-white flex justify-center items-center uppercase text-xs" style={{ backgroundColor: userInfo(comment.commentedBy)[0] ? userInfo(comment.commentedBy)[0].color : "#fff" }}>{users && userInfo(comment.commentedBy)[0] && userInfo(comment.commentedBy)[0].username.split(" ").map((i)=>i[0])}</Commentor></Comment>
                      ))}
                  </Comments>)
                    }
                    
                </SubData>
  )
}

const SubData = tw.div`absolute left-1/2 top-full -translate-x-1/2 -translate-y-full z-20 bg-white rounded-md shadow-md border-2 p-4 w-1/3 flex flex-col gap-4 overflow-y-scroll justify-center`;
const Description = tw.p`text-center break-words`;
const CreatedDate = tw.p`text-center`;

const Comments = tw.div`flex flex-col gap-4`;
const Comment = tw.div`flex gap-4 items-center w-full flex-row-reverse justify-end`;
const Commentor = tw.p``;
export default CommentComponent