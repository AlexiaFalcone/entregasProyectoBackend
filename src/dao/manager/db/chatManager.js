import messagesModel from "../../models/messages.js";

class ChatManager {
    constructor() {

    }

    async createMessage() {
        try {
            const message = await messagesModel.create({message})
            return message
        } catch (error) {
            console.log(error)
        }
    }

    async getMessages() {
        try {
            const messages = await messagesModel.find()
            return messages
        } catch (error) {
            console.log(error)
        }
    }
}

export default ChatManager;