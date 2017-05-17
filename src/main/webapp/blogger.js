function showHSLoggedInOptions(makeVisible){
	if(makeVisible) {
		$("#custom-search-input").show();
		$("#loggedInOptions").show();
		$("#homeScreenBody").show();
	} else {
		$("#custom-search-input").hide();
		$("#loggedInOptions").hide();
		$("#homeScreenBody").hide();
	}
}
	
function showHSLoggedOutOptions(makeVisible) {
	if(makeVisible) {
		console.log("**showHSLoggedOutOptions**");
		$("#custom-search-input").show();
		$("#homeOptions_default").show();
		$("#homeScreenBody").show();
		fetchAllBlogs();
	} else {
		$("#custom-search-input").hide();
		$("#homeOptions_default").hide();
		$("#homeScreenBody").hide();
	}
	
}
	
function fetchAllBlogs(searchStr){
	$.ajax({
		url : 'rest/blogger/blogs',
		type : 'get',
		contentType: "application/json; charset=utf-8",
		dataType : 'json',
		data : {"offset": "0","pageSize": "2","searchStr":searchStr},
		success : function(data,textStatus, jqXHR) { 
			console.log("success callback");
			console.log("Blog data:"+data);
			for(i = 0;i < data.length;i++){ 
				console.log("i:"+i);
				$("#post"+i+"Heading").text(data[i].title);
				console.log("Blog Title:"+data[i].title);
				$("#post"+i+"Content").text(data[i].description);
				console.log("Blog Content:"+data[i].description);
				console.log("Blog id:"+data[i].blogId);
				$("#commentOptionspost"+i).data("blogData",data[i]);
				//$("#commentOptionspost"+i).attr("blogTitle",data[i].title);
				//$("#commentOptionspost"+i).attr("blogDescription",data[i].blogDescription);
				console.log("Comment data :"+($("#commentOptionspost"+i).data("blogData")));
				
				
			}
			configurePagingOptions(jqXHR.getResponseHeader("LINK"));
			console.log("LinkHeader at client :"+jqXHR.getResponseHeader("LINK"));
			
			
		},
		error : function( jqXHR,textStatus, errorThrown ) {
			console.log("error callback :"+jqXHR);
			console.log("error callback:"+textStatus);
			console.log("error callback:"+errorThrown);
		},
		 complete : function( jqXHR, textStatus ) {
			console.log("complete callback"); 
		}
	});
} 

function configurePagingOptions(linkheader) {
	console.log("**linkheader.length:"+linkheader.length);
	if(linkheader.length != 0) {
		var parsedLinks = parse_link_header(linkheader); 
		console.log("Parsing linkheader :"+parsedLinks);
		for (var key in parsedLinks) {
			console.log("**Enterng loop:"+key);
		 // if (parsedLinks.hasOwnProperty(key))
			var keyToMatch = key.toLowerCase();
			console.log("keyToMatch:"+keyToMatch);
			console.log("if check:"+(keyToMatch === "next"));
			$("#next").hide();
			$("#next").removeData("targetUrl");
			$("#prev").hide();
			$("#prev").removeData("targetUrl");
			$("#first").hide();
			$("#first").removeData("targetUrl");
			$("#last").hide();
			$("#last").removeData("targetUrl");
			switch(keyToMatch) {
				case "next":
					console.log("**entering next");
					$("#next").show();
					$("#next").data("targetUrl",parsedLinks[key]);
					break;
				case "prev":
					console.log("**entering prev");
					$("#prev").show();
					console.log("**prev shown");
					$("#prev").data("targetUrl",parsedLinks[key]);
					break;
				case "first":
					console.log("**entering first");
					$("#first").show();
					$("#first").data("targetUrl",parsedLinks[key]);
					break;
				case "last":
					console.log("**entering last");
					$("#last").show();
					$("#last").data("targetUrl",parsedLinks[key]);
					break;	
				default:
					break;
			}
			console.log("parsedLink:"+parsedLinks[key]);
		}
	}
}

