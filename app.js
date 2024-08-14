if(process.env.NODE_ENV !== `production`) {
    require(`dotenv`).config();
}

const express = require(`express`);
const app = express();
const router = require(`./routes/index.js`);
const errorHandler = require("./middlewares/errorHandler");
const cors = require(`cors`);
const http = require("http");
const port = process.env.PORT || 3000;

const {Server} = require("socket.io")

const serverIO = http.createServer(app);

const io = new Server(serverIO, {
    cors: {
        origin: "*"
    }
})

io.on("connection", (socket) => {
    console.log(`User connected => ${socket.id}`)

    socket.on("join_room", (data) => {
        socket.join(data)
        console.log(`User with ID ${socket.id} joined room ${data}`)
    })

    socket.on("send_message", (data) => {
        console.log(data)
        socket.to(data.room).emit("receive_message", data)
    })

    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id)
    })
})

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(`/`, router);

app.use(errorHandler);

// module.exports = app;
serverIO.listen(port, () => {
    console.log(`Group Project Phase 2 can be accessed in http://localhost:${port}`)
})