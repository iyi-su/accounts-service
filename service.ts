import {start} from "@iyi-su/microservice";

const resolvers = {
    Query: {
        books: async () => [
            {title: "hello", author: "simon"},
            {title: "world", author: "yulia"},
        ],
    },
};

await start(resolvers);