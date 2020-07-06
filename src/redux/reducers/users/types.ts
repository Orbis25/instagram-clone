interface IAction {
  type: string;
}

interface IErrorResult {
  code?: string;
  message?: string;
}

interface IActionError extends IAction {
  error?: IErrorResult;
}

export type IActionType = IActionError;

export interface IAuthReducer {
  isAutenticated?: Boolean;
  errorMessage?: string;
}