function fetchBlogComments(blogId){
	$.ajax({
		url : 'rest/blogger/blogs/'+blogId+'/comments',
		type : 'get',
		contentType: "application/json; charset=utf-8",
		dataType : 'json', 
		success : function(data,textStatus, jqXHR) { 
			console.log("success callback");
			console.log("Blog data:"+data);
			for(i = 0;i < data.length;i++){ 
				console.log("i:"+i);
				$("#comment"+i+"Content").text(data[i].comment);
				console.log("Comment:"+data[i].comment);
				$("#comment"+i+"user").text(data[i].commentor.userId);
				console.log("commentor:"+data[i].commentor.userId);
				console.log("Blog id:"+data[i].blogId);
				
			}
			
		},
		error : function( jqXHR,textStatus, errorThrown ) {
			console.log("error callback :"+jqXHR);
			console.log("error callback:"+textStatus);
			console.log("error callback:"+errorThrown);
		},
		 complete : function( jqXHR, textStatus ) {
			console.log("complete callback"); 
		}
	});
} 

function parse_link_header(header) {
	if (header.length == 0) {
		throw new Error("input must not be of zero length");
	}
	// Split parts by comma
	var parts = header.split(',');
	var links = {};
	// Parse each part into a named link
	for(i=0;i<parts.length;i++)
	{
		var section = parts[i].split(';');
		if (section.length != 2) {
			throw new Error("section could not be split on ';'");
		}
		var url = section[0].replace(/<(.*)>/, '$1').trim();
		var name = section[1].replace(/rel="(.*)"/, '$1').trim();
		links[name] = url;
	}
	return links;
}

function showNewBlogScreen(makeVisible){
	if(makeVisible) {
		$("#loginScreen").hide();
		$("#custom-search-input").hide();
		$("#loggedInOptions").hide();
		$("#homeScreenBody").hide();
		$("#newBlogScreen").show();
	} else {
		$("#newBlogScreen").hide();
	}
}

function showBlogAndCommentsScreen(makeVisible,blogData) {
	console.log("showBlogAndCommentsScreen enter");
	if(makeVisible) {
		$("#homeScreenBody").hide();
		console.log("showing showBlogAndCommentsScreen");
		//console.log("Inside showBlogAndCommentsScreen attr:"+$(this).attr("blogData"));
		console.log("blogData.title :"+blogData.title);
		console.log("blogData.description :"+blogData.description);
		$("#selectedHeading").text(blogData.title);
		$("#selectedContent").text(blogData.description);
		fetchBlogComments(blogData.blogId);
		
		$("#commentInput").data("blogId",blogData.blogId);
		$("#blogAndCommentsScreen").show();
	} else {
		$("#blogAndCommentsScreen").hide();
	}
	
}


