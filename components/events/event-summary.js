function EventSummary ( props ) {
  return <div className={props.className}>
    <h1>{props.children}</h1>
  </div>
}

export default EventSummary