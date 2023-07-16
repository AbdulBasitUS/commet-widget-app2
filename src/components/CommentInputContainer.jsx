import { useContext, useState } from 'react'
import { CommentsContext } from '../contexts/commentsCotext'
import '../styles/Button.css'
import '../styles/CommentInputContainer.css'
import { generateTimeStamp } from './../utils/generatTimeStamp';

const CommentInputContainer = ({parentId, setAskReplyInput}) => {
    const { onAddComment } = useContext(CommentsContext)
    const [comment, setComment] = useState('')
    const [isShake, setIsShake]  = useState(false)

    const validateComment = (comment) => {
        if (comment !== '') {
            setIsShake(false)
            return true
        }
        else {
            setIsShake(true)
            return false
        }
    }

    const handleAddComment =  () => {
        const isValid = validateComment(comment)
        if (!isValid) {
            return
        }
        onAddComment(parentId, comment)
        setComment('')
        if (parentId !== undefined) {
            setAskReplyInput(false)
        }
    }

    const handleClearComment  = () => {
        generateTimeStamp()
        setComment('')
        if (parentId !== undefined) {
            setAskReplyInput?.(false)
        }
    }

  return (
    <div className='comment-input-container'>
        <input
            type='text'
            className={isShake? 'input-field apply-shake': 'input-field '}
            value={comment} 
            onChange={(e) => setComment(e.target.value)}
            placeholder="Enter a comment" 
        />
        <button className='btn btn-warning' onClick={handleClearComment}>CLEAR</button>
        <button className='btn btn-success' onClick={handleAddComment}>ADD COMMENT</button>
    </div>
  )
}

export default CommentInputContainer