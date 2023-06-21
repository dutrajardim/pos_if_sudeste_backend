import React, { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../hooks/storeHooks"
import { fetchComments, selectCommentById, selectComments, selectLastSavedComment, selectSubmitCommentError, submitComment } from "./commentsSlice"

export default function CommentsForm(): JSX.Element {

  const [comment, setComment] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useAppDispatch()
  const comments = useAppSelector(selectComments)
  const lastSaved = useAppSelector(selectLastSavedComment)
  const submitError = useAppSelector(selectSubmitCommentError)

  useEffect(() => {
    dispatch(fetchComments())

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (submitError)
      alert(submitError.message)
  }, [submitError])

  useEffect(() => {
    if (lastSaved) {
      setComment("")
      setEmail("")
      setPassword("")
    }
  }, [lastSaved])

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(submitComment({ email, password, comment }))
  }

  return (
    <div className="container mx-auto mt-10">
      <form onSubmit={submitHandler}>
        <div className="flex flex-col gap-2 m-2">
          <label htmlFor="commentForm__comment">Comentário:</label>
          <input type="text" value={comment} onChange={e => setComment(e.target.value)} id="commentForm__comment" className="bg-slate-100 p-2" />
        </div>

        <div className="flex flex-col gap-2 m-2">
          <label htmlFor="commentForm__email">Email:</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} id="commentForm__email" className="bg-slate-100 p-2" />
        </div>

        <div className="flex flex-col gap-2 m-2">
          <label htmlFor="commentForm__password">Senha:</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} id="commentForm__password" className="bg-slate-100 p-2" />
        </div>

        <button type="submit" className="m-2 px-5 py-2 bg-blue-700 text-white hover:bg-blue-900">Enviar</button>
      </form>
      <h2 className="pt-10 text-lg">Commentários</h2>
      <ul className="pt-3">
        {comments.map(comment => <CommentItem commentId={comment} key={comment} />)}
      </ul>
    </div>
  )
}

interface CommentItemProps {
  commentId: string
}

function CommentItem({ commentId }: CommentItemProps): JSX.Element {

  const comment = useAppSelector(store => selectCommentById(store, commentId))

  return (
    <li className="bg-slate-100 p-3 my-2 rounded-md">
      <p className="py-2">{comment.comment}</p>
      <p className="text-xs text-slate-400">Por: {comment.user.name} ({comment.user.email})</p>
    </li>
  )
}