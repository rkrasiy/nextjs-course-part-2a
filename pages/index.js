import Head from 'next/head';
import { useRef, useState } from 'react';

function HomePage( props ) {
  const emailInputRef = useRef();
  const feedbackInputRef = useRef();
  const [ feedbackItems, setFeedbackItems ] = useState([]);

  function submitFormHandler(event) {
    event.preventDefault();

    const enteredEmail =  emailInputRef.current.value;
    const feedbackInput =  feedbackInputRef.current.value;

    const reqBody = { email: enteredEmail, text: feedbackInput }
    //console.log("Entered message: ", reqBody)
    fetch('/api/feedback', {
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then( (response) => response.json())
      .then( (data) => console.log("Recived: ", data));

  }


  function loadFeedbackHadler() {
    fetch('/api/feedback')
      .then( (response) => response.json())
      .then( (data) => setFeedbackItems(data.feedback));
  }

  let fbItems = null

  if(feedbackItems.length > 0){
    fbItems = (<ul>{feedbackItems.map( item => <li key={item.id}>
      <h3>{item.email}</h3>
      <p>{item.text}</p>
    </li>)}</ul>)
  }

  return (
    <div>
      <Head>
        <title>Home Page</title>
        <meta 
          name="description" 
          content="Find a lot of events"/>
      </Head>
      <h1>The Home Page</h1>
      <form onSubmit={submitFormHandler}>
        <div>
          <label htmlFor="email">Your email address</label>
          <input type="email" id="email" ref={emailInputRef}/>
        </div>
        <div>
          <label htmlFor="feedback">Write your text</label>
          <textarea id="feedback" rows="5" ref={feedbackInputRef}></textarea>
        </div>
        <button>Send Feedback</button>
      </form>
      <button onClick={loadFeedbackHadler}>Get FeedBack</button>
      {fbItems}
    </div>
  );
}

export default HomePage;
