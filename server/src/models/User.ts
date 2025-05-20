import mongoose, { Document, Schema } from 'mongoose';

interface IUser extends Document {
    email: string;
    phoneNumber: string;
    password: string;
    otp?: string;
    otpExpiry?: Date;
}

const userSchema: Schema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        default: null,
    },
    otpExpiry: {
        type: Date,
        default: null,
    },
}, {
    timestamps: true,
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;