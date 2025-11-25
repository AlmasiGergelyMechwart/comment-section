import { useEffect, useReducer, useState } from "react";

import type { CommentType, UserType } from "./types/MyTypes";
import Comment from "./components/Comment";

type CommentAction =
  | { type: "set", newComments: CommentType[] }
  | { type: "add"; newComment: CommentType }
  | { type: "delete"; commentId: number }
  | { type: "edit"; editedComment: CommentType }

function commentsReducer(comments: CommentType[], action: CommentAction) {
  switch (action.type) {
    case "set":
      return action.newComments;
    case "add":
      return [...comments, action.newComment]
    case "delete":
      return comments.filter(c => c.id != action.commentId)
    case "edit":
      return comments.map(c => {
        if (c.id === action.editedComment.id) {
          return action.editedComment;
        } else {
          return c;
        }
      })
  }
}

const App = () => {
  // const [comments, setComments] = useState<CommentType[]>([]);
  const [comments, commentsDispatch] = useReducer(commentsReducer, [])
  const [currentUser, setCurrentUser] = useState<UserType>()

  useEffect(() => {
    fetch("data.json")
    .then(res => res.json())
    .then(data => {
      commentsDispatch({type: "set", newComments: data.comments});
      setCurrentUser(data.currentUser);
    });
  }, []);

  return (
    <div>
      {comments.map(commment => <Comment {...commment} />)}
    </div>
  )
}

export default App