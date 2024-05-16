function getEventParam(eventParamName, eventParamType = "string", asColumn = true, columnName = null) {
  let eventParamTypeName = "";
  switch (eventParamType) {
    case "string":
      eventParamTypeName = "string_value";
      break;
    case "int":
      eventParamTypeName = "int_value";
      break;
    case "double":
      eventParamTypeName = "double_value";
      break;
    case "float":
      eventParamTypeName = "float_value";
      break;
    default:
      throw "eventParamType is not valid"; // Corrected the error message
  }

  let alias = columnName || eventParamName;         // Determine the correct alias for the column
  let aliasClause = asColumn ? ` AS ${alias}` : ""; // Apply the alias only if asColumn is true

  return `(SELECT ep.value.${eventParamTypeName} FROM UNNEST(event_params) ep WHERE ep.key = '${eventParamName}')${aliasClause}`;
};


function getEventParams(list) {
  /* 
  [{'name': 'ep_name', 'type': 'string', 'asColumn': true, 'columnName':'test'}]
  */
  let output = []
  for (let elem of list) {
    let eventParamTypeName = "";
    switch (elem.type) {
      case "string":
        eventParamTypeName = "string_value";
        break;
      case "int":
        eventParamTypeName = "int_value";
        break;
      case "double":
        eventParamTypeName = "double_value";
        break;
      case "float":
        eventParamTypeName = "float_value";
        break;
      default:
        throw "eventParamType is not valid"; // Corrected the error message
    }

    let alias = elem.columnName || elem.name;         // Determine the correct alias for the column
    let aliasClause = (elem.asColumn ? elem.asColumn : true) ? ` AS ${alias}` : ""; // Apply the alias only if asColumn is true

    output.push(`(SELECT ep.value.${eventParamTypeName} FROM UNNEST(event_params) ep WHERE ep.key = '${elem.name}')${aliasClause}`);
  }
  return output.join(',\n')
};




const getSessionId = (asColumn = true, prefix = '') => {
  return `CONCAT(${prefix ? prefix + '.' : ''}user_pseudo_id, '-', (select value.int_value FROM UNNEST(${prefix ? prefix + '.' : ''}event_params) WHERE key = 'ga_session_id')) ${asColumn ? 'as session_id' : ''}`
}

const getDate = () => `PARSE_DATE('%Y%m%d', event_date) as date`;
const getEventDate = () => `DATE(TIMESTAMP_MICROS(event_timestamp), "${constants.TIME_ZONE}") as event_date`;
const getEventDatetime = () => `DATETIME(TIMESTAMP_MICROS(event_timestamp), "${constants.TIME_ZONE}") as event_datetime`;





// OTHER 
const getTableColumnsUnnestEventParameters = (eventParams) => {
  return eventParams.map(eventParam => `${getEventParam(eventParam.name, eventParam.type)} `)
}

const getTableColumns = (params) => {
  return params.map(param => `${param.name} AS ${param.columnName}`)
}

const getDateFromTableName = (tblName) => {
  return tblName.substring(7);
}

const getDatsetFromTableName = (tblName) => {
  return tblName.substring(1, tblName.lastIndexOf('.'))
}

const getEventId = () => {
  return `FARM_FINGERPRINT(CONCAT(ifnull((SELECT ep.value.int_value FROM UNNEST(event_params) ep WHERE ep.key = 'event_tag_timestamp'),event_timestamp), event_name, user_pseudo_id)) as event_id`
}




const getDefaultChannelGroup = () => `CASE
      WHEN last_channel_info.source in ('direct','(direct)') and last_channel_info.medium in ("not set", "none", "(none)") THEN 'Direct'
      WHEN last_channel_info.medium in ('display', 'banner', 'expandable', 'interstitial', 'cpm') THEN 'Display'
      WHEN last_channel_info.source in ('email','e-mail','e_mail','e mail') or last_channel_info.medium in ('email','e-mail','e_mail','e mail') THEN 'Email'
      WHEN last_channel_info.source in ('google','bing') and REGEXP_CONTAINS(last_channel_info.medium, r'^(.*cp.*|ppc|retargeting|paid.*)$') THEN 'Paid Search'
      WHEN last_channel_info.source in ('linkedin', 'instagram', 'facebook', 't.co', 'tiktok', 'lnkd.in') and REGEXP_CONTAINS(last_channel_info.medium, r'^(.*cp.*|ppc|retargeting|paid.*)$') THEN 'Paid Social'
      WHEN last_channel_info.source in ('google','bing','yahoo','baidu','duckduckgo', 'yandex') or last_channel_info.medium = 'organic' THEN 'Organic Search'
      WHEN last_channel_info.source in ('linkedin', 'instagram', 'facebook', 't.co', 'tiktok', 'lnkd.in') or last_channel_info.medium in ('social', 'social-network', 'social-media', 'sm', 'social network', 'social media') THEN 'Organic Social'
      WHEN last_channel_info.medium in ("referral", "app",  "link") THEN 'Referral'
      WHEN last_channel_info.source is null or last_channel_info.medium is null THEN ''
      ELSE 'Unassigned'
    END
  AS default_channel_group`


module.exports = {
  getEventParams,
  getEventParam,
  getDatsetFromTableName,
  getDateFromTableName,
  getTableColumns,
  getTableColumnsUnnestEventParameters,
  getEventId,
  getSessionId,
  getDate,
  getEventDate,
  getEventDatetime,
  getDefaultChannelGroup
};