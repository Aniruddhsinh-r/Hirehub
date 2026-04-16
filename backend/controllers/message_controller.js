import { Conversation } from "../models/conversation_model.js";
import { Message } from "../models/message_model.js";

// Send a message to user :id
export const sendMessage = async (req, res) => {
    try {
        const senderId = req.id;
        const receiverId = req.params.id;
        const { text } = req.body;

        if (!text) {
            return res.status(400).json({
                message: "Message text is required.",
                success: false
            });
        }

        // Find or create conversation between these two users
        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
                messages: []
            });
        }

        const newMessage = await Message.create({
            senderId,
            receiverId,
            conversationId: conversation._id,
            text
        });

        conversation.messages.push(newMessage._id);
        await conversation.save();

        return res.status(201).json({
            message: newMessage,
            success: true
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to send message.",
            success: false
        });
    }
};

// Get all messages between current user and user :id
export const getMessages = async (req, res) => {
    try {
        const myId = req.id;
        const otherUserId = req.params.id;

        const conversation = await Conversation.findOne({
            participants: { $all: [myId, otherUserId] }
        }).populate({
            path: "messages",
            options: { sort: { createdAt: 1 } }
        });

        if (!conversation) {
            return res.status(200).json({
                messages: [],
                success: true
            });
        }

        return res.status(200).json({
            messages: conversation.messages,
            success: true
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to get messages.",
            success: false
        });
    }
};

// Get all conversations for the current user
export const getConversations = async (req, res) => {
    try {
        const userId = req.id;

        const conversations = await Conversation.find({
            participants: userId
        })
        .populate({
            path: "participants",
            select: "fullname email role profile.profilePhoto"
        })
        .populate({
            path: "messages",
            options: { sort: { createdAt: -1 }, limit: 1 }
        })
        .sort({ updatedAt: -1 });

        return res.status(200).json({
            conversations,
            success: true
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to get conversations.",
            success: false
        });
    }
};
