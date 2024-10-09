
const conversationModel = require("../models/conversations.model")

exports.createConversation = async (
  userId,
  conversationId,
  userMessage,
  assistant_answer
) => {
  try {
    const conversation = new conversationModel({
      userId,
      conversationId,
      userMessage,
      assistant_answer,
    });
    await conversation.save();
    return conversation;
  } catch (error) {
    console.error("Error creating conversation:", error);
    throw new Error("Error creating conversation");
  }
};

exports.getConversation = async (conversationId) => {
  try {
    const conversation = await conversationModel.findOne({
      conversationId,
    });
    if (!conversation) {
      throw new Error("Conversation not found");
    }
    return conversation;
  } catch (error) {
    console.error("Error getting conversation:", error);
    throw new Error("Error getting conversation");
  }
};

exports.getConversationsById = async (conversationId) => {
    console.log("conversationId",conversationModel)
  try {
    const conversations = await conversationModel.find({
      conversationId: conversationId,
    },{userMessage:1,assistant_answer:1,_id:0});
    console.log('conversations',conversations)
    if (!conversations) {
      throw new Error("No conversations found");
    }
    //  FORMAT CONVERSATIONS FOR LANGCHAIN 
    const formattedConversations = conversations.map((conversation) => ({
      userMessage: conversation.userMessage,
      asistant_answer: conversation.assistant_answer,
    }));
    return formattedConversations;
  } catch (error) {
    console.error("Error getting conversations:", error);
    throw new Error("Error getting conversations");
  }
};
