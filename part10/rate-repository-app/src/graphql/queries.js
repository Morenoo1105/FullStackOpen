import { gql } from "@apollo/client";
import { REPO_DETAILS, REVIEW_DETAILS } from "./fragments";

export const GET_REPOSITORIES = gql`
  ${REPO_DETAILS}
  query {
    repositories {
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

export const IS_SIGNED_IN = gql`
  query {
    me {
      id
      username
    }
  }
`;
