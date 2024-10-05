import React, { useEffect, useState } from "react";
import styles from "./BlogDetailsContainer.module.css";
import { getBlogDetailData } from "@/api/cms";
import { IMAGE_BASE_URL } from "@/api/config";
import parse from 'html-react-parser';

const BlogDetailsContainer = ({ blogsId }) => {
  console.log("blogsId", blogsId);
  const [blogData, setBlogData] = useState([]);

  const fetchBlogDetailsData = async () => {
    try {
      const response = await getBlogDetailData(blogsId);
      const data = response.data;
      setBlogData(data);
      console.log("Header Data", response.data);
    } catch (error) {
      console.error("Error fetching header data:", error);
    }
  };
  console.log("BlogData from countryDetails page", blogData);
  useEffect(() => {
    console.log("Data fetch sucessfully");
  }, [blogData]);

  useEffect(() => {
    fetchBlogDetailsData();
  }, []);

  return (
    <div className={styles.blogDetailsContainer}>
      <div className={styles.blogImage}>
        <img src={IMAGE_BASE_URL + blogData.image} />
      </div>
      <div className={styles.blogBody}>
        <div className={styles.blogHeading}>
          <h1>{blogData.title}</h1>
        </div>
        <div className={styles.blogDescription}>
          {parse(blogData.content_rich)}
        </div>
      </div>
      <span className={styles.bottomLine}></span>
    </div>
  );
};

export default BlogDetailsContainer;
