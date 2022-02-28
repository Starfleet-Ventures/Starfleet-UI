# Starfleet UI

Landing Page Sample for Starfleet

## Development server
Install node modules using `npm install`.
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


## Creating a Database User
Appropriate role may need to be set in roles, here it gives a user admin access to any database created inside a mongodb instance
```
db.createUser(
{	user: "username",
	pwd: "password",
	roles:[{role: "userAdminAnyDatabase" , db:"admin"}]})

```

