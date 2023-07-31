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
          id: "profile",
          title: "nav.profile",
          type: "item",
          icon: "feather icon-home",
          url: privateRoutes.ROUTE_CATEGORIES,
          classes: "nav-item",
          hidden: true,
        },
        {
          id: "settings",
          title: "nav.settings",
          type: "item",
          icon: "feather icon-home",
          url: privateRoutes.ROUTE_SETTINGS,
          classes: "nav-item",
          hidden: true,
        },
        // {
        //   id: "dashboard",
        //   title: "nav.dashboard",
        //   type: "item",
        //   icon: "feather icon-home",
        //   url: privateRoutes.ROUTE_DASHBOARD,
        //   classes: "nav-item",
        // },
        // {
        //   id: "materials",
        //   title: "nav.materials",
        //   type: "item",
        //   icon: "feather icon-paperclip",
        //   url: privateRoutes.ROUTE_MATERIALS_LIST,
        //   classes: "nav-item",
        // },
        // {
        //   id: "chapters",
        //   title: "nav.chapters",
        //   type: "item",
        //   icon: "feather icon-book",
        //   url: privateRoutes.ROUTE_CHAPTERS_LIST,
        //   classes: "nav-item",
        // },
        // {
        //   id: "categories",
        //   title: "nav.categories",
        //   type: "item",
        //   icon: "feather icon-layers",
        //   url: privateRoutes.ROUTE_CATEGORIES_LIST,
        //   classes: "nav-item",
        // },
        // {
        //   id: "courses",
        //   title: "nav.courses",
        //   type: "item",
        //   icon: "feather icon-layers",
        //   url: privateRoutes.ROUTE_COURSES_LIST,
        //   classes: "nav-item",
        // },
          {
              id: "slider",
              title: "nav.slider",
              type: "item",
              icon: "feather icon-layers",
              url: privateRoutes.ROUTE_SLIDER_LIST,
              classes: "nav-item",
          },
        {
          id: "parallel",
          title: "nav.parallel",
          type: "item",
          icon: "feather icon-layers",
          url: privateRoutes.ROUTE_PARALLEL_LIST,
          classes: "nav-item",
        },
        {
          id: "exam",
          title: "nav.exam",
          type: "item",
          icon: "feather icon-layers",
          url: privateRoutes.ROUTE_EXAM_LIST,
          classes: "nav-item",
        },
        {
          id: "video",
          title: "nav.video",
          type: "item",
          icon: "feather icon-layers",
          url: privateRoutes.ROUTE_VIDEO_LIST,
          classes: "nav-item",
        },
        {
          id: "reading",
          title: "nav.reading",
          type: "item",
          icon: "feather icon-layers",
          url: privateRoutes.ROUTE_READING_LIST,
          classes: "nav-item",
        },
        {
          id: "season",
          title: "nav.season",
          type: "item",
          icon: "feather icon-layers",
          url: privateRoutes.ROUTE_SEASON_LIST,
          classes: "nav-item",
        },
        {
          id: "tag",
          title: "nav.tag",
          type: "item",
          icon: "feather icon-layers",
          url: privateRoutes.ROUTE_TAG_LIST,
          classes: "nav-item",
        },
        {
          id: "property",
          title: "nav.property",
          type: "item",
          icon: "feather icon-layers",
          url: privateRoutes.ROUTE_PROPERTY_LIST,
          classes: "nav-item",
        },
        {
          id: "category",
          title: "nav.category",
          type: "item",
          icon: "feather icon-layers",
          url: privateRoutes.ROUTE_CATEGORY_LIST,
          classes: "nav-item",
        },
        {
          id: "course",
          title: "nav.course",
          type: "item",
          icon: "feather icon-layers",
          url: privateRoutes.ROUTE_COURSE_LIST,
          classes: "nav-item",
        },
        {
          id: "teacher",
          title: "nav.teacher",
          type: "item",
          icon: "feather icon-layers",
          url: privateRoutes.ROUTE_TEACHER_LIST,
          classes: "nav-item",
        },
        {
          id: "album",
          title: "nav.album",
          type: "item",
          icon: "feather icon-layers",
          url: privateRoutes.ROUTE_ALBUM_LIST,
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
          id: "package",
          title: "nav.package",
          type: "item",
          icon: "feather icon-layers",
          url: privateRoutes.ROUTE_PACKAGE_LIST,
          classes: "nav-item",
        },
        {
          id: "question",
          title: "nav.question",
          type: "item",
          icon: "feather icon-layers",
          url: privateRoutes.ROUTE_QUESTION_LIST,
          classes: "nav-item",
        },
        {
          id: "comments",
          title: "nav.comments",
          type: "item",
          icon: "feather icon-layers",
          url: privateRoutes.ROUTE_COMMENTS_LIST,
          classes: "nav-item",
        },
        {
          id: "survey",
          title: "nav.survey",
          type: "item",
          icon: "feather icon-layers",
          url: privateRoutes.ROUTE_SURVEY_LIST,
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
          id: "live",
          title: "nav.live",
          type: "item",
          icon: "feather icon-layers",
          url: privateRoutes.ROUTE_LIVE_LIST,
          classes: "nav-item",
        },
        {
          id: "department",
          title: "nav.department",
          type: "item",
          icon: "feather icon-layers",
          url: privateRoutes.ROUTE_DEPARTMENT_LIST,
          classes: "nav-item",
        },
        {
          id: "faq",
          title: "nav.faq",
          type: "item",
          icon: "feather icon-layers",
          url: privateRoutes.ROUTE_FAQ_LIST,
          classes: "nav-item",
        },
        // {
        //   id: "slideShow",
        //   title: "nav.slideShow",
        //   type: "collapse",
        //   icon: "feather icon-image",
        //   children: [
        //     {
        //       id: "addSlideShow",
        //       title: "nav.slideShow.addSlideShow",
        //       type: "item",
        //       url: privateRoutes.ROUTE_SLIDE_SHOW_ADD,
        //     },
        //     {
        //       id: "editSlideshow",
        //       title: "nav.slideShow.editSlideshow",
        //       type: "item",
        //       url: privateRoutes.ROUTE_SLIDE_SHOW_EDIT,
        //       hidden: true,
        //     },
        //     {
        //       id: "slideShowList",
        //       title: "nav.slideShow.slideShowList",
        //       type: "item",
        //       url: privateRoutes.ROUTE_SLIDE_SHOW_LIST,
        //     },
        //   ],
        // },
        // {
        //   id: "company",
        //   title: "nav.company",
        //   type: "collapse",
        //   icon: "feather icon-award",
        //   children: [
        //     {
        //       id: "addCompany",
        //       title: "nav.company.addCompany",
        //       type: "item",
        //       url: privateRoutes.ROUTE_COMPANY_ADD,
        //     },
        //     {
        //       id: "editCompany",
        //       title: "nav.company.editCompany",
        //       type: "item",
        //       url: privateRoutes.ROUTE_COMPANY_EDIT,
        //       hidden: true,
        //     },
        //     {
        //       id: "companyList",
        //       title: "nav.company.companyList",
        //       type: "item",
        //       url: privateRoutes.ROUTE_COMPANY_LIST,
        //     },
        //   ],
        // },
        //  {
        //   id: "product-category",
        //   title: "nav.productCategory",
        //   type: "collapse",
        //   icon: "feather icon-layers",
        //   children: [
        //     {
        //       id: "addProductCategory",
        //       title: "nav.productCategory.addProductCategory",
        //       type: "item",
        //       url: privateRoutes.ROUTE_PRODUCT_CATEGORY_ADD,
        //     },
        //     {
        //       id: "editProductCategory",
        //       title: "nav.productCategory.editProductCategory",
        //       type: "item",
        //       url: privateRoutes.ROUTE_PRODUCT_CATEGORY_EDIT,
        //       hidden: true,
        //     },
        //     {
        //       id: "productCategoryList",
        //       title: "nav.productCategory.productCategoryList",
        //       type: "item",
        //       url: privateRoutes.ROUTE_PRODUCT_CATEGORY_LIST,
        //     },
        //   ],
        // },
        // {
        //   id: "gift-card",
        //   title: "nav.giftCard",
        //   type: "collapse",
        //   icon: "feather icon-gift",
        //   children: [
        //     {
        //       id: "addGiftCard",
        //       title: "nav.giftCard.addGiftCard",
        //       type: "item",
        //       url: privateRoutes.ROUTE_GIFT_CARD_ADD,
        //     },
        //     {
        //       id: "editGiftCard",
        //       title: "nav.giftCard.editGiftCard",
        //       type: "item",
        //       url: privateRoutes.ROUTE_GIFT_CARD_EDIT,
        //       hidden: true,
        //     },
        //     {
        //       id: "giftCardList",
        //       title: "nav.giftCard.giftCardList",
        //       type: "item",
        //       url: privateRoutes.ROUTE_GIFT_CARD_LIST,
        //     },
        //   ],
        // },
        // {
        //   id: "deliver-type",
        //   title: "nav.deliverType",
        //   type: "collapse",
        //   icon: "feather icon-truck",
        //   children: [
        //     {
        //       id: "addDeliverType",
        //       title: "nav.deliverType.addDeliverType",
        //       type: "item",
        //       url: privateRoutes.ROUTE_DELIVER_TYPE_ADD,
        //     },
        //     {
        //       id: "editDeliverType",
        //       title: "nav.deliverType.editDeliverType",
        //       type: "item",
        //       url: privateRoutes.ROUTE_DELIVER_TYPE_EDIT,
        //       hidden: true,
        //     },
        //     {
        //       id: "deliverTypeList",
        //       title: "nav.deliverType.deliverTypeList",
        //       type: "item",
        //       url: privateRoutes.ROUTE_DELIVER_TYPE_LIST,
        //     },
        //   ],
        // },
        // {
        //   id: "product",
        //   title: "nav.product",
        //   type: "collapse",
        //   icon: "feather icon-box",
        //   children: [
        //     {
        //       id: "productAttribute",
        //       title: "nav.product.productAttribute",
        //       type: "collapse",
        //       icon: "feather icon-box",
        //       children: [
        //         {
        //           id: "addProductAttribute",
        //           title: "nav.product.productAttribute.add",
        //           type: "item",
        //           url: privateRoutes.ROUTE_PRODUCT_ATTRIBUTE_ADD,
        //         },
        //         {
        //           id: "editProductAttribute",
        //           title: "nav.product.productAttribute.edit",
        //           type: "item",
        //           url: privateRoutes.ROUTE_PRODUCT_ATTRIBUTE_EDIT,
        //           hidden: true,
        //         },
        //         {
        //           id: "productAttributeList",
        //           title: "nav.product.productAttribute.list",
        //           type: "item",
        //           url: privateRoutes.ROUTE_PRODUCT_ATTRIBUTE_LIST,
        //         },
        //       ],
        //     },
        //     {
        //       id: "productTemplate",
        //       title: "nav.product.productTemplate",
        //       type: "collapse",
        //       icon: "feather icon-box",
        //       children: [
        //         {
        //           id: "addProductTemplate",
        //           title: "nav.product.productTemplate.add",
        //           type: "item",
        //           url: privateRoutes.ROUTE_PRODUCT_TEMPLATE_ADD,
        //         },
        //         {
        //           id: "editProductTemplate",
        //           title: "nav.product.productTemplate.edit",
        //           type: "item",
        //           url: privateRoutes.ROUTE_PRODUCT_TEMPLATE_EDIT,
        //           hidden: true,
        //         },
        //         {
        //           id: "productTemplateList",
        //           title: "nav.product.productTemplate.list",
        //           type: "item",
        //           url: privateRoutes.ROUTE_PRODUCT_TEMPLATE_LIST,
        //         },
        //       ],
        //     },
        //     {
        //       id: "addProduct",
        //       title: "nav.product.addProduct",
        //       type: "item",
        //       url: privateRoutes.ROUTE_PRODUCT_ADD,
        //     },
        //     {
        //       id: "editProduct",
        //       title: "nav.product.editProduct",
        //       type: "item",
        //       url: privateRoutes.ROUTE_PRODUCT_EDIT,
        //       hidden: true,
        //     },
        //     {
        //       id: "productList",
        //       title: "nav.product.productList",
        //       type: "item",
        //       url: privateRoutes.ROUTE_PRODUCT_LIST,
        //     },
        //   ],
        // },
        // {
        //   id: "order",
        //   title: "nav.order",
        //   type: "collapse",
        //   icon: "feather icon-shopping-cart",
        //   children: [
        //     {
        //       id: "orderDetail",
        //       title: "nav.order.orderDetail",
        //       type: "item",
        //       url: privateRoutes.ROUTE_ORDER_DETAIL,
        //       hidden: true,
        //     },
        //     {
        //       id: "orderList",
        //       title: "nav.order.orderList",
        //       type: "item",
        //       url: privateRoutes.ROUTE_ORDER_LIST,
        //     },
        //   ],
        // },
        // {
        //   id: "blog",
        //   title: "nav.blog",
        //   type: "collapse",
        //   icon: "feather icon-file-text",
        //   children: [
        //     {
        //       id: "blog-category",
        //       title: "nav.blogCategory",
        //       type: "collapse",
        //       icon: "feather icon-layers",
        //       children: [
        //         {
        //           id: "addCategory",
        //           title: "nav.blog.addCategory",
        //           type: "item",
        //           url: privateRoutes.ROUTE_BLOG_CATEGORY_ADD,
        //         },
        //         {
        //           id: "editCategory",
        //           title: "nav.blog.editCategory",
        //           type: "item",
        //           url: privateRoutes.ROUTE_BLOG_CATEGORY_EDIT,
        //           hidden: true,
        //         },
        //         {
        //           id: "categoryList",
        //           title: "nav.blog.categoryList",
        //           type: "item",
        //           url: privateRoutes.ROUTE_BLOG_CATEGORY_LIST,
        //         },
        //       ],
        //     },
        //     {
        //       id: "addBlog",
        //       title: "nav.blog.addBlog",
        //       type: "item",
        //       url: privateRoutes.ROUTE_BLOG_ADD,
        //     },
        //     {
        //       id: "editBlog",
        //       title: "nav.blog.editBlog",
        //       type: "item",
        //       url: privateRoutes.ROUTE_BLOG_EDIT,
        //       hidden: true,
        //     },
        //     {
        //       id: "blogList",
        //       title: "nav.blog.blogList",
        //       type: "item",
        //       url: privateRoutes.ROUTE_BLOG_LIST,
        //     },
        //   ],
        // },
        // {
        //   id: "newsLetter",
        //   title: "nav.newsLetter",
        //   type: "collapse",
        //   icon: "feather icon-file-text",
        //   children: [
        //     {
        //       id: "newsLetterList",
        //       title: "nav.newsLetter.newsLetterList",
        //       type: "item",
        //       url: privateRoutes.ROUTE_NEWS_LETTER_LIST,
        //     },
        //   ],
        // },
        // {
        //   id: "message",
        //   title: "nav.message",
        //   type: "collapse",
        //   icon: "feather icon-message-square",
        //   children: [
        //     {
        //       id: "messageList",
        //       title: "nav.message.messageList",
        //       type: "item",
        //       url: privateRoutes.ROUTE_MESSAGE_LIST,
        //     },
        //   ],
        // },
      ],
    },
  ],
};

