// Timezone configurations
const timezones = {
  est: {
    timezone: 'America/New_York',
    elementId: 'est-time',
    dateId: 'est-date',
    offsetId: 'est-offset',
    differenceId: 'est-difference',
    indicatorId: 'est-indicator',
    cardId: 'est'
  },
  pst: {
    timezone: 'America/Los_Angeles',
    elementId: 'pst-time',
    dateId: 'pst-date',
    offsetId: 'pst-offset',
    differenceId: 'pst-difference',
    indicatorId: 'pst-indicator',
    cardId: 'pst'
  },
  brazil: {
    timezone: 'America/Sao_Paulo',
    elementId: 'brazil-time',
    dateId: 'brazil-date',
    offsetId: 'brazil-offset',
    differenceId: 'brazil-difference',
    indicatorId: 'brazil-indicator',
    cardId: 'brazil'
  },
  italy: {
    timezone: 'Europe/Rome',
    elementId: 'italy-time',
    dateId: 'italy-date',
    offsetId: 'italy-offset',
    differenceId: 'italy-difference',
    indicatorId: 'italy-indicator',
    cardId: 'italy'
  }
};

// Settings state - defaults to 12-hour format
let settings = {
  hour24: false,  // Default: 12-hour format (AM/PM)
  showSeconds: true,
  showOffset: false,
  showDifference: false,
  darkMode: false,
  showBusinessHours: false,
  showCountdown: false,
  viewMode: 'grid' // 'grid', 'list', 'table'
};

// Additional data structures for new features
let timezoneOrder = []; // For drag & drop reordering
let timezoneGroups = { default: [] }; // For timezone groups/profiles
let timezoneNotes = {}; // For notes on timezones
let timezoneLabels = {}; // For custom labels
let alarms = []; // For alarms & reminders
let recentlyRemoved = []; // For quick restore
let businessHoursStart = 9; // Default business hours
let businessHoursEnd = 17;
let currentGroup = 'default';

