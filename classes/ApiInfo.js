export class ApiInfo {
  constructor(
    apiRouteSuffix,
    requestType,
    authorization = "BEARER_TOKEN",
    host = "http://localhost:3000"
  ) {
    this.apiRouteSuffix = apiRouteSuffix;
    this.requestType = requestType;
    this.authorization = authorization;
    this.host = host;
  }
}
