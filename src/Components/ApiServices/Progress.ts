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
}

export default ProgressService;
