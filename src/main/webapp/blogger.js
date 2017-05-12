$(document).ready(function() {
	$("#homeScreen").show();
	$("#signUp").click(function(e) {
		$("#loginScreen").hide();
		$("#signUpScreen").show();
	});
	$("#saveSignUpDetailsBtn").click(function(e) {
		$("#loginScreen").hide();
		$("#signUpScreen").hide();
		$("#homeScreen").show();
	});
	
	$("#signIn").click(function(e) {
		$("#loginScreen").hide();
		$("#signUpScreen").hide();
		$("#homeScreen").show();
	});
	$("#logoutBtn").click(function(e) {
		$("#signUpScreen").hide();
		$("#homeScreen").hide();
		$("#loginScreen").show();
	});
	
	$("#updateProfileBtn").click(function(e) {
		$("#signUpScreen").hide();
		$("#homeScreen").hide();
		$("#loginScreen").hide();
		$("#profileUpdateScreen").show();
	});
	
	$("#newBlogBtn").click(function(e) {
		$("#signUpScreen").hide();
		$("#loginScreen").hide();
		$("#profileUpdateScreen").hide();
		$("#newPostForm").hide();
		$("#blogDetails").hide();
		$("#post1Description").hide();
		$("#homeScreen").show();
		$("#newBlogForm").show();
	});
	$("#newPostBtn").click(function(e) {
		$("#signUpScreen").hide();
		$("#loginScreen").hide();
		$("#profileUpdateScreen").hide();
		$("#newBlogForm").hide();
		$("#blogDetails").hide();
		$("#post1Description").hide();
		$("#homeScreen").show();
		$("#newPostForm").show();
		});
	$("#blog1").click(function(e) {
		$("#signUpScreen").hide();
		$("#loginScreen").hide();
		$("#profileUpdateScreen").hide();
		$("#newBlogForm").hide();
		$("#newPostForm").hide();
		$("#post1Description").hide();
		$("#homeScreen").show();
		$("#blogDetails").show();
		});
	$("#post1Heading").click(function(e) {
		$("#signUpScreen").hide();
		$("#loginScreen").hide();
		$("#profileUpdateScreen").hide();
		$("#newBlogForm").hide();
		$("#newPostForm").hide();
		$("#blogDetails").hide();
		$("#homeScreen").show();
		$("#post1Description").show();
		});
	$("#post1DescriptionCloseBtn").click(function(e) {
		$("#signUpScreen").hide();
		$("#loginScreen").hide();
		$("#profileUpdateScreen").hide();
		$("#newBlogForm").hide();
		$("#newPostForm").hide();
		$("#post1Description").hide();
		$("#homeScreen").show();
		$("#blogDetails").show();
		});
		
	
	$("#addBtn").click(function() {
		$("#addForm").hide();
		var isbn = $("#isbn").val();
		var title = $("#title").val();
		var book = {
			"isbn" : isbn,
			"title" : title
		};
		$.ajax({
			url : 'rest/library/book',
			type : 'post',
			dataType : 'json',
			contentType: "application/json; charset=utf-8",
			success : function(data) {
				$("#addResult").show();
			},
			data : JSON.stringify(book)
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
