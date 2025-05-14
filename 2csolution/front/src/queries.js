import { gql } from "@apollo/client";

export const GET_USERS = gql`
    query GetUsers($name: String, $email: String) {
        users(name: $name, email: $email) {
            id
            name
            email
        }
    }
`;

export const ADD_USER = gql`
    mutation AddUser($name: String!, $email: String!) {
        addUser(name: $name, email: $email) {
            id
            name
            email
        }
    }
`;

export const DELETE_USER = gql`
    mutation DeleteUser($id: ID!) {
        deleteUser(id: $id) {
            id
        }
    }
`;
