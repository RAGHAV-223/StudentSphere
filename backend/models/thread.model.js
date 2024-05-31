import mongoose from "mongoose";


// Forum Schema - Stores particular disucssion forum details
const threadSchema = new mongoose.Schema({
    title: { type: String, required: true },
    creatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    messagesIdList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Posts', default: [] },], // Array of message references
    files: [{ type: String }], // Add this line
    createdAt: { type: Date, default: Date.now }
},{ timestamps: true});

// Thread Schema - Stores threads(forums) created by a user
const userThreads = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    threadIdList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Thread', default: [] },]// Array of Threads 
}, { timestamps: true })

// message Schema within thread- Stores messages details
const messageSchema = new mongoose.Schema({
    threadId: { type: mongoose.Schema.Types.ObjectId, ref: 'Thread', required: true },
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    files: [{ type: String }], // Array of file URLs
    createdAt: { type: Date, default: Date.now }
}, { timestamps: true });


// Models based on the schemas
const Thread = mongoose.model("Thread", userThreads) // forums details of a user
const Forums = mongoose.model("Forums", threadSchema) // forums details
const Message = mongoose.model("Posts", messageSchema) // Messages in forums

export { Thread, Forums, Message };