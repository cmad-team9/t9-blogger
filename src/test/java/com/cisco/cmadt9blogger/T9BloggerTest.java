package com.cisco.cmadt9blogger;

import static org.junit.Assert.fail;

import java.util.List;

import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Ignore;
import org.junit.Test;

import com.cisco.cmadt9blogger.api.Blog;
import com.cisco.cmadt9blogger.api.BlogNotFoundException;
import com.cisco.cmadt9blogger.api.Blogger;
import com.cisco.cmadt9blogger.api.BloggerException;
import com.cisco.cmadt9blogger.api.InvalidCredentialsException;
import com.cisco.cmadt9blogger.api.InvalidUserDetailsException;
import com.cisco.cmadt9blogger.api.User;
import com.cisco.cmadt9blogger.api.UserAlreadyExistsException;
import com.cisco.cmadt9blogger.api.UserNotFoundException;
import com.cisco.cmadt9blogger.service.T9Blogger;



public class T9BloggerTest {


	private static Blogger blogger;
	@BeforeClass
	public static void setUpBeforeClass() throws Exception {
		blogger = new T9Blogger();
	}

	@AfterClass
	public static void tearDownAfterClass() throws Exception {
		blogger = null;
	}

	@Before
	public void setUp() throws Exception {
	}

	@After
	public void tearDown() throws Exception {
	}

	@Test
	public void signupNewUserTest() {
		User user = new User();
		user.setUserId("ninu");
		user.setPassword("ninu");
		try {
			blogger.signupNewUser(user);
		} catch (InvalidUserDetailsException iude) {
			fail();
		} catch (UserAlreadyExistsException uaee) {
			fail();
		} catch (BloggerException be) {
			fail();
		}catch(Exception e){
			e.printStackTrace();
			fail();
		}
		blogger.deleteUser("ninu");
	}		
	
	@Test
	public void loginUserTest(){
		User user = new User();
		user.setUserId("ninu");
		user.setPassword("ninu");
		try {
			blogger.signupNewUser(user);
			blogger.loginUser("ninu","ninu");
		} catch (InvalidCredentialsException iude) {
			fail();
		}catch(Exception e){
			e.printStackTrace();
			fail();
		}
		blogger.deleteUser("ninu");
	}
	
	@Test
	public void getUserDetailsTest(){
		User user = new User();
		user.setUserId("ninu");
		user.setPassword("ninu");
		
		try {
			blogger.signupNewUser(user);
			blogger.getUserDetails("ninu");
		} catch (UserNotFoundException unfe) {
			fail();
		}catch(Exception e){
			e.printStackTrace();
			fail();
		}
		blogger.deleteUser("ninu");
	}
	
	@Test
	public void addAndReadBlogTest(){
		Blog blog = new Blog();
		blog.setTitle("HELLO WORLD!");
		blog.setDescription("HELLO ...WORLD IS NICE");
		int blogId = -1;
		try {
			blogger.addBlog(blog);
			List<Blog> blogList = blogger.getAllBlogs(0,2,null);
			blogId = blogList.get(0).getBlogId();
		} catch (BlogNotFoundException bnfe) {
			fail();
		}catch(Exception e){
			e.printStackTrace();
			fail();
		}
		blogger.deleteBlog(blogId);
	}
	
	@Test
	public void addAndReadCommentTest(){
		Blog blog = new Blog();
		blog.setTitle("HELLO WORLD!");
		blog.setDescription("HELLO ...WORLD IS NICE");
		int blogId = -1;
		try {
			blogger.addBlog(blog);
			List<Blog> blogList = blogger.getAllBlogs(0,2,null);
			blogId = blogList.get(0).getBlogId();
		} catch (BlogNotFoundException bnfe) {
			fail();
		}catch(Exception e){
			e.printStackTrace();
			fail();
		}
		blogger.deleteBlog(blogId);
	}
}
