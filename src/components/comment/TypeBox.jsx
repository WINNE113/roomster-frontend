import { apiCreateNewComment } from "@/apis/comment"
import WithBaseTopping from "@/hocs/WithBaseTopping"
import { render } from "@/redux/commentSlice"
import { useRef } from "react"
import { AiOutlineSend } from "react-icons/ai"
import { createSearchParams, useParams } from "react-router-dom"
import Swal from "sweetalert2"
import path from "@/ultils/path" 

const TypeBox = ({
  parentCommentId,
  parentComment,
  dispatch,
  handleReplies,
  navigate,
  location,
}) => {
  const { pid } = useParams()
  const typeBoxRef = useRef()
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
  return (
    <div className="grid grid-cols-12 mb-6 rounded-md">
      <div
        data-text="Để lại bình luận của bạn ở đây..."
        contentEditable
        className="col-span-11 outline-none p-4 bg-gray-100 rounded-md"
        ref={typeBoxRef}
      />
      <div className="col-span-1 flex justify-center">
        <button
          type="button"
          title="Gửi"
          className="w-12 h-12 text-emerald-700 border-emerald-700 rounded-full border flex items-center justify-center"
          onClick={() => handleSendComment()}
        >
          <AiOutlineSend />
        </button>
      </div>
    </div>
  )
}

export default WithBaseTopping(TypeBox)
