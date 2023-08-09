import * as dao from '../users/users-dao.js';

const UsersController = (app) => {

    const findAllUsers = async(req, res) => {
        const users = await dao.findAllUsers();
        res.json(users);
    };

    const findUserById = async(req, res) => {
        const user = await dao.findUserById(req.params.id);
        res.json(user);
    };

    const findUserByUsername = async(req, res) => {
        const user = await dao.findUserByUsername(req.params.username);
        res.json(user);
    };

    const register = async(req, res) => {
        const user = req.body;
        const existingUser = await dao.findUserByUsername(user.username);
        if (existingUser) {
            res.sendStatus(409);
            return;
        }
        const newUser = await dao.createUser(user);
        req.session.currentUser = newUser;
        res.json(newUser);
    };

    const login = async(req, res) => {
        console.log("Server login method");
        const user = await dao.findUserByCredentials(req.body.username, req.body.password);
        console.log("Sever: logging in");
        console.log(user);
        if (user) {
            console.log("valid user");
            req.session["currentUser"] = user;
            res.json(user);
        } else {
            console.log("No user");
            res.sendStatus(401);
        }
    };

    const logout = async(req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    };

    const updateUser = async(req, res) => {
        const user = req.body;
        const status = await dao.updateUser(req.params.id, user);
        res.send(status);
    };

    const deleteUser = async(req, res) => {
        const status = await dao.deleteUser(req.params.id);
        res.send(status);
    };

    const profile = async(req, res) => {
        const currentUser = req.session["currentUser"];
        if (!currentUser) {
            //res.sendStatus(404);
            res.json({});
            return;
        }
        res.send(currentUser);
    };


    app.post("/api/users/login", login);
    app.post("/api/users/logout", logout);
    app.get("/api/users/profile", profile);
    app.post("/api/users/register", register);

    app.get("/api/users", findAllUsers);
    app.get("/api/users/username/:username", findUserByUsername);
    app.get("/api/users/:id", findUserById);
    app.put("/api/users/:id", updateUser);
    app.delete("/api/users/:id", deleteUser);

}

export default UsersController;