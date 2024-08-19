import httpService from "./httpService";

export const getBlogsData = () => {
  return httpService.get("/cms/blogs");
};

export const getBlogDetailData = () => {
  return httpService.get("/cms/blogs/{id}");
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
