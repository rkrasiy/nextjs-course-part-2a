import Link from "next/link";

function LinkWrapper(props){

  return <Link href={props.href}>
            <a  className={props.className}
                title={props.title}
                target={props.target}
                id={props.id} >{props.children}</a>
        </Link>
}

export default LinkWrapper;