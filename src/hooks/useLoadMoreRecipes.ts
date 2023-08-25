import { RecipesList } from "@/models/RecipesList";
import { Variables } from "@/models/Variables";
import { FetchMoreFunction } from "@apollo/client/react/hooks/useSuspenseQuery";
import { useCallback, useTransition } from "react";

const useLoadMoreRecipes = ({
  nextPage,
  fetchMore,
}: {
  nextPage: number | null;
  fetchMore: FetchMoreFunction<RecipesList, Variables>;
}) => {
  const [isPending, startTransition] = useTransition();

  const onLoadMore = useCallback(() => {
    startTransition(() => {
      if (nextPage === null) {
        return;
      }

      fetchMore({
        variables: {
          page: nextPage,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          return {
            listRecipes: {
              recipes: [
                ...previousResult.listRecipes.recipes,
                ...fetchMoreResult.listRecipes.recipes,
              ],
              totalSize: fetchMoreResult.listRecipes.totalSize,
              nextPage: fetchMoreResult.listRecipes.nextPage,
            },
          };
        },
      });
    });
  }, [nextPage, fetchMore]);

  return {
    onLoadMore,
    isPending,
  };
};

export { useLoadMoreRecipes };
