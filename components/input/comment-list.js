import classes from './comment-list.module.css';

function CommentList( props ) {

  const { items } = props

  return (
    <ul className={classes.comments}>
      {
        items.map( item => <li key={item._id}>
          <div>
            <div><address>{item.name}</address></div>
          </div>
          <p>{item.text}</p>
        </li>)
      }
    </ul>
  );
}

export default CommentList;