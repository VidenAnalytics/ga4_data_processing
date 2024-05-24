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


// Project time zone. Example: const TIME_ZONE = 'America/Los_Angeles';
const TIME_ZONE = '<TIME_ZONE>';



// Should be empty list if not event params should be pulled.
EVENT_PARAMS = [
    // {'name': 'event_category', 'type': 'string', 'columnName':'test'},
    // {'name': 'event_action', 'type': 'string'},
    // {'name': 'event_label', 'type': 'string'},
]


module.exports = {
    GA4_DATASCHEMA,
    TIME_ZONE,
    GA4_TABLE_PREFIX,
    REFRESH_LOOKBACK_WINDOW,
    GA4_PROCESSED_DATA_DATASCHEMA,
    ATTRIBUTION_LOOKBACK_WINDOW,
    EVENT_PARAMS,
    START_DATE,
}
