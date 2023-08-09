import * as dao from '../pendulums/pendulums-dao';

const PendulumsController = (app) => {

    const findAllPendulums = async(req, res) => {
        const pendulums = await dao.findAllPendulums();
        res.json(pendulums);
    };

    const findPendulumById = async(req, res) => {
        const pendulum = await dao.findPendulumById(req.params.id);
        res.json(pendulum);
    };

    const createPendulum = async(req, res) => {
        const pendulum = req.body;
        const newPendulum = await dao.createPendulum(pendulum);
        res.json(newPendulum);
    };

    const updatePendulum = async(req, res) => {
        const pendulum = req.body;
        const status = await dao.updatePendulum(req.params.id, pendulum);
        res.send(status);
    };


    app.get("/api/users", findAllPendulums);
    app.get("/api/users/:id", findPendulumById);
    app.post("/api/users", createPendulum);
    app.put("/api/users/:id", updatePendulum);

}

export default UsersController;