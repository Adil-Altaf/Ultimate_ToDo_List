import app from "./app";
const PORT = 8000;


//this is for running the server
app.listen(PORT, () => {
    console.log(`Express server listening on port ${PORT}`);
});