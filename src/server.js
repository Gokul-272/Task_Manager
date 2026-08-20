const app=require('./app');
const prisma=require('./config/prisma');
const redis=require('./config/redis');
const env=require('./config/env')
async function startserver()
{
  try{
    await prisma.$connect();
    console.log("PostgreSQL connected");
    await redis.connect();
    console.log("Redis connected");
    const server =app.listen(env.port,()=>{console.log(`server started on port ${env.port}`);});
    const shutdown = async () => {
    console.log("Shutting down...");
    await prisma.$disconnect();
    await redis.disconnect();
    process.exit(0);
    };
    process.on("SIGINT", shutdown);
  }
  catch(error)
  {
    console.error("Server starting failed",error);
    await prisma.$disconnect();
    await redis.disconnect();
    process.exit(1);
  }
}
startserver();