// Comprehensive list of 200+ timezones for adding
// Load from external file or embed here
const popularTimezones = [
  // North America - United States
  { name: 'New York', timezone: 'America/New_York', flag: '🇺🇸' },
  { name: 'Los Angeles', timezone: 'America/Los_Angeles', flag: '🇺🇸' },
  { name: 'Chicago', timezone: 'America/Chicago', flag: '🇺🇸' },
  { name: 'Denver', timezone: 'America/Denver', flag: '🇺🇸' },
  { name: 'Phoenix', timezone: 'America/Phoenix', flag: '🇺🇸' },
  { name: 'Anchorage', timezone: 'America/Anchorage', flag: '🇺🇸' },
  { name: 'Honolulu', timezone: 'Pacific/Honolulu', flag: '🇺🇸' },
  { name: 'Detroit', timezone: 'America/Detroit', flag: '🇺🇸' },
  { name: 'Miami', timezone: 'America/New_York', flag: '🇺🇸' },
  { name: 'Seattle', timezone: 'America/Los_Angeles', flag: '🇺🇸' },
  { name: 'Boston', timezone: 'America/New_York', flag: '🇺🇸' },
  { name: 'Atlanta', timezone: 'America/New_York', flag: '🇺🇸' },
  { name: 'Dallas', timezone: 'America/Chicago', flag: '🇺🇸' },
  { name: 'Houston', timezone: 'America/Chicago', flag: '🇺🇸' },
  { name: 'Las Vegas', timezone: 'America/Los_Angeles', flag: '🇺🇸' },
  { name: 'Portland', timezone: 'America/Los_Angeles', flag: '🇺🇸' },
  { name: 'San Francisco', timezone: 'America/Los_Angeles', flag: '🇺🇸' },
  { name: 'San Diego', timezone: 'America/Los_Angeles', flag: '🇺🇸' },
  { name: 'Minneapolis', timezone: 'America/Chicago', flag: '🇺🇸' },
  { name: 'Kansas City', timezone: 'America/Chicago', flag: '🇺🇸' },
  { name: 'New Orleans', timezone: 'America/Chicago', flag: '🇺🇸' },
  { name: 'Nashville', timezone: 'America/Chicago', flag: '🇺🇸' },
  { name: 'Indianapolis', timezone: 'America/Indiana/Indianapolis', flag: '🇺🇸' },
  { name: 'Philadelphia', timezone: 'America/New_York', flag: '🇺🇸' },
  { name: 'Washington DC', timezone: 'America/New_York', flag: '🇺🇸' },
  { name: 'Baltimore', timezone: 'America/New_York', flag: '🇺🇸' },
  { name: 'Charlotte', timezone: 'America/New_York', flag: '🇺🇸' },
  { name: 'Jacksonville', timezone: 'America/New_York', flag: '🇺🇸' },
  { name: 'Tampa', timezone: 'America/New_York', flag: '🇺🇸' },
  { name: 'Orlando', timezone: 'America/New_York', flag: '🇺🇸' },
  { name: 'Memphis', timezone: 'America/Chicago', flag: '🇺🇸' },
  { name: 'Milwaukee', timezone: 'America/Chicago', flag: '🇺🇸' },
  { name: 'Cleveland', timezone: 'America/New_York', flag: '🇺🇸' },
  { name: 'Columbus', timezone: 'America/New_York', flag: '🇺🇸' },
  { name: 'Cincinnati', timezone: 'America/New_York', flag: '🇺🇸' },
  { name: 'Pittsburgh', timezone: 'America/New_York', flag: '🇺🇸' },
  { name: 'Buffalo', timezone: 'America/New_York', flag: '🇺🇸' },
  { name: 'Rochester', timezone: 'America/New_York', flag: '🇺🇸' },
  { name: 'Albany', timezone: 'America/New_York', flag: '🇺🇸' },
  { name: 'Hartford', timezone: 'America/New_York', flag: '🇺🇸' },
  { name: 'Providence', timezone: 'America/New_York', flag: '🇺🇸' },
  { name: 'Richmond', timezone: 'America/New_York', flag: '🇺🇸' },
  { name: 'Raleigh', timezone: 'America/New_York', flag: '🇺🇸' },
  { name: 'Louisville', timezone: 'America/New_York', flag: '🇺🇸' },
  { name: 'Lexington', timezone: 'America/New_York', flag: '🇺🇸' },
  { name: 'Birmingham', timezone: 'America/Chicago', flag: '🇺🇸' },
  { name: 'Montgomery', timezone: 'America/Chicago', flag: '🇺🇸' },
  { name: 'Mobile', timezone: 'America/Chicago', flag: '🇺🇸' },
  { name: 'Little Rock', timezone: 'America/Chicago', flag: '🇺🇸' },
  { name: 'Oklahoma City', timezone: 'America/Chicago', flag: '🇺🇸' },
  { name: 'Tulsa', timezone: 'America/Chicago', flag: '🇺🇸' },
  { name: 'Wichita', timezone: 'America/Chicago', flag: '🇺🇸' },
  { name: 'Omaha', timezone: 'America/Chicago', flag: '🇺🇸' },
  { name: 'Des Moines', timezone: 'America/Chicago', flag: '🇺🇸' },
  { name: 'Fargo', timezone: 'America/Chicago', flag: '🇺🇸' },
  { name: 'Sioux Falls', timezone: 'America/Chicago', flag: '🇺🇸' },
  { name: 'Bismarck', timezone: 'America/Chicago', flag: '🇺🇸' },
  { name: 'Billings', timezone: 'America/Denver', flag: '🇺🇸' },
  { name: 'Cheyenne', timezone: 'America/Denver', flag: '🇺🇸' },
  { name: 'Salt Lake City', timezone: 'America/Denver', flag: '🇺🇸' },
  { name: 'Boise', timezone: 'America/Boise', flag: '🇺🇸' },
  { name: 'Albuquerque', timezone: 'America/Denver', flag: '🇺🇸' },
  { name: 'Tucson', timezone: 'America/Phoenix', flag: '🇺🇸' },
  { name: 'El Paso', timezone: 'America/Denver', flag: '🇺🇸' },
  { name: 'Juneau', timezone: 'America/Juneau', flag: '🇺🇸' },
  { name: 'Fairbanks', timezone: 'America/Anchorage', flag: '🇺🇸' },
  
  // North America - Canada
  { name: 'Toronto', timezone: 'America/Toronto', flag: '🇨🇦' },
  { name: 'Vancouver', timezone: 'America/Vancouver', flag: '🇨🇦' },
  { name: 'Montreal', timezone: 'America/Toronto', flag: '🇨🇦' },
  { name: 'Calgary', timezone: 'America/Edmonton', flag: '🇨🇦' },
  { name: 'Edmonton', timezone: 'America/Edmonton', flag: '🇨🇦' },
  { name: 'Ottawa', timezone: 'America/Toronto', flag: '🇨🇦' },
  { name: 'Winnipeg', timezone: 'America/Winnipeg', flag: '🇨🇦' },
  { name: 'Quebec City', timezone: 'America/Toronto', flag: '🇨🇦' },
  { name: 'Halifax', timezone: 'America/Halifax', flag: '🇨🇦' },
  { name: 'St. John\'s', timezone: 'America/St_Johns', flag: '🇨🇦' },
  { name: 'Victoria', timezone: 'America/Vancouver', flag: '🇨🇦' },
  { name: 'Regina', timezone: 'America/Regina', flag: '🇨🇦' },
  { name: 'Saskatoon', timezone: 'America/Regina', flag: '🇨🇦' },
  { name: 'Thunder Bay', timezone: 'America/Toronto', flag: '🇨🇦' },
  { name: 'Whitehorse', timezone: 'America/Whitehorse', flag: '🇨🇦' },
  { name: 'Yellowknife', timezone: 'America/Yellowknife', flag: '🇨🇦' },
  { name: 'Iqaluit', timezone: 'America/Iqaluit', flag: '🇨🇦' },
  
  // North America - Mexico & Central America
  { name: 'Mexico City', timezone: 'America/Mexico_City', flag: '🇲🇽' },
  { name: 'Guadalajara', timezone: 'America/Mexico_City', flag: '🇲🇽' },
  { name: 'Monterrey', timezone: 'America/Monterrey', flag: '🇲🇽' },
  { name: 'Tijuana', timezone: 'America/Tijuana', flag: '🇲🇽' },
  { name: 'Cancun', timezone: 'America/Cancun', flag: '🇲🇽' },
  { name: 'Merida', timezone: 'America/Merida', flag: '🇲🇽' },
  { name: 'Mazatlan', timezone: 'America/Mazatlan', flag: '🇲🇽' },
  { name: 'Chihuahua', timezone: 'America/Chihuahua', flag: '🇲🇽' },
  { name: 'Hermosillo', timezone: 'America/Hermosillo', flag: '🇲🇽' },
  { name: 'Guatemala City', timezone: 'America/Guatemala', flag: '🇬🇹' },
  { name: 'San Salvador', timezone: 'America/El_Salvador', flag: '🇸🇻' },
  { name: 'Tegucigalpa', timezone: 'America/Tegucigalpa', flag: '🇭🇳' },
  { name: 'Managua', timezone: 'America/Managua', flag: '🇳🇮' },
  { name: 'San Jose', timezone: 'America/Costa_Rica', flag: '🇨🇷' },
  { name: 'Panama City', timezone: 'America/Panama', flag: '🇵🇦' },
  { name: 'Belize City', timezone: 'America/Belize', flag: '🇧🇿' },
  
  // South America
  { name: 'São Paulo', timezone: 'America/Sao_Paulo', flag: '🇧🇷' },
  { name: 'Rio de Janeiro', timezone: 'America/Sao_Paulo', flag: '🇧🇷' },
  { name: 'Brasilia', timezone: 'America/Sao_Paulo', flag: '🇧🇷' },
  { name: 'Buenos Aires', timezone: 'America/Buenos_Aires', flag: '🇦🇷' },
  { name: 'Santiago', timezone: 'America/Santiago', flag: '🇨🇱' },
  { name: 'Lima', timezone: 'America/Lima', flag: '🇵🇪' },
  { name: 'Bogota', timezone: 'America/Bogota', flag: '🇨🇴' },
  { name: 'Caracas', timezone: 'America/Caracas', flag: '🇻🇪' },
  { name: 'Quito', timezone: 'America/Guayaquil', flag: '🇪🇨' },
  { name: 'La Paz', timezone: 'America/La_Paz', flag: '🇧🇴' },
  { name: 'Asuncion', timezone: 'America/Asuncion', flag: '🇵🇾' },
  { name: 'Montevideo', timezone: 'America/Montevideo', flag: '🇺🇾' },
  { name: 'Georgetown', timezone: 'America/Guyana', flag: '🇬🇾' },
  { name: 'Paramaribo', timezone: 'America/Paramaribo', flag: '🇸🇷' },
  { name: 'Cayenne', timezone: 'America/Cayenne', flag: '🇬🇫' },
  { name: 'Fortaleza', timezone: 'America/Fortaleza', flag: '🇧🇷' },
  { name: 'Recife', timezone: 'America/Recife', flag: '🇧🇷' },
  { name: 'Salvador', timezone: 'America/Bahia', flag: '🇧🇷' },
  { name: 'Manaus', timezone: 'America/Manaus', flag: '🇧🇷' },
  { name: 'Belem', timezone: 'America/Belem', flag: '🇧🇷' },
  { name: 'Cuiaba', timezone: 'America/Cuiaba', flag: '🇧🇷' },
  { name: 'Campo Grande', timezone: 'America/Campo_Grande', flag: '🇧🇷' },
  { name: 'Porto Alegre', timezone: 'America/Sao_Paulo', flag: '🇧🇷' },
  { name: 'Curitiba', timezone: 'America/Sao_Paulo', flag: '🇧🇷' },
  { name: 'Florianopolis', timezone: 'America/Sao_Paulo', flag: '🇧🇷' },
  { name: 'Medellin', timezone: 'America/Bogota', flag: '🇨🇴' },
  { name: 'Cali', timezone: 'America/Bogota', flag: '🇨🇴' },
  { name: 'Barranquilla', timezone: 'America/Bogota', flag: '🇨🇴' },
  { name: 'Guayaquil', timezone: 'America/Guayaquil', flag: '🇪🇨' },
  { name: 'Maracaibo', timezone: 'America/Caracas', flag: '🇻🇪' },
  { name: 'Valencia', timezone: 'America/Caracas', flag: '🇻🇪' },
  { name: 'Cordoba', timezone: 'America/Argentina/Cordoba', flag: '🇦🇷' },
  { name: 'Rosario', timezone: 'America/Argentina/Buenos_Aires', flag: '🇦🇷' },
  { name: 'Mendoza', timezone: 'America/Argentina/Mendoza', flag: '🇦🇷' },
  { name: 'Valparaiso', timezone: 'America/Santiago', flag: '🇨🇱' },
  { name: 'Arequipa', timezone: 'America/Lima', flag: '🇵🇪' },
  { name: 'Cusco', timezone: 'America/Lima', flag: '🇵🇪' },
  
  // Europe - Western
  { name: 'London', timezone: 'Europe/London', flag: '🇬🇧' },
  { name: 'Paris', timezone: 'Europe/Paris', flag: '🇫🇷' },
  { name: 'Berlin', timezone: 'Europe/Berlin', flag: '🇩🇪' },
  { name: 'Madrid', timezone: 'Europe/Madrid', flag: '🇪🇸' },
  { name: 'Rome', timezone: 'Europe/Rome', flag: '🇮🇹' },
  { name: 'Amsterdam', timezone: 'Europe/Amsterdam', flag: '🇳🇱' },
  { name: 'Brussels', timezone: 'Europe/Brussels', flag: '🇧🇪' },
  { name: 'Vienna', timezone: 'Europe/Vienna', flag: '🇦🇹' },
  { name: 'Zurich', timezone: 'Europe/Zurich', flag: '🇨🇭' },
  { name: 'Stockholm', timezone: 'Europe/Stockholm', flag: '🇸🇪' },
  { name: 'Oslo', timezone: 'Europe/Oslo', flag: '🇳🇴' },
  { name: 'Copenhagen', timezone: 'Europe/Copenhagen', flag: '🇩🇰' },
  { name: 'Helsinki', timezone: 'Europe/Helsinki', flag: '🇫🇮' },
  { name: 'Dublin', timezone: 'Europe/Dublin', flag: '🇮🇪' },
  { name: 'Lisbon', timezone: 'Europe/Lisbon', flag: '🇵🇹' },
  { name: 'Luxembourg', timezone: 'Europe/Luxembourg', flag: '🇱🇺' },
  { name: 'Monaco', timezone: 'Europe/Monaco', flag: '🇲🇨' },
  { name: 'Andorra', timezone: 'Europe/Andorra', flag: '🇦🇩' },
  { name: 'Barcelona', timezone: 'Europe/Madrid', flag: '🇪🇸' },
  { name: 'Valencia', timezone: 'Europe/Madrid', flag: '🇪🇸' },
  { name: 'Seville', timezone: 'Europe/Madrid', flag: '🇪🇸' },
  { name: 'Milan', timezone: 'Europe/Rome', flag: '🇮🇹' },
  { name: 'Naples', timezone: 'Europe/Rome', flag: '🇮🇹' },
  { name: 'Turin', timezone: 'Europe/Rome', flag: '🇮🇹' },
  { name: 'Venice', timezone: 'Europe/Rome', flag: '🇮🇹' },
  { name: 'Florence', timezone: 'Europe/Rome', flag: '🇮🇹' },
  { name: 'Munich', timezone: 'Europe/Berlin', flag: '🇩🇪' },
  { name: 'Hamburg', timezone: 'Europe/Berlin', flag: '🇩🇪' },
  { name: 'Frankfurt', timezone: 'Europe/Berlin', flag: '🇩🇪' },
  { name: 'Cologne', timezone: 'Europe/Berlin', flag: '🇩🇪' },
  { name: 'Stuttgart', timezone: 'Europe/Berlin', flag: '🇩🇪' },
  { name: 'Düsseldorf', timezone: 'Europe/Berlin', flag: '🇩🇪' },
  { name: 'Rotterdam', timezone: 'Europe/Amsterdam', flag: '🇳🇱' },
  { name: 'The Hague', timezone: 'Europe/Amsterdam', flag: '🇳🇱' },
  { name: 'Utrecht', timezone: 'Europe/Amsterdam', flag: '🇳🇱' },
  { name: 'Antwerp', timezone: 'Europe/Brussels', flag: '🇧🇪' },
  { name: 'Ghent', timezone: 'Europe/Brussels', flag: '🇧🇪' },
  { name: 'Geneva', timezone: 'Europe/Zurich', flag: '🇨🇭' },
  { name: 'Basel', timezone: 'Europe/Zurich', flag: '🇨🇭' },
  { name: 'Bern', timezone: 'Europe/Zurich', flag: '🇨🇭' },
  { name: 'Gothenburg', timezone: 'Europe/Stockholm', flag: '🇸🇪' },
  { name: 'Malmo', timezone: 'Europe/Stockholm', flag: '🇸🇪' },
  { name: 'Bergen', timezone: 'Europe/Oslo', flag: '🇳🇴' },
  { name: 'Trondheim', timezone: 'Europe/Oslo', flag: '🇳🇴' },
  { name: 'Aarhus', timezone: 'Europe/Copenhagen', flag: '🇩🇰' },
  { name: 'Odense', timezone: 'Europe/Copenhagen', flag: '🇩🇰' },
  { name: 'Tampere', timezone: 'Europe/Helsinki', flag: '🇫🇮' },
  { name: 'Turku', timezone: 'Europe/Helsinki', flag: '🇫🇮' },
  { name: 'Cork', timezone: 'Europe/Dublin', flag: '🇮🇪' },
  { name: 'Porto', timezone: 'Europe/Lisbon', flag: '🇵🇹' },
  { name: 'Coimbra', timezone: 'Europe/Lisbon', flag: '🇵🇹' },
  
  // Europe - Eastern
  { name: 'Moscow', timezone: 'Europe/Moscow', flag: '🇷🇺' },
  { name: 'Warsaw', timezone: 'Europe/Warsaw', flag: '🇵🇱' },
  { name: 'Prague', timezone: 'Europe/Prague', flag: '🇨🇿' },
  { name: 'Budapest', timezone: 'Europe/Budapest', flag: '🇭🇺' },
  { name: 'Bucharest', timezone: 'Europe/Bucharest', flag: '🇷🇴' },
  { name: 'Sofia', timezone: 'Europe/Sofia', flag: '🇧🇬' },
  { name: 'Athens', timezone: 'Europe/Athens', flag: '🇬🇷' },
  { name: 'Belgrade', timezone: 'Europe/Belgrade', flag: '🇷🇸' },
  { name: 'Zagreb', timezone: 'Europe/Zagreb', flag: '🇭🇷' },
  { name: 'Ljubljana', timezone: 'Europe/Ljubljana', flag: '🇸🇮' },
  { name: 'Bratislava', timezone: 'Europe/Bratislava', flag: '🇸🇰' },
  { name: 'Kiev', timezone: 'Europe/Kiev', flag: '🇺🇦' },
  { name: 'Minsk', timezone: 'Europe/Minsk', flag: '🇧🇾' },
  { name: 'Vilnius', timezone: 'Europe/Vilnius', flag: '🇱🇹' },
  { name: 'Riga', timezone: 'Europe/Riga', flag: '🇱🇻' },
  { name: 'Tallinn', timezone: 'Europe/Tallinn', flag: '🇪🇪' },
  { name: 'Krakow', timezone: 'Europe/Warsaw', flag: '🇵🇱' },
  { name: 'Gdansk', timezone: 'Europe/Warsaw', flag: '🇵🇱' },
  { name: 'Wroclaw', timezone: 'Europe/Warsaw', flag: '🇵🇱' },
  { name: 'Brno', timezone: 'Europe/Prague', flag: '🇨🇿' },
  { name: 'Ostrava', timezone: 'Europe/Prague', flag: '🇨🇿' },
  { name: 'Debrecen', timezone: 'Europe/Budapest', flag: '🇭🇺' },
  { name: 'Szeged', timezone: 'Europe/Budapest', flag: '🇭🇺' },
  { name: 'Cluj-Napoca', timezone: 'Europe/Bucharest', flag: '🇷🇴' },
  { name: 'Timisoara', timezone: 'Europe/Bucharest', flag: '🇷🇴' },
  { name: 'Plovdiv', timezone: 'Europe/Sofia', flag: '🇧🇬' },
  { name: 'Varna', timezone: 'Europe/Sofia', flag: '🇧🇬' },
  { name: 'Thessaloniki', timezone: 'Europe/Athens', flag: '🇬🇷' },
  { name: 'Patras', timezone: 'Europe/Athens', flag: '🇬🇷' },
  { name: 'Novi Sad', timezone: 'Europe/Belgrade', flag: '🇷🇸' },
  { name: 'Nis', timezone: 'Europe/Belgrade', flag: '🇷🇸' },
  { name: 'Split', timezone: 'Europe/Zagreb', flag: '🇭🇷' },
  { name: 'Dubrovnik', timezone: 'Europe/Zagreb', flag: '🇭🇷' },
  { name: 'Odessa', timezone: 'Europe/Kiev', flag: '🇺🇦' },
  { name: 'Kharkiv', timezone: 'Europe/Kiev', flag: '🇺🇦' },
  { name: 'Lviv', timezone: 'Europe/Kiev', flag: '🇺🇦' },
  { name: 'St. Petersburg', timezone: 'Europe/Moscow', flag: '🇷🇺' },
  { name: 'Novosibirsk', timezone: 'Asia/Novosibirsk', flag: '🇷🇺' },
  { name: 'Yekaterinburg', timezone: 'Asia/Yekaterinburg', flag: '🇷🇺' },
  { name: 'Kazan', timezone: 'Europe/Moscow', flag: '🇷🇺' },
  { name: 'Nizhny Novgorod', timezone: 'Europe/Moscow', flag: '🇷🇺' },
  { name: 'Samara', timezone: 'Europe/Samara', flag: '🇷🇺' },
  { name: 'Rostov-on-Don', timezone: 'Europe/Moscow', flag: '🇷🇺' },
  { name: 'Volgograd', timezone: 'Europe/Volgograd', flag: '🇷🇺' },
  
  // Asia - Middle East
  { name: 'Dubai', timezone: 'Asia/Dubai', flag: '🇦🇪' },
  { name: 'Abu Dhabi', timezone: 'Asia/Dubai', flag: '🇦🇪' },
  { name: 'Riyadh', timezone: 'Asia/Riyadh', flag: '🇸🇦' },
  { name: 'Jeddah', timezone: 'Asia/Riyadh', flag: '🇸🇦' },
  { name: 'Mecca', timezone: 'Asia/Riyadh', flag: '🇸🇦' },
  { name: 'Medina', timezone: 'Asia/Riyadh', flag: '🇸🇦' },
  { name: 'Dammam', timezone: 'Asia/Riyadh', flag: '🇸🇦' },
  { name: 'Kuwait City', timezone: 'Asia/Kuwait', flag: '🇰🇼' },
  { name: 'Manama', timezone: 'Asia/Bahrain', flag: '🇧🇭' },
  { name: 'Doha', timezone: 'Asia/Qatar', flag: '🇶🇦' },
  { name: 'Muscat', timezone: 'Asia/Muscat', flag: '🇴🇲' },
  { name: 'Sana\'a', timezone: 'Asia/Aden', flag: '🇾🇪' },
  { name: 'Baghdad', timezone: 'Asia/Baghdad', flag: '🇮🇶' },
  { name: 'Basra', timezone: 'Asia/Baghdad', flag: '🇮🇶' },
  { name: 'Tehran', timezone: 'Asia/Tehran', flag: '🇮🇷' },
  { name: 'Isfahan', timezone: 'Asia/Tehran', flag: '🇮🇷' },
  { name: 'Shiraz', timezone: 'Asia/Tehran', flag: '🇮🇷' },
  { name: 'Tabriz', timezone: 'Asia/Tehran', flag: '🇮🇷' },
  { name: 'Tel Aviv', timezone: 'Asia/Jerusalem', flag: '🇮🇱' },
  { name: 'Jerusalem', timezone: 'Asia/Jerusalem', flag: '🇮🇱' },
  { name: 'Haifa', timezone: 'Asia/Jerusalem', flag: '🇮🇱' },
  { name: 'Beirut', timezone: 'Asia/Beirut', flag: '🇱🇧' },
  { name: 'Damascus', timezone: 'Asia/Damascus', flag: '🇸🇾' },
  { name: 'Amman', timezone: 'Asia/Amman', flag: '🇯🇴' },
  { name: 'Nicosia', timezone: 'Asia/Nicosia', flag: '🇨🇾' },
  { name: 'Istanbul', timezone: 'Europe/Istanbul', flag: '🇹🇷' },
  { name: 'Ankara', timezone: 'Europe/Istanbul', flag: '🇹🇷' },
  { name: 'Izmir', timezone: 'Europe/Istanbul', flag: '🇹🇷' },
  { name: 'Antalya', timezone: 'Europe/Istanbul', flag: '🇹🇷' },
  { name: 'Bursa', timezone: 'Europe/Istanbul', flag: '🇹🇷' },
  { name: 'Cairo', timezone: 'Africa/Cairo', flag: '🇪🇬' },
  { name: 'Alexandria', timezone: 'Africa/Cairo', flag: '🇪🇬' },
  { name: 'Giza', timezone: 'Africa/Cairo', flag: '🇪🇬' },
  
  // Asia - South Asia
  { name: 'Mumbai', timezone: 'Asia/Kolkata', flag: '🇮🇳' },
  { name: 'Delhi', timezone: 'Asia/Kolkata', flag: '🇮🇳' },
  { name: 'Bangalore', timezone: 'Asia/Kolkata', flag: '🇮🇳' },
  { name: 'Hyderabad', timezone: 'Asia/Kolkata', flag: '🇮🇳' },
  { name: 'Chennai', timezone: 'Asia/Kolkata', flag: '🇮🇳' },
  { name: 'Kolkata', timezone: 'Asia/Kolkata', flag: '🇮🇳' },
  { name: 'Pune', timezone: 'Asia/Kolkata', flag: '🇮🇳' },
  { name: 'Ahmedabad', timezone: 'Asia/Kolkata', flag: '🇮🇳' },
  { name: 'Surat', timezone: 'Asia/Kolkata', flag: '🇮🇳' },
  { name: 'Jaipur', timezone: 'Asia/Kolkata', flag: '🇮🇳' },
  { name: 'Lucknow', timezone: 'Asia/Kolkata', flag: '🇮🇳' },
  { name: 'Kanpur', timezone: 'Asia/Kolkata', flag: '🇮🇳' },
  { name: 'Nagpur', timezone: 'Asia/Kolkata', flag: '🇮🇳' },
  { name: 'Indore', timezone: 'Asia/Kolkata', flag: '🇮🇳' },
  { name: 'Thane', timezone: 'Asia/Kolkata', flag: '🇮🇳' },
  { name: 'Bhopal', timezone: 'Asia/Kolkata', flag: '🇮🇳' },
  { name: 'Visakhapatnam', timezone: 'Asia/Kolkata', flag: '🇮🇳' },
  { name: 'Patna', timezone: 'Asia/Kolkata', flag: '🇮🇳' },
  { name: 'Vadodara', timezone: 'Asia/Kolkata', flag: '🇮🇳' },
  { name: 'Ghaziabad', timezone: 'Asia/Kolkata', flag: '🇮🇳' },
  { name: 'Ludhiana', timezone: 'Asia/Kolkata', flag: '🇮🇳' },
  { name: 'Agra', timezone: 'Asia/Kolkata', flag: '🇮🇳' },
  { name: 'Nashik', timezone: 'Asia/Kolkata', flag: '🇮🇳' },
  { name: 'Faridabad', timezone: 'Asia/Kolkata', flag: '🇮🇳' },
  { name: 'Meerut', timezone: 'Asia/Kolkata', flag: '🇮🇳' },
  { name: 'Rajkot', timezone: 'Asia/Kolkata', flag: '🇮🇳' },
  { name: 'Varanasi', timezone: 'Asia/Kolkata', flag: '🇮🇳' },
  { name: 'Srinagar', timezone: 'Asia/Kolkata', flag: '🇮🇳' },
  { name: 'Amritsar', timezone: 'Asia/Kolkata', flag: '🇮🇳' },
  { name: 'Chandigarh', timezone: 'Asia/Kolkata', flag: '🇮🇳' },
  { name: 'Guwahati', timezone: 'Asia/Kolkata', flag: '🇮🇳' },
  { name: 'Imphal', timezone: 'Asia/Kolkata', flag: '🇮🇳' },
  { name: 'Shillong', timezone: 'Asia/Kolkata', flag: '🇮🇳' },
  { name: 'Aizawl', timezone: 'Asia/Kolkata', flag: '🇮🇳' },
  { name: 'Kohima', timezone: 'Asia/Kolkata', flag: '🇮🇳' },
  { name: 'Gangtok', timezone: 'Asia/Kolkata', flag: '🇮🇳' },
  { name: 'Itanagar', timezone: 'Asia/Kolkata', flag: '🇮🇳' },
  { name: 'Port Blair', timezone: 'Asia/Kolkata', flag: '🇮🇳' },
  { name: 'Karachi', timezone: 'Asia/Karachi', flag: '🇵🇰' },
  { name: 'Lahore', timezone: 'Asia/Karachi', flag: '🇵🇰' },
  { name: 'Islamabad', timezone: 'Asia/Karachi', flag: '🇵🇰' },
  { name: 'Faisalabad', timezone: 'Asia/Karachi', flag: '🇵🇰' },
  { name: 'Rawalpindi', timezone: 'Asia/Karachi', flag: '🇵🇰' },
  { name: 'Multan', timezone: 'Asia/Karachi', flag: '🇵🇰' },
  { name: 'Peshawar', timezone: 'Asia/Karachi', flag: '🇵🇰' },
  { name: 'Quetta', timezone: 'Asia/Karachi', flag: '🇵🇰' },
  { name: 'Dhaka', timezone: 'Asia/Dhaka', flag: '🇧🇩' },
  { name: 'Chittagong', timezone: 'Asia/Dhaka', flag: '🇧🇩' },
  { name: 'Khulna', timezone: 'Asia/Dhaka', flag: '🇧🇩' },
  { name: 'Rajshahi', timezone: 'Asia/Dhaka', flag: '🇧🇩' },
  { name: 'Kathmandu', timezone: 'Asia/Kathmandu', flag: '🇳🇵' },
  { name: 'Colombo', timezone: 'Asia/Colombo', flag: '🇱🇰' },
  { name: 'Kandy', timezone: 'Asia/Colombo', flag: '🇱🇰' },
  { name: 'Kabul', timezone: 'Asia/Kabul', flag: '🇦🇫' },
  { name: 'Male', timezone: 'Indian/Maldives', flag: '🇲🇻' },
  { name: 'Thimphu', timezone: 'Asia/Thimphu', flag: '🇧🇹' },
  
  // Asia - East Asia
  { name: 'Tokyo', timezone: 'Asia/Tokyo', flag: '🇯🇵' },
  { name: 'Osaka', timezone: 'Asia/Tokyo', flag: '🇯🇵' },
  { name: 'Yokohama', timezone: 'Asia/Tokyo', flag: '🇯🇵' },
  { name: 'Nagoya', timezone: 'Asia/Tokyo', flag: '🇯🇵' },
  { name: 'Sapporo', timezone: 'Asia/Tokyo', flag: '🇯🇵' },
  { name: 'Fukuoka', timezone: 'Asia/Tokyo', flag: '🇯🇵' },
  { name: 'Kobe', timezone: 'Asia/Tokyo', flag: '🇯🇵' },
  { name: 'Kyoto', timezone: 'Asia/Tokyo', flag: '🇯🇵' },
  { name: 'Sendai', timezone: 'Asia/Tokyo', flag: '🇯🇵' },
  { name: 'Hiroshima', timezone: 'Asia/Tokyo', flag: '🇯🇵' },
  { name: 'Beijing', timezone: 'Asia/Shanghai', flag: '🇨🇳' },
  { name: 'Shanghai', timezone: 'Asia/Shanghai', flag: '🇨🇳' },
  { name: 'Guangzhou', timezone: 'Asia/Shanghai', flag: '🇨🇳' },
  { name: 'Shenzhen', timezone: 'Asia/Shanghai', flag: '🇨🇳' },
  { name: 'Chengdu', timezone: 'Asia/Shanghai', flag: '🇨🇳' },
  { name: 'Chongqing', timezone: 'Asia/Shanghai', flag: '🇨🇳' },
  { name: 'Wuhan', timezone: 'Asia/Shanghai', flag: '🇨🇳' },
  { name: 'Xi\'an', timezone: 'Asia/Shanghai', flag: '🇨🇳' },
  { name: 'Nanjing', timezone: 'Asia/Shanghai', flag: '🇨🇳' },
  { name: 'Hangzhou', timezone: 'Asia/Shanghai', flag: '🇨🇳' },
  { name: 'Tianjin', timezone: 'Asia/Shanghai', flag: '🇨🇳' },
  { name: 'Suzhou', timezone: 'Asia/Shanghai', flag: '🇨🇳' },
  { name: 'Dongguan', timezone: 'Asia/Shanghai', flag: '🇨🇳' },
  { name: 'Foshan', timezone: 'Asia/Shanghai', flag: '🇨🇳' },
  { name: 'Jinan', timezone: 'Asia/Shanghai', flag: '🇨🇳' },
  { name: 'Dalian', timezone: 'Asia/Shanghai', flag: '🇨🇳' },
  { name: 'Qingdao', timezone: 'Asia/Shanghai', flag: '🇨🇳' },
  { name: 'Zhengzhou', timezone: 'Asia/Shanghai', flag: '🇨🇳' },
  { name: 'Changsha', timezone: 'Asia/Shanghai', flag: '🇨🇳' },
  { name: 'Kunming', timezone: 'Asia/Shanghai', flag: '🇨🇳' },
  { name: 'Shenyang', timezone: 'Asia/Shanghai', flag: '🇨🇳' },
  { name: 'Harbin', timezone: 'Asia/Shanghai', flag: '🇨🇳' },
  { name: 'Changchun', timezone: 'Asia/Shanghai', flag: '🇨🇳' },
  { name: 'Taiyuan', timezone: 'Asia/Shanghai', flag: '🇨🇳' },
  { name: 'Shijiazhuang', timezone: 'Asia/Shanghai', flag: '🇨🇳' },
  { name: 'Urumqi', timezone: 'Asia/Urumqi', flag: '🇨🇳' },
  { name: 'Lhasa', timezone: 'Asia/Shanghai', flag: '🇨🇳' },
  { name: 'Hong Kong', timezone: 'Asia/Hong_Kong', flag: '🇭🇰' },
  { name: 'Macau', timezone: 'Asia/Macau', flag: '🇲🇴' },
  { name: 'Taipei', timezone: 'Asia/Taipei', flag: '🇹🇼' },
  { name: 'Kaohsiung', timezone: 'Asia/Taipei', flag: '🇹🇼' },
  { name: 'Taichung', timezone: 'Asia/Taipei', flag: '🇹🇼' },
  { name: 'Seoul', timezone: 'Asia/Seoul', flag: '🇰🇷' },
  { name: 'Busan', timezone: 'Asia/Seoul', flag: '🇰🇷' },
  { name: 'Incheon', timezone: 'Asia/Seoul', flag: '🇰🇷' },
  { name: 'Daegu', timezone: 'Asia/Seoul', flag: '🇰🇷' },
  { name: 'Daejeon', timezone: 'Asia/Seoul', flag: '🇰🇷' },
  { name: 'Gwangju', timezone: 'Asia/Seoul', flag: '🇰🇷' },
  { name: 'Ulsan', timezone: 'Asia/Seoul', flag: '🇰🇷' },
  { name: 'Pyongyang', timezone: 'Asia/Pyongyang', flag: '🇰🇵' },
  { name: 'Ulaanbaatar', timezone: 'Asia/Ulaanbaatar', flag: '🇲🇳' },
  
  // Asia - Southeast Asia
  { name: 'Singapore', timezone: 'Asia/Singapore', flag: '🇸🇬' },
  { name: 'Bangkok', timezone: 'Asia/Bangkok', flag: '🇹🇭' },
  { name: 'Jakarta', timezone: 'Asia/Jakarta', flag: '🇮🇩' },
  { name: 'Manila', timezone: 'Asia/Manila', flag: '🇵🇭' },
  { name: 'Kuala Lumpur', timezone: 'Asia/Kuala_Lumpur', flag: '🇲🇾' },
  { name: 'Ho Chi Minh City', timezone: 'Asia/Ho_Chi_Minh', flag: '🇻🇳' },
  { name: 'Hanoi', timezone: 'Asia/Ho_Chi_Minh', flag: '🇻🇳' },
  { name: 'Yangon', timezone: 'Asia/Yangon', flag: '🇲🇲' },
  { name: 'Phnom Penh', timezone: 'Asia/Phnom_Penh', flag: '🇰🇭' },
  { name: 'Vientiane', timezone: 'Asia/Vientiane', flag: '🇱🇦' },
  { name: 'Bandar Seri Begawan', timezone: 'Asia/Brunei', flag: '🇧🇳' },
  { name: 'Surabaya', timezone: 'Asia/Jakarta', flag: '🇮🇩' },
  { name: 'Medan', timezone: 'Asia/Jakarta', flag: '🇮🇩' },
  { name: 'Bandung', timezone: 'Asia/Jakarta', flag: '🇮🇩' },
  { name: 'Semarang', timezone: 'Asia/Jakarta', flag: '🇮🇩' },
  { name: 'Makassar', timezone: 'Asia/Makassar', flag: '🇮🇩' },
  { name: 'Denpasar', timezone: 'Asia/Makassar', flag: '🇮🇩' },
  { name: 'Palembang', timezone: 'Asia/Jakarta', flag: '🇮🇩' },
  { name: 'Cebu City', timezone: 'Asia/Manila', flag: '🇵🇭' },
  { name: 'Davao City', timezone: 'Asia/Manila', flag: '🇵🇭' },
  { name: 'Quezon City', timezone: 'Asia/Manila', flag: '🇵🇭' },
  { name: 'Caloocan', timezone: 'Asia/Manila', flag: '🇵🇭' },
  { name: 'Penang', timezone: 'Asia/Kuala_Lumpur', flag: '🇲🇾' },
  { name: 'Johor Bahru', timezone: 'Asia/Kuala_Lumpur', flag: '🇲🇾' },
  { name: 'Ipoh', timezone: 'Asia/Kuala_Lumpur', flag: '🇲🇾' },
  { name: 'Chiang Mai', timezone: 'Asia/Bangkok', flag: '🇹🇭' },
  { name: 'Phuket', timezone: 'Asia/Bangkok', flag: '🇹🇭' },
  { name: 'Hatyai', timezone: 'Asia/Bangkok', flag: '🇹🇭' },
  { name: 'Da Nang', timezone: 'Asia/Ho_Chi_Minh', flag: '🇻🇳' },
  { name: 'Hai Phong', timezone: 'Asia/Ho_Chi_Minh', flag: '🇻🇳' },
  { name: 'Can Tho', timezone: 'Asia/Ho_Chi_Minh', flag: '🇻🇳' },
  { name: 'Mandalay', timezone: 'Asia/Yangon', flag: '🇲🇲' },
  { name: 'Naypyidaw', timezone: 'Asia/Yangon', flag: '🇲🇲' },
  
  // Asia - Central Asia
  { name: 'Almaty', timezone: 'Asia/Almaty', flag: '🇰🇿' },
  { name: 'Astana', timezone: 'Asia/Almaty', flag: '🇰🇿' },
  { name: 'Tashkent', timezone: 'Asia/Tashkent', flag: '🇺🇿' },
  { name: 'Samarkand', timezone: 'Asia/Samarkand', flag: '🇺🇿' },
  { name: 'Bishkek', timezone: 'Asia/Bishkek', flag: '🇰🇬' },
  { name: 'Dushanbe', timezone: 'Asia/Dushanbe', flag: '🇹🇯' },
  { name: 'Ashgabat', timezone: 'Asia/Ashgabat', flag: '🇹🇲' },
  
  // Africa
  { name: 'Lagos', timezone: 'Africa/Lagos', flag: '🇳🇬' },
  { name: 'Kinshasa', timezone: 'Africa/Kinshasa', flag: '🇨🇩' },
  { name: 'Johannesburg', timezone: 'Africa/Johannesburg', flag: '🇿🇦' },
  { name: 'Cape Town', timezone: 'Africa/Johannesburg', flag: '🇿🇦' },
  { name: 'Nairobi', timezone: 'Africa/Nairobi', flag: '🇰🇪' },
  { name: 'Casablanca', timezone: 'Africa/Casablanca', flag: '🇲🇦' },
  { name: 'Algiers', timezone: 'Africa/Algiers', flag: '🇩🇿' },
  { name: 'Tunis', timezone: 'Africa/Tunis', flag: '🇹🇳' },
  { name: 'Tripoli', timezone: 'Africa/Tripoli', flag: '🇱🇾' },
  { name: 'Khartoum', timezone: 'Africa/Khartoum', flag: '🇸🇩' },
  { name: 'Addis Ababa', timezone: 'Africa/Addis_Ababa', flag: '🇪🇹' },
  { name: 'Dar es Salaam', timezone: 'Africa/Dar_es_Salaam', flag: '🇹🇿' },
  { name: 'Kampala', timezone: 'Africa/Kampala', flag: '🇺🇬' },
  { name: 'Accra', timezone: 'Africa/Accra', flag: '🇬🇭' },
  { name: 'Abidjan', timezone: 'Africa/Abidjan', flag: '🇨🇮' },
  { name: 'Dakar', timezone: 'Africa/Dakar', flag: '🇸🇳' },
  { name: 'Luanda', timezone: 'Africa/Luanda', flag: '🇦🇴' },
  { name: 'Maputo', timezone: 'Africa/Maputo', flag: '🇲🇿' },
  { name: 'Harare', timezone: 'Africa/Harare', flag: '🇿🇼' },
  { name: 'Lusaka', timezone: 'Africa/Lusaka', flag: '🇿🇲' },
  { name: 'Gaborone', timezone: 'Africa/Gaborone', flag: '🇧🇼' },
  { name: 'Windhoek', timezone: 'Africa/Windhoek', flag: '🇳🇦' },
  { name: 'Mbabane', timezone: 'Africa/Mbabane', flag: '🇸🇿' },
  { name: 'Maseru', timezone: 'Africa/Maseru', flag: '🇱🇸' },
  { name: 'Abuja', timezone: 'Africa/Lagos', flag: '🇳🇬' },
  { name: 'Ibadan', timezone: 'Africa/Lagos', flag: '🇳🇬' },
  { name: 'Kano', timezone: 'Africa/Lagos', flag: '🇳🇬' },
  { name: 'Port Harcourt', timezone: 'Africa/Lagos', flag: '🇳🇬' },
  { name: 'Benin City', timezone: 'Africa/Lagos', flag: '🇳🇬' },
  { name: 'Kaduna', timezone: 'Africa/Lagos', flag: '🇳🇬' },
  { name: 'Lubumbashi', timezone: 'Africa/Lubumbashi', flag: '🇨🇩' },
  { name: 'Mbuji-Mayi', timezone: 'Africa/Lubumbashi', flag: '🇨🇩' },
  { name: 'Kisangani', timezone: 'Africa/Lubumbashi', flag: '🇨🇩' },
  { name: 'Durban', timezone: 'Africa/Johannesburg', flag: '🇿🇦' },
  { name: 'Pretoria', timezone: 'Africa/Johannesburg', flag: '🇿🇦' },
  { name: 'Port Elizabeth', timezone: 'Africa/Johannesburg', flag: '🇿🇦' },
  { name: 'Mombasa', timezone: 'Africa/Nairobi', flag: '🇰🇪' },
  { name: 'Kisumu', timezone: 'Africa/Nairobi', flag: '🇰🇪' },
  { name: 'Rabat', timezone: 'Africa/Casablanca', flag: '🇲🇦' },
  { name: 'Marrakech', timezone: 'Africa/Casablanca', flag: '🇲🇦' },
  { name: 'Fes', timezone: 'Africa/Casablanca', flag: '🇲🇦' },
  { name: 'Oran', timezone: 'Africa/Algiers', flag: '🇩🇿' },
  { name: 'Constantine', timezone: 'Africa/Algiers', flag: '🇩🇿' },
  { name: 'Sfax', timezone: 'Africa/Tunis', flag: '🇹🇳' },
  { name: 'Sousse', timezone: 'Africa/Tunis', flag: '🇹🇳' },
  { name: 'Benghazi', timezone: 'Africa/Tripoli', flag: '🇱🇾' },
  { name: 'Port Sudan', timezone: 'Africa/Khartoum', flag: '🇸🇩' },
  { name: 'Dire Dawa', timezone: 'Africa/Addis_Ababa', flag: '🇪🇹' },
  { name: 'Mekele', timezone: 'Africa/Addis_Ababa', flag: '🇪🇹' },
  { name: 'Zanzibar', timezone: 'Africa/Dar_es_Salaam', flag: '🇹🇿' },
  { name: 'Mwanza', timezone: 'Africa/Dar_es_Salaam', flag: '🇹🇿' },
  { name: 'Entebbe', timezone: 'Africa/Kampala', flag: '🇺🇬' },
  { name: 'Kumasi', timezone: 'Africa/Accra', flag: '🇬🇭' },
  { name: 'Tamale', timezone: 'Africa/Accra', flag: '🇬🇭' },
  { name: 'Bouake', timezone: 'Africa/Abidjan', flag: '🇨🇮' },
  { name: 'Yamoussoukro', timezone: 'Africa/Abidjan', flag: '🇨🇮' },
  { name: 'Thies', timezone: 'Africa/Dakar', flag: '🇸🇳' },
  { name: 'Huambo', timezone: 'Africa/Luanda', flag: '🇦🇴' },
  { name: 'Lobito', timezone: 'Africa/Luanda', flag: '🇦🇴' },
  { name: 'Beira', timezone: 'Africa/Maputo', flag: '🇲🇿' },
  { name: 'Nampula', timezone: 'Africa/Maputo', flag: '🇲🇿' },
  { name: 'Bulawayo', timezone: 'Africa/Harare', flag: '🇿🇼' },
  { name: 'Chitungwiza', timezone: 'Africa/Harare', flag: '🇿🇼' },
  { name: 'Ndola', timezone: 'Africa/Lusaka', flag: '🇿🇲' },
  { name: 'Kitwe', timezone: 'Africa/Lusaka', flag: '🇿🇲' },
  { name: 'Francistown', timezone: 'Africa/Gaborone', flag: '🇧🇼' },
  { name: 'Oshakati', timezone: 'Africa/Windhoek', flag: '🇳🇦' },
  
  // Oceania
  { name: 'Sydney', timezone: 'Australia/Sydney', flag: '🇦🇺' },
  { name: 'Melbourne', timezone: 'Australia/Melbourne', flag: '🇦🇺' },
  { name: 'Brisbane', timezone: 'Australia/Brisbane', flag: '🇦🇺' },
  { name: 'Perth', timezone: 'Australia/Perth', flag: '🇦🇺' },
  { name: 'Adelaide', timezone: 'Australia/Adelaide', flag: '🇦🇺' },
  { name: 'Darwin', timezone: 'Australia/Darwin', flag: '🇦🇺' },
  { name: 'Hobart', timezone: 'Australia/Hobart', flag: '🇦🇺' },
  { name: 'Canberra', timezone: 'Australia/Sydney', flag: '🇦🇺' },
  { name: 'Gold Coast', timezone: 'Australia/Brisbane', flag: '🇦🇺' },
  { name: 'Newcastle', timezone: 'Australia/Sydney', flag: '🇦🇺' },
  { name: 'Wollongong', timezone: 'Australia/Sydney', flag: '🇦🇺' },
  { name: 'Geelong', timezone: 'Australia/Melbourne', flag: '🇦🇺' },
  { name: 'Townsville', timezone: 'Australia/Brisbane', flag: '🇦🇺' },
  { name: 'Cairns', timezone: 'Australia/Brisbane', flag: '🇦🇺' },
  { name: 'Toowoomba', timezone: 'Australia/Brisbane', flag: '🇦🇺' },
  { name: 'Ballarat', timezone: 'Australia/Melbourne', flag: '🇦🇺' },
  { name: 'Bendigo', timezone: 'Australia/Melbourne', flag: '🇦🇺' },
  { name: 'Albury', timezone: 'Australia/Sydney', flag: '🇦🇺' },
  { name: 'Launceston', timezone: 'Australia/Hobart', flag: '🇦🇺' },
  { name: 'Mackay', timezone: 'Australia/Brisbane', flag: '🇦🇺' },
  { name: 'Rockhampton', timezone: 'Australia/Brisbane', flag: '🇦🇺' },
  { name: 'Bunbury', timezone: 'Australia/Perth', flag: '🇦🇺' },
  { name: 'Coffs Harbour', timezone: 'Australia/Sydney', flag: '🇦🇺' },
  { name: 'Wagga Wagga', timezone: 'Australia/Sydney', flag: '🇦🇺' },
  { name: 'Hervey Bay', timezone: 'Australia/Brisbane', flag: '🇦🇺' },
  { name: 'Port Macquarie', timezone: 'Australia/Sydney', flag: '🇦🇺' },
  { name: 'Auckland', timezone: 'Pacific/Auckland', flag: '🇳🇿' },
  { name: 'Wellington', timezone: 'Pacific/Auckland', flag: '🇳🇿' },
  { name: 'Christchurch', timezone: 'Pacific/Auckland', flag: '🇳🇿' },
  { name: 'Hamilton', timezone: 'Pacific/Auckland', flag: '🇳🇿' },
  { name: 'Tauranga', timezone: 'Pacific/Auckland', flag: '🇳🇿' },
  { name: 'Napier', timezone: 'Pacific/Auckland', flag: '🇳🇿' },
  { name: 'Palmerston North', timezone: 'Pacific/Auckland', flag: '🇳🇿' },
  { name: 'Dunedin', timezone: 'Pacific/Auckland', flag: '🇳🇿' },
  { name: 'Invercargill', timezone: 'Pacific/Auckland', flag: '🇳🇿' },
  { name: 'Suva', timezone: 'Pacific/Fiji', flag: '🇫🇯' },
  { name: 'Nadi', timezone: 'Pacific/Fiji', flag: '🇫🇯' },
  { name: 'Port Moresby', timezone: 'Pacific/Port_Moresby', flag: '🇵🇬' },
  { name: 'Lae', timezone: 'Pacific/Port_Moresby', flag: '🇵🇬' },
  { name: 'Noumea', timezone: 'Pacific/Noumea', flag: '🇳🇨' },
  { name: 'Port Vila', timezone: 'Pacific/Efate', flag: '🇻🇺' },
  { name: 'Honiara', timezone: 'Pacific/Guadalcanal', flag: '🇸🇧' },
  { name: 'Nuku\'alofa', timezone: 'Pacific/Tongatapu', flag: '🇹🇴' },
  { name: 'Apia', timezone: 'Pacific/Apia', flag: '🇼🇸' },
  { name: 'Pago Pago', timezone: 'Pacific/Pago_Pago', flag: '🇦🇸' },
  { name: 'Guam', timezone: 'Pacific/Guam', flag: '🇬🇺' },
  { name: 'Saipan', timezone: 'Pacific/Saipan', flag: '🇲🇵' },
  { name: 'Palikir', timezone: 'Pacific/Pohnpei', flag: '🇫🇲' },
  { name: 'Majuro', timezone: 'Pacific/Majuro', flag: '🇲🇭' },
  { name: 'Tarawa', timezone: 'Pacific/Tarawa', flag: '🇰🇮' },
  { name: 'Funafuti', timezone: 'Pacific/Funafuti', flag: '🇹🇻' },
  { name: 'Papeete', timezone: 'Pacific/Tahiti', flag: '🇵🇫' },
  { name: 'Rarotonga', timezone: 'Pacific/Rarotonga', flag: '🇨🇰' },
  { name: 'Avarua', timezone: 'Pacific/Rarotonga', flag: '🇨🇰' },
  
  // Atlantic Islands
  { name: 'Reykjavik', timezone: 'Atlantic/Reykjavik', flag: '🇮🇸' },
  { name: 'Torshavn', timezone: 'Atlantic/Faroe', flag: '🇫🇴' },
  { name: 'Azores', timezone: 'Atlantic/Azores', flag: '🇵🇹' },
  { name: 'Madeira', timezone: 'Atlantic/Madeira', flag: '🇵🇹' },
  { name: 'Canary Islands', timezone: 'Atlantic/Canary', flag: '🇪🇸' },
  { name: 'Cape Verde', timezone: 'Atlantic/Cape_Verde', flag: '🇨🇻' },
  { name: 'Bermuda', timezone: 'Atlantic/Bermuda', flag: '🇧🇲' },
  { name: 'South Georgia', timezone: 'Atlantic/South_Georgia', flag: '🇬🇸' },
  
  // Indian Ocean
  { name: 'Mauritius', timezone: 'Indian/Mauritius', flag: '🇲🇺' },
  { name: 'Seychelles', timezone: 'Indian/Mahe', flag: '🇸🇨' },
  { name: 'Reunion', timezone: 'Indian/Reunion', flag: '🇷🇪' },
  { name: 'Comoros', timezone: 'Indian/Comoro', flag: '🇰🇲' },
  { name: 'Antananarivo', timezone: 'Indian/Antananarivo', flag: '🇲🇬' },
  { name: 'Port Louis', timezone: 'Indian/Mauritius', flag: '🇲🇺' },
  { name: 'Victoria', timezone: 'Indian/Mahe', flag: '🇸🇨' },
  { name: 'Saint-Denis', timezone: 'Indian/Reunion', flag: '🇷🇪' },
  { name: 'Moroni', timezone: 'Indian/Comoro', flag: '🇰🇲' },
  
  // Additional Major Cities
  { name: 'Vatican City', timezone: 'Europe/Vatican', flag: '🇻🇦' },
  { name: 'San Marino', timezone: 'Europe/San_Marino', flag: '🇸🇲' },
  { name: 'Liechtenstein', timezone: 'Europe/Vaduz', flag: '🇱🇮' },
  { name: 'Gibraltar', timezone: 'Europe/Gibraltar', flag: '🇬🇮' },
  { name: 'Malta', timezone: 'Europe/Malta', flag: '🇲🇹' }
];

