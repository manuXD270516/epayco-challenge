export function handleApiResponse(
  response: { code: string; message: string },
  setMessage: (msg: string) => void,
  setIsSuccess: (val: boolean) => void
) {
  setMessage(response.message);
  setIsSuccess(response.code === 'SUCCESS');
}
