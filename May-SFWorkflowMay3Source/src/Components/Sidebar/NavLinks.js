// sidebar nav links
let sidebarMenu = {
  category1: [
    {
      menu_title: "Admin",
      menu_icon: "zmdi zmdi-view-dashboard",
      type_multi: null,
      new_item: false,
      open: true,
      child_routes: [
        // {
        //   menu_title: "Manage Role",
        //   menu_icon: "zmdi zmdi-account-add",
        //   type_multi: null,
        //   new_item: false,
        //   path: "/app/crm/role",
        // },
        // {
        //   menu_title: "Manage BusinessUnit",
        //   menu_icon: "zmdi zmdi-group-work",
        //   type_multi: null,
        //   new_item: false,
        //   path: "/app/crm/businessunit",
        // },
        // {
        //   menu_title: "Manage Workflow",
        //   menu_icon: "zmdi zmdi-square-right",
        //   path: "/app/crm/workflow",
        //   new_item: false,
        // },
        // {
        //   menu_title: "Workflow Stage",
        //   menu_icon: "zmdi zmdi-folder-star",
        //   path: "/app/crm/workflow-stage",
        //   new_item: false,
        // },
        {
          menu_title: "Manage User",
          menu_icon: "zmdi zmdi-account-box",
          type_multi: null,
          new_item: false,
          path: "/app/crm/user",
        },
        {
          path: "/app/crm/workflow-stageuser",
          menu_icon: "zmdi zmdi-folder-star",
          new_item: false,
          menu_title: "Workflow StageUser",
        },
      ],
    },
    {
      menu_title: "Reports",
      menu_icon: "zmdi zmdi-view-day",
      type_multi: null,
      new_item: false,
      child_routes: [
        {
          menu_title: "Report List",
          menu_icon: "zmdi zmdi-view-day",
          type_multi: null,
          new_item: false,
          path: "/app/crm/report",
        },
      ],
    },
  ],
  category2: [
    {
      menu_title: "Process",
      menu_icon: "zmdi zmdi-spinner",
      type_multi: null,
      new_item: false,
      open: true,
      child_routes: [
        {
          menu_title: "New Request",
          menu_icon: "zmdi zmdi-file-plus",
          type_multi: null,
          new_item: false,
          path: "/app/user/workflow",
        },
        {
          menu_title: "Request List",
          menu_icon: "zmdi zmdi-view-day",
          type_multi: null,
          new_item: false,
          path: "/app/user/request-list",
        },
        {
          menu_title: "Conclude",
          menu_icon: "zmdi zmdi-view-list",
          type_multi: null,
          new_item: false,
          path: "/app/user/view-conclude",
        },
        {
          menu_title: "Reports",
          menu_icon: "zmdi zmdi-view-day",
          type_multi: null,
          new_item: false,
          path: "/app/crm/report",
        },
        // {
        //   menu_title: "History",
        //   menu_icon: "zmdi zmdi-view-column",
        //   type_multi: null,
        //   new_item: false,
        //   path: "/app/user/historylist",
        // },
        // {
        //   menu_title: "Approval",
        //   path: "/app/crmuser/nso",
        //   new_item: false,
        // },
        // {
        //   menu_title: "Recipe Creation",
        //   path: "/app/crm/recipe",
        //   new_item: false,
        // },
        // {
        //   path: "/app/crm/workflow-user",
        //   new_item: false,
        //   menu_title: "Workflow User",
        // },
      ],
    },
  ],

  category3: [
    {
      menu_title: "Process",
      menu_icon: "zmdi zmdi-spinner",
      type_multi: null,
      new_item: false,
      open: true,
      child_routes: [
        {
          menu_icon: "zmdi zmdi-account-circle",
          type_multi: null,
          new_item: false,
          menu_title: "Approval List",
          menu_icon: "zmdi zmdi-file-plus",
          path: "/app/user/approvallist",
        },
        {
          menu_title: "Request List",
          menu_icon: "zmdi zmdi-view-day",
          path: "/app/user/requestlist",
          new_item: false,
        },
        {
          menu_title: "Reports",
          menu_icon: "zmdi zmdi-view-day",
          type_multi: null,
          new_item: false,
          path: "/app/crm/report",
        },
      ],
    },
  ],
  category4: [
    {
      menu_title: "Process",
      menu_icon: "zmdi zmdi-spinner",
      type_multi: null,
      new_item: false,
      open: true,
      child_routes: [
        {
          menu_icon: "zmdi zmdi-account-circle",
          type_multi: null,
          new_item: false,
          menu_title: "Data Entry in SAP",
          menu_icon: "zmdi zmdi-view-list",
          path: "/app/user/dataentrylist",
        },
        {
          menu_title: "Request List",
          menu_icon: "zmdi zmdi-view-day",
          path: "/app/user/requestlist",
          new_item: false,
        },
        {
          menu_title: "Reports",
          menu_icon: "zmdi zmdi-view-day",
          type_multi: null,
          new_item: false,
          path: "/app/crm/report",
        },
      ],
    },
  ],
  category5: [
    {
      menu_title: "sidebar.maps",
      menu_icon: "zmdi zmdi-map",
      type_multi: null,
      new_item: false,
      child_routes: [
        {
          path: "/app/maps/google-maps",
          new_item: false,
          menu_title: "sidebar.googleMaps",
        },
        {
          path: "/app/maps/leaflet-maps",
          new_item: false,
          menu_title: "sidebar.leafletMaps",
        },
        {
          menu_title: "Reports",
          menu_icon: "zmdi zmdi-view-day",
          type_multi: null,
          new_item: false,
          path: "/app/crm/report",
        },
      ],
    },
    {
      menu_title: "sidebar.users",
      menu_icon: "zmdi zmdi-accounts",
      type_multi: null,
      new_item: false,
      child_routes: [
        {
          path: "/app/users/user-profile-1",
          new_item: false,
          menu_title: "sidebar.userProfile1",
        },
        {
          path: "/app/users/user-profile",
          new_item: false,
          menu_title: "sidebar.userProfile2",
        },
        {
          path: "/app/users/user-management",
          new_item: false,
          menu_title: "sidebar.userManagement",
        },
        {
          path: "/app/users/user-list",
          new_item: false,
          menu_title: "sidebar.userList",
        },
        {
          menu_title: "Reports",
          menu_icon: "zmdi zmdi-view-day",
          type_multi: null,
          new_item: false,
          path: "/app/crm/report",
        },
      ],
    },
    {
      menu_title: "sidebar.calendar",
      menu_icon: "zmdi zmdi-calendar-note",
      type_multi: null,
      new_item: false,
      child_routes: [
        {
          path: "/app/calendar/basic",
          new_item: false,
          menu_title: "components.basic",
        },
        {
          path: "/app/calendar/cultures",
          new_item: false,
          menu_title: "sidebar.cultures",
        },
        {
          path: "/app/calendar/selectable",
          new_item: false,
          menu_title: "sidebar.selectable",
        },
        {
          path: "/app/calendar/custom-rendering",
          new_item: false,
          menu_title: "sidebar.customRendering",
        },
      ],
    },
    {
      menu_title: "sidebar.editor",
      menu_icon: "zmdi zmdi-edit",
      type_multi: null,
      new_item: false,
      child_routes: [
        {
          path: "/app/editor/wysiwyg-editor",
          new_item: false,
          menu_title: "sidebar.wysiwygEditor",
        },
        {
          path: "/app/editor/quill-editor",
          new_item: false,
          menu_title: "sidebar.quillEditor",
        },
      ],
    },
    {
      menu_title: "sidebar.dragAndDrop",
      menu_icon: "zmdi zmdi-mouse",
      type_multi: null,
      new_item: false,
      child_routes: [
        {
          path: "/app/drag-andDrop/react-dragula",
          new_item: false,
          menu_title: "sidebar.reactDragula",
        },
        {
          path: "/app/drag-andDrop/react-dnd",
          new_item: false,
          menu_title: "sidebar.reactDnd",
        },
      ],
    },
    {
      menu_title: "sidebar.multiLevel",
      menu_icon: "zmdi zmdi-view-web",
      type_multi: true,
      new_item: false,
      child_routes: [
        {
          menu_title: "sidebar.level1",
          child_routes: [
            {
              path: "/app/level2",
              menu_title: "sidebar.level2",
            },
          ],
        },
      ],
    },
  ],
  category6: [
    {
      menu_title: "sidebar.imageCropper",
      menu_icon: "zmdi zmdi-crop",
      path: "/app/image-cropper",
      new_item: false,
      child_routes: null,
    },
    {
      menu_title: "sidebar.videoPlayer",
      menu_icon: "zmdi zmdi-collection-video",
      path: "/app/video-player",
      new_item: false,
      child_routes: null,
    },
    {
      menu_title: "sidebar.dropzone",
      menu_icon: "zmdi zmdi-dropbox",
      path: "/app/dropzone",
      new_item: false,
      child_routes: null,
    },
  ],
};

export default sidebarMenu;
