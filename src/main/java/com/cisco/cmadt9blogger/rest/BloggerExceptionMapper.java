package com.cisco.cmadt9blogger.rest;

import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

import com.cisco.cmadt9blogger.api.BlogNotFoundException;
import com.cisco.cmadt9blogger.api.DuplicateBlogException;
import com.cisco.cmadt9blogger.api.InvalidBlogException;
import com.cisco.cmadt9blogger.api.InvalidCredentialsException;
import com.cisco.cmadt9blogger.api.InvalidUserDetailsException;
import com.cisco.cmadt9blogger.api.UserAlreadyExistsException;
import com.cisco.cmadt9blogger.api.UserNotFoundException;



@Provider
public class BloggerExceptionMapper implements ExceptionMapper<Throwable> {

	public Response toResponse(Throwable t) {
		t.printStackTrace();
		if (t instanceof BlogNotFoundException || t instanceof UserNotFoundException) {
			return Response.status(404).build();
		}
		else if (t instanceof InvalidCredentialsException) {
			return Response.status(401).build();
		}
		else if(t instanceof UserAlreadyExistsException || t instanceof DuplicateBlogException){
			return Response.status(409).build(); 
		}
		else if(t instanceof InvalidUserDetailsException || t instanceof InvalidBlogException){
			return Response.status(400).build(); 
		}
		else {
			return Response.status(500).build();
		}
	}

}
