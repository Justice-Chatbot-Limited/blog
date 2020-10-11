import { post } from "../models/index";
import { Errors } from "../../helpers/errors";
import ControllersResponse from "../helpers/responses";
import { unvavailablePostData } from "../constante/customeMessages";
import {
  successCode,
  createdCode,
  errorCode,
  badRequestCode,
  forbiddenCode,
  unauthorizedCode,
  internalServerErrorCode,
} from "../constante/statusCodes";
import {
  successMsg,
  failMsg,
  badRequestMsg,
  notFound,
  forbidddenMsg,
  internalServerErroMsg,
} from "../constante/statusMessages";
import dotenv from "dotenv";
dotenv.config();

export class PostController {
  static async createPost(req, res) {
    const { title, description } = req.body;
    const myId = req.user.id;
    try {
      const createPost = {
        userid: myId,
        title: title,
        description: description,
      };
      // Adding the post in the database
      const createdata = await post.create(createPost);
      const fetchData = await post.findOne({
        where: { title: title },
      });
      // Getting post data from the database
      const data = {
        id: fetchData.id,
        userid: fetchData.userid,
        title: fetchData.title,
        description: fetchData.description,
        createdAt: fetchData.createdAt,
        updatedAt: fetchData.updatedAt,
      };

      if (createdata) {
        ControllersResponse.successResponse(res, createdCode, successMsg, data);
      }
    } catch (e) {
      Errors.errorResponse(res, e);
    }
  }

  static async getPosts(req, res) {
    const result = await post.findAll();
    if (!result) {
      ControllersResponse.errorResponse(
        res,
        errorCode,
        unvavailablePostData,
        result
      );
    } else {
      ControllersResponse.successResponse(res, successCode, successMsg, result);
    }
  }

  static async getPost(req, res) {
    const getId = parseInt(req.params.id, 10);
    // Querying the post from the db
    const result = await post.findOne({
      where: { id: getId },
    });
    if (!result) {
      ControllersResponse.errorResponse(
        res,
        errorCode,
        unvavailablePostData,
        result
      );
    } else {
      ControllersResponse.successResponse(res, successCode, successMsg, result);
    }
  }

  static async updatePost(req, res) {
    const getPostId = parseInt(req.params.id, 10);
    const getTokenId = req.user.id;
    const result = await post.findOne({
      where: { id: getPostId },
    });
    if (!result) {
      ControllersResponse.errorResponse(
        res,
        errorCode,
        unvavailablePostData,
        result
      );
    }
    if (result.userid === getTokenId) {
      await post.update(req.body, {
        where: { id: getPostId },
      });
      const newResult = await post.findByPk(getPostId);
      ControllersResponse.errorResponse(
        res,
        errorCode,
        unvavailablePostData,
        newResult
      );
    } else {
      ControllersResponse.errorResponse(res, forbiddenCode, forbidddenMsg)
    }
  }

  static async deletePost(req, res) {
    const getPostId = parseInt(req.params.id, 10);
    const getTokenId = req.user.id;
    const result = await post.findOne({
      where: { id: getPostId },
    });
    ControllersResponse.errorResponse(
      res,
      errorCode,
      unvavailablePostData,
      result
    );
    if (result.userid === getTokenId) {
      await post.destroy({
        where: { id: getPostId },
      });
      ControllersResponse.successResponse(res, successCode, successMsg, result);
    } else {
      ControllersResponse.errorResponse(res, forbiddenCode, forbidddenMsg);
    }
  }
}

export default PostController;
