package com.cisco.cmadt9blogger.data;

import com.cisco.cmadt9blogger.api.User;

public interface UserDAO {
	
	public void createUser(User user);
	public User readUser(String userId);

}
