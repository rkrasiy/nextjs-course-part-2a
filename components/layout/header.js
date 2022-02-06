import classes from "./header.module.css"
import LinkWrapper from "../linkwrapper/linkwrapper"
import Menu from "./menu";

function MainHeader ( props ) {
  return <header>
    <div className={classes.weblogo}>
      <LinkWrapper href="/" className="link-logo" title="Home Page">
        <img src="/logo.svg" className={classes.icon} alt="Web logo"/>
      </LinkWrapper>
    </div>
    <Menu pages={props.pages}/>
  </header>
}

export default MainHeader;