const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (_, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')
                    .populate('friends')

                const seatGeekEvents = await context.dataSources.seatGeekAPI.getEvents(userData.events);

                return Object.assign(userData.toObject(), seatGeekEvents);
            }

            throw new AuthenticationError('Not logged in');
        },

        users: async () => {
            return User.find()
                .select('-__v -password')
                .populate('friends');
        },

        user: async (_, { username }) => {
            return User.findOne({ username })
                .select('-__v -password')
                .populate('friends');
        },

        seatGeekEvent: async (_, { id }, { dataSources }) => {
            return dataSources.seatGeekAPI.getEvent(id);
        },

        seatGeekEvents: async (_, { ids }, { dataSources }) => {
            return dataSources.seatGeekAPI.getEvents(ids);
        },

        seatGeekQuery: async (_, { query }, { dataSources }) => {
            return dataSources.seatGeekAPI.searchEvent(query);
        }
    },

    Mutation: {
        login: async (_, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('User does not exist');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
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

        addEvent: async (_, id, context) => {
            if (context.user) {
                const me = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { events: id.id } },
                    { new: true }
                );

                return me;
            }

            throw new AuthenticationError('You need to be logged in!');
        },

        removeEvent: async (_, id, context) => {
            if (context.user) {
                const me = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $pull: { events: id.id } },
                    { new: true }
                );

                return me;
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