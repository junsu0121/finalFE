import { instance } from "../shared/axios";

// 주류 카테고리 목록
export async function alcoholCategory() {
  return await instance
    .get("/api/category")
    .then((response) => response.data.drinkCategories);
}

// 카테고리 별 주류조회
export async function alcoholList(categoryId: string) {
  return await instance
    .get(`/api/drink/list/category/${categoryId}`)
    .then((response) => response.data.drink);
}

// 주류 상세정보
export async function alcoholDetail(drinkId: string) {
  return await instance
    .get(`/api/drink/list/${drinkId}`)
    .then((response) => response.data.drink);
}
