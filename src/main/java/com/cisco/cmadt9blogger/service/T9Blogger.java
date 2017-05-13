package com.cisco.cmadt9blogger.service;

import java.io.UnsupportedEncodingException;
import java.util.List;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.cisco.cmadt9blogger.api.Blog;
import com.cisco.cmadt9blogger.api.BlogComment;
import com.cisco.cmadt9blogger.api.BlogNotFoundException;
import com.cisco.cmadt9blogger.api.Blogger;
import com.cisco.cmadt9blogger.api.BloggerException;
import com.cisco.cmadt9blogger.api.DuplicateBlogException;
import com.cisco.cmadt9blogger.api.InvalidBlogException;
import com.cisco.cmadt9blogger.api.InvalidCredentialsException;
import com.cisco.cmadt9blogger.api.InvalidUserDetailsException;
import com.cisco.cmadt9blogger.api.User;
import com.cisco.cmadt9blogger.api.UserAlreadyExistsException;
import com.cisco.cmadt9blogger.api.UserNotFoundException;
import com.cisco.cmadt9blogger.data.BlogDAO;
import com.cisco.cmadt9blogger.data.CommentDAO;
import com.cisco.cmadt9blogger.data.JPABlogDAO;
import com.cisco.cmadt9blogger.data.JPACommentDAO;
import com.cisco.cmadt9blogger.data.JPAUserDAO;
import com.cisco.cmadt9blogger.data.UserDAO;

public class T9Blogger implements Blogger{

	private UserDAO userDao = new JPAUserDAO();
	private BlogDAO blogDao = new JPABlogDAO();
	private CommentDAO commentDAO = new JPACommentDAO();

	public String signupNewUser(User user)
			throws InvalidUserDetailsException, UserAlreadyExistsException, BloggerException {
		if (user == null)
			throw new InvalidUserDetailsException();
		if (userDao.readUser(user.getUserId()) != null)
			throw new UserAlreadyExistsException();
		System.out.println("T9Blogger user");
		userDao.createUser(user);
		String token = issueToken(user.getUserId());
		return token;

	}

	public String loginUser(String userId,String password) throws InvalidCredentialsException, BloggerException {
		// Authenticate the user using the credentials provided
		authenticate(userId, password);
		// Issue a token for the user
		String token = issueToken(userId);
		// Return the token on the response
		if(token == null){
			throw new InvalidCredentialsException();
		}else
			return token;
	}

	public User getUserDetails(String userId) throws UserNotFoundException, BloggerException {
		User user = userDao.readUser(userId);
		if (user == null)
			throw new UserNotFoundException();
		return user;
	}


	@Override
	public void addBlog(Blog blog) throws InvalidBlogException, DuplicateBlogException, BloggerException {
		if (blog == null)
			throw new InvalidBlogException();
		/*if (blogDao.readUser(user.getUserId()) != null)
			throw new UserAlreadyExistsException();*/
		blogDao.createBlog(blog);
	}

	@Override
	public Blog getBlog(int blogId) throws BlogNotFoundException, BloggerException {
		Blog blog = blogDao.readBlog(blogId);
		if (blog == null)
			throw new BlogNotFoundException();
		return blog;
	}

	@Override
	public List<Blog> getAllBlogs() throws BlogNotFoundException, BloggerException {
		List<Blog> blogList = blogDao.getAllBlogs();
		if (blogList == null || blogList.isEmpty())
			throw new BlogNotFoundException();
		return blogList;
	}

	@Override
	public void updateUserProfile(User user) throws InvalidUserDetailsException, BloggerException {
		if (user == null)
			throw new InvalidUserDetailsException();
		/*if (blogDao.readUser(user.getUserId()) != null)
			throw new UserAlreadyExistsException();*/
		userDao.updateUser(user);
	}

	private String issueToken(String userId) {
		String jwtToken = null;
		try {
			Algorithm algorithm = Algorithm.HMAC256("secret");
			jwtToken= JWT.create()
					.withIssuer("auth0")
					.withSubject(userId)
					.sign(algorithm);
		} catch (UnsupportedEncodingException exception){
			//UTF-8 encoding not supported
			System.out.println("Token issue failed :"+exception);
		} catch (JWTCreationException exception){
			//Invalid Signing configuration / Couldn't convert Claims.
			System.out.println("Token issue failed :"+exception);
		}
		return jwtToken;
	}

	private void authenticate(String userId, String password) {
		// TODO Encrypt password
		System.out.println("authenticate userId:"+userId);
		System.out.println("authenticate password:"+password);
		System.out.println("T9Blogger authenticate userDAO :"+userDao);
		User user = userDao.readUser(userId);
		System.out.println("T9Blogger authenticate user :"+user);
		String storedPassword = user.getPassword();
		System.out.println("authenticate storedPassword:"+storedPassword);
		System.out.println("authenticate password != storedPassword:"+(password != storedPassword));
		System.out.println("authenticate password != storedPassword:"+password.equals(storedPassword));
		if(!password.equals(storedPassword)){
			throw new SecurityException("Invalid user/password");
		}
	}

	@Override
	public void addComment(BlogComment comment) throws BloggerException {
		if(comment == null){
			//TODO Check others
			throw new BloggerException();
		}
		commentDAO.createComment(comment);

	}

	@Override
	public List<BlogComment> getAllComments(int blogId) throws BlogNotFoundException, BloggerException {
		List<BlogComment> commentList = commentDAO.getAllComments(blogId);
		//TODO Check for other exceptions
		if (commentList == null || commentList.isEmpty())
			throw new BlogNotFoundException();
		return commentList;
	}
}
