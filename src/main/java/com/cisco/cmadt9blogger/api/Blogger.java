package com.cisco.cmadt9blogger.api;

import java.util.List;

public interface Blogger {
	public void signupNewUser(User user) throws InvalidUserDetailsException, 
	UserAlreadyExistsException, BloggerException;
	public String loginUser(String userId, String password) throws InvalidCredentialsException,BloggerException;
	public User getUserDetails(String userId) throws UserNotFoundException,BloggerException;
//	public void logoutUser(User user) throws BloggerException;
//	public void updateUserProfile(User user) throws InvalidUserDetailsException,BloggerException;
	public void addBlog(Blog blog) throws InvalidBlogException, 
	DuplicateBlogException, BloggerException;
//	public List<Blog> findBlogs(String title) throws BlogNotFoundException, BloggerException;
	public List<Blog> getAllBlogs() throws BlogNotFoundException,BloggerException; 
	public Blog getBlog(int blogId/*,User user*/) throws BlogNotFoundException,BloggerException;
//	public void addComment(Blog blog,BlogComment comment) throws BloggerException;

}
