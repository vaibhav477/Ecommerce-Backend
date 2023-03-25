import mongoose from 'mongoose';

const uSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        Admin: {
            type: Boolean,
            default: false,
            required: true
        }
    },
    {
        timestamp: true,
    }
)

const uModel = mongoose.model('uModel', uSchema);
export default uModel; 