// Custom timezones storage
let customTimezones = [];

// Removed default timezones storage
let removedTimezones = [];

// Get local timezone
function getLocalTimezone() {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

// Calculate UTC offset
function getUTCOffset(timezone) {
  try {
    const now = new Date();
    const utc = new Date(now.toLocaleString('en-US', { timeZone: 'UTC' }));
    const tz = new Date(now.toLocaleString('en-US', { timeZone: timezone }));
    const offset = (tz - utc) / (1000 * 60 * 60);
    const sign = offset >= 0 ? '+' : '';
    return `UTC${sign}${Math.round(offset)}`;
  } catch (error) {
    return '';
  }
}

// Calculate time difference from local time
function getTimeDifference(timezone) {
  try {
    const now = new Date();
    const localTime = now.getTime();
    const localTz = getLocalTimezone();
    
    const localDate = new Date(now.toLocaleString('en-US', { timeZone: localTz }));
    const tzDate = new Date(now.toLocaleString('en-US', { timeZone: timezone }));
    
    const diff = (tzDate - localDate) / (1000 * 60 * 60);
    
    if (Math.abs(diff) < 0.5) return '';
    
    const hours = Math.round(diff);
    if (hours === 0) return '';
    
    return `${hours > 0 ? '+' : ''}${hours}h`;
  } catch (error) {
    return '';
  }
}

// Check if it's day or night
function isDayTime(timezone) {
  try {
    const now = new Date();
    const hour = parseInt(now.toLocaleString('en-US', {
      timeZone: timezone,
      hour: '2-digit',
      hour12: false
    }));
    return hour >= 6 && hour < 20;
  } catch (error) {
    return true;
  }
}

// Check if timezone is in business hours
function isBusinessHours(timezone) {
  try {
    const now = new Date();
    const hour = parseInt(now.toLocaleString('en-US', {
      timeZone: timezone,
      hour: '2-digit',
      hour12: false
    }));
    return hour >= businessHoursStart && hour < businessHoursEnd;
  } catch (error) {
    return false;
  }
}

// Check if timezone is currently in Daylight Saving Time
function isDST(timezone) {
  try {
    const now = new Date();
    const jan = new Date(now.getFullYear(), 0, 1);
    const jul = new Date(now.getFullYear(), 6, 1);
    
    const janOffset = new Date(jan.toLocaleString('en-US', { timeZone: timezone })) - new Date(jan.toLocaleString('en-US', { timeZone: 'UTC' }));
    const julOffset = new Date(jul.toLocaleString('en-US', { timeZone: timezone })) - new Date(jul.toLocaleString('en-US', { timeZone: 'UTC' }));
    const nowOffset = new Date(now.toLocaleString('en-US', { timeZone: timezone })) - new Date(now.toLocaleString('en-US', { timeZone: 'UTC' }));
    
    const standardOffset = Math.min(janOffset, julOffset);
    const isDST = nowOffset !== standardOffset;
    
    return { isDST, standardOffset: standardOffset / 3600000, currentOffset: nowOffset / 3600000 };
  } catch (error) {
    return { isDST: false, standardOffset: 0, currentOffset: 0 };
  }
}

// Get time until next hour
function getTimeUntilNextHour(timezone) {
  try {
    const now = new Date();
    const tzTime = new Date(now.toLocaleString('en-US', { timeZone: timezone }));
    const minutes = 60 - tzTime.getMinutes();
    const seconds = 60 - tzTime.getSeconds();
    return { minutes, seconds, totalSeconds: minutes * 60 + seconds };
  } catch (error) {
    return { minutes: 0, seconds: 0, totalSeconds: 0 };
  }
}

// Quick time search
function quickTimeSearch(query) {
  const lowerQuery = query.toLowerCase();
  const match = popularTimezones.find(tz => 
    tz.name.toLowerCase().includes(lowerQuery) ||
    tz.timezone.toLowerCase().includes(lowerQuery)
  );
  if (match) {
    try {
      const now = new Date();
      const timeFormatter = new Intl.DateTimeFormat('en-US', {
        timeZone: match.timezone,
        hour12: !settings.hour24,
        hour: '2-digit',
        minute: '2-digit',
        second: settings.showSeconds ? '2-digit' : undefined
      });
      return {
        name: match.name,
        time: timeFormatter.format(now),
        timezone: match.timezone,
        flag: match.flag
      };
    } catch (error) {
      return null;
    }
  }
  return null;
}

// Show toast notification
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2000);
}

