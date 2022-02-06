import { buildFeedbackPath, extractFeedback } from "../api/feedback/index";
import { Fragment, useState } from "react";

function FeedbackPage(props) {
  const [feedbackData, setFeedbackData] = useState();

  function loadFeedbackHadler(id) {
    fetch(`/api/feedback/${id}`)
      .then((response) => response.json())
        .then((data) => {
          setFeedbackData(data.feedback);
        });
  }

  return (
    <Fragment>
      {feedbackData && <p>{feedbackData.email}</p>}
      <ul>
        {props.feedbackItems.map((item) => (
          <li key={item.id}>
            {item.text}
            <button onClick={loadFeedbackHadler.bind(null, item.id)}>
              More info...
            </button>
          </li>
        ))}
      </ul>
    </Fragment>
  );
}

export async function getStaticProps() {
  //NEVER USE fetch() method inside this function

  const filePath = buildFeedbackPath();
  const data = extractFeedback(filePath);

  return {
    props: {
      feedbackItems: data,
    },
  };
}

export default FeedbackPage;
