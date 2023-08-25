"use client";

import { Suspense, useCallback } from "react";
import clsx from "clsx";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { Variables } from "@/models/Variables";
import { RecipesList } from "@/models/RecipesList";
import { SearchField } from "@/components/SearchField";
import { RecipeList } from "@/components/RecipeList";
import { useDebouncedSearch } from "@/hooks/useDebouncedSearch";
import { useLoadMoreRecipes } from "@/hooks/useLoadMoreRecipes";
import { GET_RECIPES } from "./getRecipesQuery";
import { ErrorBoundary } from "./ErrorBoundary";
import s from "./page.module.css";

export const dynamic = "force-dynamic";

const Error = () => (
  <div className={clsx(s.center, s.error)}>Something went wrong</div>
);

const initialQuery: Variables = {
  search: undefined,
  pageSize: 5,
  page: 1,
};

const Page = () => {
  const { data, error, fetchMore, refetch } = useSuspenseQuery<
    RecipesList,
    Variables
  >(GET_RECIPES, {
    variables: initialQuery,
  });

  const search = useCallback(
    (newSearch: string) => {
      if (newSearch.length > 0) {
        refetch({ search: newSearch });
      }

      refetch(initialQuery);
    },
    [refetch]
  );

  const onSearchDebounced = useDebouncedSearch(search);

  const { onLoadMore, isPending: isLoadMorePending } = useLoadMoreRecipes({
    nextPage: data?.listRecipes.nextPage ?? null,
    fetchMore,
  });

  return (
    <>
      <header className={s.header}>
        <SearchField
          name="search"
          label="Recipes"
          placeholder="Search your favourite recipes"
          defaultQuery={initialQuery.search}
          onSearch={onSearchDebounced}
          autoFocus={true}
        />
      </header>
      <main className={s.main}>
        <div className={s.content}>
          <ErrorBoundary fallback={<Error />}>
            <Suspense fallback={<p className={s.center}>Loading recipes...</p>}>
              {error ? (
                <Error />
              ) : (
                <RecipeList
                  isLoading={isLoadMorePending}
                  recipes={data.listRecipes.recipes}
                  onLoadMore={onLoadMore}
                />
              )}
            </Suspense>
          </ErrorBoundary>
        </div>
      </main>
    </>
  );
};

export default Page;
