/*
Author: Manvir Kaur
KUID: 3064194
Date: 10/31/2022
Assignment: Assignment05
Purpose: JavaScript code for an HTTP server that allows remote access to a file system.
*/

//Importing the `createServer` function from the `http` module. 
const {createServer} = require("http");

// It creates an object that does not inherit from `Object.prototype`.
const methods = Object.create(null);

// It creates a server that responds to HTTP requests by calling a function that is looked up in an object based on the request method.
createServer((request, response) => {
  /* Checking if the request method is in the methods object. If it is not, it is calling the
  notAllowed function. */
  let handler = methods[request.method] || notAllowed;
  // Calling the handler function.
  handler(request)
    /* Checking if the error has a status property. If it does, it is returning the error. If it
    does not, it is returning an object with a body property that is the string representation of
    the error and a status property that is 500. */
    .catch(error => {
      if (error.status != null) return error;
      return {body: String(error), status: 500};
    })
    /* A function that is called with an object that has a body, status, and type property.
    writing the status and type to the response header. If the body is a stream, it is piping the
    stream to the response. If the body is not a stream, it is ending the response with the body. */
    .then(({body, status = 200, type = "text/plain"}) => {
       // Writing the status and type to the response header. 
       response.writeHead(status, {"Content-Type": type});
       // Checking if the body is a stream. If it is, it is piping the stream to the response. 
       if (body && body.pipe) body.pipe(response);
       else response.end(body); 
    });
// Listening on port 8000.
}).listen(8000);

// It returns a 405 status code and a message saying that the method is not allowed
async function notAllowed(request) {
  return {
    status: 405,
    body: `Method ${request.method} not allowed.`
  };
}

// Importing the `parse` function from the `url` module. 
var {parse} = require("url");
// Importing the `resolve` and `sep` functions from the `path` module.
var {resolve, sep} = require("path");

// Setting the baseDirectory variable to the current working directory.
var baseDirectory = process.cwd();

// It takes a URL, decodes it, and then resolves it to a path relative to the base directory
function urlPath(url) {
  // Destructuring the pathname property from the object returned by the parse function.
  let {pathname} = parse(url);
  /* Taking the pathname property from the object returned by the parse function, decoding
  it, and then resolving it to a path relative to the base directory. */
  let path = resolve(decodeURIComponent(pathname).slice(1));
  /* Checking if the path is not the base directory and if it does not start with the base
  directory and a separator. If it is, it is throwing an object with a status property that is 403
  and a body property that is "Forbidden". */
  if (path != baseDirectory &&
      !path.startsWith(baseDirectory + sep)) {
    throw {status: 403, body: "Forbidden"};
  }
  return path;
}

// Importing the `createReadStream` function from the `fs` module.
const {createReadStream} = require("fs");
// Destructuring the `stat` and `readdir` functions from the `promises` property of the `fs` module. 
const {stat, readdir} = require("fs").promises;
// Importing the `mime` module.
const mime = require("mime");

// Creating a property on the GET method that is an async function that takes a request object. 
methods.GET = async function(request) {
  /* Taking the pathname property from the object returned by the parse function, decoding
  it, and then resolving it to a path relative to the base directory. */
  let path = urlPath(request.url); 
  // Declaring a variable that will be used to store the result of the `stat` function.
  let stats;
  // Trying to get the stats of the path. If it fails, it is catching the error. 
  try {
    stats = await stat(path);
  } catch (error) {
    /* Checking if the error code is not ENOENT. If it is not, it is throwing the error. If
    it is, it is returning an object with a status property that is 404 and a body property that is
    "File not found". */
    if (error.code != "ENOENT") throw error;
    else return {status: 404, body: "File not found"};
  }
  /* If the path is a directory, it is returning an object with a body property that is the
  directory listing. If the path is not a directory, it is returning an object with a body property
  that is a stream of the file and a type property that is the mime type of the file. */
  if (stats.isDirectory()) {
    return {body: (await readdir(path)).join("\n")};
  } else {
    return {body: createReadStream(path),
            type: mime.getType(path)};
  }
};

// Destructuring the `rmdir` and `unlink` functions from the `promises` property of the `fs` module.
const {rmdir, unlink} = require("fs").promises;

// Creating a property on the Delete methods object that is an async function that takes a request object.
methods.DELETE = async function(request) {
  /* Taking the pathname property from the object returned by the parse function, decoding
  it, and then resolving it to a path relative to the base directory. */
  let path = urlPath(request.url); 
  // Declaring a variable that will be used to store the result of the `stat` function.
  let stats; 

  /* Trying to get the stats of the path. If it fails, it is checking if the error code is
  not ENOENT. If it is not, it is throwing the error. If it is, it is returning an object with a
  status property that is 204. */
  try {
    stats = await stat(path);
  } catch (error) {
    if (error.code != "ENOENT") throw error;
    else return {status: 204};
  }
  /* Checking if the path is a directory. If it is, it is deleting the directory. If it
  is not, it is deleting the file. It returns the 204 status code */
  if (stats.isDirectory()) await rmdir(path);
  else await unlink(path);
  return {status: 204};
};

// Destructuring the `createWriteStream` function from the `fs` module. 
const {createWriteStream} = require("fs");

/* It takes two streams, pipes the first into the second, and returns a promise that resolves when the 
 second stream finishes */
function pipeStream(from, to) {
  /* Creating a function that takes two arguments, resolve and reject. It is adding an
  error event listener to the from stream that calls the reject function. It is adding an error
  event listener to the to stream that calls the reject function. It is adding a finish event listener to
  the to stream that calls the resolve function. It is piping the from stream to the to stream. */
  return new Promise((resolve, reject) => {
    // Adding an error event listener to the from stream that calls the reject function. 
    from.on("error", reject); 
    // Adding an error event listener to the to stream that calls the reject function.
    to.on("error", reject);
    // Adding a finish event listener to the to stream that calls the resolve function.
    to.on("finish", resolve);
    // Piping the from stream to the to stream. 
    from.pipe(to);
  });
}

// Creating a property on the PUT method that is an async function that takes a request object.
methods.PUT = async function(request) {
  /* Taking the pathname property from the object returned by the parse function, decoding
  it, and then resolving it to a path relative to the base directory. */
  let path = urlPath(request.url);
  // Taking the request stream and piping it to a write stream that is writing to the path. 
  await pipeStream(request, createWriteStream(path));
  // Returning a 204 status code.
  return {status: 204};
};

// Destructuring the `mkdir` function from the `promises` property of the `fs` module. 
const {mkdir} = require("fs").promises;

// Creating a property on the MKCOL method that is an async function that takes a request object. 
methods.MKCOL = async function(request) {
  /* Taking the pathname property from the object returned by the parse function, decoding
  it, and then resolving it to a path relative to the base directory. */
  let path = urlPath(request.url);
  // Declaring a variable that will be used to store the result of the `stat` function.
  let stats;
  // Trying to get the stats of the path.
  try {
    // Getting the stats of the path. 
    stats = await stat(path);
  } /* Checking if the error code is not ENOENT. If it is not, it is throwing the error. If
  it is, it is creating the directory and returning a 204 status code. */
  catch (error) {
    if (error.code != "ENOENT") throw error;
    await mkdir(path);
    return {status: 204};
  }
  /* Checking if the path is a directory. If it is, it is returning a 204 status code. If
  not, it is returning a 400 status code and a message saying that the path is not a directory. */
  if (stats.isDirectory()) return {status: 204};
  else return {status: 400, body: "Not a directory"};
};