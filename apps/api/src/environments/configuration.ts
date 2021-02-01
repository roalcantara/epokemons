import { environment } from './environment'

export const configuration = () => ({
  production: environment.production,
  api: {
    url: process.env.API_URL
  },
  db: {
    provider: process.env.DB_PROVIDER,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USR,
    pwd: process.env.DB_PWD,
    max: Number(process.env.DB_POOL_MAX)
  }
})
