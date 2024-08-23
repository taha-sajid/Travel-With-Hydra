import httpService from "./httpService";

export const getBlogsData = (category) => {
  if (category) {
  return httpService.get(`/cms/blogs/${category}`);
  }
  return httpService.get("/cms/blogs");
};

export const getBlogDetailData = (id) => {
  return httpService.get(`/cms/blog-detail/${id}`);
};

export const getCategoriesData = () => {
  return httpService.get("/cms/categories");
};

export const contactUsAPI = (values) => {
  return httpService.post("/cms/contact/", values);
};

export const getCustomerStoriesData = () => {
  return httpService.get("/cms/customer-stories");
};

export const getFAQsData = () => {
  return httpService.get("/cms/faqs");
};

export const getFooterData = () => {
  return httpService.get("/cms/footer");
};

export const getHeaderData = () => {
  return httpService.get("/cms/header");
};

export const getHeroData = () => {
  return httpService.get("/cms/hero");
};
