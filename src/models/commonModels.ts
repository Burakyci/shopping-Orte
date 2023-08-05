export interface IOperationResult<T = void> {
  success: boolean;
  data?: T;
  error?: string;
}

export class OperationResult<T = void> implements IOperationResult<T> {
  success: boolean = true;
  message?: string;
  data?: T;
  constructor(params?: { success: boolean; data?: T; message?: string }) {
    if (params) {
      Object.assign(this, { ...params });
    }
  }
}
