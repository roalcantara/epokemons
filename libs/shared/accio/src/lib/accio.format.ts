export const format = <T>(
  request: RequestInfo,
  args: RequestInit,
  res: Response,
  result?: T
) => ({
  message: `/${args.method?.toUpperCase()} '${request}' (${res.status}) =>`,
  response: result ?? res.json()
})
