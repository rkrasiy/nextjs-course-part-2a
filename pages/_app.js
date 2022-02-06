import "../styles/globals.css";
import Layout from "../components/layout/layout";
import { NotificationContextProvider } from "../store/notification-context"

export default function MyApp({ Component, pageProps }) {
  const pages = [
    { href: "/", title: "Home" },
    { href: "/feedback", title: "Feedback" },
    { href: "/events", title: "Events" },
  ];
  return (
      <NotificationContextProvider>
        <Layout pages={pages}>
          <Component {...pageProps} />
        </Layout>
    </NotificationContextProvider>
  );
}
