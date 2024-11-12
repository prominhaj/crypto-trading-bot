import { replaceMongoIdInObject } from '@/lib/convertData';
import User from '@/modals/user-modal';

export const getUserById = async (userId) => {
    try {
        const user = await User.findById(userId).lean();
        return replaceMongoIdInObject(user);
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getUserByEmail = async (email) => {
    try {
        const user = await User.findOne({ email }).lean();
        return replaceMongoIdInObject(user);
    } catch (error) {
        throw new Error(error.message);
    }
};
