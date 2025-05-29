const { createClient } = require('redis');
const crypto = require('crypto');

// Create Redis client
const redisClient = createClient({
    socket: {
        // the default port is 6379 (to look in docker-compose service definition)
        host: '127.0.0.1'
    }
});


redisClient.on('error', (err) => console.error('Redis Client Error', err));

// Connect to Redis
async function connectRedis() {
    if (!redisClient.isOpen) {
        await redisClient.connect();
    }
}

// Generate SHA-256 hash
const generateHash = (value) => {
    return crypto.createHash('sha256').update(value).digest('hex');
}

// Store value and return its hash
const setValueAndReturnHash = async (value) => {
    await connectRedis();
    const hash = generateHash(value);
    await redisClient.set(hash, value);
    return hash;
}

// Retrieve value by hash
const getValueByHash = async (hash) => {
    await connectRedis();
    const value = await redisClient.get(hash);
    return value;
}

module.exports = {
    setValueAndReturnHash,
    getValueByHash,
};