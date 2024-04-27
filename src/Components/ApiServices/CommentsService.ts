import {
  CommentUpdateModel,
  ModeratorCommentModel,
  ParamsForComments,
} from "../Models/Models";
import ApiServiceClient from "./ApiServiceClient";

class CommentsService {
  _apiService: ApiServiceClient = new ApiServiceClient();
  constructor() {}

  public async getAdminComments(apiName: string, params: ParamsForComments) {
    try {
      let data = await this._apiService.get(apiName, params);

      return data.json();
    } catch (error) {
      console.log(error);
    }
  }
  public async editOnSpecificComment(
    apiName: string,
    body: CommentUpdateModel | string
  ) {
    try {
      let data = await this._apiService.patch(apiName, body);

      return data.json();
    } catch (err) {
      console.log(err);
    }
  }

  public async getSearchedComments(
    apiName: string,
    body?: ModeratorCommentModel | ParamsForComments | { moderatorID: string }
  ) {
    try {
      let data = await this._apiService.get(apiName, body);

      return data.json();
    } catch (err) {
      console.log(err);
    }
  }
  public async addCommentToUser(body: Comment) {
    try {
      let data = await this._apiService.post(
        "/api/Comments/setComment",
        JSON.stringify(body)
      );

      return data.json();
    } catch (error) {
      console.log(error);
    }
  }
  public async deleteComment<DeleteHandlerBody>(body: DeleteHandlerBody) {
    try {
      let data = await this._apiService.delete(
        "/api/Comments/deleteComment",
        body
      );

      return data.json();
    } catch (error) {
      console.log(error);
    }
  }
}

export default CommentsService;