$(document).ready(function() {
	//alert("I am an alert box!");
	console.log("**Document Ready**");
	showHSLoggedOutOptions(true);
	//$('#commentOptionspost0').click(showBlogAndCommentsScreen(true));
	$("#commentOptionspost0,#commentOptionspost1,#commentOptionspost2").click(function(e) {
		var blogData = $(this).data("blogData");
		console.log("Inside click attr blogData:"+blogData);
		console.log("Inside click attr blogData.title:"+blogData.title);
		$("#loginScreen").hide();
		showBlogAndCommentsScreen(true,blogData);
	});
		
	$("#loginBtn").click(function(e) {
		showHSLoggedInOptions(false);
		showHSLoggedOutOptions(false);
		$("#loginScreen").show();
	});
	$("#signUp").click(function(e) {
		$("#loginScreen").hide();
		showHSLoggedInOptions(false);
		showHSLoggedOutOptions(false);
		$("#signUpScreen").show();
	});
	
	
	
	$("#updateProfileBtn").click(function(e) {
		$("#signUpScreen").hide();
		showHSLoggedInOptions(false);
		showHSLoggedOutOptions(false);
		$("#loginScreen").hide();
		$("#profileUpdateScreen").show();
	});
	
	
	$("#newPostBtn").click(function(e) {
		$("#signUpScreen").hide();
		$("#loginScreen").hide();
		$("#profileUpdateScreen").hide();
		$("#newBlogForm").hide();
		$("#homeScreenBody").hide();
		$("#post1Description").hide();
		$("#homeScreen").show();
		$("#newBlogScreen").show();
		});
	$("#blog1").click(function(e) {
		$("#signUpScreen").hide();
		$("#loginScreen").hide();
		$("#profileUpdateScreen").hide();
		$("#newBlogForm").hide();
		$("#newBlogScreen").hide();
		$("#post1Description").hide();
		$("#homeScreen").show();
		$("#homeScreenBody").show();
		});
	$("#post1Heading").click(function(e) {
		$("#signUpScreen").hide();
		$("#loginScreen").hide();
		$("#profileUpdateScreen").hide();
		$("#newBlogForm").hide();
		$("#newBlogScreen").hide();
		$("#homeScreenBody").hide();
		$("#homeScreen").show();
		$("#post1Description").show();
		});
	$("#post1DescriptionCloseBtn").click(function(e) {
		$("#signUpScreen").hide();
		$("#loginScreen").hide();
		$("#profileUpdateScreen").hide();
		$("#newBlogForm").hide();
		$("#newBlogScreen").hide();
		$("#post1Description").hide();
		$("#homeScreen").show();
		$("#homeScreenBody").show();
		});
		
	
	$("#saveSignUpDetailsBtn").click(function() {
		$("#loginScreen").hide();
		$("#signUpScreen").hide();

		var userId = $("#userid").val();
		console.log("userId:"+userId);
		var passwordStr = $("#signuppassword").val();
		console.log("passwordStr:"+passwordStr);
		var firstName = $("#firstname").val();
		console.log("firstName:"+firstName);
		var lastName = $("#lastname").val();
		console.log("lastName:"+lastName);
		var nickName = $("#nickname").val();
		console.log("nickName:"+nickName);
		
		var user = {
			"userId" : userId,
			"password" : passwordStr,
			"firstName" : firstName,
			"lastName" : lastName,
			"nickName" : nickName
		};
		$.ajax({
			url : 'rest/blogger/user',
			type : 'post',
			contentType: "application/json; charset=utf-8",
			success : function(data,textStatus, jqXHR) { 
				console.log("success callback");
				console.log(jqXHR.getResponseHeader("AUTHORIZATION"));
				window.sessionStorage.accessToken = jqXHR.getResponseHeader("AUTHORIZATION");
				showHSLoggedInOptions(true);
			},
			error : function( jqXHR,textStatus, errorThrown ) {
				console.log("error callback :"+jqXHR);
				console.log("error callback:"+textStatus);
				console.log("error callback:"+errorThrown);
			},
			 complete : function( jqXHR, textStatus ) {
				console.log("complete callback"); 
			},
			data : JSON.stringify(user)
		});
	});
	
	$("#loginForm").submit(function(e) {
		console.log("form submitted **");
		console.log("form data 0:"+$(this).serializeArray());
		console.log("form data 1:"+$(this).serialize());
		console.log("form data 2:"+$('form').serialize());
		$("#submitButton").attr("disabled", true);
		$.ajax({
			   type: 'post',
			   url: 'rest/blogger/login',
			   contentType: "application/x-www-form-urlencoded; charset=utf-8",
			   data: $("#loginForm").serialize(), // serializes the form's elements.
			   success : function(data,textStatus, jqXHR) { 
					console.log("success callback");
					console.log(jqXHR.getResponseHeader("AUTHORIZATION"));
					window.sessionStorage.accessToken = jqXHR.getResponseHeader("AUTHORIZATION");
					console.log("stored prevAction:"+window.sessionStorage.getItem("prevAction"))
					if(window.sessionStorage.getItem("prevAction") == "newBlog"){
						console.log("removing PrevAction and showing new blog screen");
						window.sessionStorage.removeItem("prevAction");
						showNewBlogScreen(true);
					}else{
						console.log("showing logged in options");
						showHSLoggedInOptions(true);
					}
					
			   },
			   error : function( jqXHR,textStatus, errorThrown ) {
					console.log("error callback :"+jqXHR);
					console.log("error callback:"+textStatus);
					console.log("error callback:"+errorThrown);
			   },
			   complete : function( jqXHR, textStatus ) {
					console.log("complete callback"); 
			   }
			 });

		e.preventDefault(); // avoid to execute the actual submit of the form.
	});
	
	$("#logoutBtn").click(function(e) {
			console.log("Logging out in progress")
			window.sessionStorage.clear();
			showHSLoggedInOptions(false);
			showHSLoggedOutOptions(true);
	});
	
	$("#newBlogBtn_loggedOut").click(function(e) {
		
		console.log("create new blog 1");
		showHSLoggedInOptions(false);
		console.log("create new blog 2");
		showHSLoggedOutOptions(false);
		window.sessionStorage.setItem("prevAction","newBlog");
		$("#loginScreen").show();
		console.log("create new blog 3");
		//$("#signUpScreen").hide();
		//$("#loginScreen").hide();
		//$("#profileUpdateScreen").hide();
		//$("#newBlogScreen").hide();
		//$("#homeScreenBody").hide();
		//$("#post1Description").hide();
		//$("#homeScreen").show();
		//$("#newBlogForm").show();
	});
	
	$("#newBlogBtn_loggedIn").click(function(e) {
		showHSLoggedInOptions(false);
		showNewBlogScreen(true);
	});
	
	$("#submitNewBlogbtn").click(function() {
		showNewBlogScreen(false);

		var blogTitle = $("#newBlogTitle").val();
		console.log("newBlogTitle:"+blogTitle);
		var blogDescription = $("#blogDescriptionIInput").val();
		console.log("blogDescription:"+blogDescription);
		
		
		var blog = {
			"title" : blogTitle,
			"description" : blogDescription
			
		};
		$.ajax({
			url : 'rest/blogger/blogs',
			type : 'post',
			contentType: "application/json; charset=utf-8",
			headers: {"AUTHORIZATION": window.sessionStorage.getItem('accessToken')},
			success : function(data,textStatus, jqXHR) { 
				console.log("success callback");
				showHSLoggedInOptions(true);
			},
			error : function( jqXHR,textStatus, errorThrown ) {
				console.log("error callback :"+jqXHR);
				console.log("error callback:"+textStatus);
				console.log("error callback:"+errorThrown);
			},
			 complete : function( jqXHR, textStatus ) {
				console.log("complete callback"); 
			},
			data : JSON.stringify(blog)
		});
	});
	
	$("#submitCommentbtn").click(function() {
		var blogId = $("#commentInput").data("blogId");
		console.log(" commentInput blogId:"+blogId);
		var commentDescription = $("#commentInput").val();
		console.log("commentDescription:"+commentDescription);
		
		
		var comment = {
			"comment" : commentDescription
			
		};
		$.ajax({
			url : 'rest/blogger/blogs/'+blogId+'/comments',
			type : 'post',
			contentType: "application/json; charset=utf-8",
			headers: {"AUTHORIZATION": window.sessionStorage.getItem('accessToken')},
			success : function(data,textStatus, jqXHR) { 
				console.log("success callback");
				
			},
			error : function( jqXHR,textStatus, errorThrown ) {
				console.log("error callback :"+jqXHR);
				console.log("error callback:"+textStatus);
				console.log("error callback:"+errorThrown);
			},
			 complete : function( jqXHR, textStatus ) {
				console.log("complete callback"); 
			},
			data : JSON.stringify(comment)
		});
	});
	
	
	$("#next,#prev,#first,#last").click(function() {
		var targetUrl = $(this).data("targetUrl");
		console.log("targetUrl in pagingOptions click :"+targetUrl);
		$.ajax({
			url : targetUrl,
			type : 'get',
			contentType: "application/json; charset=utf-8",
			dataType : 'json', 
			success : function(data,textStatus, jqXHR) { 
				console.log("next success callback");
				for(i = 0;i < data.length;i++){ 
					console.log("i:"+i);
					$("#post"+i+"Heading").text(data[i].title);
					console.log("Blog Title:"+data[i].title);
					$("#post"+i+"Content").text(data[i].description);
					console.log("Blog Content:"+data[i].description);
					console.log("Blog id:"+data[i].blogId);
					$("#commentOptionspost"+i).data("blogData",data[i]);
					//$("#commentOptionspost"+i).attr("blogTitle",data[i].title);
					//$("#commentOptionspost"+i).attr("blogDescription",data[i].blogDescription);
					console.log("Comment data :"+($("#commentOptionspost"+i).data("blogData")));
					console.log("Comment data :"+($("#commentOptionspost"+i).data("blogData")));
				}
				configurePagingOptions(jqXHR.getResponseHeader("LINK"));
				
			},
			error : function( jqXHR,textStatus, errorThrown ) {
				console.log("error callback :"+jqXHR);
				console.log("error callback:"+textStatus);
				console.log("error callback:"+errorThrown);
			},
			 complete : function( jqXHR, textStatus ) {
				console.log("complete callback"); 
			}
			
		});
	});
	
	$("#searchBtn").click(function(e) {
		var searchStr = $("#searchInput").val();
		console.log("Searched for :"+searchStr);
		fetchAllBlogs(searchStr);
	
	});
	$("#findLink").click(function(e) {
		$("#findForm").show();
	});
	$("#findBtn").click(function() {
		$("#findForm").hide();
		var isbn = $("#findIsbn").val();
		$.ajax({
			url : 'rest/library/book/'+isbn,
			type : 'get',
			dataType : 'json',
			contentType: "application/json; charset=utf-8",
			success : function(data) {
				console.log(data.response);
				$("#findResult").show();
				
			}		});
	});
});

