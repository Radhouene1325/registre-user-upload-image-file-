import express from "express";
import User from "./models/user.Model.js";
import bodyParser from "body-parser";
import router from './routes/filrRoute.js'
// import categoryRoute from './serveurProduct/routesProduct/roteCategory.js'
import cors from "cors";
const app = express();
/********Connection with Db */
import mongoose from "mongoose";
import multer from "multer";
const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb+srv://khalfaradhouene:10813943radhouene@cluster0.kn5ir.mongodb.net/listeVedio?retryWrites=true&w=majority')
    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.error(`Error: ${error.message}`.red.underline.bold)
    process.exit(1)
  }
}
connectDB()
/************************** */
app.use(
  cors({
    origin: "*",
  })
);


app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
// indice pour pointer sur le dossier public pour les fichiers
app.use(express.static("public"));

app.listen(3000, () => {
  console.log("listning port 3000 ...");
});

app.use(router);
// app.use(categoryRoute)
app.use("/api", router);
// app.use('/apiCategory', categoryRoute)
// app.use("/api", uploadRouter);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname)
  }
});

export const upload = multer({ storage: storage }).single('image')


/*************************
 * SERCH WITH KEY 
 */
app.get('/serch/:key', async (req, res) => {

  const user = await User.find({
        "$or":[
                {name:{$regex:req.params.key}}
        ]
  })
  res.json({data:user})
})