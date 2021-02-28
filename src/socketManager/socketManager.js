import io from "socket.io-client";

let socket = io().connect('http://35.224.144.255:3000/');


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
