export async function getEvents(params) {
  const defaultURL = 'https://nextjs-d63cf-default-rtdb.europe-west1.firebasedatabase.app/events.json';
  const url = params ? defaultURL + params : defaultURL 
  //console.log("URL",url)
  const response = await fetch(url);
  const data = await response.json();

  const events = [];

  for(const key in data) {
    events.push({
      id: key,
      ...data[key]
    })
  }

  return events;

}

export async function getFeaturedEvents() {
  const featuredEvents = await getEvents(`?orderBy="isFeatured"&equalTo=true`);
  return featuredEvents
}

export async function getEventById(id){
  const event = await getEvents(`?orderBy="id"&equalTo="${id}"`)
  //console.log("Event: ", event)
  return event[0]
}

export async function getFilteredEvents(dataFilter) {
  const { year, month } = dataFilter;

  const event =  await getEvents(`?orderBy="date"&startAt="${month}/1/${year}"&endAt="${month + 1}/1/${year}"`)
  return event;
}

export async function updateEvent(event){
  let id = event.id
  let data = event
  var dataAPI = fetch(`https://nextjs-d63cf-default-rtdb.europe-west1.firebasedatabase.app/events/${id}.json`,
    {method: "PATCH", body: event})
  /*
  .then(response => {
    return response.json()
  })
  .then(data => {
    // Work with JSON data here
    return data;
  }, error => {
    console.error('onRejected function called: ' + error.message);
  })
   */   
    return dataAPI
}