import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
  id: string;
  name: string;
  lastName: string;
  cellphone: string;
  email: string;
  password: string;
  token?:string,
  activationToken?: string;
  verifiedAt?: Date;
}

// Definición del esquema de Mongoose para el modelo User
const UserSchema: Schema = new Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  cellphone: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  token: { type:String, default:null },
  activationToken: { type: String, default: null },
  verifiedAt: { type: Date, default: null },
}, {
  timestamps: true,
});

const UserModel = mongoose.model<IUser>('User', UserSchema);

export default UserModel;