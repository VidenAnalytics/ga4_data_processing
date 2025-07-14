// Source google analytics dataset. "analytics_{GA_PROPERTY_ID}"
const GA4_DATASCHEMA = '<GA4_DATASCHEMA>';

// Table prefix. By default = 'events_*'
const GA4_TABLE_PREFIX = '<GA4_TABLE_PREFIX>';

// Start Date (included), By Default = null, means from the firt export date. Example = "'2023-07-05'" or null
const START_DATE = '<START_DATE>';


// Destination dataset. By default = 'analytics_processed_data_{GA_PROPERTY_ID}'
const GA4_PROCESSED_DATA_PREFIX = '<GA4_PROCESSED_DATA_PREFIX>'
const SUFFIX = GA4_DATASCHEMA.split("_")[GA4_DATASCHEMA.split("_").length - 1]
const GA4_PROCESSED_DATA_DATASCHEMA = SUFFIX.match('^[0-9]+$') ? `${GA4_PROCESSED_DATA_PREFIX}_${SUFFIX}` : `${GA4_PROCESSED_DATA_PREFIX}`


// GA4 data refresh window. Default = 3
const REFRESH_LOOKBACK_WINDOW = 3;


// last non-direct attribution window. Default = 30
const ATTRIBUTION_LOOKBACK_WINDOW = 30;


// Project time zone. Default = 'America/Los_Angeles';
const TIME_ZONE = '<TIME_ZONE>';

const ADD_RATES = true;


// Should be empty list if not event params should be pulled.
const EVENT_PARAMS = [
    // {'name': 'event_category', 'type': 'string', 'columnName':'test'},
    // enum ["string", "int", "double", "float", "all_as_string", "all_as_number"]
    {'name': 'event_category', 'type': 'string', 'columnName':'event_category'},
    {'name': 'event_action', 'type': 'string'},
    {'name': 'event_label', 'type': 'string'},
]
EVENT_PARAMS.forEach(param => param.scope = 'event')

const USER_PROPERTIES = [
    // {'name': 'event_category', 'type': 'string', 'columnName':'test'},
    // enum ["string", "int", "double", "float", "all_as_string", "all_as_number"]
    // EXAMPLE. Comment or update before running:
    {'name': 'src', 'type': 'all_as_string', 'columnName':'src'},
]
USER_PROPERTIES.forEach(param => param.scope = 'user')

const ITEM_PARAMS = [
    // {'name': 'event_category', 'type': 'string', 'columnName':'test'},
    // enum ["string", "int", "double", "float", "all_as_string", "all_as_number"]
]


module.exports = {
    GA4_DATASCHEMA,
    TIME_ZONE,
    GA4_TABLE_PREFIX,
    REFRESH_LOOKBACK_WINDOW,
    GA4_PROCESSED_DATA_DATASCHEMA,
    ATTRIBUTION_LOOKBACK_WINDOW,
    EVENT_PARAMS,
    USER_PROPERTIES,
    ITEM_PARAMS,
    START_DATE,
    ADD_RATES
}
