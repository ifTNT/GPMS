var exhi_time = document.getElementById("changing_time");
var exhi_location = document.getElementById("changing_location");
var year = document.querySelector("#year").innerHTML;
var url = `/epis/exhib/${year}`;
function clicktime() {
  //alert("hello world");
  if (exhi_time.style.display == "none") {
    exhi_time.style.display = "block";
  } else {
    var data = {
      date: document.querySelector("textarea[name='exhi_time']").value,
    };
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
        exhi_time.style.display = "none";
        document.querySelector(".exhi_time").innerHTML = data.date;
      });
  }
}

function clicklocation() {
  //alert("hello world");
  if (exhi_location.style.display == "none") {
    exhi_location.style.display = "block";
  } else {
    var data = {
      location: document.querySelector("textarea[name='exhi_location']").value,
    };
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
        exhi_location.style.display = "none";
        document.querySelector(".exhi_location").innerHTML = data.location;
      });
  }
}