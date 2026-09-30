import "dotenv/config";

import app from "../src/app.js";
import connectDB from "../src/config/db.js";

let connectionPromise;

export default async function handler(req, res) {
    connectionPromise ??= connectDB();

    await connectionPromise;

    return app(req, res);
}