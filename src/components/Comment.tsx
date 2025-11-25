import { useState } from "react"

import type { CommentType } from "../types/MyTypes"

import plus from "../assets/icon-plus.svg"
import minus from "../assets/icon-minus.svg"
import reply from "../assets/icon-reply.svg"

export default function Comment(props: CommentType) {
  const [score, setScore] = useState(props.score);
  
  return (
    <>
      <section>
        <aside>
          <button><img src={plus} onClick={() => setScore(prev => prev+1)}/></button>
          <span>{score}</span>
          <button><img src={minus} onClick={() => setScore(prev => prev-1)}/></button>
        </aside>
        <main>
          <header>
            <div className="userData">
              <img src={props.user.image.png} />
              <strong>{props.user.username}</strong>
              <span>{props.createdAt}</span>
            </div>
            <div className="buttonWrapper">
              <button>Reply</button>
            </div>
          </header>
          <div>{props.content}</div>
        </main>
      </section>
      
      {props.replies &&
        <div className="replies">
          {props.replies.map(reply => <Comment {...reply} />)}
        </div>
      }
    </>
  )
}
