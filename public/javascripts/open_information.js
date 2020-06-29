
	var like = document.getElementById("like");
	var unlike = document.getElementById("unlike");
	var vote = document.getElementById("vote");
	var unvote = document.getElementById("unvote");
	function togglelike(){
		//alert("hello world");
		let url = "/epis/"
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
		unlike.classList.toggle('hide');
		like.classList.toggle('hide');
	}
	

