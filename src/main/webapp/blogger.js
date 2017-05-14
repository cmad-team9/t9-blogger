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
	
function fetchAllBlogs(){
	$.ajax({
		url : 'rest/blogger/blogs',
		type : 'get',
		contentType: "application/json; charset=utf-8",
		dataType : 'json', 
		success : function(data,textStatus, jqXHR) { 
			console.log("success callback");
			console.log("Blog data:"+data);
			for(i = 0;i < data.length;i++){ 
				console.log("i:"+i);
				$("#post"+i+"Heading").text(data[i].title);
				console.log("Blog Title:"+data[i].title);
				$("#post"+i+"Content").text(data[i].description);
				console.log("Blog Content:"+data[i].description);
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


$(document).ready(function() {
	alert("I am an alert box!");
	console.log("**Document Ready**");
	showHSLoggedOutOptions(true);
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

