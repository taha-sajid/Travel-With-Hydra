import React, { useState, useEffect } from "react";
import styles from "./BlogsCard.module.css";
import { format } from "date-fns";
import { useRouter } from "next/router";
import FilterSelector from "../FilterSelector/FilterSelector";

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

  const [selectedCountry, setSelectedCountry] = useState("All");
  const [filteredBlogs, setFilteredBlogs] = useState(blogs);
  const router = useRouter();
  const isHomePage = router.pathname === "/";
  const isBlogPage = router.pathname === "/blogs";
  console.log(isHomePage);
  useEffect(() => {
    if (selectedCountry === "All") {
      setFilteredBlogs(blogs);
    } else {
      setFilteredBlogs(
        blogs.filter((blog) => blog.country === selectedCountry)
      );
    }
  }, [selectedCountry]);

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
  };

  return (
    <div
      className={`${styles.Blogs_section_container} blogs-container `}
      style={!isHomePage ? { marginTop: 0 } : {}}
    >
      <div
        className={`${styles.Blogs_section_heading} ${
          isHomePage && styles.marginBottom
        }`}
      >
        <div>
          <h1>Blogs</h1>
          <p>Explore our latest blogs from our active users</p>
        </div>
        {isHomePage && (
          <div>
            <button className={`${styles.btn_primary}`}>View All</button>
          </div>
        )}
      </div>

      {isBlogPage && (
        <FilterSelector />

        // <div className={styles.blogs_filter}>
        //   <label htmlFor="countryFilter">Filter by: </label>
        //   <select
        //     id="countryFilter"
        //     value={selectedCountry}
        //     onChange={handleCountryChange}
        //   >
        //     <option value="All">Country</option>
        //     {Array.from(new Set(blogs.map((blog) => blog.country))).map(
        //       (country) => (
        //         <option key={country} value={country}>
        //           {country}
        //         </option>
        //       )
        //     )}
        //   </select>
        // </div>
      )}
      <div className={styles.Blogs_card_container}>
        {filteredBlogs.map((blog) => (
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
                Read Full Post
                <i className="fa fa-arrow-up" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogsCard;
