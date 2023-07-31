import { routes as privateRoutes } from "router/private";

export default {
    items: [
        {
            id: "services",
            title: "nav.services",
            type: "group",
            icon: "icon-navigation",
            children: [
                {
                    id: "course",
                    title: "nav.course",
                    type: "item",
                    icon: "feather icon-layers",
                    url: privateRoutes.ROUTE_COURSE_LIST,
                    classes: "nav-item",
                },
                {
                    id: "discount",
                    title: "nav.discount",
                    type: "item",
                    icon: "feather icon-layers",
                    url: privateRoutes.ROUTE_DISCOUNT_LIST,
                    classes: "nav-item",
                },
                {
                    id: "user_management",
                    title: "nav.user.management",
                    type: "item",
                    icon: "feather icon-layers",
                    url: privateRoutes.ROUTE_USER_MANAGEMENT_LIST,
                    classes: "nav-item",
                },
                {
                    id: "package",
                    title: "nav.package",
                    type: "item",
                    icon: "feather icon-layers",
                    url: privateRoutes.ROUTE_PACKAGE_LIST,
                    classes: "nav-item",
                },
            ],
        },
    ],
};

