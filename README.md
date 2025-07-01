# Prisma > 6.8.0 and Postgres MONEY Serialization Issue
## Steps to Reproduce

These steps assume you have `yarn` and `docker` installed.

1. Check out this repo
2. Run `yarn install`
3. Run `yarn up` to start a local postgres instance
4. Run `yarn generate` to create the Prisma client
5. Run `yarn migrate` to create the database
6. Run `yarn queries` to reproduce the issue

## Actual Behavior
Prisma throws an error saying
```
Error: [DecimalError] Invalid argument: 1,000.00
    at Pp (/home/seth/workspaces/prisma-postgres-money/node_modules/@prisma/client/runtime/client.js:13:26797)
    at new i (/home/seth/workspaces/prisma-postgres-money/node_modules/@prisma/client/runtime/client.js:13:31557)
    at cd (/home/seth/workspaces/prisma-postgres-money/node_modules/@prisma/client/runtime/client.js:13:35122)
    at qe (/home/seth/workspaces/prisma-postgres-money/node_modules/@prisma/client/runtime/client.js:13:34742)
    at mt (/home/seth/workspaces/prisma-postgres-money/node_modules/@prisma/client/runtime/client.js:13:646)
    at qe (/home/seth/workspaces/prisma-postgres-money/node_modules/@prisma/client/runtime/client.js:13:34802)
    at ni.unpack (/home/seth/workspaces/prisma-postgres-money/node_modules/@prisma/client/runtime/client.js:81:8191)
    at ni.mapQueryEngineResult (/home/seth/workspaces/prisma-postgres-money/node_modules/@prisma/client/runtime/client.js:81:6679)
    at Object.singleLoader (/home/seth/workspaces/prisma-postgres-money/node_modules/@prisma/client/runtime/client.js:81:6110)
    at process.processTicksAndRejections (node:internal/process/task_queues:105:5) {
  clientVersion: '6.11.0'
}
```

## Expected Behavior
The `Decimal` value provided should be correctly serialized into a value that can be persisted.

## Cleanup
1. Run `yarn down` to stop the local postgres instance
2. Run `docker volume rm prisma-postgres-money_db` to remove the Docker volume