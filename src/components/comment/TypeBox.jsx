import { apiCreateNewComment, apiUpdateComment } from "@/apis/comment"
import WithBaseTopping from "@/hocs/WithBaseTopping"
import { render } from "@/redux/commentSlice"
import { useRef } from "react"
import clsx from "clsx"
import { useEffect, useRef } from "react"
import { AiOutlineClose, AiOutlineSend } from "react-icons/ai"
import Swal from "sweetalert2"
import path from "@/ultils/path" 

const TypeBox = ({
  parentCommentId,
  parentComment,
  dispatch,
  handleReplies,
  navigate,
  location,
  currentContent,
  isEdit,
  setIsEdit,
  commentPostId,
}) => {
  const { pid } = useParams()
  const typeBoxRef = useRef()
  useEffect(() => {
    if (typeBoxRef) typeBoxRef.current.focus()
  }, [typeBoxRef])
  useEffect(() => {
    typeBoxRef.current.innerText = currentContent
  }, [typeBoxRef, currentContent])
  const handleSendComment = async () => {
    const response = await apiCreateNewComment({
      postId: pid,
      content: typeBoxRef.current?.innerText,
      parentComment: parentCommentId,
    })
    if (response.success) {
      typeBoxRef.current.innerText = ""
      dispatch(render())
      if (handleReplies) handleReplies(parentComment)
    }else {
      Swal.fire("Oops!", "Bạn phải đang nhập trước", "info").then(() => {
        navigate({
          pathname: `/${path.LOGIN}`,
          search: createSearchParams({
            redirect: location.pathname,
          }).toString(),
        })
      })
    }
  }
  const handleUpdateComment = async () => {
    const response = await apiUpdateComment({
      postId: pid,
      content: typeBoxRef.current?.innerText,
      commentPostId,
    })
    console.log(response)
    // if (response.success) {
    //   typeBoxRef.current.innerText = ""
    //   dispatch(render())
    //   if (handleReplies) handleReplies(parentComment)
    // } else {
    //   Swal.fire("Oops!", "Bạn phải đang nhập trước", "info").then(() => {
    //     navigate({
    //       pathname: `/${path.LOGIN}`,
    //       search: createSearchParams({
    //         redirect: location.pathname,
    //       }).toString(),
    //     })
    //   })
    // }
  }
  return (
    <div className={clsx("grid grid-cols-12 rounded-md", !isEdit && "mb-6")}>
      <div
         data-text={"Để lại bình luận của bạn ở đây..."}
        contentEditable
        className="col-span-10 outline-none p-4 bg-gray-50 rounded-md"
        ref={typeBoxRef}
      />
      <div className="col-span-2 flex gap-4 justify-end">
        <button
          type="button"
          title="Gửi"
          className="w-12 h-12 text-emerald-700 border-emerald-700 rounded-full border flex items-center justify-center"
          onClick={() => (isEdit ? handleUpdateComment() : handleSendComment())}
        >
          <AiOutlineSend />
        </button>
        {isEdit && (
          <button
            type="button"
            title="Gửi"
            className="w-12 h-12 text-emerald-700 border-emerald-700 rounded-full border flex items-center justify-center"
            onClick={() => setIsEdit(false)}
          >
            <AiOutlineClose />
          </button>
        )}
      </div>
    </div>
  )
}

export default WithBaseTopping(TypeBox)
