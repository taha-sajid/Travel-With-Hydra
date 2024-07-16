import React from "react";
import { useRouter } from "next/router";
import styles from "./blogdetails.module.css";
import Footer from "@/components/Footer/Footer";
import BlogDetailsContainer from "@/components/BlogDetailsContainer/BlogDetailsContainer";
import Header from "@/components/Header/header";

const page = () => {
  const router = useRouter();
  const { blogsId } = router.query;

  return (
    <div>
      <Header />
      <BlogDetailsContainer />
      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
};

export default page;
