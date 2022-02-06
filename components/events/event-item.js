import Image from "next/image";
import LinkWrapper from "../linkwrapper/linkwrapper";
import classes from "./event-item.module.css";
import { useRouter } from "next/router";

function EventItem(props) {
  const router = useRouter();
  const { title, image, date, location, id } = props;

  const simpleDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  //console.log("Route", router);

  const simpleAddress = location.replace(", ", "\n");
  const exporeLink = router.pathname + "/" + id;

  return (
    <li className={classes.item}>
      <LinkWrapper href={exporeLink} className={classes.wrapper}>
        <div className={classes.image}>
          <Image src={image} alt={title} width={400} height={500} />
        </div>
        <div className={classes.content}>
          <h2>{title}</h2>
          <div className={classes.date}>
            <time>{simpleDate}</time>
          </div>
          <div className={classes.address}>
            <address>{simpleAddress}</address>
          </div>
        </div>
      </LinkWrapper>
    </li>
  );
}

export default EventItem;
