```
//! Default Compute@Edge template program.
import snepPage from "./welcome-to-compute@snep.html"
//importing an HTML Page

// import snepPrint from "./snepprint.jpg"
// importing a Picture 

// The entry point for your application.
//
// Use this fetch event listener to define your main request handling logic. It could be
// used to route based on the request properties (such as method or path), send
// the request to a backend, make completely new requests, and/or generate
// synthetic responses.

addEventListener("fetch", (event) => event.respondWith(handleRequest(event)));
//putting the event.respondWith up here and setting it to respond with the value returned from handleRequest(event)

async function handleRequest(event) {
//Declaring an asynchronous function
  // Get the client request so we can modify it.
  let req = event.request;

  // Filter requests that have unexpected methods.
  if (!["HEAD", "GET"].includes(req.method)) {
    return new Response("This method is not allowed", {
      status: 405,
    });
  }

  let url = new URL(req.url);
  //creating a new url 

  // If request is to the `/` path... we're going to do some things
  if (url.pathname == "/") {
    const req = event.request;
    //Getting the request again because this isn't good code. 
    let mowable = req.headers.get('user-agent')
    //Get the value contained in the user-agent header and set mowable to whatever it is 
    
      if (mowable === 'mow') // Check the value of mowable to see if it equals mow
      {
        console.log("Mow detected") //Press F12 to open the console on Chrome and see this 
        let resp = new Response( null, { //Crafting a new response 
           headers: new Headers({ 'Location': 'https://homph.snowme.ws/' //with new headers
           }),
           status: 302, //and a new status, which is a redirect
           url: req.url
         });
    
        return resp // return the response 
      }
      else
      {
        // otherwise just return a response with the default page
        let resp = new Response(snepPage, {
          headers: new Headers({ "Content-Type": "text/html; charset=utf-8" }),
          status: 200
        })
        return resp
      }
  
  }
  

  // Catch all other requests and return a 404.
  return new Response("The page you requested could not be found", {
    status: 404,
  });
}
```