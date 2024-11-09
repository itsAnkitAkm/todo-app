import dotenv from 'dotenv';
import  app  from './app.ts';
import connectDB from './lib/connectDB.ts';


dotenv.config();

const port = process.env.PORT || 8000;

const start = async () => {
  try {
    if (process.env.MONGO_URL) {
      await connectDB(process.env.MONGO_URL);
      app.listen(port, () =>
        console.log(
           `Server is running at http://localhost:${port}`
        )
      );
    }


  } catch (error) {
    console.log(error);
  }
};
start();