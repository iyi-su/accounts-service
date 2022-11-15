import {Client} from "@iyi-su/client";
import {gql} from "@apollo/client/core";
import type {Account} from "@iyi-su/accounts-types/resolvers";

class AccountsClient extends Client<AccountsClient> {

    public async getById(id: string): Promise<Account> {
        return this.request<Account, { id: string }>(gql`
            query getByIdQuery($id: ID!) {
                getById(id: $id) {
                    id
                    name
                    email
                    password
                    avatar
                }
            }
        `, {id});
    }

    public async getByEmail(email: string): Promise<Account> {
        return this.request<Account, { email: string }>(gql`
            query getByEmailQuery($email: String!) {
                getByEmail(email: $email) {
                    id
                    name
                    email
                    password
                    avatar
                }
            }
        `, {email});
    }

}
