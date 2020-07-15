import * as Yup from "yup";
import { IChangePassword } from "../../../models/UserModel";

export const validations = Yup.object<IChangePassword>().shape({
  oldPassword: Yup.string().required("is required"),
  newPassword: Yup.string().required("is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), undefined], "Passwords must match")
    .required("is required"),
});
