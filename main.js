var http = require("http");
var fs = require("fs");
var url = require("url");
var qs = require("querystring");
var template = require('./lib/template.js');
var path = require('path');
var sanitizeHTML = require('sanitize-html');

var app = http.createServer(function (request, response) {
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var pathname = url.parse(_url, true).pathname;
  if (pathname === "/") {
    if (queryData.id === undefined) {
      fs.readdir("./data", function (error, filelist) {
        var title = "WELCOME!";
        var description = "Hello, Node.js";
        var list = template.list(filelist);
        var html = template.HTML(title, list, 
          `<h2>${title}</h2>${description}`,
          `<a href="/create">create</a>`
          );
          response.writeHead(200);
          response.end(html);
      });
    } else {
      fs.readdir("./data", function (error, filelist) {
        var filterId = path.parse(queryData.id).base;
        var filterId = path.parse(queryData.id).base;
        fs.readFile(
          `data/${filterId}`,
          "utf8",
          function (err, description) {
            var title = queryData.id;
            var sanitizedHTML = sanitizeHTML(title);
            var sanitizedDescription = sanitizeHTML(description,{
              allowedTags:['h1']
            });
            var list = template.list(filelist);
            var html = template.HTML(
              sanitizedHTML,
              list,
              `<h2>${sanitizedHTML}</h2>${sanitizedDescription}`,
              ` <a href="/create">create</a> 
                <a href="/update?id=${sanitizedHTML}">update</a>
                <form action="delete_process" method="post" onSubmit="confirm">
                  <input type="hidden" name="id" value="${sanitizedHTML}">
                  <input type="submit" value="delete">
                </form>
              `
            );
            response.writeHead(200);
            response.end(html);
          }
        );
      });
    }
  } else if (pathname === "/create") {
    fs.readdir("./data", function (error, filelist) {
      var title = "WEB - create";
      var list = template.list(filelist);
      var html = template.HTML(
        title,
        list,
        `
      <form action="/create_process" method="post">
        <p><input type="text" name="title" placeholder="title"></p>
        <p><textarea placeholder="description" name="description"></textarea></p>
        <p><input type="submit"></p>
      </form>
      `,
        ""
      );
      response.writeHead(200);
      response.end(html);
    });
  } else if (pathname === "/create_process") {
    var body = "";
    request.on("data", function (data) {
      body = body + data;
    });
    request.on("end", function () {
      var post = qs.parse(body);
      var title = post.title;
      var description = post.description;
      fs.writeFile(`data/${title}`, description, "utf8", function (err) {
        response.writeHead(302, { Location: `/?id=${title}` });
        response.end();
      });
    });
  } else if (pathname === "/update") {
    fs.readdir("./data", function (error, filelist) {
      var filterId = path.parse(queryData.id).base;
      fs.readFile(`data/${filterId}`, "utf8", function (err, description) {
        var title = queryData.id;
        var list = template.list(filelist);
        var html = template.HTML(
          title,
          list,
          `
            <form action="/update_process" method="post">
              <p><input type="hidden" name="id" value="${title}" ></p>
              <p><input type="text" name="title" value="${title}"></p>
              <p><textarea name="description">${description}</textarea></p>
              <p><input type="submit"></p>
            </form>
            `,
          `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`
        );
        response.writeHead(200);
        response.end(html);
      });
    });
  } else if (pathname === "/update_process") {
    var body = "";
    request.on("data", function (data) {
      body = body + data;
    });
    request.on("end", function () {
      var post = qs.parse(body);
      var id = post.id;
      var title = post.title;
      var description = post.description;
      fs.rename(`data/${id}`, `data/${title}`, function (error) {
        fs.writeFile(`data/${title}`, description, "utf8", function (err) {
          response.writeHead(302, { Location: `/?id=${title}` });
          response.end();
        });
      });
    });
  } else if (pathname === "/delete_process") {
    var body = "";
    request.on("data", function (data) {
      body = body + data;
    });
    request.on("end", function () {
      var post = qs.parse(body);
      var id = post.id;
      var filterId = path.parse(id).base;
      fs.unlink(`data/${filterId}`, function (error) {
        response.writeHead(302, { Location: `/` });
        response.end();
      });
    });
  } else {
    response.writeHead(404);
    response.end("Not Found");
  }
});
app.listen(3000);
