import * as Yup from "yup";
import { RegisterModel } from "../../models/AuthModels";

const registerSchema = Yup.object<RegisterModel>().shape({
  email: Yup.string().required("Email is required"),
  fullName: Yup.string().required("Full Name is required"),
  password: Yup.string().required("Password is required"),
  userName: Yup.string().required("Username is required"),
});

export default registerSchema;