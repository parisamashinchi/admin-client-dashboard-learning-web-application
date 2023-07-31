import { routes as privateRoutes } from "router/private";
import {Icon } from 'antd';

export default {
  items: [
      {
          id: "mainMenu",
          title: "user.mainMenu",
          type: "group",
          icon: "icon-navigation",
          children: [
              {
                  id: "userDashboard",
                  title: "user.dashboard",
                  type: "item",
                  icon: "dashboard",
                  url: privateRoutes.ROUTE_USER_DASHBOARD,
                  classes: "nav-item",
              },
              {
                  id: "userCourse",
                  title: "user.course",
                  type: "collapse",
                  icon: "play-square",
                  url: privateRoutes.ROUTE_USER_COURSE,
                  children: [
                      {
                          id: 'active',
                          title: 'user.course.active',
                          type: 'item',
                          url: privateRoutes.ROUTE_USER_COURSE_ACTIVE
                      },
                      {
                          id: 'inactive',
                          title: 'user.course.inactive',
                          type: 'item',
                          url: privateRoutes.ROUTE_USER_COURSE_INACTIVE
                      },
                      {
                          id: 'completed',
                          title: 'user.course.completed',
                          type: 'item',
                          url: privateRoutes.ROUTE_USER_COURSE_COMPLETED
                      },
                  ]
              },
              {
                  id: "userCertificate",
                  title: "user.certificate",
                  type: "item",
                  icon: "safety-certificate",
                  url: privateRoutes.ROUTE_USER_CERTIFICATE,
                  classes: "nav-item",
              },
              {
                  id: "userProfile",
                  title: "user.profile",
                  type: "collapse",
                  icon: "user",
                  url: privateRoutes.ROUTE_USER_PROFILE,
                  children: [
                      {
                          id: 'info',
                          title: 'user.profile.info',
                          type: 'item',
                          url: privateRoutes.ROUTE_USER_PROFILE_INFO
                      },
                      // {
                      //     id: 'password',
                      //     title: 'user.profile.password',
                      //     type: 'item',
                      //     url: privateRoutes.ROUTE_USER_PROFILE_PASSWORD
                      // },
                      {
                          id: 'report',
                          title: 'user.profile.report',
                          type: 'item',
                          url: privateRoutes.ROUTE_USER_PROFILE_REPORT
                      },
                  ]
              },
          ]
      },
  ],
};

