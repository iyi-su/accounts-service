import {Client} from "@iyi-su/client";
import {DocumentNode} from "graphql";
import {gql} from "@apollo/client/core";
import type {Account} from "../types/resolvers";

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

}

const client = AccountsClient.create<AccountsClient>("http://localhost:4000");
client.getById("636e11f29006c5c30e61fb27").then(console.log).catch(console.error);