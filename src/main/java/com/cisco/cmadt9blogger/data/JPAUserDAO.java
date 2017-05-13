package com.cisco.cmadt9blogger.data;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import com.cisco.cmadt9blogger.api.User;



public class JPAUserDAO extends JPABloggerDAO implements UserDAO{

	
	
	public void createUser(User user) {
		EntityManager em = factory.createEntityManager();
		em.getTransaction().begin();
		System.out.println("JPAUserDAO createUser");
		em.persist(user);
		System.out.println("JPAUserDAO createUser persisted");
		em.getTransaction().commit();
		em.close();
		
	}
	
	public User readUser(String userId) {
		EntityManager em = factory.createEntityManager();
		em.getTransaction().begin();
		User user = em.find(User.class,userId);
		System.out.println("JPAUserDAO user :"+user);
		em.getTransaction().commit();
		em.close();
		return user;
	}
	
	public void updateUser(User user) {
		EntityManager em = factory.createEntityManager();
		em.getTransaction().begin();
		User storedUser = em.find(User.class,user.getUserId());
		System.out.println("JPAUserDAO user :"+user);
		storedUser.setNickName(user.getNickName());
		storedUser.setFirstName(user.getFirstName());
		storedUser.setLastName(user.getLastName());
		em.getTransaction().commit();
		em.close();
	}

}
