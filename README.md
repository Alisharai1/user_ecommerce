```
 Main branch
npm init -y
git init
touch .gitignore
npm i typescript @types/node -D
npx tsconfig.json
npm i express @types/express
docker run -itd -p 5432:5432 -e POSTGRES_USER= 'User' -e DATABASE= '' -e POSTGRES_PASSWORD = '' postgres
npm i db-migrate
npm i db-migrate-pg
create scripts dbmigrate for up and down file
create database.json file and 
run scripts to check compilation, index.ts

```
```
Branch2
Create table and enum for user in migrations
add few users in table and check whether migrations working or not
define user interface
set up express and test the connection
connect sequelize to database and setup the connection details
define user model using Sequelize
create repo layer using sequelize


