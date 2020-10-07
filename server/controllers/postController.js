import { post } from "../models/index";
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
        where: { title: req.body.title },
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
        res.status(201).json({
          success: 201,
          message: "Post Created Successfully",
          data,
        });
      }
    } catch (e) {
      return res.status(400).json({
        status: 400,
        message: "something went wrong",
      });
    }
  }

  static async getPosts(req, res) {
    const result = await post.findAll();
    if (result.length < 1) {
      return res.status(404).json({
        status: 404,
        message: "Posts datas unavailable",
      });
    } else {
      return res.status(200).json({
        status: 200,
        data: result,
      });
    }
  }

  static async getPost(req, res) {
    const getId = parseInt(req.params.id);
    // Querying the post from the db
    const result = await post.findOne({
      where: { id: getId },
    });
    if (result.length < 1) {
      return res.status(404).json({
        status: 404,
        message: "Post data unavailable",
      });
    } else {
      return res.status(200).json({
        status: 200,
        data: result,
      });
    }
  }

  static async updatePost(req, res) {
    const getPostId = parseInt(req.params.id);
    const getTokenId = req.user.id;
    const result = await post.findOne({
      where: { id: getPostId },
    });
    if (!result) {
      return res.status(404).json({
        status: 404,
        message: "Post data unavailable",
      });
    }
    if (result.userid === getTokenId) {
      await post.update(req.body, {
        where: { id: getPostId },
      });
      return res.status(200).json({
        status: 200,
        message: "Post update successfully",
        data: result,
      });
    } else {
      return res.status(403).json({
        status: 403,
        message: "You are not allowed to perform that action",
      });
    }
  }

  static async deletePost(req, res) {
    const getPostId = parseInt(req.params.id);
    const getTokenId = req.user.id;
    const result = await post.findOne({
      where: { id: getPostId },
    });
    if (!result) {
      return res.status(404).json({
        status: 404,
        message: "Post data unavailable",
      });
    }
    if (result.userid === getTokenId) {
      await post.destroy({
        where: { id: getPostId },
      });
      return res.status(200).json({
        status: 200,
        message: "Post deleted successfully",
        data: result,
      });
    } else {
      return res.status(403).json({
        status: 403,
        message: "You are not allowed to perform that action",
      });
    }
  }
}

export default PostController;
