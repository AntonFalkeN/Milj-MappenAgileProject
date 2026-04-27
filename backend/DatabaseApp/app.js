const { Client } = require('pg');

const client = new Client({
    user: "postgres",
    host: "localhost",
    database: "usernames_db",
    password: "PostgresiusDolmer300fem",
    port: 5432,
});

async function addUser(username, password) {
    try {
        await client.query(
            'INSERT INTO users (username, password) VALUES ($1, $2)',
            [username, password]
        );
        console.log(`Added username: ${username}`);
    } catch (err) {
        console.error('Error adding username:', err);
    }
}

async function getUser(username) {
    try {
        const result = await client.query(
            'SELECT * FROM users WHERE username = $1',
            [username]
        );
        if (result.rows.length > 0) {
            console.log('User found:', result.rows[0]);
            return result.rows[0];
        }
        else {
            console.log('User not found')
            return null
        }
        
    } catch (err) {
        console.log('Error getting user:', err)
    }
}

(async () => {
    await client.connect();

    await addUser('gragas', 'bomba');

    await getUser('gragas')

    await client.end();
})();