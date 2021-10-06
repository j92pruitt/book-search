const { User } = require("../models")

const resolvers = {

    Query: {

        users: async () => {
            return User.find({})
        }
    },

    Mutation: {

        createUser: async (parent, args) => {
            const newUser = await User.create(args);
            return newUser
        }
    }
}

module.exports = resolvers;