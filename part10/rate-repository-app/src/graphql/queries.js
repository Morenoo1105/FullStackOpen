import { gql } from "@apollo/client";
import { REPO_DETAILS, REVIEW_DETAILS } from "./fragments";

export const GET_REPOSITORIES = gql`
  ${REPO_DETAILS}
  query GetRepositories(
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
    ) {
      edges {
        node {
          ...RepoDetails
        }
      }
    }
  }
`;

export const GET_SINGLE_REPO = gql`
  ${REPO_DETAILS}, ${REVIEW_DETAILS}
  query GetRepoUrl($id: ID!) {
    repository(id: $id) {
      ...RepoDetails
      url
      reviews {
        edges {
          node {
            ...ReviewDetails
          }
        }
      }
    }
  }
`;

export const GET_CURRENT_USER = gql`
  ${REVIEW_DETAILS}
  query getCurrentUser($includeReviews: Boolean = false) {
    me {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            ...ReviewDetails
          }
        }
      }
    }
  }
`;
