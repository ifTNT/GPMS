
	var like = document.getElementById("like");
	var unlike = document.getElementById("unlike");
	var vote = document.getElementById("vote");
	var unvote = document.getElementById("unvote");
	function clicklike(){
		//alert("hello world");
		unlike.style.display = 'block';
		like.style.display = 'none';
		
	}
	function clickunlike(){
		//alert("go away world");
		unlike.style.display = 'none';
		like.style.display = 'block';
	}
	function clickvote(){
		//alert("hello world");
		unvote.style.display = 'block';
		vote.style.display = 'none';
	}
	function clickunvote(){
		//alert("hello world");
		vote.style.display = 'block';
		unvote.style.display = 'none';
	}
