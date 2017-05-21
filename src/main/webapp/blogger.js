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

function configureMenuBarOptions(screen){
	console.log("configureMenuBarOptions");
	switch(screen){
		case "login":
			console.log("configureMenuBarOptions login");
			$("#newBlogBtn_loggedIn").hide();
			$("#newBlogBtn_loggedOut").hide();
			$("#updateProfileBtn").hide();
			$("#loginBtn").hide();
			$("#logoutBtn").hide();
			$("#myblogsFilter").hide();
			break;
		case "loggedIn":
			console.log("configureMenuBarOptions LOGGEDIN");
			$("#newBlogBtn_loggedIn").show();
			$("#newBlogBtn_loggedOut").hide();
			$("#updateProfileBtn").show();
			$("#loginBtn").hide();
			$("#logoutBtn").show();
			$("#myblogsFilter").show();
			break;
		case "loggedOut":
			console.log("configureMenuBarOptions LOGGEDOUT");
			$("#newBlogBtn_loggedIn").hide();
			$("#newBlogBtn_loggedOut").show();
			$("#updateProfileBtn").hide();
			$("#loginBtn").show();
			$("#logoutBtn").hide();
			$("#myblogsFilter").hide();
			break;
		default:
			break;
	}
}
	
function fetchAllBlogs(searchStr,userfilter){
	console.log("fetchAllBlogs searchStr:"+searchStr);
	console.log("fetchAllBlogs userfilter:"+userfilter);
	$.ajax({
		url : 'rest/blogger/blogs',
		type : 'get',
		contentType: "application/json; charset=utf-8",
		dataType : 'json',
		data : {"offset": "0","pageSize": "2","searchStr":searchStr,"userFilter":userfilter},
		success : function(data,textStatus, jqXHR) { 
			console.log("success callback");
			console.log("Blog data:"+data);
			console.log("new display func")
			displayBlogs(data,textStatus, jqXHR);
			
			
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

function displayBlogs(data,textStatus, jqXHR) {
	showBlogAndCommentsScreen(false);
	$("#loginScreen").hide();
	showNewBlogScreen(false);
	for(i = 0;i < 3;i++){ 
		if(i < data.length) {
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
			console.log("Blog user:"+data[i].user);
			console.log("Blog created time:"+data[i].postedDate);
			console.log("Blog created time:"+($.format.prettyDate(data[i].postedDate)));
			$("#commentOptionspost"+i).text("COMMENTS");
			$("#post"+i+"author").text("Posted by "+data[i].user.userId);
			$("#post"+i+"time").text($.format.prettyDate(data[i].postedDate));
		}else {
			console.log("CLEARING STALE DATA");
			$("#commentOptionspost"+i).text("");
			$("#post"+i+"Heading").text("");
			$("#post"+i+"Content").text("");
			$("#commentOptionspost"+i).removeData("blogData");
			$("#post"+i+"author").text("");
			$("#post"+i+"time").text("");
		}		
	}
	$("#homeScreenBody").show();
	configurePagingOptions(jqXHR.getResponseHeader("LINK"));
	console.log("LinkHeader at client :"+jqXHR.getResponseHeader("LINK"));
}

function configureCommentPagingOptions(linkheader) {
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
			$("#loadMoreComments").hide();
			$("#loadMoreComments").removeData("targetUrl");
			if(keyToMatch === "next") {
				console.log("Showing load more comments");
				$("#loadMoreComments").show();
				$("#loadMoreComments").data("targetUrl",parsedLinks[key]);
			}
		}
	} else {
		$("#loadMoreComments").hide();
		$("#loadMoreComments").removeData("targetUrl");
	}
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

function fetchBlogComments(blogId,sortorder){
	$.ajax({
		url : 'rest/blogger/blogs/'+blogId+'/comments',
		type : 'get',
		contentType: "application/json; charset=utf-8",
		dataType : 'json', 
		data : {"offset": "0","pageSize": "3","sortOrder":sortorder},
		success : function(data,textStatus, jqXHR) { 
			console.log("success callback");
			console.log("Blog data:"+data);
			for(i = 0;i < data.length;i++){ 
				console.log("i:"+i);
				$("#comment"+i+"Content").text(data[i].comment);
				console.log("Comment:"+data[i].comment);
				$("#comment"+i+"author").text(data[i].commentor.userId);
				console.log("commentor:"+data[i].commentor.userId);
				console.log("Blog id:"+data[i].blogId);
				
				console.log("Comment created time:"+data[i].postedDate);
				console.log("Comment created time:"+($.format.prettyDate(data[i].postedDate)));

				$("#comment"+i+"time").text($.format.prettyDate(data[i].postedDate));
				
				
			}
			$("#loadMoreComments").data("loadedCommentCount",data.length);
			configureCommentPagingOptions(jqXHR.getResponseHeader("LINK"));
			
			
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
		showBlogAndCommentsScreen(false);
		
		$("#newBlogScreen").show();
	} else {
		$("#newBlogScreen").hide();
	}
}

function showBlogAndCommentsScreen(makeVisible) {
	console.log("showBlogAndCommentsScreen enter");
	if(makeVisible) {
		var blogData = $("#selectedPost").data("blogData");
		$("#homeScreenBody").hide();
		console.log("showing showBlogAndCommentsScreen");
		//console.log("Inside showBlogAndCommentsScreen attr:"+$(this).attr("blogData"));
		console.log("blogData.title :"+blogData.title);
		console.log("blogData.description :"+blogData.description);
		$("#selectedHeading").text(blogData.title);
		$("#selectedContent").text(blogData.description);
		console.log("Token:"+window.sessionStorage.getItem('accessToken'));
		fetchBlogComments(blogData.blogId);
		
		$("#addCommentOption").data("blogId",blogData.blogId);
		$("#selectedPost").show();
		$("#commentDetails").show();
		
		if(window.sessionStorage.getItem('accessToken') != null){
			
			$("#addCommentOption").show();
			
		}
		else{
			console.log("showing logged out comments screen");
			
			$("#loginToComment").show();
			
		}
		
	} else {
		$("#selectedPost").hide();
		$("#loginToComment").hide();
		$("#addCommentOption").hide();
		$("#commentDetails").hide();
		
		
	}
	
}


$(document).ready(function() {
	//alert("I am an alert box!");
	console.log("**Document Ready**");
	configureMenuBarOptions("loggedOut");
	fetchAllBlogs();
	$("#homeScreenBody").show();
	//showHSLoggedOutOptions(true);
	//$('#commentOptionspost0').click(showBlogAndCommentsScreen(true));
	$("#commentOptionspost0,#commentOptionspost1,#commentOptionspost2").click(function(e) {
		var blogData = $(this).data("blogData");
		console.log("Inside click attr blogData:"+blogData);
		console.log("Inside click attr blogData.title:"+blogData.title);
		$("#loginScreen").hide();
		showHSLoggedInOptions(false);
		showHSLoggedOutOptions(false);
		$("#selectedPost").data("blogData",blogData);
		showBlogAndCommentsScreen(true);
	});
		
	$("#loginBtn").click(function(e) {
		showHSLoggedInOptions(false);
		showHSLoggedOutOptions(false);
		configureMenuBarOptions("login");
		console.log("triggering reset");
		$('#loginForm').trigger("reset");
		$("#loginScreen").show();
	});
	$("#signUp").click(function(e) {
		$("#loginScreen").hide();
		showHSLoggedInOptions(false);
		showHSLoggedOutOptions(false);
		$("#signUpScreen").show();
	});
	
	
	
	$("#updateProfileBtn").click(function(e) {
		var userId = $("#updateProfileBtn").data("userData");
		console.log("profile userid :"+userId);
		$.ajax({
			url : 'rest/blogger/user/'+userId,
			type : 'get',
			contentType: "application/json; charset=utf-8",
			headers: {"AUTHORIZATION": window.sessionStorage.getItem('accessToken')},
			dataType : 'json', 
			success : function(data,textStatus, jqXHR) { 
				console.log("update profile success callback");
				$("#signUpScreen").hide();
				showHSLoggedInOptions(false);
				showHSLoggedOutOptions(false);
				$("#loginScreen").hide();
				console.log("data.firstName :"+data.firstName);
				console.log("data.lastName :"+data.lastName);
				console.log("data.nickName :"+data.nickName);
				$("#updatedfirstname").attr("placeholder",data.firstName);
				$("#updatedlastname").attr("placeholder",data.lastName);
				$("#updatednickname").attr("placeholder",data.nickName);
				console.log("updateProfile screen")
				$("#profileUpdateScreen").show();
				
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
	
/*
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
	*/	
	
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
				$("#loginScreen").hide();
				console.log("signUpuserName callback:"+userId);
				$("#updateProfileBtn").data("userData",userId);
				$("#myblogsFilter").data("userData",userId);
				
				console.log("login screen hidden");
				if(window.sessionStorage.getItem("prevAction") == "newBlog"){
					console.log("removing PrevAction and showing new blog screen");
					window.sessionStorage.removeItem("prevAction");
					showNewBlogScreen(true);
				} else if(window.sessionStorage.getItem("prevAction") == "addComment") {
					console.log("removing PrevAction and showing add comment screen");
					window.sessionStorage.removeItem("prevAction");
					showBlogAndCommentsScreen(true);
				}
				else{
					console.log("showing logged in options");
					configureMenuBarOptions("loggedIn");
					$("#homeScreenBody").show();
					//showHSLoggedInOptions(true);
					fetchAllBlogs(null,userId);
				}
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
		var signInUsername = $('#loginForm').find('input[name="userId"]').val();
		console.log("signInuserName :"+signInUsername);
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
					$("#loginScreen").hide();
					console.log("signInuserName callback:"+signInUsername);
					$("#updateProfileBtn").data("userData",signInUsername);
					$("#myblogsFilter").data("userData",signInUsername);
					console.log("login screen hidden");
					
					if(window.sessionStorage.getItem("prevAction") == "newBlog"){
						console.log("removing PrevAction and showing new blog screen");
						window.sessionStorage.removeItem("prevAction");
						showNewBlogScreen(true);
					} else if(window.sessionStorage.getItem("prevAction") == "addComment") {
						console.log("removing PrevAction and showing add comment screen");
						window.sessionStorage.removeItem("prevAction");
						showBlogAndCommentsScreen(true);
					}
					else{
						console.log("showing logged in options");
						configureMenuBarOptions("loggedIn");
						//fetchAllBlogs(); // CHECK
						fetchAllBlogs(null,signInUsername);
						$("#homeScreenBody").show();
						//showHSLoggedInOptions(true);
					}
					
			   },
			   error : function( jqXHR,textStatus, errorThrown ) {
					console.log("error callback :"+jqXHR);
					console.log("error callback:"+textStatus);
					console.log("error callback:"+errorThrown);
			   },
			   complete : function( jqXHR, textStatus ) {
					console.log("complete callback");
					$("#submitButton").attr("disabled", false);					
			   }
			 });

		e.preventDefault(); // avoid to execute the actual submit of the form.
	});
	
	$("#logoutBtn").click(function(e) {
			console.log("Logging out in progress")
			window.sessionStorage.clear();
			showHSLoggedInOptions(false);
			configureMenuBarOptions("loggedOut");
			$("#homeScreenBody").show();
			fetchAllBlogs();
			
			//showHSLoggedOutOptions(true);
	});
	
	$("#saveProfileBtn").click(function() {
		$("#loginScreen").hide();
		$("#signUpScreen").hide();

		
		var passwordStr = $("#updatedpassword").val();
		console.log("passwordStr:"+passwordStr);
		var firstName = $("#updatedfirstname").val();
		console.log("updated firstName:"+firstName);
		var lastName = $("#updatedlastname").val();
		console.log("updated lastName:"+lastName);
		var nickName = $("#updatednickname").val();
		console.log("updated nickName:"+nickName);
		
		var user = {
			"password" : passwordStr,
			"firstName" : firstName,
			"lastName" : lastName,
			"nickName" : nickName
		};
		$.ajax({
			url : 'rest/blogger/user',
			type : 'put',
			contentType: "application/json; charset=utf-8",
			headers: {"AUTHORIZATION": window.sessionStorage.getItem('accessToken')},
			success : function(data,textStatus, jqXHR) { 
				console.log("success callback");
				
				
				$("#profileUpdateScreen").hide();
				configureMenuBarOptions("loggedIn");
				$("#homeScreenBody").show();
				//showHSLoggedInOptions(true);
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
	
	
	$("#loginToComment").click(function(e) {
		console.log("login to comment- showing login page");
		showHSLoggedOutOptions(false);
		showBlogAndCommentsScreen(false);
		window.sessionStorage.setItem("prevAction","addComment");
		configureMenuBarOptions("login");
		$('#loginForm').trigger("reset");
		$("#loginScreen").show();
	});
	
	$("#newBlogBtn_loggedOut").click(function(e) {
		
		console.log("create new blog 1");
		showHSLoggedInOptions(false);
		console.log("create new blog 2");
		showHSLoggedOutOptions(false);
		window.sessionStorage.setItem("prevAction","newBlog");
		configureMenuBarOptions("login");
		$('#loginForm').trigger("reset");
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
		var userId = $("#myblogsFilter").data("userData"); //CHECK
		console.log("Logged in user :"+userId);
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
				//showHSLoggedInOptions(true);
				$("#homeScreenBody").show();
				configureMenuBarOptions("loggedIn");
				//fetchAllBlogs();
				
				
				console.log("Logged in user :"+userId);
				fetchAllBlogs(null,userId);
				
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
		var blogId = $("#addCommentOption").data("blogId");
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
				$("#commentInput").val(""); 
				showBlogAndCommentsScreen(true);
				
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
				console.log("paging options new display func");
			    displayBlogs(data,textStatus, jqXHR);
				
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
	$('.dropdown-menu a').on('click', function(){    
		$('.dropdown-toggle').html($(this).html() + '<span class="caret"></span>');  
		console.log("Selected val :"+$(this).text())
		var selectedOption = $(this).text();
		var userId = $("#myblogsFilter").data("userData");
		console.log("Logged in user :"+userId);
		switch(selectedOption){
			case "My Blogs":
				fetchAllBlogs(null,userId);
				break;
			case "All Blogs":
				fetchAllBlogs();
				break;
			default:
				break;
		}
	});
	
	$(".navbar-brand").click(function(e) {
		console.log("home button pressed");
		var userId = $("#myblogsFilter").data("userData");
		console.log("Logged in user :"+userId);
		if(window.sessionStorage.getItem('accessToken') != null){
			console.log("showing logged in home screen");
			configureMenuBarOptions("loggedIn");
			fetchAllBlogs(null,userId);
			
		}
		else{
			console.log("showing logged out home screen");
			configureMenuBarOptions("loggedOut");
			fetchAllBlogs();
			
		}
	
	});
	
	$('#commentSortingOrder').change(function(){ 
		var sortingorder = $(this).val();
		
		console.log("sorting order sortingorder:"+sortingorder);
		console.log("sorting order sortingorder text:"+$('#commentSortingOrder').find(":selected").text());
		var blogId = $("#selectedPost").data("blogData").blogId;
		console.log("sorting order blogId:"+blogId);
		switch(sortingorder) {
			case "oldest":
				console.log("sorting order oldest first");
				fetchBlogComments(blogId);
				
				break;
			case "newest":
				console.log("sorting order newest first");
				fetchBlogComments(blogId,sortingorder);
				break;
			default:
				break;
		}
	});
	
	
	$("#loadMoreComments").click(function(e) {
		console.log("loading more comments");
		var targetUrl = $(this).data("targetUrl");
		console.log("targetUrl in comment pagingOptions click :"+targetUrl);
		var loadedCommentCount = $("#loadMoreComments").data("loadedCommentCount");
		$.ajax({
			url : targetUrl,
			type : 'get',
			contentType: "application/json; charset=utf-8",
			dataType : 'json', 
			success : function(data,textStatus, jqXHR) { 
				console.log("next success callback");
				console.log("paging options new display func");
				for(i = 0;i < data.length;i++){ 
					/*
					var commentPost = $("<div class='table'>").append($("<div class='row'>")
							.append("<label>Denominazione Gruppo</label>")
							.append("<input type='text' id='denominazione'>"));

					// add the element to the body
					$("body").appendTo("#commentPosts");*/
					
					
					/*
					console.log("i:"+i);
					$("#comment"+i+"Content").text(data[i].comment);
					console.log("Comment:"+data[i].comment);
					$("#comment"+i+"author").text(data[i].commentor.userId);
					console.log("commentor:"+data[i].commentor.userId);
					console.log("Blog id:"+data[i].blogId);
					
					console.log("Comment created time:"+data[i].postedDate);
					console.log("Comment created time:"+($.format.prettyDate(data[i].postedDate)));

					$("#comment"+i+"time").text($.format.prettyDate(data[i].postedDate));*/
				}	
				$("#loadMoreComments").data("loadedCommentCount",loadedCommentCount+data.length);
				configureCommentPagingOptions(jqXHR.getResponseHeader("LINK"));	
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
	
});

