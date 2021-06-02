"use strict";

const express = require("express");
const app = express();
const port = 7000;
app.use(express.static('/home/node/my-training-proj1'));
app.listen(port, () => console.log(`Web server on http://localhost:${port}`));
