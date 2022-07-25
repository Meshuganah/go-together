const { User, Event } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (_, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id})
                    .select('-__v -password')
                    .populate('friends')
                    .populate('events')

                return userData;
            }

            throw new AuthenticationError('Not logged in');
        },

        users: async () => {
            return User.find()
                .select('-__v -password')
                .populate('friends')
                .populate('events');
        },

        user: async (_, { username }) => {
            return User.findOne({ username })
                .select('-__v -password')
                .populate('friends')
                .populate('thoughts');
        },

        event: async (_, { _id }) => {
            return Event.findOne({ _id });
        },

        events: async () => {
            return Event.find()
                .select('-__v')
        }
    },

    Mutation: {
        login: async (_, { email, password }) => {
            const user = await User.findOne({ email });

            if(!user) {
                throw new AuthenticationError('User does not exist');
            }

            const correctPw = await user.isCorrectPassword(password);

            if(!correctPw) {
                throw new AuthenticationError('Incorrect Password');
            }

            const token = signToken(user);
            return { token, user };
        },

        addUser: async (_, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },

        addEvent: async (_, args, context) => {
            if (context.user) {
                const event = await Event.create({ ...args, user: context.user.username });

                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { events: event._id } },
                    { new: true }
                );

                return event;
            }
          
            throw new AuthenticationError('You need to be logged in!');
        },

        addFriend: async (_, { friendId }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { friends: friendId } },
                    { new: true }
                ).populate('friends');

                return updatedUser;
            }

            throw new AuthenticationError('You need to be logged in!');
        }
    }
};

module.exports = resolvers;