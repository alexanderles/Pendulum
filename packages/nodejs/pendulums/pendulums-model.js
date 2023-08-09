import mongoose from 'mongoose';
import pendulumsSchema from './pendulums-schema.js';

const pendulumsModel = mongoose.model('pendulums', pendulumsSchema);

export default pendulumsModel;