import axios from "axios";
import { utils } from "./utils";

const iAxios = axios.create({ baseURL: utils.baseUrl });

export default iAxios;
