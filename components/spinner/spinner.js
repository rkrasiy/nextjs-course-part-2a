import classes from "./spinner.module.css"

export default function Spinner (props){
  const text = props.text ? props.text : "Loading..."
  return (
    <div className={classes.spinner}>
      <p>{text}</p>
      <div className={classes.rings}>
        <div>
          <span className={classes.ring}></span>
          <span className={classes['inner-ring']}></span>
        </div>
      </div>
    </div>
  )
}