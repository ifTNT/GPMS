
	var projectname = document.getElementById("changing_name");
	var introduce = document.getElementById("changing_introduce");
	var tag = document.getElementById("changing_tag");

	function clickname(){
		//alert("hello world");
		if(projectname.style.display=='none'){
			projectname.style.display = 'block';
		}
		else{
			projectname.style.display = 'none';
		}
	}
	function clickintroduce(){
		if(introduce.style.display=='none'){
			introduce.style.display = 'block';
		}
		else{
			introduce.style.display = 'none';
		}
	}
	function clicktag(){
		//alert("hello world");
		if(tag.style.display=='none'){
			tag.style.display = 'block';
		}
		else{
			tag.style.display = 'none';
		}
	}
