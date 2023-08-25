import { gql } from "@apollo/client";

export const GET_RECIPES = gql`
query ListRecipes($search: String, $page: Int, $pageSize: Int) {
  listRecipes(input: { query: $search, page: $page, pageSize: $pageSize }) {
    recipes {
      id
      slug
      satietyScore
      rating
      description
      descriptionHtml
      title
      images {
        defaultImage {
          path
          width
          height
        }
      }
    }
    nextPage
    totalSize
  }
}
`;
