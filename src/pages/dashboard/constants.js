export const STATISTICS_API_URL = "/admin/statistic/";
export const SHOP_STATISTICS_API_URL = "admin/statistic/shopstatistic";
export const ACTIVITY_API_URL = "admin/activity?page=1&limit=6";
export const MOST_VISITED_PRODUCT_API_URL = "product/getmostvisitedproduct";

export const DASHBOARD = "DASHBOARD";

export const GET_DASHBOARD = `${DASHBOARD}/GET_DASHBOARD`;
export const SET_DASHBOARD = `${DASHBOARD}/SET_DASHBOARD`;

export const mockProductState = [
  { orderStatus: 1, count: 23 },
  { orderStatus: 2, count: 67 },
  { orderStatus: 3, count: 10 },
  { orderStatus: 4, count: 34 },
  { orderStatus: 5, count: 7 },
  { orderStatus: 6, count: 0 },
  { orderStatus: 7, count: 98 },
];
