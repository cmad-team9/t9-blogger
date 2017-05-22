package com.cisco.cmadt9blogger.rest;

import static javax.ws.rs.core.HttpHeaders.AUTHORIZATION;
import static javax.ws.rs.core.HttpHeaders.LINK;


import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.DefaultValue;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.GenericEntity;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriBuilder;
import javax.ws.rs.core.UriInfo;

import com.cisco.cmadt9blogger.api.Blog;
import com.cisco.cmadt9blogger.api.BlogComment;
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
		System.out.println("Adding user rest");
		System.out.println("REST Userid :"+user.getUserId());
		System.out.println("REST password :"+user.getPassword());
		System.out.println("REST Firstname :"+user.getFirstName());
		System.out.println("REST Secondname :"+user.getLastName());
		System.out.println("REST Nickname :"+user.getNickName());
		String token = blogger.signupNewUser(user);
		System.out.println("REST sign up token :"+token);
		//return Response.ok().build();
		return Response.ok().header(AUTHORIZATION, "Bearer " + token).build();
	}
	
	@PUT
	@Path("/user")
	@Consumes(MediaType.APPLICATION_JSON) 
	@RequireJWTToken
	public Response updateUser(@HeaderParam("userId") String userId,
			User user) {
		System.out.println("updateUser userId:"+userId);
		System.out.println("updateUser password:"+user.getPassword());
		System.out.println("updateUser firstname:"+user.getFirstName());
		System.out.println("updateUser lastname:"+user.getLastName());
		System.out.println("updateUser nickname:"+user.getNickName());
		user.setUserId(userId);
		blogger.updateUserProfile(user);
		return Response.ok().build();
		
	}
	
	@GET
	@Path("/user/{userId}")
	@Produces(MediaType.APPLICATION_JSON) 
	@RequireJWTToken
	//TODO Check password
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
		// TODO recheck about user data
		System.out.println("addBlog userId :"+userId);
		User user = blogger.getUserDetails(userId);
		System.out.println("addBlog user :"+user);
		System.out.println("addBlog blog title :"+blog.getTitle());
		System.out.println("addBlog blog description :"+blog.getDescription());
		blog.setUser(user);
		blogger.addBlog(blog);
		return Response.ok().entity(blog).build();
	}
	
	@GET
	@Path("/blogs/{blogId}")
	@Produces(MediaType.APPLICATION_JSON) 
	public Response getBlog(
			@PathParam("blogId")int blogId) {
		System.out.println("*************PATH CALLED");
		Blog blog = blogger.getBlog(blogId);
		return Response.ok().entity(blog).build();
	}
	//TODO
	@DELETE
	@Path("/blogs/{blogId}")
	@Produces(MediaType.APPLICATION_JSON)
	@RequireJWTToken
	public Response deleteBlog(
			@PathParam("blogId")int blogId) {
		System.out.println("*************PATH CALLED");
		//Blog blog = blogger.deleteBlog(blogId);
		return Response.ok().build();
	}
	
	@GET
	@Path("/blogs")
	@Produces(MediaType.APPLICATION_JSON) 
	public Response getAllBlogs(@QueryParam("offset")@DefaultValue("0") int offset,
			                    @QueryParam("pageSize")@DefaultValue("5")int pageSize,
			                    @QueryParam("searchStr")String searchStr,	
			                    @QueryParam("userFilter")String userFilter,		
			                    @Context UriInfo uriInfo) {
		System.out.println("*************All Blogs REST__");
		//List<Blog> blogList = blogger.getAllBlogs();
		System.out.println("offset:"+offset);
		System.out.println("pageSize:"+pageSize);
		System.out.println("uriInfo:"+uriInfo);
		System.out.println("searchStr:"+searchStr);
		System.out.println("userFilter:"+userFilter);
		System.out.println("uriInfo rri:"+uriInfo.getRequestUri());
		UriBuilder uriBuilder = uriInfo.getAbsolutePathBuilder();
		 GenericEntity<List<Blog>> blogList = new GenericEntity<List<Blog>>(blogger.getAllBlogs(offset,pageSize,searchStr,userFilter)) {};
		 long totalCount = blogger.getBlogCount();
		 System.out.println("totalCount:"+totalCount);
		 long resultCount = blogger.getBlogSearchResultCount(searchStr,userFilter);
		 System.out.println("resultCount:"+resultCount);
		 if(searchStr != null) {
			 totalCount = resultCount;
			 System.out.println("Setting totalcount as resultCount");
		 }
		 System.out.println("link Header :"+PaginationUtil.getLinkHeaders(uriBuilder, offset, totalCount, pageSize));
		return Response.ok().entity(blogList).header(LINK, PaginationUtil.getLinkHeaders(uriBuilder, offset, totalCount, pageSize)).build();
	}
	
	@POST
	@Path("/blogs/{blogId}/comments")
	@Consumes(MediaType.APPLICATION_JSON) 
	@RequireJWTToken
	public Response addBlogComment(@HeaderParam("userId") String userId,
			@PathParam("blogId")int blogId,BlogComment comment) {
		System.out.println("Restful API Comment ");
		// TODO Find a better way rather than reading the userdetails and blog details
		comment.setCommentor(blogger.getUserDetails(userId));
		comment.setBlog(blogger.getBlog(blogId));
		blogger.addComment(comment);
		return Response.ok().build();
	}
	
	@GET
	@Path("/blogs/{blogId}/comments")
	@Produces(MediaType.APPLICATION_JSON) 
	public Response getAllComments(@PathParam("blogId")int blogId,
								   @QueryParam("offset")@DefaultValue("0") int offset,
            					   @QueryParam("pageSize")@DefaultValue("5")int pageSize,
								   @QueryParam("sortOrder")String sortOrder,
								   @Context UriInfo uriInfo) {
		System.out.println("*************All Comments REST");
		//List<BlogComment> blogList = blogger.getAllComments(blogId);
		UriBuilder uriBuilder = uriInfo.getAbsolutePathBuilder();
		System.out.println("REST getAllComments blogId:"+blogId);
		 long totalCommentCount = blogger.getCommentCount(blogId);
		 System.out.println("getCommentCount :"+totalCommentCount);
		 GenericEntity<List<BlogComment>> commentList = new GenericEntity<List<BlogComment>>(blogger.getAllComments(blogId, offset, pageSize,sortOrder)) {};
		 System.out.println("link Header :"+PaginationUtil.getLinkHeaders(uriBuilder, offset, totalCommentCount, pageSize));
		return Response.ok().entity(commentList).header(LINK, PaginationUtil.getLinkHeaders(uriBuilder, offset, totalCommentCount, pageSize)).build();
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
