import Comment from './Comment';

const CommentList = ({commentsData = []}) => {
  return (
    <div>
        {  commentsData.map((data, index) => (
            <>
              <Comment comment={data.comment} timeStamp={data.timeStamp} key={data.id} id={data.id} />  
                <div style={{paddingLeft: '50px'}} key={index}>
                    <CommentList key={index} commentsData={data.replies} />
                </div>
            </>
        ))}
    </div>
  )
}

export default CommentList