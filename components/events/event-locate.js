function EventLogistics ( props ) {

  const { alt, image, date, address } = props;

  const simpleDate = new Date (date).toLocaleDateString("en-US",{
    day: 'numeric',
    month: "long",
    year: "numeric"
  })

  const simpleAddress = address.replace(", ", "\n");

  return <section>
    <div>
      <img src={ image} alt={ alt } />
    </div>
    <ul>
      <li><time>{simpleDate}</time></li>
      <li><time>{simpleAddress}</time></li>
    </ul>
  </section>
}

export default EventLogistics