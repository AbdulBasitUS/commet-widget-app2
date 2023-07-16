import { useContext } from 'react';
import CommentList from './components/CommentList';
import { CommentsContext } from './contexts/commentsCotext';
import './App.css'
import CommentInputContainer from './components/CommentInputContainer';

function App() {
  const { comments } = useContext(CommentsContext)
  return (
    <div className='app'>
      <h2>Comment Widget</h2>
      <CommentInputContainer />
      <CommentList commentsData={comments} /> 
    </div>
  )
}

export default App