// Copy to clipboard
async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    showToast('Copied to clipboard!');
    return true;
  } catch (error) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      showToast('Copied to clipboard!');
      return true;
    } catch (err) {
      showToast('Failed to copy');
      return false;
    } finally {
      document.body.removeChild(textArea);
    }
  }
}

// Export settings
function exportSettings() {
  const data = {
    settings,
    customTimezones,
    removedTimezones,
    timezoneOrder,
    timezoneGroups,
    timezoneNotes,
    timezoneLabels,
    alarms,
    exportDate: new Date().toISOString()
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `world-clock-settings-${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('Settings exported!');
}

// Import settings
async function importSettings(file) {
  try {
    const text = await file.text();
    const data = JSON.parse(text);
    
    if (data.settings) settings = { ...settings, ...data.settings };
    if (data.customTimezones) customTimezones = data.customTimezones;
    if (data.removedTimezones) removedTimezones = data.removedTimezones;
    if (data.timezoneOrder) timezoneOrder = data.timezoneOrder;
    if (data.timezoneGroups) timezoneGroups = data.timezoneGroups;
    if (data.timezoneNotes) timezoneNotes = data.timezoneNotes;
    if (data.timezoneLabels) timezoneLabels = data.timezoneLabels;
    if (data.alarms) alarms = data.alarms;
    
    await saveSettings();
    location.reload();
    showToast('Settings imported!');
  } catch (error) {
    console.error('Error importing settings:', error);
    showToast('Error importing settings');
  }
}

// Generate calendar link
function generateCalendarLink(tzConfig, time, date) {
  try {
    const [hours, minutes] = time.split(':').map(Number);
    const [month, day] = date.split(' ').slice(1);
    const year = new Date().getFullYear();
    const startDate = new Date(`${month} ${day}, ${year} ${hours}:${minutes}`);
    const endDate = new Date(startDate.getTime() + 60 * 60 * 1000);
    
    const formatDate = (d) => {
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      const h = String(d.getHours()).padStart(2, '0');
      const min = String(d.getMinutes()).padStart(2, '0');
      const s = String(d.getSeconds()).padStart(2, '0');
      return `${y}${m}${day}T${h}${min}${s}Z`;
    };
    
    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: `Meeting - ${tzConfig.name || tzConfig.timezone}`,
      dates: `${formatDate(startDate)}/${formatDate(endDate)}`,
      details: `Timezone: ${tzConfig.timezone}`,
      location: tzConfig.timezone
    });
    
    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  } catch (error) {
    return null;
  }
}

// Restore recently removed timezone
function restoreTimezone(timezoneId) {
  if (removedTimezones.includes(timezoneId)) {
    removedTimezones = removedTimezones.filter(id => id !== timezoneId);
    saveSettings();
    
    const card = document.querySelector(`[data-timezone="${timezoneId}"]`);
    if (card) {
      card.style.display = '';
    }
    
    showToast('Timezone restored');
  }
}

// Update time for a specific timezone
function updateTimezone(tzConfig) {
  try {
    const now = new Date();
    
    // Create formatters
    const timeOptions = {
      timeZone: tzConfig.timezone,
      hour12: !settings.hour24,
      hour: '2-digit',
      minute: '2-digit',
      second: settings.showSeconds ? '2-digit' : undefined
    };
    
    const timeFormatter = new Intl.DateTimeFormat('en-US', timeOptions);
    const dateFormatter = new Intl.DateTimeFormat('en-US', {
      timeZone: tzConfig.timezone,
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
    
    // Format time
    const timeParts = timeFormatter.formatToParts(now);
    let hours = '';
    let minutes = '';
    let seconds = '';
    let dayPeriod = '';
    
    timeParts.forEach(part => {
      if (part.type === 'hour') hours = part.value;
      if (part.type === 'minute') minutes = part.value;
      if (part.type === 'second') seconds = part.value;
      if (part.type === 'dayPeriod') dayPeriod = part.value;
    });
    
    const timeString = settings.showSeconds 
      ? `${hours}:${minutes}:${seconds}${dayPeriod ? ' ' + dayPeriod : ''}`
      : `${hours}:${minutes}${dayPeriod ? ' ' + dayPeriod : ''}`;
    
    const dateString = dateFormatter.format(now);
    
    // Update time display
    const timeDisplay = document.getElementById(tzConfig.elementId);
    const dateDisplay = document.getElementById(tzConfig.dateId);
    
    if (timeDisplay) {
      if (settings.hour24 || !dayPeriod) {
        timeDisplay.textContent = timeString;
      } else {
        const [timePart, period] = timeString.split(' ');
        timeDisplay.innerHTML = period 
          ? `<span class="time-value">${timePart}</span> <span class="time-period">${period}</span>`
          : timeString;
      }
    }
    
    if (dateDisplay) {
      dateDisplay.textContent = dateString || '--';
    }
    
    // Update UTC offset
    const offsetDisplay = document.getElementById(tzConfig.offsetId);
    if (offsetDisplay) {
      if (settings.showOffset) {
        offsetDisplay.textContent = getUTCOffset(tzConfig.timezone);
        offsetDisplay.classList.remove('hidden');
      } else {
        offsetDisplay.classList.add('hidden');
      }
    }
    
    // Update time difference
    const differenceDisplay = document.getElementById(tzConfig.differenceId);
    if (differenceDisplay) {
      if (settings.showDifference) {
        const diff = getTimeDifference(tzConfig.timezone);
        if (diff) {
          differenceDisplay.textContent = diff;
          differenceDisplay.classList.remove('hidden');
          differenceDisplay.classList.add(diff.startsWith('+') ? 'positive' : 'negative');
        } else {
          differenceDisplay.classList.add('hidden');
        }
      } else {
        differenceDisplay.classList.add('hidden');
      }
    }
    
    // Update day/night indicator
    const indicator = document.getElementById(tzConfig.indicatorId);
    if (indicator) {
      const isDay = isDayTime(tzConfig.timezone);
      indicator.textContent = isDay ? '☀️' : '🌙';
      indicator.className = `day-night-indicator ${isDay ? 'day' : 'night'}`;
    }
    
    // Update DST indicator
    const card = document.querySelector(`[data-timezone="${tzConfig.cardId}"]`);
    if (card) {
      const dstInfo = isDST(tzConfig.timezone);
      let dstIndicator = card.querySelector('.dst-indicator');
      if (dstInfo.isDST) {
        if (!dstIndicator) {
          dstIndicator = document.createElement('span');
          dstIndicator.className = 'dst-indicator';
          dstIndicator.title = `Daylight Saving Time active`;
          const tzCode = card.querySelector('.timezone-code');
          if (tzCode) tzCode.appendChild(dstIndicator);
        }
        dstIndicator.textContent = ' ☀️';
      } else if (dstIndicator) {
        dstIndicator.remove();
      }
    }
    
    // Update business hours indicator
    const card = document.querySelector(`[data-timezone="${tzConfig.cardId}"]`);
    if (card && settings.showBusinessHours) {
      const inBusinessHours = isBusinessHours(tzConfig.timezone);
      if (inBusinessHours) {
        card.classList.add('business-hours');
        card.classList.remove('off-hours');
      } else {
        card.classList.add('off-hours');
        card.classList.remove('business-hours');
      }
    } else if (card) {
      card.classList.remove('business-hours', 'off-hours');
    }
    
    // Update countdown timer
    if (settings.showCountdown) {
      const countdownId = `${tzConfig.cardId}-countdown`;
      let countdownEl = document.getElementById(countdownId);
      if (!countdownEl && card) {
        countdownEl = document.createElement('div');
        countdownEl.id = countdownId;
        countdownEl.className = 'countdown-timer';
        const timezoneInfo = card.querySelector('.timezone-info');
        if (timezoneInfo) {
          timezoneInfo.appendChild(countdownEl);
        }
      }
      if (countdownEl) {
        const { minutes, seconds } = getTimeUntilNextHour(tzConfig.timezone);
        countdownEl.textContent = `Next hour in ${minutes}m ${seconds}s`;
      }
    } else {
      const countdownEl = document.getElementById(`${tzConfig.cardId}-countdown`);
      if (countdownEl) countdownEl.remove();
    }
    
  } catch (error) {
    console.error(`Error updating ${tzConfig.timezone}:`, error);
    const timeDisplay = document.getElementById(tzConfig.elementId);
    if (timeDisplay) {
      timeDisplay.textContent = 'Error';
    }
  }
}

// Update all timezones
function updateAllClocks() {
  Object.values(timezones).forEach(updateTimezone);
}

// Load settings from storage (sync for cross-device, local for device-specific)
async function loadSettings() {
  try {
    // Sync storage for settings that should sync across devices
    const syncResult = await chrome.storage.sync.get([
      'settings', 'customTimezones', 'removedTimezones', 
      'timezoneOrder', 'timezoneGroups', 'timezoneNotes', 
      'timezoneLabels'
    ]);
    // Local storage for device-specific data
    const localResult = await chrome.storage.local.get([
      'alarms', 'recentlyRemoved', 'currentGroup'
    ]);
    const result = { ...syncResult, ...localResult };
    if (result.settings) {
      settings = { ...settings, ...result.settings };
      // Ensure hour24 defaults to false (12-hour format)
      if (result.settings.hour24 === undefined) {
        settings.hour24 = false;
      }
      applySettings();
    } else {
      // No settings saved, use defaults (12-hour format)
      settings.hour24 = false;
      applySettings();
    }
    
    // Load new data structures
    if (result.timezoneOrder) timezoneOrder = result.timezoneOrder;
    if (result.timezoneGroups) timezoneGroups = result.timezoneGroups;
    if (result.timezoneNotes) timezoneNotes = result.timezoneNotes;
    if (result.timezoneLabels) timezoneLabels = result.timezoneLabels;
    if (result.alarms) alarms = result.alarms;
    if (result.recentlyRemoved) recentlyRemoved = result.recentlyRemoved;
    if (result.currentGroup) currentGroup = result.currentGroup;
    
    // Load removed timezones
    if (result.removedTimezones) {
      removedTimezones = result.removedTimezones;
      // Hide removed default timezones
      removedTimezones.forEach(tzId => {
        const card = document.querySelector(`[data-timezone="${tzId}"]`);
        if (card) {
          card.style.display = 'none';
        }
      });
    }
    
    // Load custom timezones
    if (result.customTimezones) {
      customTimezones = result.customTimezones;
      customTimezones.forEach(tz => renderCustomTimezone(tz));
    }
  } catch (error) {
    console.error('Error loading settings:', error);
    // On error, use defaults (12-hour format)
    settings.hour24 = false;
    applySettings();
  }
}

// Save settings to storage (sync for cross-device, local for device-specific)
async function saveSettings() {
  try {
    // Sync storage for settings that should sync across devices
    await chrome.storage.sync.set({ 
      settings, customTimezones, removedTimezones,
      timezoneOrder, timezoneGroups, timezoneNotes,
      timezoneLabels
    });
    // Local storage for device-specific data
    await chrome.storage.local.set({
      alarms, recentlyRemoved, currentGroup
    });
    applySettings();
  } catch (error) {
    console.error('Error saving settings:', error);
  }
}

// Search timezones
function searchTimezones(query) {
  if (!query) return popularTimezones;
  const lowerQuery = query.toLowerCase();
  return popularTimezones.filter(tz => 
    tz.name.toLowerCase().includes(lowerQuery) ||
    tz.timezone.toLowerCase().includes(lowerQuery)
  );
}

// Add custom timezone
function addCustomTimezone(timezoneConfig) {
  try {
    // Check if already added
    const existing = customTimezones.find(tz => tz.timezone === timezoneConfig.timezone);
    if (existing) {
      showToast(`${timezoneConfig.name} is already added`);
      return null;
    }
    
    const newId = `custom-${Date.now()}`;
    const customTz = {
      id: newId,
      timezone: timezoneConfig.timezone,
      name: timezoneConfig.name,
      flag: timezoneConfig.flag || '🌍',
      elementId: `${newId}-time`,
      dateId: `${newId}-date`,
      offsetId: `${newId}-offset`,
      differenceId: `${newId}-difference`,
      indicatorId: `${newId}-indicator`,
      cardId: newId
    };
    
    customTimezones.push(customTz);
    saveSettings();
    renderCustomTimezone(customTz);
    showToast(`Added ${timezoneConfig.name}`);
    return customTz;
  } catch (error) {
    console.error('Error adding timezone:', error);
    showToast('Error adding timezone');
    return null;
  }
}

// Remove custom timezone
function removeCustomTimezone(timezoneId) {
  try {
    customTimezones = customTimezones.filter(tz => tz.id !== timezoneId);
    saveSettings();
    const card = document.querySelector(`[data-timezone="${timezoneId}"]`);
    if (card) {
      card.remove();
    }
    showToast('Timezone removed');
  } catch (error) {
    console.error('Error removing timezone:', error);
    showToast('Error removing timezone');
  }
}

// Remove default timezone
function removeDefaultTimezone(timezoneId) {
  try {
    // Check if it's a valid default timezone
    if (!timezones[timezoneId]) {
      showToast('Invalid timezone');
      return;
    }
    
    // Add to removed list if not already there
    if (!removedTimezones.includes(timezoneId)) {
      removedTimezones.push(timezoneId);
      saveSettings();
    }
    
    // Hide the card
    const card = document.querySelector(`[data-timezone="${timezoneId}"]`);
    if (card) {
      card.style.display = 'none';
    }
    
    showToast('Timezone removed');
  } catch (error) {
    console.error('Error removing timezone:', error);
    showToast('Error removing timezone');
  }
}

// Render custom timezone card
function renderCustomTimezone(tzConfig) {
  const clockGrid = document.getElementById('clock-grid');
  const card = document.createElement('div');
  card.className = `clock-card custom ${tzConfig.cardId}`;
  card.setAttribute('data-timezone', tzConfig.cardId);
  card.setAttribute('title', 'Click to copy time');
  
  card.innerHTML = `
    <div class="day-night-indicator" id="${tzConfig.indicatorId}"></div>
    <button class="remove-timezone" data-id="${tzConfig.cardId}" title="Remove timezone">×</button>
    <div class="flag-icon">${tzConfig.flag}</div>
    <div class="timezone-name">${tzConfig.name}</div>
    <div class="time-display" id="${tzConfig.elementId}">--:--:--</div>
    <div class="date-display" id="${tzConfig.dateId}">--</div>
    <div class="timezone-info">
      <div class="timezone-code">${tzConfig.timezone.split('/').pop()}</div>
      <div class="timezone-offset" id="${tzConfig.offsetId}"></div>
      <div class="time-difference" id="${tzConfig.differenceId}"></div>
    </div>
  `;
  
  clockGrid.appendChild(card);
  
  // Add event listeners
  card.addEventListener('click', async (e) => {
    if (e.target.classList.contains('remove-timezone')) return;
    const timeDisplay = document.getElementById(tzConfig.elementId);
    const dateDisplay = document.getElementById(tzConfig.dateId);
    const timeText = timeDisplay.textContent;
    const dateText = dateDisplay.textContent;
    const fullText = `${tzConfig.name}: ${timeText} ${dateText}`;
    await copyToClipboard(fullText);
  });
  
  // Remove button
  const removeBtn = card.querySelector('.remove-timezone');
  if (removeBtn) {
    removeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      removeCustomTimezone(tzConfig.cardId);
    });
  }
  
  // Update this timezone
  updateTimezone(tzConfig);
}

// Update all timezones including custom ones
function updateAllClocks() {
  Object.values(timezones).forEach(updateTimezone);
  customTimezones.forEach(updateTimezone);
}

// Apply settings to UI
function applySettings() {
  // Apply dark mode
  if (settings.darkMode) {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
  
  // Update checkboxes
  document.getElementById('toggle-24hour').checked = settings.hour24;
  document.getElementById('toggle-seconds').checked = settings.showSeconds;
  document.getElementById('toggle-offset').checked = settings.showOffset;
  document.getElementById('toggle-difference').checked = settings.showDifference;
  if (document.getElementById('toggle-business-hours')) {
    document.getElementById('toggle-business-hours').checked = settings.showBusinessHours || false;
  }
  if (document.getElementById('toggle-countdown')) {
    document.getElementById('toggle-countdown').checked = settings.showCountdown || false;
  }
  if (document.getElementById('view-mode-select')) {
    document.getElementById('view-mode-select').value = settings.viewMode || 'grid';
  }
  
  // Apply view mode
  applyViewMode();
  
  // Update all clocks
  updateAllClocks();
}

// Show loading indicator
function showLoading() {
  const indicator = document.getElementById('loading-indicator');
  indicator.classList.add('active');
  setTimeout(() => {
    indicator.classList.remove('active');
  }, 500);
}

// Helper functions for new features
function populateTimezoneSelect(selectId) {
  const select = document.getElementById(selectId);
  select.innerHTML = '';
  
  Object.values(timezones).forEach(tz => {
    if (!removedTimezones.includes(tz.cardId)) {
      const option = document.createElement('option');
      option.value = tz.timezone;
      option.textContent = `${tz.timezone} (${tz.cardId.toUpperCase()})`;
      select.appendChild(option);
    }
  });
  
  customTimezones.forEach(tz => {
    const option = document.createElement('option');
    option.value = tz.timezone;
    option.textContent = `${tz.name} (${tz.timezone})`;
    select.appendChild(option);
  });
}

function displayConverterResults(results) {
  const container = document.getElementById('converter-results');
  container.innerHTML = '<h4>Converted Times:</h4>';
  
  Object.entries(results).forEach(([tzId, data]) => {
    const div = document.createElement('div');
    div.className = 'converter-result-item';
    div.innerHTML = `<strong>${data.name}:</strong> ${data.time}`;
    container.appendChild(div);
  });
}

function convertTime(inputTime, inputTimezone) {
  try {
    const [hours, minutes] = inputTime.split(':').map(Number);
    const today = new Date();
    const inputDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), hours, minutes);
    
    const results = {};
    const allTimezones = [...Object.values(timezones), ...customTimezones];
    
    allTimezones.forEach(tzConfig => {
      if (removedTimezones.includes(tzConfig.cardId)) return;
      
      try {
        const formatter = new Intl.DateTimeFormat('en-US', {
          timeZone: tzConfig.timezone,
          hour12: !settings.hour24,
          hour: '2-digit',
          minute: '2-digit'
        });
        
        const localTime = new Date(inputDate.toLocaleString('en-US', { timeZone: inputTimezone }));
        const targetTime = new Date(localTime.toLocaleString('en-US', { timeZone: tzConfig.timezone }));
        
        results[tzConfig.cardId] = {
          name: timezoneLabels[tzConfig.cardId] || tzConfig.name || tzConfig.timezone,
          time: formatter.format(targetTime),
          timezone: tzConfig.timezone
        };
      } catch (error) {
        console.error(`Error converting time for ${tzConfig.timezone}:`, error);
      }
    });
    
    return results;
  } catch (error) {
    console.error('Error converting time:', error);
    return {};
  }
}

function displayQuickSearchResult(result) {
  const container = document.getElementById('quick-search-results');
  if (result) {
    container.innerHTML = `
      <div class="quick-search-result">
        <div class="flag-icon">${result.flag}</div>
        <div>
          <strong>${result.name}</strong><br>
          <span class="time-display">${result.time}</span><br>
          <small>${result.timezone}</small>
        </div>
      </div>
    `;
  } else {
    container.innerHTML = '<div class="no-results">No timezone found</div>';
  }
}

function setupContextMenu() {
  let contextMenu = document.getElementById('context-menu');
  let contextCard = null;
  
  // Right-click context menu
  document.addEventListener('contextmenu', (e) => {
    const card = e.target.closest('.clock-card');
    if (card) {
      e.preventDefault();
      contextCard = card;
      contextMenu.style.display = 'block';
      contextMenu.style.left = e.pageX + 'px';
      contextMenu.style.top = e.pageY + 'px';
    }
  });
  
  // Left-click to copy time (one-click copy)
  document.getElementById('clock-grid').addEventListener('click', (e) => {
    const card = e.target.closest('.clock-card');
    // Don't copy if clicking on remove button or other interactive elements
    if (card && !e.target.closest('.remove-timezone') && !e.target.closest('button')) {
      const tzId = card.dataset.timezone;
      const tzConfig = timezones[tzId] || customTimezones.find(t => t.cardId === tzId);
      if (tzConfig) {
        const timeDisplay = document.getElementById(tzConfig.elementId);
        const dateDisplay = document.getElementById(tzConfig.dateId);
        const name = timezoneLabels[tzId] || tzConfig.name || tzId;
        const copyText = `${name}: ${timeDisplay.textContent} - ${dateDisplay.textContent}`;
        copyToClipboard(copyText);
        
        // Visual feedback - add a brief highlight
        card.classList.add('copied');
        setTimeout(() => card.classList.remove('copied'), 300);
      }
    }
  });
  
  document.addEventListener('click', () => {
    contextMenu.style.display = 'none';
  });
  
  contextMenu.querySelectorAll('.context-menu-item').forEach(item => {
    item.addEventListener('click', (e) => {
      const action = e.target.dataset.action;
      if (contextCard) {
        handleContextAction(action, contextCard);
      }
      contextMenu.style.display = 'none';
    });
  });
}

function handleContextAction(action, card) {
  const tzId = card.dataset.timezone;
  const tzConfig = timezones[tzId] || customTimezones.find(t => t.cardId === tzId);
  if (!tzConfig) return;
  
  const timeDisplay = document.getElementById(tzConfig.elementId);
  const dateDisplay = document.getElementById(tzConfig.dateId);
  
  switch(action) {
    case 'copy-time':
      copyToClipboard(timeDisplay.textContent);
      break;
    case 'copy-date':
      copyToClipboard(dateDisplay.textContent);
      break;
    case 'copy-all':
      copyToClipboard(`${tzConfig.name || tzConfig.timezone}: ${timeDisplay.textContent} ${dateDisplay.textContent}`);
      break;
    case 'add-calendar':
      const link = generateCalendarLink(tzConfig, timeDisplay.textContent, dateDisplay.textContent);
      if (link) window.open(link, '_blank');
      break;
    case 'edit-label':
      const newLabel = prompt('Enter custom label:', timezoneLabels[tzId] || '');
      if (newLabel !== null) {
        timezoneLabels[tzId] = newLabel;
        saveSettings();
        updateTimezoneDisplay(tzId);
      }
      break;
    case 'add-note':
      const note = prompt('Enter note:', timezoneNotes[tzId] || '');
      if (note !== null) {
        timezoneNotes[tzId] = note;
        saveSettings();
        showToast('Note saved');
      }
      break;
    case 'remove':
      if (timezones[tzId]) {
        removeDefaultTimezone(tzId);
      } else {
        removeCustomTimezone(tzId);
      }
      break;
  }
}

function updateTimezoneDisplay(tzId) {
  const card = document.querySelector(`[data-timezone="${tzId}"]`);
  if (card && timezoneLabels[tzId]) {
    const nameEl = card.querySelector('.timezone-name');
    if (nameEl) nameEl.textContent = timezoneLabels[tzId];
  }
}

function applyViewMode() {
  const grid = document.getElementById('clock-grid');
  grid.className = `clock-grid ${settings.viewMode}`;
}

// Initialize event listeners
function initEventListeners() {
  // More menu toggle
  const moreMenuBtn = document.getElementById('more-menu-btn');
  const moreMenu = document.getElementById('more-menu');
  
  if (moreMenuBtn && moreMenu) {
    moreMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      moreMenu.classList.toggle('active');
      moreMenuBtn.setAttribute('aria-expanded', moreMenu.classList.contains('active'));
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!moreMenu.contains(e.target) && e.target !== moreMenuBtn) {
        moreMenu.classList.remove('active');
        moreMenuBtn.setAttribute('aria-expanded', 'false');
      }
    });
    
    // Close menu when clicking a menu item
    moreMenu.querySelectorAll('.more-menu-item').forEach(item => {
      item.addEventListener('click', () => {
        moreMenu.classList.remove('active');
        moreMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }
  
  // Hide keyboard hint after first interaction or after 10 seconds
  const keyboardHint = document.getElementById('keyboard-hint');
  if (keyboardHint) {
    // Hide after 10 seconds
    setTimeout(() => {
      keyboardHint.classList.add('hidden');
      localStorage.setItem('keyboardHintSeen', 'true');
    }, 10000);
    
    // Or hide on any click if already seen before
    if (localStorage.getItem('keyboardHintSeen')) {
      keyboardHint.classList.add('hidden');
    }
  }
  
  // Refresh button
  document.getElementById('refresh-btn').addEventListener('click', () => {
    showLoading();
    updateAllClocks();
  });
  
  // Settings button
  document.getElementById('settings-btn').addEventListener('click', () => {
    document.getElementById('settings-panel').classList.add('active');
  });
  
  // Close settings
  document.getElementById('close-settings').addEventListener('click', () => {
    document.getElementById('settings-panel').classList.remove('active');
  });
  
  // Close settings on outside click
  document.getElementById('settings-panel').addEventListener('click', (e) => {
    if (e.target.id === 'settings-panel') {
      document.getElementById('settings-panel').classList.remove('active');
    }
  });
  
  // Dark mode toggle
  document.getElementById('dark-mode-btn').addEventListener('click', () => {
    settings.darkMode = !settings.darkMode;
    saveSettings();
  });
  
  // Settings checkboxes
  document.getElementById('toggle-24hour').addEventListener('change', (e) => {
    settings.hour24 = e.target.checked;
    saveSettings();
  });
  
  document.getElementById('toggle-seconds').addEventListener('change', (e) => {
    settings.showSeconds = e.target.checked;
    saveSettings();
  });
  
  document.getElementById('toggle-offset').addEventListener('change', (e) => {
    settings.showOffset = e.target.checked;
    saveSettings();
  });
  
  document.getElementById('toggle-difference').addEventListener('change', (e) => {
    settings.showDifference = e.target.checked;
    saveSettings();
  });
  
  document.getElementById('toggle-business-hours').addEventListener('change', (e) => {
    settings.showBusinessHours = e.target.checked;
    saveSettings();
  });
  
  document.getElementById('toggle-countdown').addEventListener('change', (e) => {
    settings.showCountdown = e.target.checked;
    saveSettings();
  });
  
  document.getElementById('view-mode-select').addEventListener('change', (e) => {
    settings.viewMode = e.target.value;
    saveSettings();
    applyViewMode();
  });
  
  // Export/Import
  document.getElementById('export-btn').addEventListener('click', exportSettings);
  document.getElementById('import-btn').addEventListener('click', () => {
    document.getElementById('import-input').click();
  });
  document.getElementById('import-input').addEventListener('change', (e) => {
    if (e.target.files[0]) {
      importSettings(e.target.files[0]);
    }
  });
  
  // Converter panel
  document.getElementById('converter-btn').addEventListener('click', () => {
    document.getElementById('converter-panel').classList.add('active');
    populateTimezoneSelect('converter-from-tz');
  });
  document.getElementById('close-converter').addEventListener('click', () => {
    document.getElementById('converter-panel').classList.remove('active');
  });
  document.getElementById('convert-time-btn').addEventListener('click', () => {
    const time = document.getElementById('converter-time-input').value;
    const fromTz = document.getElementById('converter-from-tz').value;
    if (time && fromTz) {
      const results = convertTime(time, fromTz);
      displayConverterResults(results);
    }
  });
  
  // Quick search
  document.getElementById('search-btn').addEventListener('click', () => {
    document.getElementById('quick-search-panel').classList.add('active');
    document.getElementById('quick-search-input').focus();
  });
  document.getElementById('close-quick-search').addEventListener('click', () => {
    document.getElementById('quick-search-panel').classList.remove('active');
  });
  document.getElementById('quick-search-input').addEventListener('input', (e) => {
    const query = e.target.value.trim();
    if (query) {
      const result = quickTimeSearch(query);
      displayQuickSearchResult(result);
    } else {
      document.getElementById('quick-search-results').innerHTML = '';
    }
  });
  
  // Context menu
  setupContextMenu();
  
  // Copy to clipboard on card click and add remove buttons to default timezones
  Object.values(timezones).forEach((tzConfig, index) => {
    const card = document.querySelector(`[data-timezone="${tzConfig.cardId}"]`);
    if (card) {
      // Add remove button if it doesn't exist
      if (!card.querySelector('.remove-timezone')) {
        const removeBtn = document.createElement('button');
        removeBtn.className = 'remove-timezone';
        removeBtn.setAttribute('data-id', tzConfig.cardId);
        removeBtn.setAttribute('title', 'Remove timezone');
        removeBtn.textContent = '×';
        removeBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          removeDefaultTimezone(tzConfig.cardId);
        });
        card.appendChild(removeBtn);
      }
      
      card.addEventListener('click', async (e) => {
        // Don't copy if clicking the remove button
        if (e.target.classList.contains('remove-timezone')) return;
        
        const timeDisplay = document.getElementById(tzConfig.elementId);
        const dateDisplay = document.getElementById(tzConfig.dateId);
        const timeText = timeDisplay.textContent;
        const dateText = dateDisplay.textContent;
        const fullText = `${tzConfig.timezone.toUpperCase()}: ${timeText} ${dateText}`;
        
        await copyToClipboard(fullText);
        
        // Visual feedback
        card.classList.add('copied');
        setTimeout(() => {
          card.classList.remove('copied');
        }, 500);
      });
    }
  });
  
  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    // Don't trigger if typing in input
    if (e.target.tagName === 'INPUT') return;
    
    switch(e.key.toLowerCase()) {
      case 'r':
        if (!e.ctrlKey && !e.metaKey) {
          e.preventDefault();
          showLoading();
          updateAllClocks();
        }
        break;
      case 's':
        if (!e.ctrlKey && !e.metaKey) {
          e.preventDefault();
          document.getElementById('settings-panel').classList.toggle('active');
        }
        break;
      case 'd':
        if (!e.ctrlKey && !e.metaKey) {
          e.preventDefault();
          settings.darkMode = !settings.darkMode;
          saveSettings();
        }
        break;
      case '1':
      case '2':
      case '3':
      case '4':
        if (!e.ctrlKey && !e.metaKey) {
          e.preventDefault();
          const index = parseInt(e.key) - 1;
          const tzKeys = Object.keys(timezones);
          if (tzKeys[index]) {
            const tzConfig = timezones[tzKeys[index]];
            const timeDisplay = document.getElementById(tzConfig.elementId);
            const dateDisplay = document.getElementById(tzConfig.dateId);
            const timeText = timeDisplay.textContent;
            const dateText = dateDisplay.textContent;
            const fullText = `${tzConfig.timezone.toUpperCase()}: ${timeText} ${dateText}`;
            copyToClipboard(fullText);
          }
        }
        break;
      case '?':
        if (!e.ctrlKey && !e.metaKey) {
          e.preventDefault();
          document.getElementById('shortcuts-help').classList.toggle('active');
        }
        break;
      case 'escape':
        document.getElementById('settings-panel').classList.remove('active');
        document.getElementById('shortcuts-help').classList.remove('active');
        break;
    }
  });
  
  // Close shortcuts help
  document.getElementById('close-shortcuts').addEventListener('click', () => {
    document.getElementById('shortcuts-help').classList.remove('active');
  });
  
  // Close shortcuts on outside click
  document.getElementById('shortcuts-help').addEventListener('click', (e) => {
    if (e.target.id === 'shortcuts-help') {
      document.getElementById('shortcuts-help').classList.remove('active');
    }
  });
  
  // Add timezone button (header)
  document.getElementById('add-timezone-btn').addEventListener('click', () => {
    document.getElementById('timezone-panel').classList.add('active');
    document.getElementById('timezone-search-input').focus();
    displayTimezoneResults(popularTimezones);
  });
  
  // Add timezone button (large button)
  const addBtnLarge = document.getElementById('add-timezone-btn-large');
  if (addBtnLarge) {
    addBtnLarge.addEventListener('click', () => {
      document.getElementById('timezone-panel').classList.add('active');
      document.getElementById('timezone-search-input').focus();
      displayTimezoneResults(popularTimezones);
    });
  }
  
  // Close timezone panel
  document.getElementById('close-timezone-panel').addEventListener('click', () => {
    document.getElementById('timezone-panel').classList.remove('active');
  });
  
  // Close timezone panel on outside click
  document.getElementById('timezone-panel').addEventListener('click', (e) => {
    if (e.target.id === 'timezone-panel') {
      document.getElementById('timezone-panel').classList.remove('active');
    }
  });
  
  // Timezone search
  const searchInput = document.getElementById('timezone-search-input');
  let currentSearchResults = [];
  let selectedResultIndex = -1;
  
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.trim();
    currentSearchResults = searchTimezones(query);
    selectedResultIndex = currentSearchResults.length > 0 ? 0 : -1;
    displayTimezoneResults(currentSearchResults);
  });
  
  // Enter key to quick-add first/selected result
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && currentSearchResults.length > 0) {
      e.preventDefault();
      const indexToAdd = selectedResultIndex >= 0 ? selectedResultIndex : 0;
      addCustomTimezone(currentSearchResults[indexToAdd]);
      document.getElementById('timezone-panel').classList.remove('active');
      searchInput.value = '';
      currentSearchResults = [];
      selectedResultIndex = -1;
    } else if (e.key === 'ArrowDown' && currentSearchResults.length > 0) {
      e.preventDefault();
      selectedResultIndex = Math.min(selectedResultIndex + 1, currentSearchResults.length - 1);
      highlightSelectedResult();
    } else if (e.key === 'ArrowUp' && currentSearchResults.length > 0) {
      e.preventDefault();
      selectedResultIndex = Math.max(selectedResultIndex - 1, 0);
      highlightSelectedResult();
    }
  });
  
  function highlightSelectedResult() {
    const items = document.querySelectorAll('.timezone-result-item');
    items.forEach((item, index) => {
      item.classList.toggle('selected', index === selectedResultIndex);
    });
  }
  
  // Display timezone search results
  function displayTimezoneResults(results) {
    const resultsContainer = document.getElementById('timezone-results');
    resultsContainer.innerHTML = '';
    
    if (results.length === 0) {
      resultsContainer.innerHTML = '<div class="no-results">No timezones found</div>';
      return;
    }
    
    results.forEach(tz => {
      const item = document.createElement('div');
      item.className = 'timezone-result-item';
      item.innerHTML = `
        <span class="timezone-flag">${tz.flag}</span>
        <span class="timezone-name">${tz.name}</span>
        <span class="timezone-code">${tz.timezone}</span>
        <button class="add-timezone-btn" data-timezone='${JSON.stringify(tz)}'>Add</button>
      `;
      
      const addBtn = item.querySelector('.add-timezone-btn');
      addBtn.addEventListener('click', () => {
        addCustomTimezone(tz);
        document.getElementById('timezone-panel').classList.remove('active');
        searchInput.value = '';
      });
      
      resultsContainer.appendChild(item);
    });
  }
}

// Auto-detect and add local timezone if not present
async function autoDetectLocalTimezone() {
  const localTz = getLocalTimezone();
  
  // Check if local timezone is already added
  const allTimezones = [...Object.values(timezones), ...customTimezones];
  const exists = allTimezones.some(tz => tz.timezone === localTz);
  
  if (!exists) {
    // Find matching timezone in popular list
    const match = popularTimezones.find(tz => tz.timezone === localTz);
    if (match) {
      addCustomTimezone(match);
      showToast(`Added your local timezone: ${match.name}`);
    }
  }
}

// Get and display timezone statistics
function getTimezoneStatistics() {
  const stats = {
    total: 0,
    inBusinessHours: 0,
    ahead: 0,
    behind: 0,
    same: 0
  };
  
  const localTz = getLocalTimezone();
  const now = new Date();
  
  const allTimezones = [...Object.values(timezones), ...customTimezones];
  allTimezones.forEach(tzConfig => {
    if (removedTimezones.includes(tzConfig.cardId)) return;
    
    stats.total++;
    if (isBusinessHours(tzConfig.timezone)) stats.inBusinessHours++;
    
    try {
      const localTime = new Date(now.toLocaleString('en-US', { timeZone: localTz }));
      const tzTime = new Date(now.toLocaleString('en-US', { timeZone: tzConfig.timezone }));
      const diff = (tzTime - localTime) / (1000 * 60 * 60);
      
      if (Math.abs(diff) < 0.5) stats.same++;
      else if (diff > 0) stats.ahead++;
      else stats.behind++;
    } catch (error) {
      console.error(`Error calculating stats for ${tzConfig.timezone}:`, error);
    }
  });
  
  return stats;
}

// Initialize and start updating
async function init() {
  // Show loading
  showLoading();
  
  // Load settings
  await loadSettings();
  
  // Auto-detect local timezone
  await autoDetectLocalTimezone();
  
  // Initialize event listeners
  initEventListeners();
  
  // Initial update
  updateAllClocks();
  
  // Update every second
  setInterval(updateAllClocks, 1000);
  
  // Update countdown every second if enabled
  if (settings.showCountdown) {
    setInterval(() => {
      if (settings.showCountdown) {
        updateAllClocks();
      }
    }, 1000);
  }
}

// ==================== STOPWATCH ====================
let stopwatchState = {
  running: false,
  startTime: 0,
  elapsed: 0,
  interval: null,
  laps: []
};

function formatStopwatchTime(ms) {
  const hours = Math.floor(ms / 3600000);
  const minutes = Math.floor((ms % 3600000) / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const centiseconds = Math.floor((ms % 1000) / 10);
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(centiseconds).padStart(2, '0')}`;
}

function updateStopwatchDisplay() {
  const display = document.getElementById('stopwatch-display');
  if (display) {
    const currentElapsed = stopwatchState.running 
      ? stopwatchState.elapsed + (Date.now() - stopwatchState.startTime)
      : stopwatchState.elapsed;
    display.textContent = formatStopwatchTime(currentElapsed);
  }
}

function startStopwatch() {
  if (!stopwatchState.running) {
    stopwatchState.running = true;
    stopwatchState.startTime = Date.now();
    stopwatchState.interval = setInterval(updateStopwatchDisplay, 10);
    document.getElementById('stopwatch-start').disabled = true;
    document.getElementById('stopwatch-stop').disabled = false;
    document.getElementById('stopwatch-lap').disabled = false;
  }
}

function stopStopwatch() {
  if (stopwatchState.running) {
    stopwatchState.running = false;
    stopwatchState.elapsed += Date.now() - stopwatchState.startTime;
    clearInterval(stopwatchState.interval);
    document.getElementById('stopwatch-start').disabled = false;
    document.getElementById('stopwatch-stop').disabled = true;
    document.getElementById('stopwatch-start').textContent = '▶ Resume';
  }
}

function resetStopwatch() {
  stopwatchState.running = false;
  stopwatchState.elapsed = 0;
  stopwatchState.laps = [];
  clearInterval(stopwatchState.interval);
  document.getElementById('stopwatch-display').textContent = '00:00:00.00';
  document.getElementById('lap-times').innerHTML = '';
  document.getElementById('stopwatch-start').disabled = false;
  document.getElementById('stopwatch-start').textContent = '▶ Start';
  document.getElementById('stopwatch-stop').disabled = true;
  document.getElementById('stopwatch-lap').disabled = true;
}

function addLap() {
  const currentElapsed = stopwatchState.elapsed + (Date.now() - stopwatchState.startTime);
  const lapNumber = stopwatchState.laps.length + 1;
  const lastLapTime = stopwatchState.laps.length > 0 
    ? stopwatchState.laps[stopwatchState.laps.length - 1].total 
    : 0;
  const lapTime = currentElapsed - lastLapTime;
  
  stopwatchState.laps.push({ lap: lapNumber, time: lapTime, total: currentElapsed });
  
  const lapTimesContainer = document.getElementById('lap-times');
  const lapDiv = document.createElement('div');
  lapDiv.className = 'lap-time';
  lapDiv.innerHTML = `
    <span class="lap-number">Lap ${lapNumber}</span>
    <span class="lap-split">${formatStopwatchTime(lapTime)}</span>
    <span class="lap-total">${formatStopwatchTime(currentElapsed)}</span>
  `;
  lapTimesContainer.insertBefore(lapDiv, lapTimesContainer.firstChild);
}

// ==================== TIMER ====================
let timerState = {
  running: false,
  totalSeconds: 300,
  remainingSeconds: 300,
  interval: null
};

function formatTimerTime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function updateTimerDisplay() {
  const display = document.getElementById('timer-display');
  const progress = document.getElementById('timer-progress');
  if (display) {
    display.textContent = formatTimerTime(timerState.remainingSeconds);
  }
  if (progress) {
    const percent = (timerState.remainingSeconds / timerState.totalSeconds) * 100;
    progress.style.width = `${percent}%`;
  }
}

function setTimerFromInputs() {
  const hours = parseInt(document.getElementById('timer-hours').value) || 0;
  const minutes = parseInt(document.getElementById('timer-minutes').value) || 0;
  const seconds = parseInt(document.getElementById('timer-seconds').value) || 0;
  timerState.totalSeconds = hours * 3600 + minutes * 60 + seconds;
  timerState.remainingSeconds = timerState.totalSeconds;
  updateTimerDisplay();
}

function startTimer() {
  if (!timerState.running && timerState.remainingSeconds > 0) {
    timerState.running = true;
    timerState.interval = setInterval(() => {
      timerState.remainingSeconds--;
      updateTimerDisplay();
      if (timerState.remainingSeconds <= 0) {
        timerComplete();
      }
    }, 1000);
    document.getElementById('timer-start').disabled = true;
    document.getElementById('timer-pause').disabled = false;
  }
}

function pauseTimer() {
  if (timerState.running) {
    timerState.running = false;
    clearInterval(timerState.interval);
    document.getElementById('timer-start').disabled = false;
    document.getElementById('timer-start').textContent = '▶ Resume';
    document.getElementById('timer-pause').disabled = true;
  }
}

function resetTimer() {
  timerState.running = false;
  clearInterval(timerState.interval);
  setTimerFromInputs();
  document.getElementById('timer-start').disabled = false;
  document.getElementById('timer-start').textContent = '▶ Start';
  document.getElementById('timer-pause').disabled = true;
}

function timerComplete() {
  timerState.running = false;
  clearInterval(timerState.interval);
  playSound('timer');
  showToast('⏰ Timer Complete!');
  
  // Show notification if permission granted
  if (Notification.permission === 'granted') {
    new Notification('Timer Complete!', {
      body: 'Your timer has finished.',
      icon: 'icons/icon128.png'
    });
  }
  
  document.getElementById('timer-start').disabled = false;
  document.getElementById('timer-start').textContent = '▶ Start';
  document.getElementById('timer-pause').disabled = true;
}

// ==================== POMODORO ====================
let pomodoroState = {
  running: false,
  isBreak: false,
  isLongBreak: false,
  sessionsCompleted: 0,
  totalFocusTime: 0,
  workDuration: 25 * 60,
  breakDuration: 5 * 60,
  longBreakDuration: 15 * 60,
  remainingSeconds: 25 * 60,
  interval: null
};

function updatePomodoroDisplay() {
  const display = document.getElementById('pomodoro-display');
  const status = document.getElementById('pomodoro-status');
  const ring = document.getElementById('pomodoro-ring');
  
  if (display) {
    const minutes = Math.floor(pomodoroState.remainingSeconds / 60);
    const seconds = pomodoroState.remainingSeconds % 60;
    display.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }
  
  if (status) {
    if (pomodoroState.isLongBreak) {
      status.textContent = 'Long Break';
      status.className = 'pomodoro-status break';
    } else if (pomodoroState.isBreak) {
      status.textContent = 'Short Break';
      status.className = 'pomodoro-status break';
    } else {
      status.textContent = 'Focus Time';
      status.className = 'pomodoro-status';
    }
  }
  
  if (ring) {
    const totalDuration = pomodoroState.isLongBreak 
      ? pomodoroState.longBreakDuration 
      : pomodoroState.isBreak 
        ? pomodoroState.breakDuration 
        : pomodoroState.workDuration;
    const progress = pomodoroState.remainingSeconds / totalDuration;
    const circumference = 2 * Math.PI * 90;
    ring.style.strokeDashoffset = circumference * (1 - progress);
  }
  
  document.getElementById('pomodoro-sessions').textContent = pomodoroState.sessionsCompleted;
  document.getElementById('pomodoro-total-time').textContent = `${Math.floor(pomodoroState.totalFocusTime / 60)}m`;
}

function startPomodoro() {
  if (!pomodoroState.running) {
    pomodoroState.running = true;
    pomodoroState.interval = setInterval(() => {
      pomodoroState.remainingSeconds--;
      if (!pomodoroState.isBreak && !pomodoroState.isLongBreak) {
        pomodoroState.totalFocusTime++;
      }
      updatePomodoroDisplay();
      if (pomodoroState.remainingSeconds <= 0) {
        pomodoroComplete();
      }
    }, 1000);
    document.getElementById('pomodoro-start').disabled = true;
    document.getElementById('pomodoro-pause').disabled = false;
  }
}

function pausePomodoro() {
  if (pomodoroState.running) {
    pomodoroState.running = false;
    clearInterval(pomodoroState.interval);
    document.getElementById('pomodoro-start').disabled = false;
    document.getElementById('pomodoro-start').textContent = '▶ Resume';
    document.getElementById('pomodoro-pause').disabled = true;
  }
}

function resetPomodoro() {
  pomodoroState.running = false;
  pomodoroState.isBreak = false;
  pomodoroState.isLongBreak = false;
  clearInterval(pomodoroState.interval);
  pomodoroState.workDuration = parseInt(document.getElementById('pomodoro-work').value) * 60;
  pomodoroState.breakDuration = parseInt(document.getElementById('pomodoro-break').value) * 60;
  pomodoroState.longBreakDuration = parseInt(document.getElementById('pomodoro-long-break').value) * 60;
  pomodoroState.remainingSeconds = pomodoroState.workDuration;
  updatePomodoroDisplay();
  document.getElementById('pomodoro-start').disabled = false;
  document.getElementById('pomodoro-start').textContent = '▶ Start';
  document.getElementById('pomodoro-pause').disabled = true;
}

function skipPomodoro() {
  pomodoroComplete();
}

function pomodoroComplete() {
  pomodoroState.running = false;
  clearInterval(pomodoroState.interval);
  playSound('pomodoro');
  
  if (!pomodoroState.isBreak && !pomodoroState.isLongBreak) {
    pomodoroState.sessionsCompleted++;
    showToast('🎉 Focus session complete! Take a break.');
    
    if (pomodoroState.sessionsCompleted % 4 === 0) {
      pomodoroState.isLongBreak = true;
      pomodoroState.remainingSeconds = pomodoroState.longBreakDuration;
    } else {
      pomodoroState.isBreak = true;
      pomodoroState.remainingSeconds = pomodoroState.breakDuration;
    }
  } else {
    showToast('💪 Break over! Ready to focus?');
    pomodoroState.isBreak = false;
    pomodoroState.isLongBreak = false;
    pomodoroState.remainingSeconds = pomodoroState.workDuration;
  }
  
  updatePomodoroDisplay();
  document.getElementById('pomodoro-start').disabled = false;
  document.getElementById('pomodoro-start').textContent = '▶ Start';
  document.getElementById('pomodoro-pause').disabled = true;
  
  if (Notification.permission === 'granted') {
    new Notification(pomodoroState.isBreak || pomodoroState.isLongBreak ? 'Time for a break!' : 'Focus session complete!', {
      body: pomodoroState.isBreak || pomodoroState.isLongBreak ? 'You earned a rest.' : 'Great work! Take a break.',
      icon: 'icons/icon128.png'
    });
  }
}

// ==================== SOUND FUNCTIONS ====================
function playSound(type) {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  switch(type) {
    case 'timer':
    case 'alarm':
      oscillator.frequency.value = 800;
      oscillator.type = 'sine';
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      oscillator.start();
      setTimeout(() => oscillator.stop(), 500);
      break;
    case 'pomodoro':
      oscillator.frequency.value = 600;
      oscillator.type = 'triangle';
      gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
      oscillator.start();
      setTimeout(() => oscillator.stop(), 300);
      break;
    case 'chime':
      oscillator.frequency.value = 523.25; // C5
      oscillator.type = 'sine';
      gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);
      oscillator.start();
      setTimeout(() => oscillator.stop(), 1000);
      break;
  }
}

