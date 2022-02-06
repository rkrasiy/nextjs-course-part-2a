import classes from "./menu.module.css";
import LinkWrapper from "../linkwrapper/linkwrapper"
import { useRouter } from "next/router";

function Menu( props ) {
  const router = useRouter()
  const { pages } = props;
  
  let mainMenu = null;

  if(pages){
    mainMenu = pages.map( link => {
      let classItem = "item" 
      if(router.pathname == link.href) 
        classItem += " active"

      return <li key={link.title}>
              <LinkWrapper 
                href={link.href}
                title={link.title}
                className={classItem}>{link.title}</LinkWrapper>
            </li>
    })
  }

  return <nav>
        <ul>{ mainMenu }</ul>
      </nav>
}

export default Menu;