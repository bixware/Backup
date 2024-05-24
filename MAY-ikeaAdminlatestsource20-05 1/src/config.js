

const config = {
  login: "/login",
  // user apis
  userList: "/getuser",
  addUser: "/adduser",
  updateUser: "/updateuser",
  Edituser: "/edituser/",
  deleteUser: "/deleteuser",
  // store apis
  getStore: "/getstore",
  userActive: "/useractive",
  storeActive: "/storeactive",
  addStore: "/addstore",
  updateStore: "/updatestore",
  DeleteStore: "/deletestore",

  // AuditEntity apis
  AuditEntityList: "/getauditentity",
  AddAuditEntity: "/addauditentity",
  UpdateAuditEnity: "/updateauditentity",
  AuditEntityActive: "/auditentityactive",
  GetAuditTypeByEntity: "/getaudittypebyentity",

  // AuditType apis
  AuditTypeList: "/getaudittype",
  AuditTypeActive: "/activeaudittype",
  AddAuditType: "/addaudittype",
  UpdateAuditType: "/updateaudittype",
  DeleteAudittype: "/deleteaudittype",

  // AuditSubtype apis
  GetSubType: "/getsubtype",
  AddSubType: "/addsubtype",
  SubTypeActive: "/subtypeactive",
  DeleteSubType: "/deletesubtype",
  UpdateSubType: "/updatesubtype",

  // Status apis
  GetStatus: "/getstatus",
  AddStatus: "/addstatus",
  StatusActive: "/statusactive",
  UpdateStatus: "/updatestatus",
  Deletestatus: "/deletestatus",

  // Question apis
  GetQuestionByEntity: "/getquestionbyentity",
  AddQuestion: "/addquestion",
  QuestionActive: "/questionactive",
  UpdateQuestion: "/updatequestion",
  DeleteQuestion: "/deletequestion",

  // Content Api
  GetContent: "/getcontent",
  UpdateContent: "/updatecontent",
  AddContent: "/addcontent",
  ContentActive: "/contentactive",

  // LocationType Api
  GetLocationType: "/getlocationtype",
  AddLocationType: "/addlocationtype",
  UpdateLocationType: "/updatelocationtype",
  LocationTypeActive: "/locationtypeactive",

  //roles apis
  GetRoles: "/getroles",
  CreateRoles: "/createroles",
  RoleUpdate: "/roleupdate",
  RoleActive: "/roleactive",

  //menu apis
  GetMenus: "/getmenus",
  MenuActive: "/menuactive",
  AddMenus: "/addmenus",
  UpdateMenus: "/updatemenus",
  Deletemenu: "/deletemenu",

  // parent Api
  GetParentMenu: "/getparentmenu",

  //setup content apis
  GetCommonContent: "/getcommoncontent",
  CommonContentActive: "/commoncontentactive",
  AddCommonContent: "/addcommoncontent",
  UpdateCommonContent: "/updatecommoncontent",

  // dashbord apis
  GetAllContent: "/getallcontent",

  // GetauditType by Entity
  GetAuditTypeByEntity: "/getaudittypebyentity",
  // getauditsubtypebyentity
  GetAuditSubTypeByEntity: "/getauditsubtypebyentity",

  //get only audit type by entity
  GetAuditTypeNameByEntity: "/getaudittypenamebyentity",

  // get only Sub type by entity
  GetAuditSubTypeNameByEntity: "/getauditsubtypenamebyentity",

  // Reports
  GetFoodAudit: "/getfoodaudit",
  GetPropertyAudit: "/getpropertyaudit",
  GetDMCheckAudit: "/getdmcheckaudit",
  GetSafetyAudit: "/getsafetyaudit",

  // Audit details repots page api
  ViewAuditDetails: "/viewauditdetails",
  // dashboard chart

  Getdashboardchart: "/getdashboardchart",

  GetAuditScoreByEntity: "/getauditscorebyentity",

  GetQuestionsAudittype: "/getquestionsaudittype"
};
export default config