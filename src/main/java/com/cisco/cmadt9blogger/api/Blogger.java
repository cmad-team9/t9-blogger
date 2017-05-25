package com.cisco.cmadt9blogger.api;

import java.util.List;

public interface Blogger {
	String signupNewUser(User user) throws InvalidUserDetailsException,UserAlreadyExistsException, BloggerException;
	String loginUser(String userId, String password) throws InvalidCredentialsException,BloggerException;
	User getUserDetails(String userId) throws UserNotFoundException,BloggerException;
	void updateUserProfile(User user) throws InvalidUserDetailsException,BloggerException;
	void deleteUser(String userId)  throws UserNotFoundException,BloggerException;
	
	void addBlog(Blog blog) throws InvalidBlogException,BloggerException;
	List<Blog> getAllBlogs(int offset,int pageSize,String searchStr,String userFilter) throws BlogNotFoundException,BloggerException; 
	Blog getBlog(int blogId) throws BlogNotFoundException,BloggerException;
	long getBlogCount(String searchStr,String userFilter) throws BloggerException;
	void deleteBlog(int blogId) throws BlogNotFoundException,BloggerException;
	
	void addComment(BlogComment comment) throws InvalidCommentException,BloggerException;
	List<BlogComment> getAllComments(int blogId,int offset,int pageSize,String sortOrder) throws CommentNotFoundException, BloggerException;
	long getCommentCount(int blogId) throws BloggerException;
	void deleteComment(int commentId) throws CommentNotFoundException,BloggerException;
}
