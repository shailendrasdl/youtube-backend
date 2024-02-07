import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { user, post } from "../constants.js";
import axios from "axios";

const promisesAll = asyncHandler(async (req, res) => {
  try {
    const [usersResponse, postsResponse] = await Promise.all([
      axios.get(`${process.env.baseURI}/${user}`),
      axios.get(`${process.env.baseURI}/${post}`),
    ]);
    let data = {
      user: usersResponse.data,
      post: postsResponse.data,
    };
    return res
      .status(200)
      .json(new ApiResponse(200, data, "Response successfully"));
  } catch (error) {
    console.log("Inside Catch:-  error :", error);
  }
});

export { promisesAll };
