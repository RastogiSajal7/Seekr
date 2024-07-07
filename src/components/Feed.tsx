import { useEffect, useState } from "react";
import Avatar from "react-avatar"
import account from "../assets/account.png"
import { auth, storage } from "../firebase/setup"
import { BsFillQuestionSquareFill } from "react-icons/bs";
import { IoPencil } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { BiSolidUpvote, BiSolidDownvote } from "react-icons/bi";
import { FaComment } from "react-icons/fa6";
import { addDoc, collection, doc, getDocs } from "firebase/firestore"
import { Link } from "react-router-dom";
import PostPopup from "./PostPopup"
import { motion } from 'framer-motion';

type searchProp = {
  search: any,
  menu: any
}

const Feed = (props: searchProp) => {
  const questionRef = collection(storage, "questions")
  const [questionData, setQuestionData] = useState<any>([])
  const [commentToggle, setCommentToggle] = useState(false)
  const [questionId, setQuestionId] = useState("")
  const [answers, setAnswers] = useState("")
  const [post, setPost] = useState(false)

  const getQuestion = async () => {
    try {
      const data = await getDocs(questionRef)
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }))
      setQuestionData(filteredData)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    getQuestion()
  }, [])

  const answerDoc = doc(storage, "questions", `${questionId ? questionId : Math.random()}`)
  const answerRef = collection(answerDoc, "answers")

  const addAnswer = async () => {
    try {
      await addDoc(answerRef, {
        ans: answers,
        email: auth?.currentUser?.email
      })
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="bg-slate-700 m-2 rounded-2xl p-2 pb-4">
      <div className="p-2 rounded-sm ">
        <div className="bg-slate-600 rounded-2xl p-2 h-20 border border-spacing-1">
          <div className="flex">
            {auth?.currentUser?.emailVerified ? <Avatar round size="25" className="mt-0.5 ml-1 cursor-pointer" name={auth?.currentUser?.email ?? account} />
              : <Avatar round size="25" className="mt-0.5 ml-1 cursor-pointer" src={account} />}
            <input onClick={() => setPost(true)} placeholder="What do you want to ask or share?" className="bg-zinc-100
      p-1 ml-4 placeholder-gray-600 border border-spacing-1 rounded-full w-full cursor-pointer" />
          </div>
          <div className="flex pt-2">
            <div onClick={() => setPost(true)} className="ml-16 flex cursor-pointer">

              <BsFillQuestionSquareFill className="w-5 h-5" />
              <h1 className="ml-2 text-sm">Ask</h1>
            </div>
            <h1 className="ml-20">|</h1>
            <div className="ml-16 flex">
              <FaEdit className="w-5 h-5" />
              <h1 className="ml-2 text-sm">Answer</h1>
            </div>
            <h1 className="ml-20">|</h1>
            <div onClick={() => setPost(true)} className="ml-16 flex cursor-pointer">
              <IoPencil className="w-5 h-5" />
              <h1 className="ml-2 text-sm">Post</h1>
            </div>
          </div>
        </div>
      </div>
      {/*  The feed area  */}
      <div className="overflow-y-auto bg-slate-700 h-screen p-8 scrollbar-hide">
        {questionData.filter((data: any) => props?.search ? data?.question.includes(props?.search) : data?.question?.includes(props?.menu)).map((data: any, index: number) => {
          return (
            <motion.div whileHover={{ scale: 1.05 }} key={index} className="bg-slate-500 rounded-2xl mt-2 p-2">
              <div className="flex">
                {auth?.currentUser?.emailVerified ? <Avatar round size="25" className="mt-0.5 ml-1 cursor-pointer" name={data?.email ?? account} />
                  : <Avatar round size="25" className="mt-0.5 ml-1 cursor-pointer" src={account} />}
                <h1 className="ml-3 ">{data?.email.substring(0, data.email.indexOf("@"))}</h1>
              </div>
              <h1 className="mt-4 ml-2 ">{data?.question}?</h1>
              <hr className="mt-3" />
              <div className="flex gap-4">
                <button>{<BiSolidUpvote/>}</button>
                <button>{<BiSolidDownvote/>}</button>
                <button className="cursor-pointer" onClick={()=> {setQuestionId(data?.id)
                  setCommentToggle(true)}}>{<FaComment/>}</button>
                <Link to="/answers" state={{ id: data?.id }}><button className=" bg-purple-500 p-2 mt-2 rounded-full ml-3">Go To Answers</button></Link>
              </div>
              {commentToggle && <div className="flex mt-3">
                {auth?.currentUser?.emailVerified ? <Avatar round size="35" className="mt-0.5 ml-1 cursor-pointer" name={auth?.currentUser?.email ?? account} />
                  : <Avatar round size="25" className="mt-0.5 ml-1 cursor-pointer" src={account} />}
                <input onChange={(e) => setAnswers(e.target.value)} placeholder="Add a comment" className="bg-zinc-100
      p-1 ml-4 placeholder-gray-600 border border-spacing-1 rounded-full w-full h-10" />
                <Link to="/answers" state={{ id: data?.id }}><button onClick={() => {
                  addAnswer()
                  setCommentToggle(false)
                }} className="bg-blue-500 rounded-full p-2 w-60 ml-3">Add comment</button>
                </Link>
              </div>}
              <hr className="mt-4" />
            </motion.div>
          )
        })}
        {post && <PostPopup setPost={setPost} />}
      </div>
    </div>
  )
}

export default Feed;