// ==================== ALARMS ====================
let alarmList = [];

function loadAlarms() {
  chrome.storage.local.get(['alarms'], (result) => {
    if (result.alarms) {
      alarmList = result.alarms;
      renderAlarmList();
    }
  });
}

function saveAlarms() {
  chrome.storage.local.set({ alarms: alarmList });
  renderAlarmList();
}

function addAlarm() {
  const time = document.getElementById('alarm-time').value;
  const timezone = document.getElementById('alarm-timezone').value;
  const label = document.getElementById('alarm-label').value || 'Alarm';
  const repeat = document.getElementById('alarm-repeat-check').checked;
  const sound = document.getElementById('alarm-sound').value;
  
  const days = [];
  if (repeat) {
    document.querySelectorAll('#alarm-days input:checked').forEach(cb => {
      days.push(parseInt(cb.value));
    });
  }
  
  if (!time) {
    showToast('Please set a time');
    return;
  }
  
  const alarm = {
    id: Date.now(),
    time,
    timezone,
    label,
    repeat,
    days,
    sound,
    enabled: true
  };
  
  alarmList.push(alarm);
  saveAlarms();
  showToast('Alarm added!');
  
  // Clear form
  document.getElementById('alarm-time').value = '';
  document.getElementById('alarm-label').value = '';
  document.getElementById('alarm-repeat-check').checked = false;
}

