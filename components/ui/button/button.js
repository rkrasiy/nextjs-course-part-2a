function Button( props ){

  return <button className={props.className}
                type={props.type}
                id={props.id}
                onClick={props.onClick}
                >{props.children}</button>
}

export default Button;