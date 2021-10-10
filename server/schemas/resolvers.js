const { User } = require("../models");
const { signToken } = require("../utils/auth");
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {

    Query: {

        users: async () => {
            return User.find({})
        },

        singleUser: async (parent, args) => {
            return User.findById(args.userId)
        },

        me: async (parent, args, context) => {

            const id = context.user ? context.user._id : args.userId

            if(id) {
                return User.findById(id)
            }

        }
    },

    Mutation: {

        createUser: async (parent, args) => {
            const newUser = await User.create(args);

            const token = signToken(newUser);

            return {token, user: newUser}
        },

        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
      
            if (!user) {
              throw new AuthenticationError('No user with this email found!');
            }
      
            const correctPw = await user.isCorrectPassword(password);
      
            if (!correctPw) {
              throw new AuthenticationError('Incorrect password!');
            }
      
            const token = signToken(user);
            return { token, user };
        },

        deleteBook: async (parent, args, context) => {

            const id = context.user ? context.user._id : args.userId

            if(id) {
                return User.findByIdAndUpdate(
                    id,
                    { $pull: { savedBooks: { bookId: args.bookId } } },
                    { new: true }
                )
            }
        },

        addBook: async (parent, args, context) => {

            const id = context.user ? context.user._id : args.userId

            const {prunedUserId, ...newBook} = args
            
            if(id) {
                
                return User.findOneAndUpdate(
                    id,
                    { $addToSet: { savedBooks: newBook } },
                    { new: true, runValidators: true }
                );
            }
        }
    }
}

module.exports = resolvers;