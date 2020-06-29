var projectname = document.getElementById("changing_name");
var introduce = document.getElementById("changing_introduce");
var tag = document.getElementById("changing_tag");
var year = document.querySelector("#year").innerHTML;
var nthGroup = document.querySelector("#nthGroup").innerHTML;
var url = `/epis/proj/${year}/${nthGroup}`;
function clickname() {
  //alert("hello world");
  if (projectname.style.display == "none") {
    projectname.style.display = "block";
  } else {
    var data = {
      topic: document.querySelector("textarea[name='project_name']").value,
    };
    console.log(data);
    fetch(url, {
      method: "POST", // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((res) => res.json())
      .catch((error) => console.error("Error:", error))
      .then((res) => {
        projectname.style.display = "none";
        document.querySelector(".project_name").innerHTML = data.topic;
      });
  }
}
function clickintroduce() {
  if (introduce.style.display == "none") {
    introduce.style.display = "block";
  } else {
    var data = {
      description: document.querySelector("textarea[name='project_introduce']")
        .value,
    };
    console.log(data);
    fetch(url, {
      method: "POST", // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((res) => res.json())
      .catch((error) => console.error("Error:", error))
      .then((res) => {
        introduce.style.display = "none";
        document.querySelector(".project_introduce").innerHTML =
          data.description;
      });
  }
}
function clicktag() {
  if (tag.style.display == "none") {
    tag.style.display = "block";
  } else {
    let str_tag = document
      .querySelector("textarea[name='project_tag']")
      .value.replace(/#/g, "");
    let newTag = str_tag.split(" ");
    var data = {tag:newTag};
    console.log(data);
    fetch(url, {
      method: "POST", // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((res) => res.json())
      .catch((error) => console.error("Error:", error))
      .then((res) => {
        tag.style.display = "none";
        document.querySelector(".project_tag").innerHTML = `#${data.tag.join(
          " #"
        )}`;
      });
  }
}
