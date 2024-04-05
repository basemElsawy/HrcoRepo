import { ApiClient } from "./ApiServiceClient";
class ApiService {
  HttpClient: ApiClient = new ApiClient();
  constructor() {}

  public async GetMethod(apiName: string) {
    try {
      const data = await this.HttpClient.get(apiName);
      return data.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public async PostMethod<PostRequestBody>(
    apiName: string,
    body: PostRequestBody | any
  ) {
    try {
      const data = await this.HttpClient.post(apiName, body);
      return data;
    } catch (error) {
      console.error(error);

      throw error;
    }
  }
  public async PatchMethod<PatchRequestBody>(
    apiName: string,
    body: PatchRequestBody | any
  ) {
    try {
      const data = await this.HttpClient.patch(apiName, body);
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default ApiService;
