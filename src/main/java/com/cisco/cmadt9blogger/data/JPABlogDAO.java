package com.cisco.cmadt9blogger.data;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import com.cisco.cmadt9blogger.api.Blog;
import com.cisco.cmadt9blogger.api.User;

public class JPABlogDAO extends JPABloggerDAO implements BlogDAO {

	@Override
	public void createBlog(Blog blog) {
		EntityManager em = factory.createEntityManager();
		em.getTransaction().begin();
		em.persist(blog);
		em.getTransaction().commit();
		em.close();

	}

	@Override
	public Blog readBlog(int blogId) {
		EntityManager em = factory.createEntityManager();
		em.getTransaction().begin();
		Blog blog = em.find(Blog.class,blogId);
		em.getTransaction().commit();
		em.close();
		return blog;
	}
	
	@Override
	public List<Blog> getAllBlogs() {
		EntityManager em = factory.createEntityManager();
		em.getTransaction().begin();
		//Check the working..Need to implement paging
		Query query = em.createQuery("SELECT e FROM Blog e");
		List<Blog> blogList = query.getResultList();
		em.getTransaction().commit();
		em.close();
		return blogList;
	}

}
