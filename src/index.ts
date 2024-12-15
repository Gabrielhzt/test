import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import { User } from "./user";

dotenv.config();

declare module "express" {
	interface Request {
		user?: User;
	}
}


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const attachUser = (req: Request, res: Response, next: NextFunction) => {
	req.user = {
		id: "123",
		email: "example@example.com",
		name: "John Doe",
	};
	next();
};

app.use(attachUser);

// Example route using req.user
app.get("/", (req: Request, res: Response) => {
	res.json({
		message: "Hello World!",
		user: req.user,
	});
});

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});
