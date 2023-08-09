import pendulumsModel from './pendulums-model.js';

export const findAllPendulums = async() => {
    const pendulums = await pendulumsModel.find();
    return pendulums;
}

export const findPendulumById = async(id) => {
    const pendulum = await pendulumsModel.findById(id);
    return pendulum;
}

export const createPendulum = async(pendulum) => {
    const pendulums = await pendulumsModel.create(pendulum);
    return pendulum;
}

export const updatePendulum = async(id, pendulum) => {
    const status = await pendulumsModel.updateOne({ _id: id },
        pendulum);
    return status;
}