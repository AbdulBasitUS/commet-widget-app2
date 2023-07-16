import { useState,  useContext } from 'react'
import { CommentsContext } from '../contexts/commentsCotext'
import CommentInputContainer from './CommentInputContainer'
import '../styles/Button.css'
import '../styles/Comment.css'

const Comment = ({comment, timeStamp, id}) => {
  const [askReplyInput, setAskReplyInput] = useState(false)
  const { onDeleteComment } = useContext(CommentsContext)

  const formatDateTime = (timeStamp) => {
    const d = new Date(timeStamp)
    return `${d.getDate()}-${d.getMonth()}-${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`
  }
  return (
    <>
      <div className='comment'>
        <div className='comment-wrapper'>
          <span>{comment}</span> 
          <span  className='timestamp'>{formatDateTime(timeStamp)}</span>
        </div>
          <button className='btn btn-danger' onClick={()=> onDeleteComment(id)} >Delete</button>
          <button className='btn btn-primary' onClick={() => setAskReplyInput(true)}>Reply</button>
      </div>
      {askReplyInput? <CommentInputContainer parentId={id} setAskReplyInput={setAskReplyInput} /> : <></>}
    </>

  )
}

export default Comment