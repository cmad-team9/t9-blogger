package com.cisco.cmadt9blogger.api;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class User {
	
	@Id	
	private String userId;
	//TODO Encrypt
	private String password;
	private String firstName;
	private String lastName;
	private String nickName;

	
	public User() {
		super();
	}
	
	public User(String userId, String password, String firstName, String lastName, String nickName) {
		super();
		this.userId = userId;
		this.password = password;
		this.firstName = firstName;
		this.lastName = lastName;
		this.nickName = nickName;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getNickName() {
		return nickName;
	}

	public void setNickName(String nickName) {
		this.nickName = nickName;
	}
	
}
