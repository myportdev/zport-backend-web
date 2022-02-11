import Redis from "ioredis";
const redis = new Redis({ host: "cache" });

export default redis;
