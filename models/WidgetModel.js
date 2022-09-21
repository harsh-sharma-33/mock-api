import ApiResponse, { requestTypes } from "../Schemas/Schemas.js";
import { v4 as uuid } from "uuid";
export class WidgetModel {
  static async addView(
    req,
    res,
    viewName,
    sideNavItem,
    widgetId,
    widgetResponse
  ) {
    const viewUUID = uuid();
    const sideNavUUID = uuid();
    const aclUUID = uuid();

    console.log({ viewUUID, sideNavUUID, aclUUID, widgetId });

    const viewToBeAdded = {
      name: viewName,
      id: viewUUID,
      aclId: aclUUID,
      createdOn: "2022-05-05",
      lastModifiedOn: "2022-09-15",
      editable: true,
      policyId: "1f356506-0370-41f4-b8bc-279db7c61751",
      viewScope: "TENANT",
      viewIcon: "view",
      viewIconType: "SVG",
      viewPassed: false,
    };

    const viewList = await ApiResponse.findOne({
      path: "/view-and-api-management/tenant/view/switch-views/list",
    });
    viewList.response = [
      ...viewList.response,
      { ...viewToBeAdded, sideNavItem },
    ];
    viewList.save();

    const sideNavToBeAdded = {
      attributes: [
        {
          name: sideNavItem,
          id: sideNavUUID,
          icon: "assets/cloud-icons/aws-dark-logo.png",
          iconType: "IMAGE",
          level: 1,
          nextUrl: `/view-and-api-management/tenant/view/sidebar/attribute/${sideNavUUID}/widgets`,
          lastLevel: true,
        },
      ],
      landingPageAttributes: [
        {
          name: "harsh-security",
          id: sideNavUUID,
          icon: "assets/cloud-icons/aws-dark-logo.png",
          iconType: "IMAGE",
          nextUrl: `/view-and-api-management/tenant/view/sidebar/attribute/${sideNavUUID}/widgets`,
          lastLevel: true,
        },
      ],
    };

    const sideNavApi = await new ApiResponse({
      path: `/view-and-api-management/tenant/view/sidebar/${viewUUID}`,
      requestType: requestTypes.GET,
      response: sideNavToBeAdded,
    });
    const addedSideNavApi = await sideNavApi.save();
    const loginApiToBeAdded = await new ApiResponse({
      path: `/identity-access-management/auth/login/${viewUUID}`,
      requestType: requestTypes.GET,
      response: {
        tokens: {
          oldTokens: {
            iotCredentials: {
              accessKeyId: "ASIAQ37L2F7Q2GEUZGG6",
              secretAccessKey: "W0THzwRcnZvE6V9T8WdfZGKZwrjN0H6Ehkpa5L/+",
              sessionToken:
                "FwoGZXIvYXdzEI3//////////wEaDE61DPeg0TiTZRSyNCLUAh7ZLyH70cowpR7+0BHD/8dVrnGYJBSdo6EpZXEToFGc/hvPDCZ4/5qh8l1i3z+LbfDKmUPaLIycGZwy8ZbFr6SbtUDpd7WH/dbmqYMKopHJt/fSPrtEzRbpQF/6F9LUBZrjBE682VoKGI+6pmSYTAykYlFNTBKsNEelLEDfbRMj29wUkIgAhmlaLbCK3GZ+UHigf7cRfvUPgVwAvnVbX41dBojetGr26WNCsobrXooHHkT0pJq6aKw3n1vAKpTn5APMZtT0d3BH/7q0hXa/38wnrrt0hJRx/eJFbKw3T9+l0r5SxwC+3MOSD1UEYdgjdisugkq98f86kKKFHj6b8ZCjX9HyXiynoeCOwfTcGq7o7VXxc9m+yNJSmEkIwmVTdy0fiSOXeNFoSidXXqIvWnn42uCXjyqj5DiFuvzarwBxOgnosa3B2uX+w5CDlsY4gANAdBYo1fnhmAYyKQQWF8puv99mONEskAt/vq1A5pWsFDBeW0gHqNiUmJTI2P1UvQh1EKy5",
              region: "ap-south-1",
              endpoint: "a24ng2c0g8ro1n-ats.iot.ap-south-1.amazonaws.com",
              topic: "7efb33ac-915c-456d-9f4e-901c3b8e4340",
            },
          },
          bearerToken:
            "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkZXZfY2VudEBjZW50aWx5dGljcy5jb20iLCJuYmYiOjE2NjI1NDkyMDUsImlvdF90b3BpYyI6IjdlZmIzM2FjLTkxNWMtNDU2ZC05ZjRlLTkwMWMzYjhlNDM0MCIsIkRPTUFJTl9JRCI6ImNlbnRpbHl0aWNzIiwiYWN0aXZlX3ZpZXciOiIwNDExNDE3Yi1kZTk1LTQyNTAtYTkxMS0yZDE1OTAxMWI5Y2QiLCJpc3MiOiJDRU5USUxZVElDUyIsIlRFTkFOVF9JRCI6ImU5MjE5NDY4LWY1ZjUtNDVlMS1hYzY2LTcwOGE1NDU0NWIxZiIsImV4cCI6MTY2MjU3NDQwNSwiaWF0IjoxNjYyNTQ5MjA1fQ.UdDC2I_43u4nXW68f6IueFcOch2MDVr_ZT7QnbCpobUOvloD3fbajoNF6yGCdF2a_AFZZZYMsVwQRhmiqUJwxw",
        },
        messages: [],
        enabledMfa: false,
        defaultViewId: "0411417b-de95-4250-a911-2d159011b9cd",
        firstName: "Dev-Team",
        lastName: "Team",
        expiredLogin: false,
        licenseExpired: false,
        companyName: "Centilytics",
        type: "User",
        root: false,
        email: "dev_cent@centilytics.com",
        configuredMfa: false,
        domain: "centilytics",
        allowDomainBasedUser: false,
        licenseAccepted: true,
      },
    });
    const addedLoginApi = await loginApiToBeAdded.save();

    const widgetList = await new ApiResponse({
      path: `/view-and-api-management/tenant/view/sidebar/attribute/${sideNavUUID}/widgets`,
      requestType: requestTypes.GET,
      response: {
        page: 0,
        totalPages: 1,
        widgets: [
          {
            id: widgetId,
            name: "TEST Widget",
            supportedFormats: ["REPORT", "ALERT"],
            group: 0,
            position: 0,
          },
        ],
      },
    });
    const addedWidgetList = await widgetList.save();
    console.log(addedWidgetList);

    const widgetToBeAdded = await new ApiResponse({
      path: "/view-and-api-management/widgets/db8fe23a-72ff-44ce-9a1a-8d57c56b595d",
      requestType: requestTypes.GET,
      response: widgetResponse,
    });
    const addedWidget = await widgetToBeAdded.save();
    res.status(200).json({ viewList, addedLoginApi, addedSideNavApi });
  }
}
