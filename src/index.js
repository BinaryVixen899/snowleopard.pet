//! Default Compute@Edge template program.
import snepPage from "./welcome-to-compute@snep.html"

// import snepPrint from "./snepprint.jpg"
// The entry point for your application.
//
// Use this fetch event listener to define your main request handling logic. It could be
// used to route based on the request properties (such as method or path), send
// the request to a backend, make completely new requests, and/or generate
// synthetic responses.

addEventListener("fetch", (event) => event.respondWith(handleRequest(event)));

async function handleRequest(event) {
  // Get the client request.
  let req = event.request;

  // Filter requests that have unexpected methods.
  if (!["HEAD", "GET"].includes(req.method)) {
    return new Response("This method is not allowed", {
      status: 405,
    });
  }

  let url = new URL(req.url);

  // If request is to the `/` path...
  if (url.pathname == "/") {
    const req = event.request;
    let mowable = req.headers.get('user-agent')
    
      if (mowable === 'mow')
      {
        console.log("Mow detected")
        let resp = new Response( null, {
           headers: new Headers({ 'Location': 'https://homph.snowme.ws/'
           }),
           status: 302,
           url: req.url
         });
    
        return resp
      }
      else
      {
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
