import {start, logger} from "@iyi-su/microservice";
import {connect, Error, model, Schema} from "mongoose";
import {Context} from "./context";
import {
    Account,
    Maybe,
    MutationCreateAccountArgs, MutationDeleteAccountArgs, MutationSetAvatarArgs, QueryGetByEmailArgs,
    QueryGetByIdArgs,
    ResolversParentTypes,
} from "./types/resolvers";

logger.info("starting application");

const MongoURI = process.env.MONGO_URI || "mongodb://localhost:27017";
await connect(MongoURI, {
    connectTimeoutMS: 1000,
});
logger.info("connected to database");

const {String, ObjectId} = Schema.Types;

interface IAccount {
    _id?: typeof ObjectId;
    name: string;
    email: string;
    password: string;
    avatar?: string;
}

const accountSchema = new Schema<IAccount>({
    email: {type: String, unique: true, required: true},
    name: {type: String, required: true},
    password: {type: String, required: true},
    avatar: {type: String},
});

const accounts = model<IAccount>("Account", accountSchema);

const resolvers = {
    Query: {
        getById: async (_: any, {id}: QueryGetByIdArgs): Promise<Maybe<Account>> => {
            const acc = await accounts.findById(id);
            return toGraphAccount(acc);
        },
        getByEmail: async (_: any, {email}: QueryGetByEmailArgs): Promise<Maybe<Account>> => {
            const account = await accounts.findOne({email});
            return toGraphAccount(account);
        },
    },
    Mutation: {
        createAccount: async (parent: ResolversParentTypes, {account}: MutationCreateAccountArgs): Promise<Account> => {
            const acc = await accounts.create({
                name: account.name,
                email: account.email,
                password: account.password,
                avatar: account.avatar,
            });
            return toGraphAccount(acc);
        },
        deleteAccount: async (_: any, {id}: MutationDeleteAccountArgs): Promise<boolean> => {
            try {
                await accounts.findByIdAndDelete(id);
                return true;
            } catch (err) {
                logger.error((<Error>err).message);
                return false;
            }
        },
        setAvatar: async (_: any, {id, avatar}: MutationSetAvatarArgs): Promise<boolean> => {
            try {
                await accounts.updateOne({_id: id}, {avatar});
                return true;
            } catch (err) {
                logger.error((<Error>err).message);
                return false;
            }
        },
    },
};

function toGraphAccount(account: IAccount): Account {
    if (account === null) {
        return null;
    }
    return {
        id: account._id.toString(),
        name: account.name,
        email: account.email,
        password: account.password,
        avatar: account.avatar,
    };
}

await start<Context>(resolvers);