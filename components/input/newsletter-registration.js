import classes from "./newsletter-registration.module.css";
import { useContext, useRef, useState } from "react";
import NotificationContext from "../../store/notification-context";

function NewsletterRegistration() {
  const emailInputRef = useRef();
  const notificationCtx = useContext( NotificationContext )

  let [ login, setLogin ] = useState(false)

  function registrationHandler(event) {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    notificationCtx.showNotification({
      title: "Pending!",
      message: "Registering for newsletter",
      status: "pending"
    })

    const patern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    if (!enteredEmail.match(patern))
      return ""
    
    const reqBody = { email: enteredEmail };
    
    //console.log("Entered message: ", reqBody)
    fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if(response.ok){
          return response.json()
        }

        return response.json().then(data=>{
          throw new Error(data.message || "Somthing went wrong")
        })

      })
      .then((data) => {
        console.log(data);
        notificationCtx.showNotification({
          title: "Success!",
          message: "Succesfully registered for newsletter",
          status: "success"
        })
      })
      .catch(error => {
        notificationCtx.showNotification({
          title: "Error!",
          message:  error.message || "Something went wrong",
          status: "error"
        })
      });

    // fetch user input (state or refs)
    // optional: validate input
    // send valid data to API
  }

let disabled = !login
  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={emailInputRef}
            disabled={login}
          />
          <button disabled={login}>Register</button>
        </div>
      </form>
      {login ? <div>Greate!! You a registered</div> : null}
    </section>
  );
}

export default NewsletterRegistration;
