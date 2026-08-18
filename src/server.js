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
    app.listen(env.port,()=>{console.log(`server started on port ${env.port}`);});
  }catch(error)
  {
    console.error("Server starting failed",error);
    await prisma.$disconnect();
    process.exit(1);
  }
  finally{
    process.on('SIGINT',async()=>{
      console.log("Interrupt received, closing the server...");
      await prisma.$disconnect();
      await redis.disconnect();
      process.exit(0);
    });
  }
}
startserver();

