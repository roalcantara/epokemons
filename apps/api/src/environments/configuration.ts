import { environment } from './environment'

export const configuration = () => ({
  production: environment.production,
  api: {
    url: process.env.API_URL
  }
})