function deleteAlarm(id) {
  alarmList = alarmList.filter(a => a.id !== id);
  saveAlarms();
  showToast('Alarm deleted');
}

function toggleAlarm(id) {
  const alarm = alarmList.find(a => a.id === id);
  if (alarm) {
    alarm.enabled = !alarm.enabled;
    saveAlarms();
  }
}

function renderAlarmList() {
  const container = document.getElementById('alarm-list');
  if (!container) return;
  
  if (alarmList.length === 0) {
    container.innerHTML = '<p class="no-alarms">No alarms set</p>';
    return;
  }
  
  container.innerHTML = alarmList.map(alarm => `
    <div class="alarm-item ${alarm.enabled ? '' : 'disabled'}">
      <div class="alarm-info">
        <div class="alarm-time-display">${alarm.time}</div>
        <div class="alarm-label-display">${alarm.label} ${alarm.repeat ? '🔁' : ''}</div>
      </div>
      <div class="alarm-actions">
        <button class="alarm-toggle ${alarm.enabled ? 'active' : ''}" data-id="${alarm.id}"></button>
        <button class="alarm-delete" data-id="${alarm.id}">🗑️</button>
      </div>
    </div>
  `).join('');
  
  // Add event listeners
  container.querySelectorAll('.alarm-toggle').forEach(btn => {
    btn.addEventListener('click', () => toggleAlarm(parseInt(btn.dataset.id)));
  });
  container.querySelectorAll('.alarm-delete').forEach(btn => {
    btn.addEventListener('click', () => deleteAlarm(parseInt(btn.dataset.id)));
  });
}

function checkAlarms() {
  const now = new Date();
  const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  const currentDay = now.getDay();
  
  alarmList.forEach(alarm => {
    if (!alarm.enabled) return;
    if (alarm.time !== currentTime) return;
    if (alarm.repeat && alarm.days.length > 0 && !alarm.days.includes(currentDay)) return;
    
    // Trigger alarm
    playSound('alarm');
    showToast(`⏰ ${alarm.label}`);
    
    if (Notification.permission === 'granted') {
      new Notification(`⏰ ${alarm.label}`, {
        body: `It's ${alarm.time}`,
        icon: 'icons/icon128.png',
        requireInteraction: true
      });
    }
    
    // Disable non-repeating alarms
    if (!alarm.repeat) {
      alarm.enabled = false;
      saveAlarms();
    }
  });
}

// ==================== TIMELINE VIEW ====================
let timelineOffset = 0;

function renderTimeline() {
  const container = document.getElementById('timeline-container');
  const hoursDiv = container.querySelector('.timeline-hours');
  
  // Remove existing rows
  container.querySelectorAll('.timeline-row').forEach(r => r.remove());
  
  const now = new Date();
  now.setHours(now.getHours() + timelineOffset);
  
  document.getElementById('timeline-current').textContent = 
    timelineOffset === 0 ? 'Now' : `${timelineOffset > 0 ? '+' : ''}${timelineOffset}h`;
  
  const allTimezones = [...Object.values(timezones), ...customTimezones];
  
  allTimezones.forEach(tz => {
    if (removedTimezones.includes(tz.cardId)) return;
    
    try {
      const tzTime = new Date(now.toLocaleString('en-US', { timeZone: tz.timezone }));
      const hour = tzTime.getHours();
      const hourPercent = (hour / 24) * 100;
      const businessStart = (9 / 24) * 100;
      const businessEnd = (17 / 24) * 100;
      
      const row = document.createElement('div');
      row.className = 'timeline-row';
      row.innerHTML = `
        <div class="timeline-label">
          <span>${tz.name || tz.timezone.split('/').pop()}</span>
        </div>
        <div class="timeline-bar">
          <div class="timeline-business" style="left: ${businessStart}%; width: ${businessEnd - businessStart}%"></div>
          <div class="timeline-marker" style="left: ${hourPercent}%"></div>
        </div>
      `;
      
      container.appendChild(row);
    } catch (e) {
      console.error('Error rendering timeline for', tz.timezone, e);
    }
  });
}

// ==================== WORLD MAP ====================
const cityCoordinates = {
  'America/New_York': { x: 280, y: 180, name: 'New York' },
  'America/Los_Angeles': { x: 120, y: 180, name: 'Los Angeles' },
  'America/Chicago': { x: 220, y: 170, name: 'Chicago' },
  'Europe/London': { x: 480, y: 130, name: 'London' },
  'Europe/Paris': { x: 495, y: 140, name: 'Paris' },
  'Europe/Berlin': { x: 510, y: 130, name: 'Berlin' },
  'Europe/Rome': { x: 510, y: 155, name: 'Rome' },
  'Asia/Tokyo': { x: 870, y: 160, name: 'Tokyo' },
  'Asia/Shanghai': { x: 800, y: 175, name: 'Shanghai' },
  'Asia/Dubai': { x: 600, y: 200, name: 'Dubai' },
  'Asia/Singapore': { x: 780, y: 270, name: 'Singapore' },
  'Asia/Kolkata': { x: 680, y: 210, name: 'Mumbai' },
  'Australia/Sydney': { x: 890, y: 380, name: 'Sydney' },
  'America/Sao_Paulo': { x: 310, y: 350, name: 'São Paulo' },
  'Africa/Johannesburg': { x: 540, y: 380, name: 'Johannesburg' },
  'Africa/Cairo': { x: 545, y: 185, name: 'Cairo' }
};

function renderWorldMap() {
  const markersGroup = document.getElementById('city-markers');
  const cityList = document.getElementById('worldmap-city-list');
  if (!markersGroup || !cityList) return;
  
  markersGroup.innerHTML = '';
  cityList.innerHTML = '';
  
  const now = new Date();
  
  // Update day/night overlay
  const overlay = document.getElementById('day-night-overlay');
  if (overlay) {
    const utcHour = now.getUTCHours();
    const nightPosition = ((12 - utcHour) / 24 * 1000 + 500) % 1000;
    overlay.setAttribute('x', nightPosition - 500);
  }
  
  // Add city markers
  Object.entries(cityCoordinates).forEach(([tz, coords]) => {
    try {
      const tzTime = new Date(now.toLocaleString('en-US', { timeZone: tz }));
      const hour = tzTime.getHours();
      const isNight = hour < 6 || hour >= 20;
      
      const timeStr = tzTime.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: !settings.hour24
      });
      
      // Add SVG marker
      const marker = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      marker.classList.add('city-marker');
      if (isNight) marker.classList.add('night');
      marker.innerHTML = `
        <circle cx="${coords.x}" cy="${coords.y}" r="5"/>
        <text x="${coords.x}" y="${coords.y - 10}">${coords.name}</text>
      `;
      marker.addEventListener('click', () => {
        const tzConfig = popularTimezones.find(t => t.timezone === tz);
        if (tzConfig) {
          addCustomTimezone(tzConfig);
          document.getElementById('worldmap-panel').classList.remove('active');
        }
      });
      markersGroup.appendChild(marker);
      
      // Add to city list
      const cityItem = document.createElement('div');
      cityItem.className = 'worldmap-city-item';
      cityItem.innerHTML = `
        <div class="city-name">${coords.name}</div>
        <div class="city-time">${timeStr}</div>
      `;
      cityItem.addEventListener('click', () => {
        const tzConfig = popularTimezones.find(t => t.timezone === tz);
        if (tzConfig) {
          addCustomTimezone(tzConfig);
          document.getElementById('worldmap-panel').classList.remove('active');
        }
      });
      cityList.appendChild(cityItem);
    } catch (e) {
      console.error('Error rendering city', tz, e);
    }
  });
}

// ==================== PROFILES ====================
let profiles = {
  default: {
    name: 'Default',
    timezones: ['est', 'pst', 'brazil', 'italy'],
    customTimezones: []
  }
};
let currentProfileId = 'default';

function loadProfiles() {
  chrome.storage.sync.get(['profiles', 'currentProfileId'], (result) => {
    if (result.profiles) profiles = result.profiles;
    if (result.currentProfileId) currentProfileId = result.currentProfileId;
    renderProfileList();
  });
}

function saveProfiles() {
  chrome.storage.sync.set({ profiles, currentProfileId });
  renderProfileList();
}

function createProfile() {
  const name = document.getElementById('profile-name').value.trim();
  if (!name) {
    showToast('Please enter a profile name');
    return;
  }
  
  const id = `profile-${Date.now()}`;
  const currentTimezones = Object.keys(timezones).filter(tz => !removedTimezones.includes(tz));
  
  profiles[id] = {
    name,
    timezones: currentTimezones,
    customTimezones: [...customTimezones]
  };
  
  saveProfiles();
  document.getElementById('profile-name').value = '';
  showToast(`Profile "${name}" saved!`);
}

