import { useEffect, useState, useContext } from 'react';
import NotificationContext from '../../store/notification-context';
import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';
import Spinner from '../spinner/spinner';

function Comments( props ) {
  const { eventId } = props
  const [showComments, setShowComments] = useState(false);
  const [ comments, setComments ] = useState([])
  const notificationCtx = useContext( NotificationContext )
  const [ isFetchingComments, setIsFetchingComments] = useState(false)
  useEffect( () => {
    if(showComments){
      setIsFetchingComments(true)
      fetch("/api/comments/" + eventId)
      .then( resp => resp.json())
        .then( data => {
          console.log("JSON", data)
          setComments(data.comments)
          setIsFetchingComments(false)
        })
    }
  },[showComments])

  
  
  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {

    notificationCtx.showNotification({
      title: "Sending comment...",
      message: "Your comment is currently being stored into a database. ",
      status: "pending"
    })

    fetch("/api/comments/" + eventId, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if(response.ok){
          return response.json()
        }

        return response.json().then(data=>{
          throw new Error(data.message || "Somthing went wrong")
        })
        
      })
      .then((data) => {
        console.log(data);
        setComments( prevComments => [ data.comment,...prevComments])
        notificationCtx.showNotification({
          title: "Success!",
          message: "Your comment was saved!",
          status: "success"
        })
      })
      .catch(error => {
        notificationCtx.showNotification({
          title: "Error!",
          message:  error.message || "Something went wrong",
          status: "error"
        })
      });
  }
  console.log("Status", notificationCtx)
  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && !isFetchingComments && <CommentList items={comments}/>}
      {showComments && isFetchingComments && <Spinner text="Waiting..." />}
      
    </section>
  );
}

export default Comments;