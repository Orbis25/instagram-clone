import * as Yup from "yup";

import { IUser } from "../../../models/UserModel";

export const validationSchema = Yup.object<IUser>().shape({
  email: Yup.string().email("invalid email").required("is required"),
  fullName: Yup.string().required("is required"),
  userName: Yup.string().required("is required"),
  gender: Yup.string().required("is required"),
});

