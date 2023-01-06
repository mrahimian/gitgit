document.getElementById("submit").addEventListener("click", function () {
  username = document.getElementById("username").value;
  var name = document.getElementById("name");
  var avatar = document.getElementById("avatar");
  var location = document.getElementById("location");
  var blog = document.getElementById("blog");
  var bio = document.getElementById("bio");
  const key = window.localStorage.getItem(username);
  if (key == null) {
    fetch(`https://api.github.com/users/${username}`)
      .then(async (data) => {
        if (data.status != 404) {
          var result = await data.json();

          if (result.bio) var clearBio = result.bio.replace(/\n/g, "<br />");
          else var clearBio = "";

          name.innerHTML = result.name;
          location.innerHTML = result.location;
          blog.innerHTML = result.blog;
          blog.setAttribute("href", result.blog);
          avatar.setAttribute("src", result.avatar_url);
          avatar.hidden = false;
          bio.innerHTML = clearBio;

          // queries[result.name] = result;
          window.localStorage.setItem(username, JSON.stringify(result));
        } else {
          name.innerHTML = "User not found";
          location.innerHTML = "";
          blog.innerHTML = "";
          blog.setAttribute("href", "");
          avatar.hidden = true;
          bio.innerHTML = "";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    var result = window.localStorage.getItem(username);
    result = JSON.parse(result)
    if (result.bio) var clearBio = result.bio.replace(/\n/g, "<br />");
    else var clearBio = "";


    name.innerHTML = result.name;
    location.innerHTML = result.location;
    blog.innerHTML = result.blog;
    blog.setAttribute("href", result.blog);
    avatar.setAttribute("src", result.avatar_url);
    avatar.hidden = false;
    bio.innerHTML = clearBio;
  }
});

