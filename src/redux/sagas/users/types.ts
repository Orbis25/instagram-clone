import { AuthModel } from "../../../models/AuthModels";

export type AutenticatedUserType = { payload: AuthModel; type: string };
