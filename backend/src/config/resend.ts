import { Resend } from "resend";
import { config } from "../constants/app.config.js";

const resend = new Resend(config.RESEND.API_KEY);

export default resend;