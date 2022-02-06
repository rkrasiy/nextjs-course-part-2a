import { Fragment, useContext } from "react";
import Header from "./header";
import Footer from "./footer";
import Head from 'next/head';
import Notification from "../notification/notification"
import NotificationContext from "../../store/notification-context";

function Layout ( props ) {
  const notificationCtx = useContext( NotificationContext );
  const activeNotification = notificationCtx.notification;
  return <Fragment>
    <Head>
      <title>My Next Js Course</title>
      <meta name="description" content="" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Header pages={props.pages}/>
    <main>{props.children}</main>
    <Footer />
    {
      activeNotification && (
        <Notification
          title={activeNotification.title}
          message={activeNotification.message}
          status={activeNotification.status}
        />
      )
    }
  </Fragment>
}

export default Layout;