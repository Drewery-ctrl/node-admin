export default {
  "type": "mysql",
  "host": "localhost",
  "port": 3306,
  "username": "root",
  "password": "root",
  "database": "admin",
  "entities": [
    "src/entity/*.ts"
  ],
  "synchronize": true,
  "logging": false
}