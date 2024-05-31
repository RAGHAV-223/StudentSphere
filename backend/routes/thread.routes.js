import express from "express"
import multer from "multer";
import protectRoute from "../middleware/protectRoute.js"
import { getForumMessages, viewThreads, createThread, updateThread, userThreads} from "../controllers/message.controller.js";

const route = express.Router()
 
// Configure Multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Directory to save uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Save file with unique name
    }
});

const upload = multer({ storage: storage });

// All discussion forum routes
route.get("/",protectRoute, viewThreads) //get all the threads
route.get("/myforums", protectRoute, upload.array('files', 10), userThreads) // get all the threads created by user
route.post("/create/", protectRoute, upload.array('files', 10), createThread) // create new thread
route.get("/:id", protectRoute, getForumMessages) // Retreve messages in the thread with id
route.put("/:id/update", protectRoute, upload.array('files', 10), updateThread) //update message in thread with id

// route.post("/:id/delete", protectRoute, deleteThread) // delete thread with id 

export default route;