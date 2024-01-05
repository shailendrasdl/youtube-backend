import axios from "axios";

const webhookUrl = async (req, res, next) => {
  console.log("-- call webhookUrl api --");
  try {
    const payload = {
      code: "2",
      status: "PENDING",
      message: "YOUR ORDER PENDING",
    };
    let result = await axios({
      method: "POST",
      url: "https://atom.requestcatcher.com/webhook",
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
    res.status(200).json({ statusCode: result.status, message: "Success" });
  } catch (error) {
    console.log("error :", error);
  }
};

export { webhookUrl };
