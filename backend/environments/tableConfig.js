let schemaname
// Change accordingly
schemaname = "dev"
export const chat_table = {
  schemaTableName: schemaname + ".chat",
  id: "id",
  chat_name: "chat_name",
  current_timestamp: "current_timestamp",
  is_deleted: "is_deleted",
  user_id: "user_id",
}
export const users_table = {
  schemaTableName: schemaname + ".users",
  id: "id",
  username: "username",
  password: "password",
  email: "email",
  google_id: "google_id",
  verification_code: "verification_code",
  verify: "verify",
  dashboard: "dashboard",
  organization_name: "organization_name",
  organization_country: "organization_country",
  organization_domain: "organization_domain",
  name: "name",
  role: "role",
  plan: "plan",
  requests_made: "requests_made",
  passwod_reset_token: "passwod_reset_token",
  usertype: "usertype",
}
export const tenant_table = {
  schemaTableName: schemaname + ".tenant",
  tenantname: "tenantname",
  userids: "userids",
  firstuserid: "firstuserid",
  firsttimeregdate: "firsttimeregdate",
  subscriptionstatus: "subscriptionstatus",
  subscriptiontype: "subscriptiontype",
  subscriptionstartdate: "subscriptionstartdate",
  subscriptionexpdate: "subscriptionexpdate",
  allotedcredits: "allotedcredits",
  remainingcredits: "remainingcredits",
  createddate: "createddate",
  updateddate: "updateddate",
  tenantid: "tenantid",
}

export const diamond_table = {
  schemaTableName: schemaname + ".diamond_poc_log_2",
  log_time: "time",
}

export const insurance_table = {
  schemaTableName: schemaname + ".insurance",
  account_name: "account_name",
  account_country: "account_country",
}

export const gtm_ip = {
  schemaTableName: schemaname + ".gtm_ip",
  site_id: "site_id",
  id: "id",
  ip: "ip",
  timestamp: "timestamp",
}

export const gtm_js_sitetable = {
  schemaTableName: schemaname + ".gtm_js_sitetable",
  site_id: "site_id",
  site_name: "site_name",
  createddate: "createddate",
}
