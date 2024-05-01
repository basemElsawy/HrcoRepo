import { ProgressEditBody } from "../Models/Models";
import ApiClient from "./ApiServiceClient";
class ProgressService {
  _apiClient: ApiClient = new ApiClient();

  public async getAllProgress<ProgressParam>(
    apiName: string,
    param: ProgressParam
  ) {
    try {
      let progressData = await this._apiClient.get(apiName, param);

      return progressData.json();
    } catch (err) {
      console.log(err);
    }
  }
  public async updateCertainProgress<ProgressParam>(
    apiName: string,
    body: ProgressEditBody
  ) {
    try {
      let progressData = await this._apiClient.put(apiName, body);

      return progressData.json();
    } catch (err) {
      console.log(err);
    }
  }
}

export default ProgressService;
