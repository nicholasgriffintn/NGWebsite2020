// Client-side
import { useQuery } from "@apollo/react-hooks";

import { GET_ARTICLES, GET_ARTICLE } from "./queries";

// { data, loading, error } = useGetArticles()
export const useGetArticles = () =>
  useQuery(GET_ARTICLES, {
    variables: {},
  });

// const { data, loading, error } = useGetArticle('slug-1')
export const useGetArticle = (id) =>
  useQuery(GET_ARTICLE, {
    variables: { id },
  });
