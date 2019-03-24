# graphql-sample-app
Sample app usding GraphQL + Node + MongoDB


# What is GraphQL? 

GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data. GraphQL provides a complete and understandable description of the data in your API, gives clients the power to ask for exactly what they need and nothing more, makes it easier to evolve APIs over time, and enables powerful developer tools.

You can find more informaton here https://graphql.org/.

# Install

```
docker-compose build -d
```

# Testing GraphQL

1. Open `http://localhost:8080/graphql`

The GraphiQL editor will open, so you can test some queries :)

2. Run test queries:

To create an user and return `_id` and `username`:

```
mutation {
  createUser(input: { email: "test@test.com", username: "Paul", password: "secret", birthDate: "2010-10-10"})
  {
    _id,
    username
  }
}
```

To list the users:

_Note that now you can specify witch fields you want to receive in the body._

```
query {
  users {
    _id
    username
  }
}
```