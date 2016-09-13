Data Access Object (DAO) integration tests
==========

These specifications test the DAO's interaction with the database. Ideally, the goal of these tests is to make sure that the DAOs provide consistent API:

- Returns Promises
- Resolves when called with valid data and rejects otherwise
- If it resolves, returns consistent data structure
- If it rejects, provide informative messages
