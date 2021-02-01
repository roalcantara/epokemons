import { format } from './accio.format'

export const onError = (
  request: RequestInfo,
  args: RequestInit,
  res: Response
) => {
  const { message } = format(request, args, res)
  const err = [message, res.statusText].join(' ')

  console.error(err, { res })

  return new Error(message)
}
