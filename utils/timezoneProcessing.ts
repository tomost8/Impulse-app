import moment from 'moment-timezone';

// Count: 27 Old, 7 New
const TIMEZONE_LIST = [
  'America/New_York',    // EST/EDT (UTC-5/-4)
  'America/Chicago',     // CST/CDT (UTC-6/-5)
  'America/Denver',      // MST/MDT (UTC-7/-6)
  'America/Los_Angeles', // PST/PDT (UTC-8/-7)  
  'America/Anchorage',   // AKST/AKDT (UTC-9/-8)
  'Pacific/Honolulu',    // HST (UTC-10)
  'Pacific/Pago_Pago',   // SST (UTC-11)
  'Pacific/Kiritimati',  // LINT (UTC+14) (New)
  'Pacific/Auckland',    // NZST/NZDT (UTC+12/+13) (New)
  'Pacific/Fiji',        // FJT/FJST (UTC+12/+13) (New)
  'Pacific/Noumea',      // NCT/NCST (UTC+11/+12)
  'Australia/Sydney',    // AEST/AEDT (UTC+10/+11)
  'Australia/Adelaide',  // ACST/ACDT (UTC+9:30/+10:30)
  'Australia/Brisbane',  // AEST (UTC+10)
  'Asia/Tokyo',          // JST (UTC+9)
  'Asia/Shanghai',       // CST (UTC+8)
  'Asia/Bangkok',        // ICT (UTC+7)
  'Asia/Dhaka',          // BST (UTC+6)
  'Asia/Kolkata',        // IST (UTC+5:30)
  'Asia/Karachi',        // PKT (UTC+5)
  'Asia/Dubai',          // GST (UTC+4)
  'Asia/Tehran',         // IRST/IRDT (UTC+3:30/+4:30)
  'Europe/Moscow',       // MSK (UTC+3)
  'Asia/Jerusalem',      // IST/IDT (UTC+2/+3) (New)
  'Africa/Cairo',        // EET (UTC+2)
  'Europe/Berlin',       // CET/CEST (UTC+1/+2)
  'Europe/London',       // GMT/BST (UTC+0/+1)
  'Atlantic/Azores',     // AZOT/AZOST (UTC-1/+0)
  'America/Noronha',     // FNT (UTC-2) (New)
  'America/Sao_Paulo',   // BRT/BRST (UTC-3/-2) (New)
  'America/Argentina/Buenos_Aires', // ART (UTC-3)
  'America/St_Johns',    // NST/NDT (UTC-3:30/-2:30)
  'America/Santiago',    // CLT/CLST (UTC-4/-3) (New)
  'America/Caracas',     // VET (UTC-4)
];

export const TIMEZONE_OPTIONS = TIMEZONE_LIST
  .filter(tz => moment.tz.names().includes(tz)) // Filter to include only valid timezones
  .map(tz => {
    const offset = moment.tz(tz).format('Z'); // Get the GMT offset
    return { value: tz, label: `${tz} (GMT${offset})` }; // Create the object with value and label
});

// Convert UTC timestamp to local time with optional duration added in minutes
export const convertUtcToLocal = (utcTimestamp: string, timezone: string, duration: number=0) => {
  return moment.utc(utcTimestamp)
    .add(duration, 'minutes')
    .tz(timezone)
    .format('hh:mm A');
};

// timeStr is in HH:MM 24 hour format
export const convertLocalToUtc = (timeStr: string, timezone: string): string => {
  const today = moment().format('YYYY-MM-DD'); // User's current date in local timezone
  const localDateTime = moment.tz(`${today} ${timeStr}`, 'YYYY-MM-DD HH:mm', timezone);
  return localDateTime.utc().format();
};

// Returns YYYY-MM-DD format
export const getLocalDay = (utcTimestamp: string, timezone: string) => {
  return moment.utc(utcTimestamp)
    .tz(timezone)
    .format('YYYY-MM-DD');
};

// Returns "Month Date, Year" format (e.g., "January 1, 2025")
export const getFormattedDate = (utcTimestamp: string, timezone: string) => {
  return moment.utc(utcTimestamp)
    .tz(timezone)
    .format('MMMM D, YYYY');
};

export const getTimeAgo = (utcTimestamp: string) => {
  return moment.utc(utcTimestamp).fromNow();
};

// Format date for chat messages (e.g., "1/15/2025 2:30 PM")
export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};