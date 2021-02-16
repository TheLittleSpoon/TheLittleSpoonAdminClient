import io from "socket.io-client";

let socket = io().connect('localhost:8080');


socket.on('connect', () => {
    console.log("conneceted");
});

socket.on('connect', () => {
    console.log("conneceted");
});

socket.on('disconnect', (reason) => {
    if (reason === 'io server disconnect') {
        // the disconnection was initiated by the server, you need to reconnect manually
        socket.connect();
    }
    // else the socket will automatically try to reconnect
});

export default socket;
