// require("dotenv/config");
const path = require("path");
require("dotenv").config({
    path: path.resolve(__dirname, "../.env"),
});
const express = require("express");
const cors = require("cors");
const { join } = require("path");
const {
    authRouter,
    profileRouter,
    productRouter,
    cartRouter,
    transactionRouter,
} = require("./routes");

const PORT = process.env.PORT || 8000;
const app = express();
// app.use(
//     cors({
//         origin: [
//             process.env.WHITELISTED_DOMAIN &&
//                 process.env.WHITELISTED_DOMAIN.split(","),
//         ],
//     })
// );
app.use(cors());
app.use(express.json());

//#region API ROUTEfgfgS

// ===========================
// NOTE : Add your routes here
// console.log("API ROUTES");

app.use("/api/auth", authRouter);
app.use("/api/profile", profileRouter);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/transactions", transactionRouter)

app.use("/api/public", express.static(path.resolve(__dirname, "../public")));

// ===========================

// not found
// app.use((req, res, next) => {
//     if (req.path.includes("/api/")) {
//         res.status(404).send("Not found !");
//     } else {
//         next();
//     }
// });

// // error
// app.use((err, req, res, next) => {
//     if (req.path.includes("/api/")) {
//         console.error("Error : ", err.stack);
//         res.status(500).send("Error !");
//     } else {
//         next();
//     }
// });

// //#endregion

// //#region CLIENT
// const clientPath = "../../client/build";
// app.use(express.static(join(__dirname, clientPath)));

// // Serve the HTML page
// app.get("*", (req, res) => {
//     res.sendFile(join(__dirname, clientPath, "index.html"));
// });

//#endregion

app.listen(PORT, (err) => {
    if (err) {
        console.log(`ERROR: ${err}`);
    } else {
        console.log(`APP RUNNING at ${PORT} ✅`);
    }
});
