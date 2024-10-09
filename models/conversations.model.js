const mongoose = require("mongoose");
const conversationSchema = new mongoose.Schema(
  {
    userId: {
    // can be ip or any unique id
      type: String,
      required: [true, "Name is a required field"],
    },
    conversationId: {
        // uuid
      type: String,
      required: [true, "conversationId is a required field"],
    },
    userMessage : {
      type: String,
      required: [true, "question is a required field"],
    },
    assistant_answer : {
      type: String,
      required: [true, "answer is a required field"],
    },
},
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("conversation", conversationSchema);