import { createContext, useState } from "react";
import { generateTimeStamp } from "../utils/generatTimeStamp";
import { generateId } from '../utils/generateId';

const initialComments = [
    {id: 1011, comment: 'This is a 1st level comment', timeStamp: generateTimeStamp('2023-07-15'),  replies:[
        {id: 1012, comment: 'This is a 2nd level comment', timeStamp: generateTimeStamp(), replies:[
            {id: 1014, comment: 'This is 3rd level comment', timeStamp: generateTimeStamp(), replies: []}
        ]}
    ]},
    {id: 1013, comment: 'This is also 1st level comment', timeStamp: generateTimeStamp('2023-07-16 1:35'), replies: []},
]

const initialState  = {
    comments: [],
    onAddComment: () => {},
    onDeleteComment: () => {}
}

export const CommentsContext = createContext(initialState)

const CommentsContextProvider =  ({ children }) => {
    const [comments, setComments] = useState(initialComments)

    const addComment = (id, comments, text) => {
        if (id === undefined) {
            comments.push({id: generateId(), comment: text, timeStamp: generateTimeStamp(), replies: []})   
            return comments
        }
        comments.forEach((data, index) => {
            if (data.id === id) {
                data['replies'].push({id: generateId(), comment: text, timeStamp: generateTimeStamp(), replies: []})
                return comments
            }else if(data.replies?.length > 0) {
                addComment(id, data.replies, text)
            }
        })
        return comments
    }

    const deleteComment = (id, comments) => {
        comments.forEach((data, index) => {
            if (data?.id === id) {
                comments.splice(index,1)
            }else if(data?.replies?.length > 0) {
                deleteComment(id, data.replies)
            }
        })
        return comments
    }
 
    const onAddComment = (id, data) => {
        const updatedComments = addComment(id, [...comments], data)
        setComments(updatedComments)
        return
    }

    const onDeleteComment = (id) => {
        const updatedComments = deleteComment(id, [...comments])
        setComments(updatedComments)
    }

    return (
        <CommentsContext.Provider 
            value={{
                ...initialState,
                comments,
                onAddComment,
                onDeleteComment
            }}
        >
            {children}
        </CommentsContext.Provider>
    )

}

export default CommentsContextProvider;