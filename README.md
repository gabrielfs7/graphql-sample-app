# graphql-sample-app
Sample app usding GraphQL + Node + MongoDB


# What is GraphQL? 

GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data. GraphQL provides a complete and understandable description of the data in your API, gives clients the power to ask for exactly what they need and nothing more, makes it easier to evolve APIs over time, and enables powerful developer tools.

You can find more informaton here https://graphql.org/.

# Install

```
docker-compose build -d
```

# Initializing application

Execute the command below to start the nodeamon.

```
docker exec -it graphql-sample-app_graphql_sample_app_api_container_1 "npm run start-app"
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
    _id,
    username,
    email,
    password,
    birthDate,
    createdAt,
    updatedAt
  }
}
```

To create a task 

```
mutation {
  createTask(input: { task: "Pay bills", doAt: "2010-10-10"})
  {
    _id,
    task,
    doAt,
    status,
    owner {
      _id,
      username,
      email,
      password,
      birthDate,
      createdAt,
      updatedAt 
    }
  }
}
```

To list the tasks

```
query {
  tasks {
    _id,
    task,
    doAt,
    status,
    owner {
      email,
      tasks {
        task,
        doAt
      }
    }
  }
}
```

To watch a task:

```
mutation {
  watchTask(input: { taskId: "5ca4fdaccbfb5f37fd8ebc67", userId: "5c9910447bee5a37dab62060"})
  {
    _id,
    createdAt,
    updatedAt,
    user {
      _id,
      email
    },
    task {
      _id,
      task
    }
  }
}
```

Stop watching a task:

```
mutation {
  stopWatchTask(input: { id: "5ca4fff7cbfb5f37fd8ebc6c"})
  {
    _id,
    createdAt,
    updatedAt
  }
}
```

List watchers:

```
query {
  watchers {
  	_id,
    createdAt,
    updatedAt,
    user {
      _id, 
      email
    },
    task {
      _id, 
      task,
      owner {
        _id,
        email
      }
    }
  }
}
```