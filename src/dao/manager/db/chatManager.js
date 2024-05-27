import messagesModel from "../../models/messages.js";

class ChatManager {
    constructor() {

    }

    async createMessage(data) {
        try {
            const message = await messagesModel.create(data)
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