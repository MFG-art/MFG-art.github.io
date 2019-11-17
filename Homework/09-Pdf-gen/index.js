const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const pdf = require("html-pdf");
const axios = require("axios");

const writeFileAsync = util.promisify(fs.writeFile);
let color;

// prompts the user for their github username and preferred color
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
      choices: ["red", "orange", "green", "blue", "purple"]
    }
  ])
  .then(function(response) {
    const username = response.username;

    //takes the color string that the user entered and return a hex color valued
    switch (response.favcolor) {
      case "red":
        color = "#fcacac";
        break;
      case "orange":
        color = "#f0e3a8";
        break;
      case "green":
        color = "#b9f0c8";
        break;
      case "blue":
        color = "#c2daf2";
        break;
      case "purple":
        color = "#ad74e3";
        break;
      default:
        break;
    }

    //AXIOS CALL! - GETS MOST USER INFO, EXCEPT FOR NUMBER OF STARRED REPOS
    axios.get(`https://api.github.com/users/${username}`).then(function(res) {
      console.log(res);

      const name = res.data.name;
      const username = res.data.login;
      const location = res.data.location;
      const html_url = res.data.html_url;
      const starred_url = res.data.starred_url;
      const blog = res.data.blog;
      const bio = res.data.bio;
      const public_repos = res.data.public_repos;
      const profileImage = res.data.avatar_url;
      const followers = res.data.followers;
      const following = res.data.following;

      const githubData = {
        name: name,
        username: username,
        color: color,
        location: location,
        html_url: html_url,
        blog: blog,
        bio: bio,
        public_repos: public_repos,
        profileImage: profileImage,
        followers: followers,
        following: following
      };

      getStarred(githubData);
    });
  });

// AXIOS CALL THAT GETS NUMBER OF STARRED REPOS
function getStarred(githubData) {
  axios
    .get(`https://api.github.com/users/${githubData.username}/starred?`)
    .then(function(res) {
      githubData.starredAmt = res.data.length;
      generateHTML(githubData);
    });
}

//
function generateHTML(githubData) {
  if (githubData.location) {
    let locationURL =
      "https://www.google.com/maps/place/" +
      encodeURI(githubData.location.trim());
    githubData.locationURL = locationURL;
  }

  htmlstring = `
  <!DOCTYPE html>
<html lang="en">
  <head>
    <!-- Meta Stuff, ignore -->
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />

    <!-- STYLE STUFF GOES HERE -->
    <style>
      .header {
        width: 90%;
        background-color: ${githubData.color};
        color: black;
        height: 75px;
        font-size: 40px;
        font-weight: bolder;
        line-height: 1.5em;
        text-align: center;
        margin: auto;
        border: 3px solid black;
        border-radius: 10px;
      }
      .main {
        width: 90%;
        background-color: ${githubData.color};
        font-family: sans-serif;
        font-size: 20px;
        color: black;
        text-align: center;
        margin: auto;
        margin-top: 50px;
        border: 3px solid black;
        border-radius: 10px;
      }
      .profileImage {
        border: 1px solid black;
        margin: 20px;
      }
    </style>

    <!-- TITLE -->
    <title>${githubData.name}'s Github Info!</title>
  </head>

  <!--  -->
  <body bgcolor="#cccccc">
    <div class="header">${githubData.name}'s Github Info!</div>
    <div class="main">
      <img
        class="profileImage"
        src=${githubData.profileImage}
        alt="profile image"
      />
      <p>Username: ${githubData.username}</p>
      <a href=${githubData.locationURL} target="_blank">Location</a>
      </a>
      <br /><br />
      <a href=${githubData.html_url} target="_blank">Github Profile </a>
      <br /><br />
      <a href=${githubData.blog} target="_blank">Blog</a>
      <p>
        Bio: \n${githubData.bio}
      </p>
      <p>Has ${githubData.public_repos} public repos. Out of these, ${githubData.starredAmt} are starred.</p>
      <p>They have ${githubData.followers} followers and are following ${githubData.following} users.</p>
    </div>

    <script>
      const data = {
        name: "MFG-art",
        username: "MFG-art",
        location: "Saint Paul",
        html_url: "https://github.com/MFG-art",
        starred_url:
          "https://api.github.com/users/MFG-art/starred{/owner}{/repo}",
        blog: "",
        bio:
          "An aspiring Web Developer. Currently enrolled in U of M's Web Dev Bootcamp, taught by @chriswoolcottq. Currently strengthening JavaScript / NODE.js skills.",
        public_repos: 3,
        followers: 17,
        following: 15,
        starredAmt: 3
      };
    </script>
  </body>
</html>
  `;

  async function init() {
    console.log("hi");
    try {
      await writeFileAsync("index.html", htmlstring);
      var readHtml = fs.readFileSync("index.html", "utf8");
      var options = { format: "Letter" };

      pdf.create(readHtml, options).toFile("index.pdf", function(err, res) {
        if (err) return console.log(err);
        console.log(res);
      });
      console.log("Successfully wrote to index.html");
    } catch (err) {
      console.log(err);
    }
  }
  init();
}
