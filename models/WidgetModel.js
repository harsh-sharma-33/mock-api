import ApiResponse, { requestTypes } from "../Schemas/Schemas.js";
import { v4 as uuid } from "uuid";
import { ApiInfo } from "../classes/ApiInfo.js";
import { viewToBeAdded } from "../dummyData/viewDummyData.js";
import { sideNavToBeAdded } from "../dummyData/sideNavDummyData.js";
import { loginToBeAdded } from "../dummyData/loginDummyData.js";
import { widgetToBeAddedList } from "../dummyData/widgetDummyData.js";
export class WidgetModel {
  static async addView(
    viewName,
    sideNavItem,
    widgetName,
    widgetResponse,
    cb,
    errCb
  ) {
    try {
      const viewUUID = uuid();
      const aclUUID = uuid();
      const widgetUUID = uuid();

      viewToBeAdded.name = viewName;
      viewToBeAdded.id = viewUUID;
      viewToBeAdded.aclId = aclUUID;

      const viewList = await ApiResponse.findOne({
        path: "/view-and-api-management/tenant/view/switch-views/list",
      });
      viewList.response = [...viewList.response, { ...viewToBeAdded }];
      const finalPreparedData = {};
      const savedViewList = await viewList.save();
      const sideNavData = await this.addSideNav(
        sideNavItem,
        viewUUID,
        widgetUUID
      );
      const addedFinalWidget = await this.addFinalWidget(
        widgetResponse,
        widgetUUID,
        widgetName
      );
      finalPreparedData = { savedViewList, sideNavData, addedFinalWidget };
      if (cb) {
        cb(finalPreparedData);
      }
    } catch (error) {
      if (errCb) {
        errCb(error);
      }
    }
  }

  static async findApi(filter, cb, errCb) {
    ApiResponse.findOne(filter)
      .then((response) => {
        if (cb) {
          cb(response);
        }
      })
      .catch((error) => {
        if (errCb) {
          errCb(error);
        }
      });
  }

  static async addSideNav(sideNavItem, viewUUID, widgetUUID) {
    const sideNavUUID = uuid();

    sideNavToBeAdded.attributes.name = sideNavItem;
    sideNavToBeAdded.attributes.id = sideNavUUID;
    sideNavToBeAdded.attributes.nextUrl = `/view-and-api-management/tenant/view/sidebar/attribute/${sideNavUUID}/widgets`;
    sideNavToBeAdded.landingPageAttributes.name = "test";
    sideNavToBeAdded.landingPageAttributes.id = sideNavUUID;
    sideNavToBeAdded.landingPageAttributes.nextUrl = `/view-and-api-management/tenant/view/sidebar/attribute/${sideNavUUID}/widgets`;
    const sideNavApi = await new ApiResponse({
      path: `/view-and-api-management/tenant/view/sidebar/${viewUUID}`,
      requestType: requestTypes.GET,
      response: sideNavToBeAdded,
    });
    const sideNavPreparedData = {};
    const addedSideNavApi = await sideNavApi.save();
    const addedLoginApi = await this.addLoginApi(viewUUID);
    const widgetList = await this.addWidgetList(sideNavUUID, widgetUUID);
    sideNavPreparedData["Side Nav Added"] = addedSideNavApi;
    sideNavPreparedData["Login Api"] = addedLoginApi;
    sideNavPreparedData["WidgetList"] = widgetList;
    return sideNavPreparedData;
  }

  static async addLoginApi(viewUUID) {
    loginToBeAdded.path = `/identity-access-management/auth/login/${viewUUID}`;

    const loginApiAdded = await new ApiResponse(loginToBeAdded);
    return await loginApiToBeAdded.save();
  }
  static async addWidgetList(sideNavUUID, widgetUUID) {
    widgetToBeAddedList.path = `/view-and-api-management/tenant/view/sidebar/attribute/${sideNavUUID}/widgets`;
    widgetToBeAddedList.response.widgets[0].id = widgetUUID;
    const widgetList = await new ApiResponse();
    return await widgetList.save();
  }

  static async addFinalWidget(widgetResponse, widgetUUID, widgetName) {
    // const widgetUUID = uuid();
    widgetResponse["text"] = widgetName;
    widgetResponse["widgetId"] = widgetUUID;

    const widgetToBeAdded = await new ApiResponse({
      path: `/view-and-api-management/widgets/${widgetUUID}`,
      requestType: requestTypes.GET,
      response: widgetResponse,
    });
    this.addListingApi(widgetResponse);
    this.addAdditionalApis(widgetResponse);
    return await widgetToBeAdded.save();

    // res.status(200).json({ viewList, addedLoginApi, addedSideNavApi });
  }

  static async addListingApi(widgetInfo) {
    const listingResponse = widgetInfo["list"]["response"];
    const listingReqType = widgetInfo["list"]["type"];
    const apiInfo = new ApiInfo(
      `/listing/response/${widgetInfo["widgetId"]}`,
      listingReqType,
      "BEARER_TOKEN"
    );
    widgetInfo["list"] = apiInfo;
    this.addNewApi(
      apiInfo.apiRouteSuffix,
      apiInfo.requestType,
      listingResponse,
      (result) => {
        console.log(result);
      }
    );
  }

  static async addAdditionalApis(widgetInfo) {
    const keys = Object.keys(widgetInfo["additionalApisForWidget"]);
    if (!keys.length) return;

    for (let i = 0; i < keys.length; i++) {
      const apiResponse =
        widgetInfo["additionalApisForWidget"][keys[i]]["response"];
      const apiResponseType =
        widgetInfo["additionalApisForWidget"][keys[i]]["type"];
      const apiInfo = new ApiInfo(
        `/additional-api/response/${widgetInfo["widgetId"]}`,
        apiResponseType
      );
      widgetInfo["additionalApisForWidget"][keys[i]] = apiInfo;
      this.addNewApi(
        apiInfo.apiRouteSuffix,
        apiInfo.requestType,
        apiResponse,
        (result) => {
          console.log(result);
        }
      );
    }
  }

  static async addNewApi(path, requestType, response, cb, errCb) {
    ApiResponse.create({
      path,
      requestType,
      response,
    })
      .then((response) => {
        if (response && cb) {
          cb(response);
        }
      })
      .catch((err) => {
        console.error(error);
        if (errCb) {
          errCb(err);
        }
      });
  }
}
