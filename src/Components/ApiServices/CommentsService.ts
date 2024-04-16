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
    body: ModeratorCommentModel | ParamsForComments
  ) {
    try {
      let data = await this._apiService.get(apiName, body);

      return data.json();
    } catch (err) {
      console.log(err);
    }
  }
}

export default CommentsService;
