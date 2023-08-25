import { useRef } from "react";
import { clsx } from "clsx";
import { Recipe } from "@/models/Recipe";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { Card } from "../Card";
import s from "./styles.module.css";

interface Props {
  recipes: Recipe[];
  isLoading: boolean;
  onLoadMore: () => void;
}

const RecipeList = ({ recipes, isLoading, onLoadMore }: Props) => {
  const bottomRef = useRef(null);

  useIntersectionObserver(bottomRef, () => {
    if (isLoading) {
      return;
    }

    onLoadMore();
  });

  return (
    <>
      {isLoading && <div className={s.loadingTitle}>Loading...</div>}
      <div className={clsx({ [s.loader]: isLoading })}>
        <ul className={s.grid}>
          {recipes.map((recipe: any) => (
            <li key={recipe.id}>
              <Card
                title={recipe.title}
                description={recipe.description}
                image={recipe.images.defaultImage}
              />
            </li>
          ))}
        </ul>
        {isLoading ? null : <div ref={bottomRef} />}
      </div>
    </>
  );
};

export { RecipeList };
