package com.cisco.cmadt9blogger;

import static org.junit.Assert.fail;

import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;

import com.cisco.cmadt9blogger.api.Blogger;
import com.cisco.cmadt9blogger.api.BloggerException;
import com.cisco.cmadt9blogger.api.InvalidUserDetailsException;
import com.cisco.cmadt9blogger.api.User;
import com.cisco.cmadt9blogger.api.UserAlreadyExistsException;
import com.cisco.cmadt9blogger.service.T9Blogger;



public class T9BloggerTest {


	@BeforeClass
	public static void setUpBeforeClass() throws Exception {

	}

	@AfterClass
	public static void tearDownAfterClass() throws Exception {
	}

	@Before
	public void setUp() throws Exception {
	}

	@After
	public void tearDown() throws Exception {
	}

	@Test
	public void signupNewUserTest() {
		Blogger blogger = new T9Blogger();
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
	}


}
