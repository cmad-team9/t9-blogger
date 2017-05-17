package com.cisco.cmadt9blogger.api;

import java.util.List;

public interface Blogger {
	String signupNewUser(User user) throws InvalidUserDetailsException, 
	UserAlreadyExistsException, BloggerException;
	String loginUser(String userId, String password) throws InvalidCredentialsException,BloggerException;
	User getUserDetails(String userId) throws UserNotFoundException,BloggerException;
//	public void logoutUser(User user) throws BloggerException;
	void updateUserProfile(User user) throws InvalidUserDetailsException,BloggerException;
	void addBlog(Blog blog) throws InvalidBlogException, 
	DuplicateBlogException, BloggerException;
//	public List<Blog> findBlogs(String title) throws BlogNotFoundException, BloggerException;
	List<Blog> getAllBlogs(int offset,int pageSize,String searchStr) throws BlogNotFoundException,BloggerException; 
	Blog getBlog(int blogId/*,User user*/) throws BlogNotFoundException,BloggerException;
	void addComment(BlogComment comment) throws BloggerException;
	List<BlogComment> getAllComments(int blogId) throws BlogNotFoundException, BloggerException;

	long getBlogCount() throws BloggerException;
	long getBlogSearchResultCount(String searchStr) throws BloggerException;
	long getCommentCount(int blogId) throws BloggerException;
	
}
