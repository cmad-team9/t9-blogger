package com.cisco.cmadt9blogger.rest;

import static javax.ws.rs.core.HttpHeaders.AUTHORIZATION;

import javax.ws.rs.Consumes;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;

import com.cisco.cmadt9blogger.api.Blog;
import com.cisco.cmadt9blogger.api.Blogger;
import com.cisco.cmadt9blogger.api.User;
import com.cisco.cmadt9blogger.service.T9Blogger;


@Path("/blogger")
public class BloggerController {

	private Blogger blogger = new T9Blogger();
	
	@Context
	private UriInfo uriInfo;
	
	@POST
	@Path("/user")
	@Consumes(MediaType.APPLICATION_JSON) 
	public Response signupNewUser(
			User user) {
		blogger.signupNewUser(user);
		return Response.ok().build();
	}
	
	@GET
	@Path("/user/{userId}")
	@Produces(MediaType.APPLICATION_JSON) 
	public Response getUserDetails(
			@PathParam("userId")String userId) {
		System.out.println("*************PATH CALLED");
		User user = blogger.getUserDetails(userId);
		return Response.ok().entity(user).build();
	}

	@POST
	@Path("/login")
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public Response loginUser(@FormParam("userId") String userId,
			@FormParam("password") String password) {
		System.out.println("*******login userId :"+userId);
		System.out.println("*******login password :"+password);
		System.out.println("URIINFO REST:"+uriInfo);
		String token = blogger.loginUser(userId,password);
		return Response.ok().header(AUTHORIZATION, "Bearer " + token).build();
		//return Response.ok().header(AUTHORIZATION,token).build();
	}
	
	@POST
	@Path("/blogs")
	@Consumes(MediaType.APPLICATION_JSON)
	@RequireJWTToken
	public Response addBlog(@HeaderParam("userId") String userId,Blog blog) {
		// TODO recheck
		System.out.println("addBlog userId :"+userId);
		User user = blogger.getUserDetails(userId);
		System.out.println("addBlog user :"+user);
		blog.setUser(user);
		blogger.addBlog(blog);
		return Response.ok().entity(blog).build();
	}
	
	

	@GET
	@Path("/noauth")
	public Response echo(@QueryParam("message") String message) {
		return Response.ok().entity(message == null ? "no message" : message).build();
	}

	@GET
	@Path("/auth")
	@RequireJWTToken
	public Response echoWithJWTToken(@QueryParam("message") String message) {
		return Response.ok().entity(message == null ? "no message" : message).build();
	}

}
