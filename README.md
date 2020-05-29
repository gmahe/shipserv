# Run the app

```bash
npm run dev
```

then go to http://localhost:4000/ (playground)

login with the mutation, see in the "Queries and Mutation" section.
Get the token from the mutation and add it in the http header of the request (bottom left of playground) like bellow

```bash
{
  "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJTaGFubmFAbWVsaXNzYS50diIsImdyYXBocWwiOnsicm9sZXMiOlsidXNlciJdLCJwZXJtaXNzaW9ucyI6WyJyZWFkIl19LCJpYXQiOjE1OTA3NjgxNjYsImV4cCI6MTU5MDg1NDU2Niwic3ViIjoid2hhdGV2ZXIifQ.8rfMavjXc7XlEXrpPN2NBXhFWc93lWMZJGot4ylTvLA"
}
```

# Queries and Mutation

```graphql
query getUser {
  user(id: 9) {
    id
    name
    email
    phone
  }
}
query me {
  me {
    id
    name
  }
}
# This query will query directly the 3rd party endpoint, not the local data.
query getAllUsers {
  users {
    id
    name
    email
    phone
  }
}
mutation login {
  login(email: "Shanna@melissa.tv", password: "123456")
}

query department {
  department(id: 4) {
    name
    address
    users {
      id
      name
    }
  }
}
```

# TODO

Unit tests queries and mutations.
Improve authentication.
Improve directives.
