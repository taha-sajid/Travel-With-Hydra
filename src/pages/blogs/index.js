import BlogsCard from "@/components/BlogsCard/BlogsCard";
import Header from "@/components/Header/header";
import React from "react";
import styles from "./blogs.module.css";
import Footer from "@/components/Footer/Footer";
const index = () => {
  return (
    <div>
      <Header />
      <BlogsCard />
      <Footer />
    </div>
  );  
};

export default index;
