const { User } = require("../models")

const resolvers = {

    Query: {

        users: async () => {
            return User.find({})
        },

        singleUser: async (parent, args) => {
            return User.findById(args.userId)
        },

        me: async (parent, args, context) => {
            if(context.user) {
                return User.findById(context.user._id)
            }
        }
    },

    Mutation: {

        createUser: async (parent, args) => {
            const newUser = await User.create(args);
            return newUser
        },

        deleteBook: async (parent, args, context) => {
            if(context.user) {
                return User.findByIdAndUpdate(
                    context.user._id,
                    { $pull: { savedBooks: { bookId: args.bookId } } },
                    { new: true }
                )
            }
        }
    }
}

module.exports = resolvers;