function loadProfile(id) {
  const profile = profiles[id];
  if (!profile) return;
  
  // Reset current state
  removedTimezones = Object.keys(timezones).filter(tz => !profile.timezones.includes(tz));
  customTimezones = [...(profile.customTimezones || [])];
  currentProfileId = id;
  
  // Update display
  Object.keys(timezones).forEach(tz => {
    const card = document.querySelector(`[data-timezone="${tz}"]`);
    if (card) {
      card.style.display = removedTimezones.includes(tz) ? 'none' : '';
    }
  });
  
  // Clear and re-render custom timezones
  document.querySelectorAll('.clock-card.custom').forEach(card => card.remove());
  customTimezones.forEach(tz => renderCustomTimezone(tz));
  
  saveSettings();
  saveProfiles();
  showToast(`Loaded profile: ${profile.name}`);
}

function deleteProfile(id) {
  if (id === 'default') {
    showToast('Cannot delete default profile');
    return;
  }
  
  delete profiles[id];
  if (currentProfileId === id) {
    currentProfileId = 'default';
    loadProfile('default');
  }
  saveProfiles();
  showToast('Profile deleted');
}

function renderProfileList() {
  const container = document.getElementById('profile-list');
  if (!container) return;
  
  container.innerHTML = Object.entries(profiles).map(([id, profile]) => `
    <div class="profile-item ${id === currentProfileId ? 'active' : ''}">
      <div>
        <span class="profile-name">${profile.name}</span>
        <span class="profile-count">${profile.timezones.length + (profile.customTimezones?.length || 0)} timezones</span>
      </div>
      <div class="profile-actions">
        <button class="profile-load ${id === currentProfileId ? 'active' : ''}" data-id="${id}">
          ${id === currentProfileId ? 'Active' : 'Load'}
        </button>
        ${id !== 'default' ? `<button class="profile-delete" data-id="${id}">🗑️</button>` : ''}
      </div>
    </div>
  `).join('');
  
  container.querySelectorAll('.profile-load').forEach(btn => {
    btn.addEventListener('click', () => loadProfile(btn.dataset.id));
  });
  container.querySelectorAll('.profile-delete').forEach(btn => {
    btn.addEventListener('click', () => deleteProfile(btn.dataset.id));
  });
}

// ==================== DST ALERTS ====================
function checkDSTChanges() {
  const now = new Date();
  const checkDate = new Date(now);
  checkDate.setDate(checkDate.getDate() + 7); // Check 7 days ahead
  
  const allTimezones = [...Object.values(timezones), ...customTimezones];
  const dstChanges = [];
  
  allTimezones.forEach(tz => {
    if (removedTimezones.includes(tz.cardId)) return;
    
    try {
      const nowOffset = new Date(now.toLocaleString('en-US', { timeZone: tz.timezone })).getTimezoneOffset();
      const futureOffset = new Date(checkDate.toLocaleString('en-US', { timeZone: tz.timezone })).getTimezoneOffset();
      
      if (nowOffset !== futureOffset) {
        dstChanges.push({
          name: tz.name || tz.timezone,
          change: nowOffset > futureOffset ? 'forward' : 'back'
        });
      }
    } catch (e) {
      console.error('Error checking DST for', tz.timezone, e);
    }
  });
  
  if (dstChanges.length > 0) {
    showDSTAlert(dstChanges);
  }
}

function showDSTAlert(changes) {
  const alert = document.getElementById('dst-alert');
  const message = document.getElementById('dst-message');
  if (!alert || !message) return;
  
  const changeText = changes.map(c => `${c.name} (${c.change === 'forward' ? '+1h' : '-1h'})`).join(', ');
  message.textContent = `DST change in 7 days: ${changeText}`;
  alert.style.display = 'flex';
}

// ==================== SUNRISE/SUNSET ====================
function calculateSunTimes(lat, lng, date) {
  // Simplified sunrise/sunset calculation
  const dayOfYear = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 86400000);
  const declination = -23.45 * Math.cos(2 * Math.PI * (dayOfYear + 10) / 365);
  const decRad = declination * Math.PI / 180;
  const latRad = lat * Math.PI / 180;
  
  const hourAngle = Math.acos(-Math.tan(latRad) * Math.tan(decRad));
  const sunrise = 12 - hourAngle * 12 / Math.PI - lng / 15;
  const sunset = 12 + hourAngle * 12 / Math.PI - lng / 15;
  
  return {
    sunrise: `${Math.floor(sunrise)}:${String(Math.floor((sunrise % 1) * 60)).padStart(2, '0')}`,
    sunset: `${Math.floor(sunset)}:${String(Math.floor((sunset % 1) * 60)).padStart(2, '0')}`
  };
}

// City coordinates for sun calculations
const cityLatLng = {
  'America/New_York': { lat: 40.7128, lng: -74.006 },
  'America/Los_Angeles': { lat: 34.0522, lng: -118.2437 },
  'America/Sao_Paulo': { lat: -23.5505, lng: -46.6333 },
  'Europe/Rome': { lat: 41.9028, lng: 12.4964 },
  'Europe/London': { lat: 51.5074, lng: -0.1278 },
  'Asia/Tokyo': { lat: 35.6762, lng: 139.6503 },
  'Australia/Sydney': { lat: -33.8688, lng: 151.2093 }
};

function addSunTimesToCards() {
  Object.entries(timezones).forEach(([key, tz]) => {
    const card = document.querySelector(`[data-timezone="${key}"]`);
    if (!card) return;
    
    const coords = cityLatLng[tz.timezone];
    if (!coords) return;
    
    // Remove existing sun times
    const existing = card.querySelector('.sun-times');
    if (existing) existing.remove();
    
    const sunTimes = calculateSunTimes(coords.lat, coords.lng, new Date());
    
    const sunDiv = document.createElement('div');
    sunDiv.className = 'sun-times';
    sunDiv.innerHTML = `
      <span class="sun-time"><span class="sun-icon">🌅</span>${sunTimes.sunrise}</span>
      <span class="sun-time"><span class="sun-icon">🌇</span>${sunTimes.sunset}</span>
    `;
    
    const timezoneInfo = card.querySelector('.timezone-info');
    if (timezoneInfo) {
      timezoneInfo.appendChild(sunDiv);
    }
  });
}

// ==================== ANALOG CLOCK ====================
let showAnalogClock = false;

function toggleAnalogClock() {
  showAnalogClock = !showAnalogClock;
  if (showAnalogClock) {
    addAnalogClocks();
  } else {
    removeAnalogClocks();
  }
  chrome.storage.sync.set({ showAnalogClock });
}

function addAnalogClocks() {
  Object.entries(timezones).forEach(([key, tz]) => {
    const card = document.querySelector(`[data-timezone="${key}"]`);
    if (!card || card.querySelector('.analog-clock')) return;
    
    const analogClock = document.createElement('div');
    analogClock.className = 'analog-clock';
    analogClock.id = `analog-${key}`;
    analogClock.innerHTML = `
      <div class="clock-hand hour"></div>
      <div class="clock-hand minute"></div>
      <div class="clock-hand second"></div>
    `;
    
    const timeDisplay = card.querySelector('.time-display');
    if (timeDisplay) {
      timeDisplay.parentNode.insertBefore(analogClock, timeDisplay);
    }
  });
  
  updateAnalogClocks();
}

function removeAnalogClocks() {
  document.querySelectorAll('.analog-clock').forEach(clock => clock.remove());
}

function updateAnalogClocks() {
  if (!showAnalogClock) return;
  
  Object.entries(timezones).forEach(([key, tz]) => {
    const clock = document.getElementById(`analog-${key}`);
    if (!clock) return;
    
    try {
      const now = new Date();
      const tzTime = new Date(now.toLocaleString('en-US', { timeZone: tz.timezone }));
      
      const hours = tzTime.getHours() % 12;
      const minutes = tzTime.getMinutes();
      const seconds = tzTime.getSeconds();
      
      const hourDeg = (hours * 30) + (minutes * 0.5);
      const minuteDeg = minutes * 6;
      const secondDeg = seconds * 6;
      
      clock.querySelector('.hour').style.transform = `rotate(${hourDeg}deg)`;
      clock.querySelector('.minute').style.transform = `rotate(${minuteDeg}deg)`;
      clock.querySelector('.second').style.transform = `rotate(${secondDeg}deg)`;
    } catch (e) {
      console.error('Error updating analog clock', key, e);
    }
  });
}

// ==================== HOURLY CHIMES ====================
let hourlyChimesEnabled = false;
let lastChimeHour = -1;

function checkHourlyChime() {
  if (!hourlyChimesEnabled) return;
  
  const now = new Date();
  const currentHour = now.getHours();
  
  if (currentHour !== lastChimeHour && now.getMinutes() === 0) {
    lastChimeHour = currentHour;
    playSound('chime');
    showChimeIndicator(currentHour);
    
    // Speak the time if speech synthesis is available
    if (speakTimeEnabled && 'speechSynthesis' in window) {
      speakTime(currentHour);
    }
  }
}

// Spoken time announcement
let speakTimeEnabled = false;

function speakTime(hour) {
  const period = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  const utterance = new SpeechSynthesisUtterance(`The time is ${displayHour} ${period}`);
  utterance.rate = 0.9;
  utterance.pitch = 1;
  utterance.volume = 0.7;
  window.speechSynthesis.speak(utterance);
}

function toggleSpeakTime() {
  speakTimeEnabled = !speakTimeEnabled;
  chrome.storage.sync.set({ speakTimeEnabled });
  showToast(speakTimeEnabled ? '🔊 Time announcement enabled' : '🔇 Time announcement disabled');
}

function showChimeIndicator(hour) {
  const indicator = document.createElement('div');
  indicator.className = 'chime-indicator';
  indicator.innerHTML = `🔔 ${hour === 0 ? 12 : hour > 12 ? hour - 12 : hour}:00 ${hour >= 12 ? 'PM' : 'AM'}`;
  document.body.appendChild(indicator);
  
  setTimeout(() => indicator.remove(), 3000);
}

function toggleHourlyChimes() {
  hourlyChimesEnabled = !hourlyChimesEnabled;
  chrome.storage.sync.set({ hourlyChimesEnabled });
  showToast(hourlyChimesEnabled ? '🔔 Hourly chimes enabled' : '🔕 Hourly chimes disabled');
}

