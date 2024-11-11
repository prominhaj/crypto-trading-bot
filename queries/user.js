import { replaceMongoIdInObject } from '@/lib/convertData';
import User from '@/modals/user-modal';

export const getUserByEmail = async (email) => {
    try {
        const user = await User.findOne({ email });
        return replaceMongoIdInObject(user);
    } catch (error) {
        throw new Error(error.message);
    }
};
