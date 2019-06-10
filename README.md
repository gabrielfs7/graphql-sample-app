# graphql-sample-app

This is a sample app built using GraphQL + NodeJS + MongoDB + React. Its purpose is to test these technologies and to share an working example.

# Tools:

- React https://github.com/facebook/create-react-app
- MongoDB
- NodeJS
- Express
- GraphQl

# What is GraphQL? 

GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data. GraphQL provides a complete and understandable description of the data in your API, gives clients the power to ask for exactly what they need and nothing more, makes it easier to evolve APIs over time, and enables powerful developer tools.

You can find more informaton here https://graphql.org/.

# Install

Create external network shared by frontend and backend applications:

```
docker network create graphql_sample_app_network
```

To install backend application:

```
cd backend
docker-compose build -d
```

To install frontend application:

```
cd frontend
docker-compose build -d
```

# Initializing application

Execute the command below to start the nodeamon for backend application and start react frontend application.

__This is necessary, cause sometimes the docker-compose command does not work properly.__

```
docker exec -it backend_graphql_sample_app_api_container_1 "npm run start"
docker exec -it frontend_graphql_sample_app_container_1 "npm run start"
```

# Accessing App

- To access Web App: `http://localhost:8081`
- To access API: `http://localhost:8080`

# Testing GraphQL

1. Open `http://localhost:8080/graphql`

The GraphiQL editor will open, so you can test some queries :)

2. Run test queries:

To create an user and return `_id` and `email`:

```
mutation {
  createUser(input: { email: "test@test.com", password: "secret"})
  {
    _id,
    email
  }
}
```

To list the users:

_Note that now you can specify witch fields you want to receive in the body._

```
query {
  users {
    _id,
    email,
    password,
    createdAt,
    updatedAt
  }
}
```

Login user:

```
query {
  login(input: {email: "test1@test.com", password:"secret"}) {
    userId,
    token,
    tokenExpiresIn
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
      email,
      password,
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