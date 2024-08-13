const app = require("./app");
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Group Project Phase 2 can be accessed in http://localhost:${port}`);
    
})