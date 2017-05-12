package com.cisco.cmadt9blogger.api;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
@Entity
public class Blog {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int blogId;

	@OneToOne
	@JoinColumn(name = "userId")
	//@JoinColumn(name = "userId",updatable = false)
	private User user;
	private String title;
	
	
	@Column(length=5000)
	private String description;
	//Only delete ?
	//@OneToMany(cascade=CascadeType.ALL, fetch=FetchType.EAGER)
	//private List<BlogComment> comments;
		
	public Blog() {
		super();
	}

	public Blog(int blogId, User user, String title, String description/*, List<BlogComment> comments*/) {
		super();
		this.blogId = blogId;
		this.user = user;
		this.title = title;
		this.description = description;
		//this.comments = comments;
	}

	public int getBlogId() {
		return blogId;
	}


	public void setBlogId(int blogId) {
		this.blogId = blogId;
	}


	public User getUser() {
		return user;
	}


	public void setUser(User user) {
		this.user = user;
	}


	public String getTitle() {
		return title;
	}


	public void setTitle(String title) {
		this.title = title;
	}


	public String getDescription() {
		return description;
	}


	public void setDescription(String description) {
		this.description = description;
	}


//	public List<BlogComment> getComments() {
//		return comments;
//	}
//
//
//	public void setComments(List<BlogComment> comments) {
//		this.comments = comments;
//	}

}
