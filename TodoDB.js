const { Pool } = require('pg')
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'todolistdb',
    password: 'password',
    port: 5432,
})

pool.on('error', (err, client) => {
    console.error('Error:', err); 
});

// const select = 'select * from todolisttable'

// const getTable = (request, response) => {
//     pool.query(select, (error, results) => {
//         if (error) {
//             throw error
//         }
//         console.log(results.rows)
//     })
// }

// const post = 'INSERT INTO todolisttable (task, status) VALUES (clean room, false)'

// const createUser = (request, response) => {
//      pool.query(post, (error, results) => {
//         if (error) {
//             console.log(error)
//         }
//         console.log(`User added with ID: ${results}`)
//     })
// }

module.exports = pool;