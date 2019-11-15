const inquirer = require("inquirer");
const axios = require("axios");
const fs = require("fs");
const colors = {
  red: "#bd0909",
  orange: "ff9900",
  green: "#1db83c",
  blue: "#225c80"
};

let githubData = {};

inquirer
  .prompt([
    {
      type: "input",
      message: "What is your github user name?",
      name: "username"
    },
    {
      type: "list",
      message: "What is your favorite color?",
      name: "favcolor",
      choices: ["red", "orange", "green", "blue"]
    }
  ])
  .then(function(response) {
    console.log(response);
    console.log(response.username);
    console.log(response.favcolor);
    const username = response.username;
    axios.get(`https://api.github.com/users/${username}`).then(function(res) {
      const name = res.data.name;
      const username = res.data.login;
      const location = res.data.location;
      const html_url = res.data.html_url;
      const starred_url = res.data.starred_url;
      const blog = res.data.blog;
      const bio = res.data.bio;
      const public_repos = res.data.public_repos;
      const followers = res.data.followers;
      const following = res.data.following;

      const githubData = {
        name: name,
        username: username,
        location: location,
        html_url: html_url,
        starred_url: starred_url,
        blog: blog,
        bio: bio,
        public_repos: public_repos,
        followers: followers,
        following: following
      };

      geneerateHTML(githubData);
      console.log(githubData);
    });
  });

function geneerateHTML(githubData) {
  let htmlstring = `n<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="UTF-8" />\n<meta name="viewport" content="width=device-width, initial-scale=1.0" />\n<meta http-equiv="X-UA-Compatible" content="ie=edge" />\n<title>${githubData.name}</title>\n</head>\n<body>\n<p>${githubData.name}</p>\n<p>${githubData.username}</p>\n<p>${githubData.location}</p>\n</body>\n</html>`;

  fs.writeFile("github-resume.html", htmlstring, err => {
    if (err) throw err;
    console.log("The file has been saved!");
  });
}
