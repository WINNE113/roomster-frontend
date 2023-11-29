import { apiGetComments } from "@/apis/comment"
import { Fragment, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import Comment from "./Comment"

const Comments = () => {
  const { pid } = useParams()
  const [comments, setComments] = useState([])
  const { updateComments } = useSelector((s) => s.comment)
  const [replies, setReplies] = useState([])
  const [update, setUpdate] = useState(false)
  const fetchComments = async () => {
    const response = await apiGetComments(pid)
    if (response) {
      setComments(response)
      setUpdate(!update)
    }
    if (response) setComments(response)
  }
  useEffect(() => {
    fetchComments()
  }, [pid, updateComments])
  const handleReplies = (commentId) => {
    if (replies.some((el) => el === commentId))
      setReplies((prev) => prev.filter((el) => el !== commentId))
    else setReplies((prev) => [...prev, commentId])
  }
  return (
    <div className="flex flex-col gap-4">
      {comments?.map((el, _, self) => (
        <Fragment key={el.commentPostId}>
            {!el.parentComment && (
            <Comment
              parents={self.filter(
                (cmt) => +cmt.parentComment === +el.commentPostId
              )}
              handleReplies={(commentId) => handleReplies(commentId)}
              replies={replies}
              {...el}
              parentCommentId={el.commentPostId}
              update={update}
            />
          )}
        </Fragment>
      ))}
    </div>
  )
}

export default Comments
