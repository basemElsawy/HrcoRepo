import { paramsForComments } from "../Models/Models";
import ApiServiceClient from "./ApiServiceClient";

class CommentsService {
  _apiService: ApiServiceClient = new ApiServiceClient();
  constructor() {}

  public async getAdminComments(apiName: string, params: paramsForComments) {
    try {
      let data = await this._apiService.get(apiName, params);

      return data.json();
    } catch (error) {
      console.log(error);
    }
  }
}

export default CommentsService;
