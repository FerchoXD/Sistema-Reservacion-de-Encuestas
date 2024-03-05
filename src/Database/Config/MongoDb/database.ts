import mongoose from 'mongoose';

const connectMongoDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/surveys_hexagonal_architecture');
    console.log('Conectado a MongoDB exitosamente.');
  } catch (error) {
    console.error('Error al conectar con MongoDB:', error);
  }
};

export default connectMongoDB;