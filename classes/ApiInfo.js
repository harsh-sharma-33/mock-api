export class ApiInfo {
  constructor(
    apiRouteSuffix,
    requestType,
    authorization,
    host = "http://localhost:3000"
  ) {
    this.apiRouteSuffix = apiRouteSuffix;
    this.requestType = requestType;
    this.authorization = authorization;
    this.host = host;
  }
}
