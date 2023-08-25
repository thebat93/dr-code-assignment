import { Recipe } from "./Recipe";

interface RecipesList {
  listRecipes: {
    recipes: Recipe[];
    totalSize: number;
    nextPage: number | null;
  };
}

export type { RecipesList };
