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
// 주류 좋아요 확인 여부
export async function alcoholDetails(drinkId: string) {
  return await instance
    .get(`/api/drink/list/${drinkId}`)
    .then((response) => response.data.recommend);
}

// 마이레시피 목록
export async function myrecipeList() {
  return await instance
    .get("/api/myrecipe/post/list")
    .then((response) => response.data.myrecipes);
}

// 마이레시피 상세페이지
export async function myrecipeListDetial(myrecipeId: string) {
  return await instance
    .get(`/api/myrecipe/post/detail/${myrecipeId}`)
    .then((response) => response.data.myrecipe);
}

// 마이레시피에 좋아요 누른사람 조회
export async function myrecipeHeartList(myrecipeId: string) {
  const response = await instance.get(`/api/favorite/${myrecipeId}/list`);

  return response.data.getUser;
}
// 내가 쓴 마이레시피 목록
export async function myrecipe_Myrecipe() {
  return await instance
    .get("/api/myrecipe/post/getmyrecipe")
    .then((response) => response.data.myrecipe);
}

// 레시피 전체 조회

export async function allRecipeList() {
  return await instance
    .get("/api/recipe/list/all")
    .then((response) => response.data.recipes);
}

// 레시피 상세 조회 레시피들
export async function allRecipeListDetailRecipe(recipeId: string) {
  return await instance
    .get(`/api/recipe/list/detail/${recipeId}`)
    .then((response) => response.data.recipe);
}

// // 레시피 상세 조회 이미지들
// export async function allRecipeListDetailIngredientImages(recipeId: string) {
//   return await instance
//     .get(`/api/recipe/list/detail/${recipeId}`)
//     .then((response) => response.data.images);
// }

// 서버제공 레시피 추천 확인 여부
export async function allRecipeListDetailHeartRecipe(recipeId: string) {
  return await instance
    .get(`/api/recipe/list/detail/${recipeId}`)
    .then((response) => response.data.recommend);
}

// 레시피 상세 조회 재료 이미지들
export async function allRecipeListDetailImage(recipeId: string) {
  return await instance
    .get(`/api/recipe/list/detail/${recipeId}`)
    .then((response) => response.data.images);
}

// 홈화면에 보일 레시피목록
export async function homeRecipeList() {
  return await instance
    .get("/api/myrecipe/post/mainpage")
    .then((response) => response.data);
}

// 레시피 추천순 상위 5
export async function topRecipe() {
  return await instance
    .get("/api/recipe/list/recommended")
    .then((response) => response.data.recipes);
}

//홈화면 술냉장고 이미지 불러오기
export async function alcoholBucket() {
  return await instance
    .get("/api/drink/drinkimage")
    .then((response) => response.data.drink_info);
}

// 내가 좋아요 누른 술 조회
export async function alcoholHeart() {
  return await instance
    .get("/api/favorite/drink/getdrinks")
    .then((response) => response.data.getMydrink);
}
