package com.cisco.cmadt9blogger;

import static org.junit.Assert.fail;




import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Ignore;
import org.junit.Test;

import com.cisco.cmadt9blogger.api.Blogger;
import com.cisco.cmadt9blogger.api.BloggerException;
import com.cisco.cmadt9blogger.api.InvalidUserDetailsException;
import com.cisco.cmadt9blogger.api.User;
import com.cisco.cmadt9blogger.api.UserAlreadyExistsException;
import com.cisco.cmadt9blogger.service.T9Blogger;
import com.jayway.restassured.RestAssured;



public class T9BloggerTest {


	@BeforeClass
	public static void setUpBeforeClass() throws Exception {
//		String port = System.getProperty("server.port");
//		if (port == null) {
//			RestAssured.port = Integer.valueOf(8080);
//		}
//		else{
//			RestAssured.port = Integer.valueOf(port);
//		}
//
//
//		String basePath = System.getProperty("server.base");
//		if(basePath==null){
//			basePath = "/cmad-t9blogger/";
//		}
//		RestAssured.basePath = basePath;
//
//		String baseHost = System.getProperty("server.host");
//		if(baseHost==null){
//			baseHost = "http://localhost";
//		}
//		RestAssured.baseURI = baseHost;
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
		user.setUserId("binov");
		user.setPassword("password");
		try {
			blogger.signupNewUser(user);
		} catch (InvalidUserDetailsException iude) {
			fail();
		} catch (UserAlreadyExistsException uaee) {
			//fail();
		} catch (BloggerException be) {
			fail();
		}catch(Exception e){
			e.printStackTrace();
			fail();
		}
	}
/******************Integration tests by RestAssured*******************************************/
	@Ignore
	public void basicPingTest() {
		System.out.println("uri:"+RestAssured.baseURI);
		System.out.println(RestAssured.basePath);
		System.out.println(RestAssured.port);
		RestAssured.given().when().get("/rest/blogger/user/jul").then().statusCode(200);
		//RestAssured.given().when().get("http://localhost:8080/cmad-t9blogger/rest/blogger/user/jul").then().statusCode(200);
	}
	
	@Ignore
	public void testNoAuth() {
		RestAssured.given().when().get("/rest/blogger/noauth").then().statusCode(200);
	}
	
	@Ignore
	public void testAuth() {
		RestAssured.given().when().get("/rest/blogger/auth").then().statusCode(401);
	}

}
