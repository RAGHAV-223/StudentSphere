import { Thread, Message, Forums } from "../models/thread.model.js";
import multer from "multer";

// Configure Multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Directory to save uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Save file with unique name
    }
});

const upload = multer({ storage: storage }).array('files', 10); // Allow up to 10 files


// this file creates threads, forums
export const createThread = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ message: 'File upload failed' });
        }

        try {
            const title = req.body.title;
            const creatorId = req.user._id;
            const fileUrls = req.files.map(file => `/uploads/${file.filename}`);

            const newForum = await Forums.create({
                title: title,
                creatorId: creatorId,
                files: fileUrls
            });

            if (newForum) {
                let userthreads = await Thread.findOne({ userId: creatorId }).populate('threadIdList');

                if (!userthreads) {
                    userthreads = await Thread.create({
                        userId: creatorId,
                    });
                }

                userthreads.threadIdList.push(newForum._id);

                await Promise.all([newForum.save(), userthreads.save()]);
            } else {
                res.status(400).json({ error: "Invalid Thread data, Thread not created" });
            }

            res.status(200).json({ message: "Thread Created Successfully" });
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    });
};

export const viewThreads = async (req, res) =>  // fetch all threads of a forum 
    {
    try {
        let allForums = await Forums.find().populate('title');

        // console.log(allForums)
        if (allForums) {
            res.status(200).json({ message: "Threads list", allForums });
        } else {
            res.status(404).json({ message: "No thread found" })
        }
    } catch (error) {
        console.log("Error in viewThread controller: ", error.message)
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getForumMessages = async (req, res) => 
    {
    try {
        const { id: threadId } = req.params;
        
        const forum = await Forums.findById(threadId);

        if (forum) {
            // If the forum is found, return it in the response
            const messagesIdList = forum.messagesIdList
            const messagesContent = await Message.find({ _id: { $in: messagesIdList } });
            res.status(200).json({ messages: messagesContent });
        } else {
            // If the thread is not found, return a 404 Not Found response
            res.status(404).json({ message: "Thread not found" });
        }

    } catch (error) {
        console.log("Error in getThread controller: ", error.message)
        res.status(500).json({ message: "Internal server error" });
    }
}

// to retrive threads of a user
export const userThreads = async (req, res) => {
    try {
        const { id: threadId } = req.params;
        const authorId = req.user._id;
        const content = req.body.content;
        
        const thread = await Forums.findById(threadId);
        
        if (thread) {
            
            const newMessage = await Message.create({
                threadId: threadId,
                authorId: authorId,
                content: content,
            })
            
            if (newMessage){
                thread.messagesIdList.push(newMessage._id)
                // await newMessage.save()
                // await thread.save()
                await Promise.all([newMessage.save(), thread.save()])
                res.status(201).json({message: "New Message Posted in Thread"})
            }else{
                res.status(400).json({message: "Message not created"})
            }
            
        } else {
            // If the thread is not found, return a 404 Not Found response
            res.status(404).json({ message: "Thread not found" });
        }
    } catch (error) {
        console.log("Error in updateThread controller: ", error.message)
        res.status(500).json({ message: "Internal server error" });
    }
}

export const updateThread = async (req, res) => {
    try {
        const { id: threadId } = req.params;
        const authorId = req.user._id;
        const content = req.body.content;
        
        const thread = await Forums.findById(threadId);
        
        if (thread) {
            
            const newMessage = await Message.create({
                threadId: threadId,
                authorId: authorId,
                content: content,
            })
            
            if (newMessage){
                thread.messagesIdList.push(newMessage._id)
                // await newMessage.save()
                // await thread.save()
                await Promise.all([newMessage.save(), thread.save()])
                res.status(201).json({message: "New Message Posted in Thread"})
            }else{
                res.status(400).json({message: "Message not created"})
            }
            
        } else {
            // If the thread is not found, return a 404 Not Found response
            res.status(404).json({ message: "Thread not found" });
        }
    } catch (error) {
        console.log("Error in updateThread controller: ", error.message)
        res.status(500).json({ message: "Internal server error" });
    }
}

// export const deleteThread = async (req, res) => {
// try {
//     const threadList = await Thread.find().map(_id)
//         console.log(threadList)
//         res.status(200).json({ message: "Threads list" });
//     } catch (error) {
//         console.log("Error in deleteThread controller: ", error.message)
//         res.status(500).json({ message: "Internal server error" });
//     }
// }

export default { getForumMessages, viewThreads, createThread, updateThread, userThreads }