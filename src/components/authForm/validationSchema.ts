import * as Yup from "yup";
import { AuthModel } from "../../models/AuthModels";

const validationUser = Yup.object<AuthModel>().shape({
  email: Yup.string().required("email is required"),
  password: Yup.string().required("password is required"),
});

export default validationUser;
