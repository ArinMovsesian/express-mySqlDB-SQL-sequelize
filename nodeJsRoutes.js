const fs = require("fs");

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  console.log("url", url);
  console.log("method", method);

  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Enter Message</title></head>");
    res.write(
      "<body><form action='/message' method='POST'><input type='text' name='message'/><button type='submit'>Send</button></form></body>"
    );
    res.write("</html>");
    return res.end();
  }

  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    return req.on("end", () => {
      //eventListener
      const parseBody = Buffer.concat(body).toString();
      const message = parseBody.split("=")[1];
      //fs.writeFileSync("message.txt", message);
      fs.writeFile("message.txt", message, (err) => {
        //eventListener (async)
        res.statusCode = 302; //redirection
        res.setHeader("Location", "/"); //redirection
        return res.end();
      });
    });
  }
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My first Page</title></head>");
  res.write("<body><h1>hello</h1></body>");
  res.write("</html>");
  res.end();
  // process.exit
};
// module.exports = requestHandler;

// module.exports.handler = requestHandler;
// module.exports.someText = "Some hard coded text";

module.exports = {
  // can omit module
  handler: requestHandler,
  someText: "Some hard coded text",
};