// ==================== WEATHER (Placeholder - needs API) ====================
async function fetchWeather(city) {
  // City coordinates for Open-Meteo API
  const cityCoords = {
    'New York': { lat: 40.7128, lon: -74.006 },
    'Los Angeles': { lat: 34.0522, lon: -118.2437 },
    'São Paulo': { lat: -23.5505, lon: -46.6333 },
    'Rome': { lat: 41.9028, lon: 12.4964 },
    'London': { lat: 51.5074, lon: -0.1278 },
    'Tokyo': { lat: 35.6762, lon: 139.6503 }
  };
  
  const coords = cityCoords[city];
  if (!coords) return { temp: '--', icon: '🌡️' };
  
  try {
    // Free Open-Meteo API - no key required
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current=temperature_2m,weather_code&temperature_unit=fahrenheit`
    );
    
    if (!response.ok) throw new Error('Weather fetch failed');
    
    const data = await response.json();
    const temp = Math.round(data.current.temperature_2m);
    const weatherCode = data.current.weather_code;
    
    // Convert WMO weather codes to icons
    const getWeatherIcon = (code) => {
      if (code === 0) return '☀️';
      if (code <= 3) return '⛅';
      if (code <= 48) return '🌫️';
      if (code <= 57) return '🌧️';
      if (code <= 67) return '🌧️';
      if (code <= 77) return '❄️';
      if (code <= 82) return '🌧️';
      if (code <= 86) return '🌨️';
      if (code >= 95) return '⛈️';
      return '🌡️';
    };
    
    return { temp, icon: getWeatherIcon(weatherCode) };
  } catch (error) {
    console.log('Weather fetch error (offline?):', error.message);
    // Return cached or default data
    return { temp: '--', icon: '📡' };
  }
}

async function addWeatherToCards() {
  const cities = {
    'est': 'New York',
    'pst': 'Los Angeles',
    'brazil': 'São Paulo',
    'italy': 'Rome'
  };
  
  for (const [key, city] of Object.entries(cities)) {
    const card = document.querySelector(`[data-timezone="${key}"]`);
    if (!card) continue;
    
    // Remove existing weather
    const existing = card.querySelector('.weather-info');
    if (existing) existing.remove();
    
    const weather = await fetchWeather(city);
    
    const weatherDiv = document.createElement('div');
    weatherDiv.className = 'weather-info';
    weatherDiv.innerHTML = `
      <span class="weather-icon">${weather.icon}</span>
      <span class="weather-temp">${weather.temp}°F</span>
    `;
    
    const timezoneInfo = card.querySelector('.timezone-info');
    if (timezoneInfo) {
      timezoneInfo.appendChild(weatherDiv);
    }
  }
}

// ==================== HOLIDAYS ====================
const holidays = {
  us: [
    { name: "New Year's Day", month: 1, day: 1 },
    { name: "Martin Luther King Jr. Day", month: 1, day: 20 },
    { name: "Presidents' Day", month: 2, day: 17 },
    { name: "Memorial Day", month: 5, day: 26 },
    { name: "Independence Day", month: 7, day: 4 },
    { name: "Labor Day", month: 9, day: 1 },
    { name: "Columbus Day", month: 10, day: 14 },
    { name: "Veterans Day", month: 11, day: 11 },
    { name: "Thanksgiving", month: 11, day: 28 },
    { name: "Christmas Day", month: 12, day: 25 }
  ],
  brazil: [
    { name: "Ano Novo", month: 1, day: 1 },
    { name: "Carnaval", month: 2, day: 25 },
    { name: "Sexta-feira Santa", month: 4, day: 18 },
    { name: "Tiradentes", month: 4, day: 21 },
    { name: "Dia do Trabalho", month: 5, day: 1 },
    { name: "Corpus Christi", month: 6, day: 19 },
    { name: "Independência", month: 9, day: 7 },
    { name: "Nossa Senhora Aparecida", month: 10, day: 12 },
    { name: "Finados", month: 11, day: 2 },
    { name: "Proclamação da República", month: 11, day: 15 },
    { name: "Natal", month: 12, day: 25 }
  ],
  italy: [
    { name: "Capodanno", month: 1, day: 1 },
    { name: "Epifania", month: 1, day: 6 },
    { name: "Pasqua", month: 4, day: 20 },
    { name: "Lunedì dell'Angelo", month: 4, day: 21 },
    { name: "Festa della Liberazione", month: 4, day: 25 },
    { name: "Festa dei Lavoratori", month: 5, day: 1 },
    { name: "Festa della Repubblica", month: 6, day: 2 },
    { name: "Ferragosto", month: 8, day: 15 },
    { name: "Tutti i Santi", month: 11, day: 1 },
    { name: "Immacolata Concezione", month: 12, day: 8 },
    { name: "Natale", month: 12, day: 25 },
    { name: "Santo Stefano", month: 12, day: 26 }
  ],
  uk: [
    { name: "New Year's Day", month: 1, day: 1 },
    { name: "Good Friday", month: 4, day: 18 },
    { name: "Easter Monday", month: 4, day: 21 },
    { name: "Early May Bank Holiday", month: 5, day: 5 },
    { name: "Spring Bank Holiday", month: 5, day: 26 },
    { name: "Summer Bank Holiday", month: 8, day: 25 },
    { name: "Christmas Day", month: 12, day: 25 },
    { name: "Boxing Day", month: 12, day: 26 }
  ]
};

const countryFlags = {
  us: '🇺🇸',
  brazil: '🇧🇷',
  italy: '🇮🇹',
  uk: '🇬🇧'
};

function getUpcomingHolidays(region = 'all') {
  const today = new Date();
  const year = today.getFullYear();
  const allHolidays = [];
  
  const regions = region === 'all' ? Object.keys(holidays) : [region];
  
  regions.forEach(r => {
    if (!holidays[r]) return;
    holidays[r].forEach(h => {
      const holidayDate = new Date(year, h.month - 1, h.day);
      // If holiday has passed this year, use next year
      if (holidayDate < today) {
        holidayDate.setFullYear(year + 1);
      }
      
      const daysUntil = Math.ceil((holidayDate - today) / (1000 * 60 * 60 * 24));
      
      allHolidays.push({
        ...h,
        date: holidayDate,
        daysUntil,
        country: r,
        flag: countryFlags[r]
      });
    });
  });
  
  return allHolidays.sort((a, b) => a.date - b.date).slice(0, 15);
}

function renderHolidays(region = 'all') {
  const container = document.getElementById('holidays-list');
  if (!container) return;
  
  const upcomingHolidays = getUpcomingHolidays(region);
  
  container.innerHTML = upcomingHolidays.map(h => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const isToday = h.daysUntil === 0;
    const isUpcoming = h.daysUntil <= 7 && h.daysUntil > 0;
    
    return `
      <div class="holiday-item ${isToday ? 'today' : ''} ${isUpcoming ? 'upcoming' : ''}">
        <div class="holiday-date">
          <div class="holiday-day">${h.day}</div>
          <div class="holiday-month">${months[h.month - 1]}</div>
        </div>
        <div class="holiday-info">
          <div class="holiday-name">${h.name}</div>
          <div class="holiday-country">${h.flag} ${h.country.toUpperCase()}</div>
        </div>
        <div class="holiday-countdown">
          ${isToday ? '🎉 Today!' : `${h.daysUntil} days`}
        </div>
      </div>
    `;
  }).join('');
}

// ==================== BADGE COUNTDOWN ====================
let badgeMode = 'none'; // 'none', 'next-hour', 'countdown', 'time'

function updateBadge() {
  if (badgeMode === 'none') {
    chrome.action?.setBadgeText({ text: '' });
    return;
  }
  
  const now = new Date();
  
  switch (badgeMode) {
    case 'next-hour':
      const minutesLeft = 60 - now.getMinutes();
      chrome.action?.setBadgeText({ text: `${minutesLeft}m` });
      chrome.action?.setBadgeBackgroundColor({ color: '#667eea' });
      break;
    
    case 'time':
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const timeStr = `${hours}:${String(minutes).padStart(2, '0')}`;
      chrome.action?.setBadgeText({ text: timeStr });
      chrome.action?.setBadgeBackgroundColor({ color: '#22c55e' });
      break;
    
    case 'countdown':
      // Countdown to end of business day (5 PM)
      const endOfDay = new Date(now);
      endOfDay.setHours(17, 0, 0, 0);
      if (now > endOfDay) {
        chrome.action?.setBadgeText({ text: '✓' });
      } else {
        const hoursLeft = Math.floor((endOfDay - now) / (1000 * 60 * 60));
        chrome.action?.setBadgeText({ text: `${hoursLeft}h` });
      }
      chrome.action?.setBadgeBackgroundColor({ color: '#f59e0b' });
      break;
  }
}

function setBadgeMode(mode) {
  badgeMode = mode;
  chrome.storage.sync.set({ badgeMode });
  updateBadge();
}

// ==================== TARGET COUNTDOWN ====================
let targetCountdowns = [];
let countdownUpdateInterval = null;

function initTargetCountdown() {
  const panel = document.getElementById('target-countdown-panel');
  const openBtn = document.getElementById('target-countdown-btn');
  const closeBtn = document.getElementById('close-target-countdown');
  const startBtn = document.getElementById('start-target-countdown');
  const tzSelect = document.getElementById('target-timezone-select');
  
  // Populate timezone select
  if (tzSelect) {
    const allTzs = [...Object.entries(timezones), ...customTimezones.map(t => [t.cardId, t])];
    allTzs.forEach(([id, tz]) => {
      const option = document.createElement('option');
      option.value = tz.timezone;
      option.textContent = tz.name || id;
      tzSelect.appendChild(option);
    });
  }
  
  openBtn?.addEventListener('click', () => {
    panel.classList.add('active');
    document.getElementById('more-menu').classList.remove('active');
  });
  
  closeBtn?.addEventListener('click', () => {
    panel.classList.remove('active');
  });
  
  startBtn?.addEventListener('click', () => {
    const timeInput = document.getElementById('target-time-input').value;
    const timezone = document.getElementById('target-timezone-select').value;
    const label = document.getElementById('target-label-input').value || 'Target time';
    
    if (!timeInput) {
      showToast('Please enter a target time');
      return;
    }
    
    addTargetCountdown(timeInput, timezone, label);
  });
  
  // Load saved countdowns
  chrome.storage.local.get(['targetCountdowns'], (result) => {
    if (result.targetCountdowns) {
      targetCountdowns = result.targetCountdowns;
      renderActiveCountdowns();
    }
  });
  
  // Start update interval
  countdownUpdateInterval = setInterval(updateAllCountdowns, 1000);
}

function addTargetCountdown(timeStr, timezone, label) {
  const [hours, minutes] = timeStr.split(':').map(Number);
  const now = new Date();
  
  // Create target date in the specified timezone
  let targetDate = new Date();
  if (timezone === 'local') {
    targetDate.setHours(hours, minutes, 0, 0);
  } else {
    // Calculate target time in UTC then adjust
    const tzNow = new Date(now.toLocaleString('en-US', { timeZone: timezone }));
    targetDate = new Date(now.getTime() + (hours * 60 + minutes) * 60000 - (tzNow.getHours() * 60 + tzNow.getMinutes()) * 60000);
    targetDate.setSeconds(0, 0);
  }
  
  // If target is in the past, set for tomorrow
  if (targetDate <= now) {
    targetDate.setDate(targetDate.getDate() + 1);
  }
  
  const countdown = {
    id: Date.now(),
    targetTime: targetDate.getTime(),
    timezone,
    label,
    timeStr
  };
  
  targetCountdowns.push(countdown);
  chrome.storage.local.set({ targetCountdowns });
  renderActiveCountdowns();
  showToast(`Countdown started: ${label}`);
}

function removeTargetCountdown(id) {
  targetCountdowns = targetCountdowns.filter(c => c.id !== id);
  chrome.storage.local.set({ targetCountdowns });
  renderActiveCountdowns();
}

function updateAllCountdowns() {
  const container = document.getElementById('active-countdowns');
  if (!container) return;
  
  const now = Date.now();
  let hasExpired = false;
  
  targetCountdowns.forEach(countdown => {
    const remaining = countdown.targetTime - now;
    const el = document.getElementById(`countdown-${countdown.id}`);
    
    if (remaining <= 0) {
      hasExpired = true;
      if (el) {
        el.querySelector('.countdown-remaining').textContent = '🎉 Time reached!';
        el.classList.add('completed');
      }
      // Play sound and show notification
      playSound('timer');
      if (Notification.permission === 'granted') {
        new Notification(`🎯 ${countdown.label}`, {
          body: 'Your target time has been reached!',
          icon: 'icons/icon128.png'
        });
      }
    } else if (el) {
      const hours = Math.floor(remaining / 3600000);
      const minutes = Math.floor((remaining % 3600000) / 60000);
      const seconds = Math.floor((remaining % 60000) / 1000);
      el.querySelector('.countdown-remaining').textContent = 
        `${hours}h ${minutes}m ${seconds}s`;
    }
  });
  
  // Remove completed countdowns after a delay
  if (hasExpired) {
    setTimeout(() => {
      targetCountdowns = targetCountdowns.filter(c => c.targetTime > Date.now());
      chrome.storage.local.set({ targetCountdowns });
      renderActiveCountdowns();
    }, 5000);
  }
}

function renderActiveCountdowns() {
  const container = document.getElementById('active-countdowns');
  if (!container) return;
  
  if (targetCountdowns.length === 0) {
    container.innerHTML = '<p class="no-countdowns">No active countdowns</p>';
    return;
  }
  
  container.innerHTML = targetCountdowns.map(countdown => `
    <div class="countdown-item" id="countdown-${countdown.id}">
      <div class="countdown-info">
        <span class="countdown-label">${countdown.label}</span>
        <span class="countdown-target">${countdown.timeStr}</span>
      </div>
      <div class="countdown-remaining">Calculating...</div>
      <button class="countdown-remove" data-id="${countdown.id}">×</button>
    </div>
  `).join('');
  
  // Add remove listeners
  container.querySelectorAll('.countdown-remove').forEach(btn => {
    btn.addEventListener('click', (e) => {
      removeTargetCountdown(parseInt(e.target.dataset.id));
    });
  });
  
  // Immediately update
  updateAllCountdowns();
}

// ==================== INITIALIZE NEW FEATURES ====================
function initNewFeatures() {
  // Check for first-time user and show onboarding
  chrome.storage.local.get(['onboardingComplete'], (result) => {
    if (!result.onboardingComplete) {
      showOnboarding();
    }
  });
  
  // Request notification permission
  if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission();
  }
  
  // Load saved states (synced settings)
  chrome.storage.sync.get(['showAnalogClock', 'hourlyChimesEnabled', 'speakTimeEnabled'], (result) => {
    if (result.showAnalogClock) {
      showAnalogClock = true;
      addAnalogClocks();
    }
    if (result.hourlyChimesEnabled) {
      hourlyChimesEnabled = true;
    }
    if (result.speakTimeEnabled) {
      speakTimeEnabled = true;
    }
  });
  
  // Initialize target countdown feature
  initTargetCountdown();
  
  // Load alarms and profiles
  loadAlarms();
  loadProfiles();
  
  // Add sun times to cards
  addSunTimesToCards();
  
  // Add weather (mock data)
  addWeatherToCards();
  
  // Check for DST changes
  checkDSTChanges();
  
  // Set up intervals
  setInterval(checkAlarms, 60000); // Check alarms every minute
  setInterval(checkHourlyChime, 1000); // Check for hourly chime
  setInterval(updateAnalogClocks, 1000); // Update analog clocks
  
  // Stopwatch panel
  document.getElementById('stopwatch-btn')?.addEventListener('click', () => {
    document.getElementById('stopwatch-panel').classList.add('active');
  });
  document.getElementById('close-stopwatch')?.addEventListener('click', () => {
    document.getElementById('stopwatch-panel').classList.remove('active');
  });
  
  // Stopwatch tabs
  document.querySelectorAll('.stopwatch-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.stopwatch-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.stopwatch-view').forEach(v => v.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(`${tab.dataset.tab}-view`)?.classList.add('active');
    });
  });
  
  // Stopwatch controls
  document.getElementById('stopwatch-start')?.addEventListener('click', startStopwatch);
  document.getElementById('stopwatch-stop')?.addEventListener('click', stopStopwatch);
  document.getElementById('stopwatch-reset')?.addEventListener('click', resetStopwatch);
  document.getElementById('stopwatch-lap')?.addEventListener('click', addLap);
  
  // Timer controls
  document.getElementById('timer-start')?.addEventListener('click', startTimer);
  document.getElementById('timer-pause')?.addEventListener('click', pauseTimer);
  document.getElementById('timer-reset')?.addEventListener('click', resetTimer);
  
  // Timer inputs
  ['timer-hours', 'timer-minutes', 'timer-seconds'].forEach(id => {
    document.getElementById(id)?.addEventListener('change', setTimerFromInputs);
  });
  
  // Timer presets
  document.querySelectorAll('.timer-preset').forEach(btn => {
    btn.addEventListener('click', () => {
      const minutes = parseInt(btn.dataset.minutes);
      document.getElementById('timer-hours').value = Math.floor(minutes / 60);
      document.getElementById('timer-minutes').value = minutes % 60;
      document.getElementById('timer-seconds').value = 0;
      setTimerFromInputs();
    });
  });
  
  // Pomodoro controls
  document.getElementById('pomodoro-start')?.addEventListener('click', startPomodoro);
  document.getElementById('pomodoro-pause')?.addEventListener('click', pausePomodoro);
  document.getElementById('pomodoro-reset')?.addEventListener('click', resetPomodoro);
  document.getElementById('pomodoro-skip')?.addEventListener('click', skipPomodoro);
  
  // Pomodoro settings
  ['pomodoro-work', 'pomodoro-break', 'pomodoro-long-break'].forEach(id => {
    document.getElementById(id)?.addEventListener('change', () => {
      if (!pomodoroState.running) {
        resetPomodoro();
      }
    });
  });
  
  // Alarm panel
  document.getElementById('alarm-btn')?.addEventListener('click', () => {
    document.getElementById('alarm-panel').classList.add('active');
    populateAlarmTimezoneSelect();
  });
  document.getElementById('close-alarm')?.addEventListener('click', () => {
    document.getElementById('alarm-panel').classList.remove('active');
  });
  document.getElementById('add-alarm-btn')?.addEventListener('click', addAlarm);
  
  // Timeline panel
  document.getElementById('timeline-btn')?.addEventListener('click', () => {
    document.getElementById('timeline-panel').classList.add('active');
    timelineOffset = 0;
    renderTimeline();
  });
  document.getElementById('close-timeline')?.addEventListener('click', () => {
    document.getElementById('timeline-panel').classList.remove('active');
  });
  document.getElementById('timeline-prev')?.addEventListener('click', () => {
    timelineOffset--;
    renderTimeline();
  });
  document.getElementById('timeline-next')?.addEventListener('click', () => {
    timelineOffset++;
    renderTimeline();
  });
  
  // World map panel
  document.getElementById('worldmap-btn')?.addEventListener('click', () => {
    document.getElementById('worldmap-panel').classList.add('active');
    renderWorldMap();
  });
  document.getElementById('close-worldmap')?.addEventListener('click', () => {
    document.getElementById('worldmap-panel').classList.remove('active');
  });
  
  // Profiles panel
  document.getElementById('profiles-btn')?.addEventListener('click', () => {
    document.getElementById('profiles-panel').classList.add('active');
  });
  document.getElementById('close-profiles')?.addEventListener('click', () => {
    document.getElementById('profiles-panel').classList.remove('active');
  });
  document.getElementById('save-profile-btn')?.addEventListener('click', createProfile);
  
  // DST alert
  document.getElementById('dst-dismiss')?.addEventListener('click', () => {
    document.getElementById('dst-alert').style.display = 'none';
  });
  
  // Holidays panel
  document.getElementById('holidays-btn')?.addEventListener('click', () => {
    document.getElementById('holidays-panel').classList.add('active');
    renderHolidays('all');
  });
  document.getElementById('close-holidays')?.addEventListener('click', () => {
    document.getElementById('holidays-panel').classList.remove('active');
  });
  document.querySelectorAll('.holidays-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.holidays-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderHolidays(tab.dataset.region);
    });
  });
  
  // Settings toggles for new features
  document.getElementById('toggle-analog')?.addEventListener('change', (e) => {
    if (e.target.checked) {
      showAnalogClock = true;
      addAnalogClocks();
    } else {
      showAnalogClock = false;
      removeAnalogClocks();
    }
    chrome.storage.sync.set({ showAnalogClock });
  });
  
  document.getElementById('toggle-chimes')?.addEventListener('change', (e) => {
    hourlyChimesEnabled = e.target.checked;
    chrome.storage.sync.set({ hourlyChimesEnabled });
    showToast(hourlyChimesEnabled ? '🔔 Hourly chimes enabled' : '🔕 Hourly chimes disabled');
  });
  
  document.getElementById('toggle-speak-time')?.addEventListener('change', (e) => {
    speakTimeEnabled = e.target.checked;
    chrome.storage.sync.set({ speakTimeEnabled });
    showToast(speakTimeEnabled ? '🔊 Time announcement enabled' : '🔇 Time announcement disabled');
  });
  
  document.getElementById('toggle-weather')?.addEventListener('change', (e) => {
    if (e.target.checked) {
      addWeatherToCards();
    } else {
      document.querySelectorAll('.weather-info').forEach(el => el.remove());
    }
    chrome.storage.sync.set({ showWeather: e.target.checked });
  });
  
  document.getElementById('toggle-sun-times')?.addEventListener('change', (e) => {
    if (e.target.checked) {
      addSunTimesToCards();
    } else {
      document.querySelectorAll('.sun-times').forEach(el => el.remove());
    }
    chrome.storage.sync.set({ showSunTimes: e.target.checked });
  });
  
  // Load saved toggle states (synced settings)
  chrome.storage.sync.get(['showAnalogClock', 'hourlyChimesEnabled', 'speakTimeEnabled', 'showWeather', 'showSunTimes', 'badgeMode'], (result) => {
    if (result.showAnalogClock) {
      document.getElementById('toggle-analog').checked = true;
    }
    if (result.hourlyChimesEnabled) {
      document.getElementById('toggle-chimes').checked = true;
    }
    if (result.speakTimeEnabled) {
      document.getElementById('toggle-speak-time').checked = true;
    }
    if (result.showWeather !== false) {
      document.getElementById('toggle-weather').checked = true;
    }
    if (result.showSunTimes !== false) {
      document.getElementById('toggle-sun-times').checked = true;
    }
    if (result.badgeMode) {
      badgeMode = result.badgeMode;
    }
  });
  
  // Badge mode radio buttons
  document.querySelectorAll('input[name="badge-mode"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
      setBadgeMode(e.target.value);
    });
  });
  
  // Set initial badge mode from storage (synced)
  chrome.storage.sync.get(['badgeMode'], (result) => {
    if (result.badgeMode) {
      const radio = document.getElementById(`badge-${result.badgeMode}`);
      if (radio) radio.checked = true;
    }
  });
  
  // Update badge every minute
  updateBadge();
  setInterval(updateBadge, 60000);
}

function populateAlarmTimezoneSelect() {
  const select = document.getElementById('alarm-timezone');
  if (!select) return;
  
  select.innerHTML = '<option value="local">Local Time</option>';
  
  const allTimezones = [...Object.values(timezones), ...customTimezones];
  allTimezones.forEach(tz => {
    if (removedTimezones.includes(tz.cardId)) return;
    const option = document.createElement('option');
    option.value = tz.timezone;
    option.textContent = tz.name || tz.timezone;
    select.appendChild(option);
  });
}

// ==================== ONBOARDING ====================
function showOnboarding() {
  const modal = document.getElementById('onboarding-modal');
  if (modal) {
    modal.classList.add('active');
    
    const startBtn = document.getElementById('onboarding-start-btn');
    if (startBtn) {
      startBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        chrome.storage.local.set({ onboardingComplete: true });
        showToast('Welcome! Click any time to copy it.');
      });
    }
    
    // Also close on click outside
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        chrome.storage.local.set({ onboardingComplete: true });
      }
    });
  }
}

// ==================== DRAG AND DROP REORDERING ====================

let draggedCard = null;
let draggedCardId = null;

function initDragAndDrop() {
  const clockGrid = document.getElementById('clock-grid');
  
  // Make all clock cards draggable
  const cards = clockGrid.querySelectorAll('.clock-card');
  cards.forEach(card => {
    makeCardDraggable(card);
  });
  
  // Grid drop events
  clockGrid.addEventListener('dragover', handleDragOver);
  clockGrid.addEventListener('drop', handleDrop);
  clockGrid.addEventListener('dragleave', handleDragLeave);
}

function makeCardDraggable(card) {
  card.setAttribute('draggable', 'true');
  card.addEventListener('dragstart', handleDragStart);
  card.addEventListener('dragend', handleDragEnd);
  card.addEventListener('dragenter', handleDragEnter);
}

function handleDragStart(e) {
  draggedCard = this;
  draggedCardId = this.dataset.timezone;
  
  // Set drag data
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/plain', draggedCardId);
  
  // Add dragging class after a short delay to allow the drag image to be captured
  setTimeout(() => {
    this.classList.add('dragging');
  }, 0);
}

function handleDragEnd(e) {
  this.classList.remove('dragging');
  
  // Remove all drag-over states
  document.querySelectorAll('.clock-card').forEach(card => {
    card.classList.remove('drag-over', 'drag-over-left', 'drag-over-right');
  });
  
  draggedCard = null;
  draggedCardId = null;
}

function handleDragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
}

function handleDragEnter(e) {
  e.preventDefault();
  
  if (this === draggedCard) return;
  
  // Remove drag-over from all cards
  document.querySelectorAll('.clock-card').forEach(card => {
    card.classList.remove('drag-over', 'drag-over-left', 'drag-over-right');
  });
  
  // Add drag-over to this card
  this.classList.add('drag-over');
  
  // Determine if dragging to left or right
  const rect = this.getBoundingClientRect();
  const midpoint = rect.left + rect.width / 2;
  
  if (e.clientX < midpoint) {
    this.classList.add('drag-over-left');
  } else {
    this.classList.add('drag-over-right');
  }
}

function handleDragLeave(e) {
  // Only remove if we're actually leaving the card
  const relatedTarget = e.relatedTarget;
  if (!relatedTarget || !e.currentTarget.contains(relatedTarget)) {
    e.currentTarget.classList.remove('drag-over', 'drag-over-left', 'drag-over-right');
  }
}

function handleDrop(e) {
  e.preventDefault();
  
  const clockGrid = document.getElementById('clock-grid');
  const targetCard = e.target.closest('.clock-card');
  
  if (!targetCard || targetCard === draggedCard || !draggedCard) return;
  
  // Determine drop position (before or after target)
  const rect = targetCard.getBoundingClientRect();
  const midpoint = rect.left + rect.width / 2;
  const dropBefore = e.clientX < midpoint;
  
  // Move the card in the DOM
  if (dropBefore) {
    clockGrid.insertBefore(draggedCard, targetCard);
  } else {
    const nextSibling = targetCard.nextElementSibling;
    if (nextSibling) {
      clockGrid.insertBefore(draggedCard, nextSibling);
    } else {
      clockGrid.appendChild(draggedCard);
    }
  }
  
  // Remove drag states
  targetCard.classList.remove('drag-over', 'drag-over-left', 'drag-over-right');
  
  // Save the new order
  saveTimezoneOrder();
  
  // Show feedback
  showToast('Timezone order updated');
}

function saveTimezoneOrder() {
  const clockGrid = document.getElementById('clock-grid');
  const cards = clockGrid.querySelectorAll('.clock-card');
  
  timezoneOrder = Array.from(cards)
    .filter(card => card.style.display !== 'none')
    .map(card => card.dataset.timezone);
  
  saveSettings();
}

function applyTimezoneOrder() {
  if (!timezoneOrder || timezoneOrder.length === 0) return;
  
  const clockGrid = document.getElementById('clock-grid');
  const cards = Array.from(clockGrid.querySelectorAll('.clock-card'));
  
  // Create a map of cardId to card element
  const cardMap = {};
  cards.forEach(card => {
    cardMap[card.dataset.timezone] = card;
  });
  
  // Reorder cards according to saved order
  timezoneOrder.forEach(cardId => {
    const card = cardMap[cardId];
    if (card) {
      clockGrid.appendChild(card);
    }
  });
  
  // Append any cards not in the saved order (new cards)
  cards.forEach(card => {
    if (!timezoneOrder.includes(card.dataset.timezone)) {
      clockGrid.appendChild(card);
    }
  });
}

// Override renderCustomTimezone to make new cards draggable
const originalRenderCustomTimezone = renderCustomTimezone;
renderCustomTimezone = function(tzConfig) {
  originalRenderCustomTimezone(tzConfig);
  
  // Make the new card draggable
  const card = document.querySelector(`[data-timezone="${tzConfig.cardId}"]`);
  if (card) {
    makeCardDraggable(card);
  }
};

// Start when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    init();
    initNewFeatures();
    initDragAndDrop();
    // Apply saved order after a short delay to ensure all cards are rendered
    setTimeout(applyTimezoneOrder, 100);
  });
} else {
  init();
  initNewFeatures();
  initDragAndDrop();
  // Apply saved order after a short delay to ensure all cards are rendered
  setTimeout(applyTimezoneOrder, 100);
}
