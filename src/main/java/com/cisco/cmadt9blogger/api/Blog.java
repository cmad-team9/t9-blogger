package com.cisco.cmadt9blogger.api;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.PrePersist;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;

@Entity
public class Blog {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int blogId;
	@OneToOne
	@JoinColumn(name = "userId")
	@NotNull
	private User user;
	@NotNull
	private String title;
	@Temporal(TemporalType.TIMESTAMP)
	private Date postedDate;
	@Column(length=5000)
	@NotNull
	private String description;

	@OneToMany(mappedBy="blog",cascade=CascadeType.REMOVE)
	private List<BlogComment> comments;

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

	@PrePersist
	protected void onCreate() {
		postedDate = new Date();
	}
	
	//For updating blog
	//	  @PreUpdate
	//	  protected void onUpdate() {
	//	    updated = new Date();
	//	  }

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

	public Date getPostedDate() {
		return postedDate;
	}

	public void setPostedDate(Date postedDate) {
		this.postedDate = postedDate;
	}


}
