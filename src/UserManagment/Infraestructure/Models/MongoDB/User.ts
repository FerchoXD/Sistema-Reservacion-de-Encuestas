import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
  id: string;
  name: string;
  password: string;
  token?:string | null,
}

// Definición del esquema de Mongoose para el modelo User
const UserSchema: Schema = new Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  token: { type:String, default:null },
}, {
  timestamps: true,
});

const UserModel = mongoose.model<IUser>('User', UserSchema);

export default UserModel;