import {Client} from "@iyi-su/client";
import {gql} from "@apollo/client/core";
import type {Account, CreateAccount} from "@iyi-su/accounts-types/resolvers";

export class AccountsClient extends Client<AccountsClient> {

    public async getById(id: string): Promise<Account> {
        type getById = {
            getById: Account;
        }
        const result: getById = await this.query<getById, { id: string }>(gql`
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
        return result.getById;
    }

    public async getByEmail(email: string): Promise<Account> {
        type getByEmail = {
            getByEmail: Account;
        }
        const result: getByEmail = await this.query<getByEmail, { email: string }>(gql`
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
        return result.getByEmail;
    }

    public async createAccount(account: CreateAccount): Promise<Account> {
        type createAccount = {
            createAccount: Account;
        }
        const result: createAccount = await this.mutate<createAccount>(gql`
            mutation createAccountMutation($account: CreateAccount!) {
                createAccount(account: $account) {
                    id
                    name
                    email
                    password
                    avatar
                }
            }
        `, {account});
        return result.createAccount;
    }

    public async deleteAccount(id: string): Promise<boolean> {
        type deleteAccount = {
            deleteAccount: boolean;
        }
        const result: deleteAccount = await this.mutate<deleteAccount>(gql`
            mutation deleteAccountMutation($id: ID!) {
                deleteAccount(id: $id)
            }
        `, {id});
        return result.deleteAccount;
    }

    public async setAvatar(id: string, avatar: string): Promise<boolean> {
        type setAvatar = {
            setAvatar: boolean;
        }
        const result: setAvatar = await this.mutate<setAvatar>(gql`
            mutation setAvatarMutation($id: ID!, $avatar: String) {
                setAvatar(id: $id, avatar: $avatar)
            }
        `, {id, avatar});
        return result.setAvatar;
    }

}
