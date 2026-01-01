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
  compactMode: false
};

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

// Load settings from storage
async function loadSettings() {
  try {
    const result = await chrome.storage.local.get(['settings', 'customTimezones']);
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

// Save settings to storage
async function saveSettings() {
  try {
    await chrome.storage.local.set({ settings, customTimezones });
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
  
  // Apply compact mode
  const clockGrid = document.getElementById('clock-grid');
  if (settings.compactMode) {
    clockGrid.classList.add('compact');
  } else {
    clockGrid.classList.remove('compact');
  }
  
  // Update checkboxes
  document.getElementById('toggle-24hour').checked = settings.hour24;
  document.getElementById('toggle-seconds').checked = settings.showSeconds;
  document.getElementById('toggle-offset').checked = settings.showOffset;
  document.getElementById('toggle-difference').checked = settings.showDifference;
  
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

// Initialize event listeners
function initEventListeners() {
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
  
  // Compact mode toggle
  document.getElementById('compact-mode-btn').addEventListener('click', () => {
    settings.compactMode = !settings.compactMode;
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
  
  // Copy to clipboard on card click
  Object.values(timezones).forEach((tzConfig, index) => {
    const card = document.querySelector(`[data-timezone="${tzConfig.cardId}"]`);
    if (card) {
      card.addEventListener('click', async () => {
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
      case 'c':
        if (!e.ctrlKey && !e.metaKey) {
          e.preventDefault();
          settings.compactMode = !settings.compactMode;
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
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.trim();
    const results = searchTimezones(query);
    displayTimezoneResults(results);
  });
  
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

// Initialize and start updating
async function init() {
  // Show loading
  showLoading();
  
  // Load settings
  await loadSettings();
  
  // Initialize event listeners
  initEventListeners();
  
  // Initial update
  updateAllClocks();
  
  // Update every second
  setInterval(updateAllClocks, 1000);
}

// Start when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
