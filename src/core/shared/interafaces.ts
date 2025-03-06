export interface UseCaseResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
