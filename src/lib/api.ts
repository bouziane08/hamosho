import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3001", // رابط الباك اند NestJS
  headers: { "Content-Type": "application/json" },
});

/* ========== Auth ========== */
export async function loginUser(data: { email: string; password: string }) {
  return (await api.post("/auth/login", data)).data;
}

export async function registerUser(data: { name: string; email: string; password: string }) {
  return (await api.post("/auth/register", data)).data;
}

export async function getProfile(token: string) {
  return (
    await api.get("/auth/profile", { headers: { Authorization: `Bearer ${token}` } })
  ).data;
}

/* ========== Products ========== */
export async function getProducts() {
  return (await api.get("/products")).data;
}

export async function getProductById(id: string) {
  return (await api.get(`/products/${id}`)).data;
}

export async function createProduct(data: any) {
  return (await api.post("/products", data)).data;
}

export async function updateProduct(id: string, data: any) {
  return (await api.put(`/products/${id}`, data)).data;
}

export async function deleteProduct(id: string) {
  return (await api.delete(`/products/${id}`)).data;
}

/* ========== Categories ========== */
export async function getCategories() {
  return (await api.get("/categories")).data;
}

export async function createCategory(data: any) {
  return (await api.post("/categories", data)).data;
}

/* ========== Users (Admin) ========== */
export async function getUsers() {
  return (await api.get("/users")).data;
}

export async function getUserById(id: string) {
  return (await api.get(`/users/${id}`)).data;
}

/* ========== Orders ========== */
export async function getOrders() {
  return (await api.get("/orders")).data;
}

export async function getOrderById(id: string) {
  return (await api.get(`/orders/${id}`)).data;
}

export async function updateOrderStatus(id: string, status: string) {
  return (await api.patch(`/orders/${id}`, { status })).data;
}

/* ========== Wishlist ========== */
export async function getWishlist(userId: string) {
  return (await api.get(`/wishlist/${userId}`)).data;
}

export async function addToWishlist(userId: string, productId: string) {
  return (await api.post("/wishlist-items", { userId, productId })).data;
}

/* ========== Cart ========== */
export async function getCart(userId: string) {
  return (await api.get(`/cart/${userId}`)).data;
}

export async function addToCart(data: { userId: string; productId: string; quantity: number }) {
  return (await api.post("/cart", data)).data;
}

/* ========== Coupons ========== */
export async function getCoupons() {
  return (await api.get("/coupons")).data;
}

export async function createCoupon(data: any) {
  return (await api.post("/coupons", data)).data;
}

export async function deleteCoupon(id: string) {
  return (await api.delete(`/coupons/${id}`)).data;
}

/* ========== Ads ========== */
export async function getAds() {
  return (await api.get("/ads")).data;
}

export async function createAd(data: any) {
  return (await api.post("/ads", data)).data;
}

export async function deleteAd(id: string) {
  return (await api.delete(`/ads/${id}`)).data;
}

/* ========== Support Tickets ========== */
export async function getTickets() {
  return (await api.get("/support-tickets")).data;
}

export async function replyTicket(id: string, message: string) {
  return (await api.post(`/support-tickets/${id}/reply`, { message })).data;
}

/* ========== Inventory ========== */
export async function getInventory() {
  return (await api.get("/inventory")).data;
}

export async function updateInventory(id: string, quantity: number) {
  return (await api.patch(`/inventory/${id}`, { quantity })).data;
}

/* ========== Variants ========== */
export async function getVariants(productId: string) {
  return (await api.get(`/variants/${productId}`)).data;
}

export async function createVariant(data: any) {
  return (await api.post("/variants", data)).data;
}

/* ========== Analytics (Admin) ========== */
export async function getSalesReport() {
  return (await api.get("/analytics/sales")).data;
}

export async function getUsersStats() {
  return (await api.get("/analytics/users")).data;
}

export async function getProductsStats() {
  return (await api.get("/analytics/products")).data;
}
