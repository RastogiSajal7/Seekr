import Avatar from "react-avatar";
import Categories from "./Categories";
import Searchbar from "./Searchbar";
import account from "../assets/account.png";
import { getFirestore, doc, getDoc, collection, getDocs } from "firebase/firestore";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const db = getFirestore();

const Answers = () => {
  const location = useLocation();

  const [menu, setMenu] = useState('');
  const [search, setSearch] = useState('');
  const [answerData, setAnswerData] = useState<any>([]);
  const [questionData, setQuestionData] = useState<any>({});

  const questionId = location?.state?.id? location?.state?.id : Math.random();

  const questionRef = doc(db, "questions", questionId);
  const answerRef = collection(db, "questions", questionId, "answers");

  const getAnswer = async () => {
    try {
      const data = await getDocs(answerRef);
      const filteredData = data.docs.map((doc) => ({...doc.data(), id: doc.id }));
      setAnswerData(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  const getQuestion = async () => {
    try {
      const questionDoc = await getDoc(questionRef);
      const questionData = questionDoc.data();
      setQuestionData(questionData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getAnswer();
    getQuestion();
  }, []);

  return (
    <>
    <Searchbar setSearch={search}/>
    <div className="grid grid-cols-6 gap-2 ml-2 mr-2">
      <div className="col-span-2"><Categories setMenu={setMenu} search={search}/></div>
      <div className="col-span-4 bg-neutral-800 rounded-2xl mt-2 ">
      {questionData && (
        <div>
          <h1 className="text-2xl font-bold">{questionData.question}</h1>
          <p className="text-lg">{questionData.email}</p>
        </div>
      )}
      {answerData.map((data:any, index:number) => {
        return (
          <div key={index}>
            <div className="flex">
              {data.email? (
                <Avatar
                  round
                  size="35"
                  className="mt-0.5 ml-1 cursor-pointer"
                  name={data.email?? account}
                />
              ) : (
                <Avatar
                  round
                  size="25"
                  className="mt-0.5 ml-1 cursor-pointer"
                  src={account}
                />
              )}
              <h1 className="ml-4 mt-3 font-bold">{data.email.substring(0, data.email.indexOf("@"))}</h1>
            </div>
            <h1 className="ml-3 mt-3">{data.ans}</h1>
          </div>
        );
      })}
      </div>
    </div>
    </>
  );
};

export default Answers;