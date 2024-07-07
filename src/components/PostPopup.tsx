import { addDoc, collection } from "firebase/firestore";
import { auth, storage } from "../firebase/setup";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";

type postType = {
  setPost: any;
};

const PostPopup = (props: postType) => {
  const questionRef = collection(storage, "questions");
  const [quest, setQuest] = useState("");
  const [error, setError] = useState("");

  const addQuestion = async () => {
    if (!quest.trim()) {
      setError("Question cannot be empty");
      return;
    }

    try {
      await addDoc(questionRef, {
        question: quest,
        email: auth?.currentUser?.email,
        upvotes: 0,
        downvotes: 0,
      });
      props.setPost(false);
    } catch (err) {
      console.error(err);
      setError("Failed to add question. Please try again.");
    }
  };

  return (
    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-zinc-950 bg-opacity-80 transition-opacity"></div>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:items-start">
                <button onClick={() => props.setPost(false)} className="cursor-pointer absolute top-2 right-2 text-gray-500 hover:text-gray-700">
                  <FaTimes />
                </button>
                <input
                  onChange={(e) => setQuest(e.target.value)}
                  placeholder="Start your question with Why, What, How, etc."
                  className="w-full outline-none h-30 p-2 border rounded"
                />
                {error && <p className="text-red-500 mt-2">{error}</p>}
                <button onClick={addQuestion} className="bg-blue-500 text-white rounded-full p-2 w-40 mt-3 float-right">
                  Add question
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostPopup;
