import { ProgressEditBody, QuarterEvaluation } from "../Models/Models";
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

  public async searchProgressByDate(apiName: string, body: any) {
    try {
      let searchedProgress = await this._apiClient.post(apiName, body);
      return searchedProgress.json();
    } catch (error) {
      console.log(error);
    }
  }

  public async addNewProgress(apiName: string, body: QuarterEvaluation) {
    try {
      let addedEvaluation = await this._apiClient.post(apiName, body);

      return addedEvaluation.json();
    } catch (error) {
      console.log(error);
    }
  }
}

export default ProgressService;
