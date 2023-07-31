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
            ],
        },
    ],
};

