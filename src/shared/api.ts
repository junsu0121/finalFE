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

// 마이 레시피 목록
export async function myrecipeList() {
  return await instance
    .get("/api/myrecipe/post/list")
    .then((response) => response.data.myrecipe);
}

// 내가 쓴 마이레시피 목록
export async function myrecipe_Myrecipe() {
  return await instance
    .get("/api/myrecipe/post/getmyrecipe")
    .then((response) => response);
}

// 레시피 전체 조회

export async function allRecipeList() {
  return await instance
    .get("/api/recipe/list/all")
    .then((response) => response.data.recipes);
}

// 레시피 상세 조회
export async function allRecipeListDetailRecipe(recipeId: string) {
  return await instance
    .get(`/api/recipe/list/${recipeId}`)
    .then((response) => response.data.recipe);
}

// 레시피 상세 조회 이미지
export async function allRecipeListDetailImage(recipeId: string) {
  return await instance
    .get(`/api/recipe/list/${recipeId}`)
    .then((response) => response.data.images);
}