// export default {
//     items: [
//         {
//             id: 'navigation',
//             title: 'nav.dashboard',
//             type: 'group',
//             icon: 'icon-navigation',
//             children: [
//                 {
//                     id: 'dashboard',
//                     title: 'nav.dashboard',
//                     type: 'collapse',
//                     icon: 'feather icon-home',
//                     children: [
//                         {
//                             id: 'default',
//                             title: 'Default',
//                             type: 'item',
//                             url: '/dashboard/default'
//                         },
//                         {
//                             id: 'e-commerce',
//                             title: 'Ecommerce',
//                             type: 'item',
//                             url: '/dashboard/e-commerce'
//                         },
//                         {
//                             id: 'crm',
//                             title: 'CRM',
//                             type: 'item',
//                             url: '/dashboard/crm'
//                         },
//                         {
//                             id: 'analytics',
//                             title: 'Analytics',
//                             type: 'item',
//                             url: '/dashboard/analytics'
//                         },
//                         {
//                             id: 'crypto',
//                             title: 'Crypto',
//                             type: 'item',
//                             url: '/dashboard/crypto',
//                             badge: {
//                                 title: 'NEW',
//                                 type: 'label-danger'
//                             }
//                         },
//                         {
//                             id: 'project',
//                             title: 'Project',
//                             type: 'item',
//                             url: '/dashboard/project'
//                         }
//                     ]
//                 },
//                 {
//                     id: 'layout',
//                     title: 'Page Layouts',
//                     type: 'collapse',
//                     icon: 'feather icon-layout',
//                     children: [
//                         {
//                             id: 'vertical',
//                             title: 'Vertical',
//                             type: 'collapse',
//                             children: [
//                                 {
//                                     id: 'v-static',
//                                     title: 'Static',
//                                     type: 'item',
//                                     url: '/layout/static',
//                                     target: true,
//                                 },
//                                 {
//                                     id: 'v-fixed',
//                                     title: 'Fixed',
//                                     type: 'item',
//                                     url: '/layout/fixed',
//                                     target: true,
//                                 },
//                                 {
//                                     id: 'v-nav-fixed',
//                                     title: 'Navbar Fixed',
//                                     type: 'item',
//                                     url: '/layout/nav-fixed',
//                                     target: true,
//                                 },
//                                 {
//                                     id: 'v-collapse-menu',
//                                     title: 'Collapse Menu',
//                                     type: 'item',
//                                     url: '/layout/collapse-menu',
//                                     target: true,
//                                 }
//                             ]
//                         },
//                         {
//                             id: 'horizontal',
//                             title: 'Horizontal',
//                             type: 'item',
//                             url: '/layout/horizontal',
//                             target: true
//                         },
//                         {
//                             id: 'box-layout',
//                             title: 'Box Layout',
//                             type: 'item',
//                             url: '/layout/box',
//                             target: true
//                         },
//                         {
//                             id: 'rtl',
//                             title: 'RTL',
//                             type: 'item',
//                             url: '/layout/rtl',
//                             target: true
//                         },
//                         {
//                             id: 'light-layout',
//                             title: 'Light Layout',
//                             type: 'item',
//                             url: '/layout/light',
//                             target: true
//                         },
//                         {
//                             id: 'dark-layout',
//                             title: 'Dark Layout',
//                             type: 'item',
//                             url: '/layout/dark',
//                             target: true,
//                             badge: {
//                                 title: 'Hot',
//                                 type: 'label-danger'
//                             }
//                         },
//                         {
//                             id: 'color-icon',
//                             title: 'Color Icon',
//                             type: 'item',
//                             url: '/layout/color-icon',
//                             target: true
//                         }
//                     ]
//                 },
//                 {
//                     id: 'widget',
//                     title: 'Widget',
//                     type: 'collapse',
//                     icon: 'feather icon-layers',
//                     badge: {
//                         title: '100+',
//                         type: 'label-info'
//                     },
//                     children: [
//                         {
//                             id: 'wdgt-statistic',
//                             title: 'Statistic',
//                             type: 'item',
//                             url: '/widget/wdgt-statistic'
//                         },
//                         {
//                             id: 'wdgt-data',
//                             title: 'Data',
//                             type: 'item',
//                             url: '/widget/wdgt-data'
//                         },
//                         {
//                             id: 'wdgt-table',
//                             title: 'Table',
//                             type: 'item',
//                             url: '/widget/wdgt-table'
//                         },
//                         {
//                             id: 'wdgt-user',
//                             title: 'User',
//                             type: 'item',
//                             url: '/widget/wdgt-user'
//                         },
//                         {
//                             id: 'wdgt-chart',
//                             title: 'Chart',
//                             type: 'item',
//                             url: '/widget/wdgt-chart'
//                         }
//                     ]
//                 }
//             ]
//         },
//         {
//             id: 'ui-element',
//             title: 'UI ELEMENT',
//             type: 'group',
//             icon: 'icon-ui',
//             children: [
//                 {
//                     id: 'basic',
//                     title: 'Basic',
//                     type: 'collapse',
//                     icon: 'feather icon-box',
//                     children: [
//                         {
//                             id: 'alert',
//                             title: 'Alert',
//                             type: 'item',
//                             url: '/basic/alert'
//                         },
//                         {
//                             id: 'button',
//                             title: 'Button',
//                             type: 'item',
//                             url: '/basic/button'
//                         },
//                         {
//                             id: 'badges',
//                             title: 'Badges',
//                             type: 'item',
//                             url: '/basic/badges'
//                         },
//                         {
//                             id: 'breadcrumb-pagination',
//                             title: 'Breadcrumb & Pagination',
//                             type: 'item',
//                             url: '/basic/breadcrumb-paging'
//                         },
//                         {
//                             id: 'cards',
//                             title: 'Cards',
//                             type: 'item',
//                             url: '/basic/cards'
//                         },
//                         {
//                             id: 'collapse',
//                             title: 'Collapse',
//                             type: 'item',
//                             url: '/basic/collapse'
//                         },
//                         {
//                             id: 'carousel',
//                             title: 'Carousel',
//                             type: 'item',
//                             url: '/basic/carousel'
//                         },
//                         {
//                             id: 'grid-system',
//                             title: 'Grid System',
//                             type: 'item',
//                             url: '/basic/grid-system'
//                         },
//                         {
//                             id: 'progress',
//                             title: 'Progress',
//                             type: 'item',
//                             url: '/basic/progress'
//                         },
//                         {
//                             id: 'modal',
//                             title: 'Modal',
//                             type: 'item',
//                             url: '/basic/modal'
//                         },
//                         {
//                             id: 'spinner',
//                             title: 'Spinner',
//                             type: 'item',
//                             url: '/basic/spinner',
//                             badge: {
//                                 title: 'New',
//                                 type: 'label-danger'
//                             },
//                         },
//                         {
//                             id: 'tabs-pills',
//                             title: 'Tabs & Pills',
//                             type: 'item',
//                             url: '/basic/tabs-pills'
//                         },
//                         {
//                             id: 'typography',
//                             title: 'Typography',
//                             type: 'item',
//                             url: '/basic/typography'
//                         },
//                         {
//                             id: 'tooltip-popovers',
//                             title: 'Tooltip & Popovers',
//                             type: 'item',
//                             url: '/basic/tooltip-popovers'
//                         },
//                         {
//                             id: 'other',
//                             title: 'Other',
//                             type: 'item',
//                             url: '/basic/other'
//                         }
//                     ]
//                 },
//                 {
//                     id: 'advance',
//                     title: 'Advance',
//                     type: 'collapse',
//                     icon: 'feather icon-gitlab',
//                     children: [
//                         {
//                             id: 'sweet-alert',
//                             title: 'Sweet Alert',
//                             type: 'item',
//                             url: '/advance/alert'
//                         },
//                         {
//                             id: 'datepicker',
//                             title: 'Datepicker',
//                             type: 'item',
//                             url: '/advance/datepicker'
//                         },
//                         {
//                             id: 'task-board',
//                             title: 'Task Board',
//                             type: 'item',
//                             url: '/advance/task-board'
//                         },
//                         {
//                             id: 'light-box',
//                             title: 'Light Box',
//                             type: 'item',
//                             url: '/advance/light-box'
//                         },
//                         {
//                             id: 'adv-modal',
//                             title: 'Modal',
//                             type: 'item',
//                             url: '/advance/modal'
//                         },
//                         {
//                             id: 'notification',
//                             title: 'Notification',
//                             type: 'item',
//                             url: '/advance/notification'
//                         },
//                         {
//                           id: 'nestable',
//                           title: 'Nestable',
//                           type: 'item',
//                           url: '/advance/nestable'
//                         },
//                         {
//                           id: 'p-notify',
//                           title: 'P-Notify',
//                           type: 'item',
//                           url: '/advance/p-notify'
//                         },
//                         {
//                             id: 'rating',
//                             title: 'Rating',
//                             type: 'item',
//                             url: '/advance/rating'
//                         },
//                         {
//                           id: 'range-slider',
//                           title: 'Range Slider',
//                           type: 'item',
//                           url: '/advance/range-slider'
//                         },
//                         {
//                           id: 'slider',
//                           title: 'Slider',
//                           type: 'item',
//                           url: '/advance/slider'
//                         },
//                         {
//                           id: 'syntax highlighter',
//                           title: 'Syntax Highlighter',
//                           type: 'item',
//                           url: '/advance/syntax-highlighter'
//                         },
//                         {
//                           id: 'tour',
//                           title: 'Tour',
//                           type: 'item',
//                           url: '/advance/tour'
//                         },
//                         {
//                           id: 'tree-view',
//                           title: 'Tree View',
//                           type: 'item',
//                           url: '/advance/tree-view'
//                         }
//                     ]
//                 },
//                 /*{
//                   id: 'extra',
//                   title: 'Extra',
//                   type: 'collapse',
//                   icon: 'feather icon-package',
//                   children: [
//                     {
//                       id: 'session-timeout',
//                       title: 'Session Timeout',
//                       type: 'item',
//                       url: '/extra/session-timeout'
//                     },
//                     {
//                       id: 'session-idle-timeout',
//                       title: 'Session Idle Timeout',
//                       type: 'item',
//                       url: '/extra/session-idle-timeout'
//                     },
//                     {
//                       id: 'offline',
//                       title: 'Offline',
//                       type: 'item',
//                       url: '/extra/offline'
//                     }
//                   ]
//                 },*/
//                 /*{
//                   id: 'animations',
//                   title: 'Animations',
//                   type: 'item',
//                   icon: 'feather icon-aperture',
//                   url: '/animations',
//                   classes: 'nav-item'
//                 },*/
//                 /*{
//                   id: 'icons',
//                   title: 'Icons',
//                   type: 'collapse',
//                   icon: 'feather icon-feather',
//                   children: [
//                     {
//                       id: 'feather',
//                       title: 'Feather',
//                       type: 'item',
//                       url: '/icons/feather',
//                       badge: {
//                         title: 'NEW',
//                         type: 'label-danger'
//                       }
//                     },
//                     {
//                       id: 'font-awesome-5',
//                       title: 'Font-Awesome 5',
//                       type: 'item',
//                       url: '/icons/font-awesome-5',
//                       badge: {
//                         title: '1000+',
//                         type: 'label-primary'
//                       }
//                     },
//                     {
//                       id: 'flag',
//                       title: 'Flag',
//                       type: 'item',
//                       url: '/icons/flag'
//                     },
//                     {
//                       id: 'material',
//                       title: 'Material',
//                       type: 'item',
//                       url: '/icons/material'
//                     },
//                     {
//                       id: 'simple-line',
//                       title: 'Simple Line',
//                       type: 'item',
//                       url: '/icons/simple-line'
//                     },
//                     {
//                       id: 'themify',
//                       title: 'Themify',
//                       type: 'item',
//                       url: '/icons/themify'
//                     }
//                   ]
//                 }*/
//             ]
//         },
//         {
//             id: 'ui-forms',
//             title: 'Forms',
//             type: 'group',
//             icon: 'icon-group',
//             children: [
//                 {
//                     id: 'forms',
//                     title: 'Forms',
//                     type: 'collapse',
//                     icon: 'feather icon-file-text',
//                     children: [
//                         {
//                             id: 'form-basic',
//                             title: 'Form Elements',
//                             type: 'item',
//                             url: '/forms/form-basic'
//                         },
//                         {
//                             id: 'form-advance',
//                             title: 'Form Advance',
//                             type: 'item',
//                             url: '/forms/form-advance'
//                         },
//                         {
//                             id: 'form-validation',
//                             title: 'Form Validation',
//                             type: 'item',
//                             url: '/forms/form-validation'
//                         },
//                         {
//                             id: 'form-masking',
//                             title: 'Form Masking',
//                             type: 'item',
//                             url: '/forms/form-masking'
//                         },
//                         {
//                             id: 'form-wizard',
//                             title: 'Form Wizard',
//                             type: 'item',
//                             url: '/forms/form-wizard'
//                         },
//                         {
//                             id: 'form-picker',
//                             title: 'Form Picker',
//                             type: 'item',
//                             url: '/forms/form-picker'
//                         },
//                         {
//                             id: 'form-select',
//                             title: 'Form Select',
//                             type: 'item',
//                             url: '/forms/form-select'
//                         }
//                     ]
//                 }
//             ]
//         },
//         {
//             id: 'table',
//             title: 'Table',
//             type: 'group',
//             icon: 'icon-table',
//             children: [
//                 {
//                     id: 'tables',
//                     title: 'Table',
//                     type: 'collapse',
//                     icon: 'feather icon-server',
//                     children: [
//                         {
//                             id: 'bootstrap',
//                             title: 'Bootstrap Table',
//                             type: 'item',
//                             url: '/tables/bootstrap'
//                         },
//                         {
//                             id: 'data-table',
//                             title: 'Data Tables',
//                             type: 'item',
//                             url: '/tables/datatable'
//                         }
//                     ]
//                 }
//             ]
//         },
//         {
//             id: 'chart-maps',
//             title: 'Chart & Maps',
//             type: 'group',
//             icon: 'icon-charts',
//             children: [
//                 {
//                     id: 'charts',
//                     title: 'Charts',
//                     type: 'collapse',
//                     icon: 'feather icon-pie-chart',
//                     children: [
//                         {
//                           id: 'amchart',
//                           title: 'AmChart4',
//                           type: 'item',
//                           url: '/charts/amchart'
//                         },
//                         {
//                             id: 'chart-js',
//                             title: 'Chart JS',
//                             type: 'item',
//                             url: '/charts/chart-js'
//                         },
//                         {
//                             id: 'e-chart',
//                             title: 'E-Chart',
//                             type: 'item',
//                             url: '/charts/e-chart'
//                         },
//                         {
//                             id: 'google',
//                             title: 'Google',
//                             type: 'item',
//                             url: '/charts/google-chart'
//                         },
//                         {
//                             id: 'high-chart',
//                             title: 'High Chart',
//                             type: 'item',
//                             url: '/charts/high-chart'
//                         },
//                         {
//                             id: 're-chart',
//                             title: 'Re-Chart',
//                             type: 'item',
//                             url: '/charts/re-chart'
//                         },
//                         {
//                             id: 'nvd3',
//                             title: 'NVD3',
//                             type: 'item',
//                             url: '/charts/nvd3'
//                         },
//                         {
//                             id: 'peity',
//                             title: 'Peity',
//                             type: 'item',
//                             url: '/charts/peity'
//                         },
//                         {
//                             id: 'radial',
//                             title: 'Radial',
//                             type: 'item',
//                             url: '/charts/radial'
//                         }
//                     ]
//                 },
//                 {
//                     id: 'maps',
//                     title: 'Maps',
//                     type: 'collapse',
//                     icon: 'feather icon-map',
//                     children: [
//                         {
//                             id: 'google',
//                             title: 'Google',
//                             type: 'item',
//                             url: '/maps/google-map'
//                         },
//                         {
//                           id: 'vector',
//                           title: 'Vector',
//                           type: 'item',
//                           url: '/maps/vector'
//                         },
//                         /*{
//                           id: 'gmap-search-api',
//                           title: 'Gmap Search API',
//                           type: 'item',
//                           url: '/maps/gmap-search-api'
//                         },
//                         {
//                           id: 'location',
//                           title: 'Location',
//                           type: 'item',
//                           url: '/maps/location'
//                         }*/
//                     ]
//                 },
//                 {
//                     id: 'landing-page',
//                     title: 'Landing Page',
//                     type: 'item',
//                     icon: 'feather icon-navigation-2',
//                     url: '/landing',
//                     classes: 'nav-item',
//                     target: true,
//                     breadcrumbs: false
//                 }
//             ]
//         },
//         {
//             id: 'pages',
//             title: 'Pages',
//             type: 'group',
//             icon: 'icon-pages',
//             children: [
//                 {
//                     id: 'auth',
//                     title: 'Authentication',
//                     type: 'collapse',
//                     icon: 'feather icon-lock',
//                     badge: {
//                         title: 'New',
//                         type: 'label-danger'
//                     },
//                     children: [
//                         {
//                             id: 'signup-1',
//                             title: 'Sign up',
//                             type: 'item',
//                             url: '/auth/signup-1',
//                             target: true,
//                             breadcrumbs: false
//                         },
//                         {
//                             id: 'signup-2',
//                             title: 'Sign up v2',
//                             type: 'item',
//                             url: '/auth/signup-2',
//                             badge: {
//                                 title: 'New',
//                                 type: 'label-info'
//                             },
//                             target: true,
//                             breadcrumbs: false
//                         },
//                         {
//                             id: 'signup-3',
//                             title: 'Sign up v3',
//                             type: 'item',
//                             url: '/auth/signup-3',
//                             badge: {
//                                 title: 'New',
//                                 type: 'label-info'
//                             },
//                             target: true,
//                             breadcrumbs: false
//                         },
//                         {
//                             id: 'signup-4',
//                             title: 'Sign up v4',
//                             type: 'item',
//                             url: '/auth/signup-4',
//                             badge: {
//                                 title: 'New',
//                                 type: 'label-info'
//                             },
//                             target: true,
//                             breadcrumbs: false
//                         },
//                         {
//                             id: 'signup-5',
//                             title: 'Sign up v5',
//                             type: 'item',
//                             url: '/auth/signup-5',
//                             badge: {
//                                 title: 'New',
//                                 type: 'label-info'
//                             },
//                             target: true,
//                             breadcrumbs: false
//                         },
//                         {
//                             id: 'signin-1',
//                             title: 'Sign in',
//                             type: 'item',
//                             url: '/auth/signin-1',
//                             target: true,
//                             breadcrumbs: false
//                         },
//                         {
//                             id: 'signin-2',
//                             title: 'Sign in v2',
//                             type: 'item',
//                             url: '/auth/signin-2',
//                             badge: {
//                                 title: 'New',
//                                 type: 'label-info'
//                             },
//                             target: true,
//                             breadcrumbs: false
//                         },
//                         {
//                             id: 'signin-3',
//                             title: 'Sign in v3',
//                             type: 'item',
//                             url: '/auth/signin-3',
//                             badge: {
//                                 title: 'New',
//                                 type: 'label-info'
//                             },
//                             target: true,
//                             breadcrumbs: false
//                         },
//                         {
//                             id: 'signin-4',
//                             title: 'Sign in v4',
//                             type: 'item',
//                             url: '/auth/signin-4',
//                             badge: {
//                                 title: 'New',
//                                 type: 'label-info'
//                             },
//                             target: true,
//                             breadcrumbs: false
//                         },
//                         {
//                             id: 'signin-5',
//                             title: 'Sign in v5',
//                             type: 'item',
//                             url: '/auth/signin-5',
//                             badge: {
//                                 title: 'New',
//                                 type: 'label-info'
//                             },
//                             target: true,
//                             breadcrumbs: false
//                         },
//                         {
//                             id: 'reset-password-1',
//                             title: 'Reset Password',
//                             type: 'item',
//                             url: '/auth/reset-password-1',
//                             target: true,
//                             breadcrumbs: false
//                         },
//                         {
//                             id: 'reset-password-2',
//                             title: 'Reset Password v2',
//                             type: 'item',
//                             url: '/auth/reset-password-2',
//                             badge: {
//                                 title: 'New',
//                                 type: 'label-info'
//                             },
//                             target: true,
//                             breadcrumbs: false
//                         },
//                         {
//                             id: 'reset-password-3',
//                             title: 'Reset Password v3',
//                             type: 'item',
//                             url: '/auth/reset-password-3',
//                             badge: {
//                                 title: 'New',
//                                 type: 'label-info'
//                             },
//                             target: true,
//                             breadcrumbs: false
//                         },
//                         {
//                             id: 'reset-password-4',
//                             title: 'Reset Password v4',
//                             type: 'item',
//                             url: '/auth/reset-password-4',
//                             badge: {
//                                 title: 'New',
//                                 type: 'label-info'
//                             },
//                             target: true,
//                             breadcrumbs: false
//                         },
//                         {
//                             id: 'reset-password-5',
//                             title: 'Reset Password v5',
//                             type: 'item',
//                             url: '/auth/reset-password-5',
//                             badge: {
//                                 title: 'New',
//                                 type: 'label-info'
//                             },
//                             target: true,
//                             breadcrumbs: false
//                         },
//                         {
//                             id: 'change-password',
//                             title: 'Change Password',
//                             type: 'item',
//                             url: '/auth/change-password',
//                             target: true,
//                             breadcrumbs: false
//                         },
//                         {
//                             id: 'personal-information',
//                             title: 'Personal Information',
//                             type: 'item',
//                             url: '/auth/personal-information',
//                             target: true,
//                             breadcrumbs: false
//                         },
//                         {
//                             id: 'profile-settings',
//                             title: 'Profile Settings',
//                             type: 'item',
//                             url: '/auth/profile-settings',
//                             target: true,
//                             breadcrumbs: false
//                         },
//                         {
//                             id: 'map-form',
//                             title: 'Map Form',
//                             type: 'item',
//                             url: '/auth/map-form',
//                             target: true,
//                             breadcrumbs: false
//                         },
//                         {
//                             id: 'subscribe',
//                             title: 'Subscribe',
//                             type: 'item',
//                             url: '/auth/subscribe',
//                             target: true,
//                             breadcrumbs: false
//                         }
//                     ]
//                 },
//                 {
//                     id: 'maintenance',
//                     title: 'Maintenance',
//                     type: 'collapse',
//                     icon: 'feather icon-sliders',
//                     children: [
//                         {
//                             id: 'error',
//                             title: 'Error',
//                             type: 'item',
//                             url: '/maintenance/error',
//                             target: true,
//                             breadcrumbs: false
//                         },
//                         {
//                             id: 'coming-soon',
//                             title: 'Coming Soon',
//                             type: 'item',
//                             url: '/maintenance/coming-soon',
//                             target: true,
//                             breadcrumbs: false
//                         },
//                         {
//                             id: 'offline-ui',
//                             title: 'Offline UI',
//                             type: 'item',
//                             url: '/maintenance/offline-ui',
//                             target: true,
//                             breadcrumbs: false
//                         }
//                     ]
//                 }
//             ]
//         },
//         {
//             id: 'app',
//             title: 'App',
//             type: 'group',
//             icon: 'icon-app',
//             children: [
//                 {
//                     id: 'message',
//                     title: 'Message',
//                     type: 'item',
//                     classes: 'nav-item',
//                     url: '/message',
//                     icon: 'feather icon-message-circle'
//                 },
//                 {
//                     id: 'task',
//                     title: 'Task',
//                     type: 'collapse',
//                     icon: 'feather icon-clipboard',
//                     children: [
//                         {
//                             id: 'task-list',
//                             title: 'Task List',
//                             type: 'item',
//                             url: '/task/task-list'
//                         },
//                         {
//                             id: 'task-board',
//                             title: 'Task Board',
//                             type: 'item',
//                             url: '/task/task-board'
//                         },
//                         {
//                             id: 'task-detail',
//                             title: 'Task Detail',
//                             type: 'item',
//                             url: '/task/task-detail'
//                         }
//                     ]
//                 },
//                 {
//                     id: 'to-dos',
//                     title: 'Todo',
//                     type: 'collapse',
//                     icon: 'feather icon-check-square',
//                     children: [
//                         {
//                             id: 'todo',
//                             title: 'Todo',
//                             type: 'item',
//                             url: '/todo/todo-basic'
//                         },
//                         {
//                           id: 'notes',
//                           title: 'Notes',
//                           type: 'item',
//                           url: '/todo/todo-notes'
//                         }
//                     ]
//                 },
//                 {
//                     id: 'gallery',
//                     title: 'Gallery',
//                     type: 'collapse',
//                     icon: 'feather icon-image',
//                     children: [
//                         {
//                             id: 'grid',
//                             title: 'Grid',
//                             type: 'item',
//                             url: '/gallery/gallery-grid'
//                         },
//                         {
//                             id: 'masonry',
//                             title: 'Masonry',
//                             type: 'item',
//                             url: '/gallery/gallery-masonry'
//                         },
//                         {
//                             id: 'advance-gallery',
//                             title: 'Advance',
//                             type: 'item',
//                             url: '/gallery/gallery-advance'
//                         }
//                     ]
//                 }
//             ]
//         },
//         {
//             id: 'extension',
//             title: 'Extension',
//             type: 'group',
//             icon: 'icon-extension',
//             children: [
//                 {
//                     id: 'editor',
//                     title: 'Editor',
//                     type: 'collapse',
//                     icon: 'feather icon-file-plus',
//                     children: [
//                         {
//                           id: 'ck-editor',
//                           title: 'CK-Editor',
//                           type: 'collapse',
//                           children: [
//                             {
//                               id: 'ck-classic',
//                               title: 'Classic Editor',
//                               type: 'item',
//                               url: '/editor/ck-editor/ck-classic'
//                             },
//                             {
//                               id: 'ck-balloon',
//                               title: 'Balloon Editor',
//                               type: 'item',
//                               url: '/editor/ck-editor/ck-balloon'
//                             },
//                             {
//                               id: 'ck-inline',
//                               title: 'Inline Editor',
//                               type: 'item',
//                               url: '/editor/ck-editor/ck-inline'
//                             },
//                             {
//                               id: 'ck-document',
//                               title: 'Document Editor',
//                               type: 'item',
//                               url: '/editor/ck-editor/ck-document'
//                             }
//                           ]
//                         },
//                         {
//                             id: 'rich-editor',
//                             title: 'Rich Editor',
//                             type: 'item',
//                             url: '/editor/rich-editor'
//                         },
//                         {
//                             id: 'jodit-wysiwyg',
//                             title: 'Jodit WYSIWYG',
//                             type: 'item',
//                             url: '/editor/jodit-wysiwyg'
//                         }
//                     ]
//                 },
//                 {
//                     id: 'invoice',
//                     title: 'Invoice',
//                     type: 'collapse',
//                     icon: 'feather icon-file-minus',
//                     children: [
//                         {
//                             id: 'invoice-basic',
//                             title: 'Invoice Basic',
//                             type: 'item',
//                             url: '/invoice/invoice-basic'
//                         },
//                         {
//                             id: 'invoice-summary',
//                             title: 'Invoice Summary',
//                             type: 'item',
//                             url: '/invoice/invoice-summary'
//                         },
//                         {
//                             id: 'invoice-list',
//                             title: 'Invoice List',
//                             type: 'item',
//                             url: '/invoice/invoice-list'
//                         }
//                     ]
//                 },
//                 {
//                     id: 'full-calendar',
//                     title: 'Full Calendar',
//                     type: 'item',
//                     url: '/full-calendar',
//                     classes: 'nav-item',
//                     icon: 'feather icon-calendar'
//                 },
//                 {
//                     id: 'file-upload',
//                     title: 'File Upload',
//                     type: 'item',
//                     url: '/file-upload',
//                     classes: 'nav-item',
//                     icon: 'feather icon-upload-cloud'
//                 }
//             ]
//         },
//         {
//             id: 'other',
//             title: 'Other',
//             type: 'group',
//             icon: 'icon-other',
//             children: [
//                 {
//                     id: 'menu-level',
//                     title: 'Menu Levels',
//                     type: 'collapse',
//                     icon: 'feather icon-menu',
//                     children: [
//                         {
//                             id: 'menu-level-1.1',
//                             title: 'Menu Level 1.1',
//                             type: 'item',
//                             url: '#!',
//                         },
//                         {
//                             id: 'menu-level-1.2',
//                             title: 'Menu Level 2.2',
//                             type: 'collapse',
//                             children: [
//                                 {
//                                     id: 'menu-level-2.1',
//                                     title: 'Menu Level 2.1',
//                                     type: 'item',
//                                     url: '#',
//                                 },
//                                 {
//                                     id: 'menu-level-2.2',
//                                     title: 'Menu Level 2.2',
//                                     type: 'collapse',
//                                     children: [
//                                         {
//                                             id: 'menu-level-3.1',
//                                             title: 'Menu Level 3.1',
//                                             type: 'item',
//                                             url: '#',
//                                         },
//                                         {
//                                             id: 'menu-level-3.2',
//                                             title: 'Menu Level 3.2',
//                                             type: 'item',
//                                             url: '#',
//                                         }
//                                     ]
//                                 }
//                             ]
//                         }
//                     ]
//                 },
//                 {
//                     id: 'disabled-menu',
//                     title: 'Disabled Menu',
//                     type: 'item',
//                     url: '#',
//                     classes: 'nav-item disabled',
//                     icon: 'feather icon-power'
//                 },
//                 {
//                     id: 'sample-page',
//                     title: 'Sample Page',
//                     type: 'item',
//                     url: '/sample-page',
//                     classes: 'nav-item',
//                     icon: 'feather icon-sidebar'
//                 }
//             ]
//         },
//         {
//             id: 'support',
//             title: 'Support',
//             type: 'group',
//             icon: 'icon-support',
//             children: [
//                 {
//                     id: 'documentation',
//                     title: 'Documentation',
//                     type: 'item',
//                     icon: 'feather icon-book',
//                     classes: 'nav-item',
//                     url: 'http://html.codedthemes.com/datta-able/react/docs',
//                     target: true,
//                     external: true
//                 },
//                 {
//                     id: 'need-support',
//                     title: 'Need Support?',
//                     type: 'item',
//                     icon: 'feather icon-help-circle',
//                     classes: 'nav-item',
//                     url: 'https://codedthemes.support-hub.io',
//                     target: true,
//                     external: true,
//                     badge: {
//                         title: 'v1.0',
//                         type: 'label-primary'
//                     }
//                 }
//             ]
//         }
//     ]
// }
