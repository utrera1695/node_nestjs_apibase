export default () => ({
  port: parseInt(process.env.PORT) || 8000,
  database: {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true,
    autoLoadEntities: true,
  },
  jwtConstants: {
    secret: process.env.SECRET_KEY,
    expiresIn: '60m',
  },
});
