import React from "react";
import styles from "./BlogsCard.module.css";
import { format } from "date-fns";

const BlogsCard = () => {
  // Dummy data for blogs
  const blogs = [
    {
      id: 1,
      country: "France",
      date: "2023-02-27",
      title: "A Wonderful Journey to France",
      description:
        "I had always been interested in spirituality, so I decided to take a year-long journey to India to explore various religious practices and traditions.",
      image: "/assets/blogscard.png",
    },
    {
      id: 2,
      country: "Italy",
      date: "2023-02-27",
      title: "A Wonderful Journey to Italy",
      description:
        "I had always been interested in spirituality, so I decided to take a year-long journey to India to explore various religious practices and traditions.",
      image: "/assets/blogscard.png",
    },
  ];

  return (
    <div className={styles.Blogs_section_container}>
      <div className={styles.Blogs_section_heading}>
        <div>
          <h1>Blogs</h1>
          <p>Explore our latest blogs from our active users</p>
        </div>
        <div>
          <button className={`${styles.btn_primary}`}>View All</button>
        </div>
      </div>
      <div className={styles.Blogs_card_container}>
        {blogs.map((blog) => (
          <div key={blog.id} className={styles.Blogs_card}>
            <div className={styles.card_head}>
              <img src={blog.image} alt={blog.title} />

              <div className={styles.card_tag}>
                <span>{blog.country}</span>
                <span>{format(new Date(blog.date), "MMM dd, yyyy")}</span>
              </div>
              <h3>{blog.title}</h3>
              <p>{blog.description}</p>
              <button>
                Read Full Post <i class="fa fa-arrow-up" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogsCard;
