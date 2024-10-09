const {
    ChatOpenAI
} = require("@langchain/openai");
const openAIApiKey = process.env.OPENAI_API_KEY;
const llm = new ChatOpenAI({
    openAIApiKey: openAIApiKey
});
const { PromptTemplate } = require("@langchain/core/prompts");

const {
    createConversation,
    getConversationsById
} = require("../helpers/conversations.helper");


exports.converseWithUser = async (req, res) => {
    try {
        const {
            conversationId,
            userMessage
        } = req.body;
        //  fetch chat history
        let conversationHistory = await getConversationsById(conversationId);
        const userMessageTemplate = `
      You are a helpful and enthusiastic customer agent bot for the company, jobot, an ai powered job search platform.
      Your role is to register a user onto the platform.
      You will be given a user's message and the conversation history.
      Your task is to ask the user for the following information in the order :
      1. Full Name
      2. Email
      3. Phone Number
      4. Gender

      Your response should be a JSON object with the following keys:
      1. fullName : extracted user's full name from the message or conversation history.
      2. email : extracted user's email from the message or conversation history.
      3. phoneNumber : extracted user's phone number from the message or conversation history.
      4. gender : extracted user's gender from the message or conversation history.
      5. reply : Your friendly reply to the customer either asking them for the details specified or telling them you are done taking the details.
      6. done : a boolean value indicating whether the user has completed the registration process.

      In your reply, ask the user for only one detail at a time.

      Here is the conversation history:
      {conversationHistory}

      Here is the user's message:
      {userMessage}
      `
        const userMessagePrompt = PromptTemplate.fromTemplate(userMessageTemplate);
        const chain = userMessagePrompt.pipe(llm);
        const answer = await chain.invoke({
            userMessage: userMessage,
            conversationHistory: conversationHistory
        });
        finalAnswer = answer.content;
        res.status(200).send(finalAnswer);
        setImmediate(async () => {
            try {
                const userId = req.ip || 'no-ip';
                await createConversation(userId, conversationId, userMessage, JSON.stringify(finalAnswer));
            } catch (error) {
                console.error('Error saving chat log:', error);
            }
        });
    } catch (error) {
        console.error('Error in /api/chat endpoint:', error);
        return res.status(500).json(error);
    }
}