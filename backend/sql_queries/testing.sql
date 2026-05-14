
-- Deletes everything inside database
-- \set QUIT true
-- SET client_min_messages TO NOTICE;
-- DROP SCHEMA public CASCADE;
-- CREATE SCHEMA public;
-- GRANT ALL ON SCHEMA public TO postgres;
-- \set QUIET false



-- CREATE TABLE IF NOT EXISTS test_table (
--     id TEXT PRIMARY KEY,
--     name TEXT NOT NULL,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- DELETE FROM test_table WHERE id = '123';
-- INSERT INTO test_table (id, name, created_at) VALUES ('123', 'Jonas', CURRENT_TIMESTAMP);

-- SELECT id, name, created_at
-- FROM test_table

-- DELETE FROM Users;
-- SELECT * FROM Users;




-- DROP TABLE Users;
-- DROP TABLE Pins;

SELECT * FROM Pins;
SELECT * FROM Users;
