// Enhanced features for World Clock Extension

// Popular timezones list for search
const popularTimezones = [
  { name: 'London', timezone: 'Europe/London', flag: '🇬🇧' },
  { name: 'Tokyo', timezone: 'Asia/Tokyo', flag: '🇯🇵' },
  { name: 'Sydney', timezone: 'Australia/Sydney', flag: '🇦🇺' },
  { name: 'New York', timezone: 'America/New_York', flag: '🇺🇸' },
  { name: 'Los Angeles', timezone: 'America/Los_Angeles', flag: '🇺🇸' },
  { name: 'Chicago', timezone: 'America/Chicago', flag: '🇺🇸' },
  { name: 'Denver', timezone: 'America/Denver', flag: '🇺🇸' },
  { name: 'Toronto', timezone: 'America/Toronto', flag: '🇨🇦' },
  { name: 'Vancouver', timezone: 'America/Vancouver', flag: '🇨🇦' },
  { name: 'Mexico City', timezone: 'America/Mexico_City', flag: '🇲🇽' },
  { name: 'São Paulo', timezone: 'America/Sao_Paulo', flag: '🇧🇷' },
  { name: 'Buenos Aires', timezone: 'America/Buenos_Aires', flag: '🇦🇷' },
  { name: 'Paris', timezone: 'Europe/Paris', flag: '🇫🇷' },
  { name: 'Berlin', timezone: 'Europe/Berlin', flag: '🇩🇪' },
  { name: 'Madrid', timezone: 'Europe/Madrid', flag: '🇪🇸' },
  { name: 'Rome', timezone: 'Europe/Rome', flag: '🇮🇹' },
  { name: 'Moscow', timezone: 'Europe/Moscow', flag: '🇷🇺' },
  { name: 'Dubai', timezone: 'Asia/Dubai', flag: '🇦🇪' },
  { name: 'Mumbai', timezone: 'Asia/Kolkata', flag: '🇮🇳' },
  { name: 'Singapore', timezone: 'Asia/Singapore', flag: '🇸🇬' },
  { name: 'Hong Kong', timezone: 'Asia/Hong_Kong', flag: '🇭🇰' },
  { name: 'Seoul', timezone: 'Asia/Seoul', flag: '🇰🇷' },
  { name: 'Beijing', timezone: 'Asia/Shanghai', flag: '🇨🇳' },
  { name: 'Auckland', timezone: 'Pacific/Auckland', flag: '🇳🇿' }
];

// Enhanced settings with new features
let enhancedSettings = {
  ...settings,
  customTimezones: [],
  alarms: [],
  timezonePresets: {
    work: ['America/New_York', 'America/Los_Angeles'],
    family: ['America/Sao_Paulo', 'Europe/Rome'],
    global: ['America/New_York', 'America/Los_Angeles', 'America/Sao_Paulo', 'Europe/Rome']
  },
  activePreset: 'global'
};

// Enhanced error handling
function handleError(error, context) {
  console.error(`Error in ${context}:`, error);
  showToast(`Error: ${error.message || 'Something went wrong'}`);
  
  // Try to recover gracefully
  try {
    updateAllClocks();
  } catch (recoveryError) {
    console.error('Recovery failed:', recoveryError);
  }
}

// Timezone search functionality
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
    
    enhancedSettings.customTimezones.push(customTz);
    saveEnhancedSettings();
    renderCustomTimezone(customTz);
    showToast(`Added ${timezoneConfig.name}`);
    return customTz;
  } catch (error) {
    handleError(error, 'addCustomTimezone');
    return null;
  }
}

// Remove custom timezone
function removeCustomTimezone(timezoneId) {
  try {
    enhancedSettings.customTimezones = enhancedSettings.customTimezones.filter(
      tz => tz.id !== timezoneId
    );
    saveEnhancedSettings();
    const card = document.querySelector(`[data-timezone="${timezoneId}"]`);
    if (card) {
      card.remove();
    }
    showToast('Timezone removed');
  } catch (error) {
    handleError(error, 'removeCustomTimezone');
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
  card.addEventListener('click', async () => {
    const timeDisplay = document.getElementById(tzConfig.elementId);
    const dateDisplay = document.getElementById(tzConfig.dateId);
    const timeText = timeDisplay.textContent;
    const dateText = dateDisplay.textContent;
    const fullText = `${tzConfig.name}: ${timeText} ${dateText}`;
    await copyToClipboard(fullText);
  });
  
  // Remove button
  card.querySelector('.remove-timezone').addEventListener('click', (e) => {
    e.stopPropagation();
    removeCustomTimezone(tzConfig.cardId);
  });
  
  // Update this timezone
  updateTimezone(tzConfig);
}

// Alarm functionality
function addAlarm(timezone, time, label) {
  try {
    const alarm = {
      id: `alarm-${Date.now()}`,
      timezone,
      time, // Format: "HH:MM"
      label: label || 'Alarm',
      enabled: true
    };
    
    enhancedSettings.alarms.push(alarm);
    saveEnhancedSettings();
    checkAlarms();
    showToast(`Alarm set for ${time}`);
    return alarm;
  } catch (error) {
    handleError(error, 'addAlarm');
    return null;
  }
}

function removeAlarm(alarmId) {
  try {
    enhancedSettings.alarms = enhancedSettings.alarms.filter(
      a => a.id !== alarmId
    );
    saveEnhancedSettings();
    showToast('Alarm removed');
  } catch (error) {
    handleError(error, 'removeAlarm');
  }
}

function checkAlarms() {
  try {
    const now = new Date();
    enhancedSettings.alarms.forEach(alarm => {
      if (!alarm.enabled) return;
      
      const tzTime = now.toLocaleString('en-US', {
        timeZone: alarm.timezone,
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });
      
      if (tzTime === alarm.time) {
        // Trigger alarm
        chrome.notifications.create({
          type: 'basic',
          iconUrl: 'icons/icon48.png',
          title: 'World Clock Alarm',
          message: `${alarm.label} - ${alarm.timezone}`
        });
        
        // Disable after triggering (one-time alarm)
        alarm.enabled = false;
        saveEnhancedSettings();
      }
    });
  } catch (error) {
    handleError(error, 'checkAlarms');
  }
}

// Meeting time converter
function convertMeetingTime(inputTime, inputTimezone, outputTimezones) {
  try {
    const [hours, minutes] = inputTime.split(':').map(Number);
    const today = new Date();
    const inputDate = new Date(today);
    inputDate.setHours(hours, minutes, 0, 0);
    
    const results = {};
    outputTimezones.forEach(tz => {
      const converted = inputDate.toLocaleString('en-US', {
        timeZone: tz,
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
      results[tz] = converted;
    });
    
    return results;
  } catch (error) {
    handleError(error, 'convertMeetingTime');
    return {};
  }
}

// Export/share times
async function exportTimes(format = 'text') {
  try {
    const now = new Date();
    const allTimezones = [...Object.values(timezones), ...enhancedSettings.customTimezones];
    
    let exportText = 'World Clock Times\n';
    exportText += '==================\n\n';
    
    allTimezones.forEach(tzConfig => {
      const time = now.toLocaleString('en-US', {
        timeZone: tzConfig.timezone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      });
      const date = now.toLocaleString('en-US', {
        timeZone: tzConfig.timezone,
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      });
      exportText += `${tzConfig.name || tzConfig.timezone}: ${time} ${date}\n`;
    });
    
    if (format === 'text') {
      await copyToClipboard(exportText);
      showToast('Times copied to clipboard!');
    } else {
      // Could generate image here
      showToast('Image export coming soon!');
    }
    
    return exportText;
  } catch (error) {
    handleError(error, 'exportTimes');
    return '';
  }
}

// Update badge on extension icon
function updateBadge() {
  try {
    const now = new Date();
    const estTime = now.toLocaleString('en-US', {
      timeZone: 'America/New_York',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
    
    chrome.action.setBadgeText({ text: estTime.split(':')[0] });
    chrome.action.setBadgeBackgroundColor({ color: '#667eea' });
  } catch (error) {
    // Badge API might not be available
    console.log('Badge update not available');
  }
}

// Performance optimization - throttle updates
let updateThrottle = null;
function throttledUpdate() {
  if (updateThrottle) return;
  
  updateThrottle = setTimeout(() => {
    updateAllClocks();
    updateThrottle = null;
  }, 100);
}

// Save enhanced settings
async function saveEnhancedSettings() {
  try {
    await chrome.storage.local.set({ 
      settings,
      enhancedSettings 
    });
  } catch (error) {
    handleError(error, 'saveEnhancedSettings');
  }
}

// Load enhanced settings
async function loadEnhancedSettings() {
  try {
    const result = await chrome.storage.local.get(['enhancedSettings']);
    if (result.enhancedSettings) {
      enhancedSettings = { ...enhancedSettings, ...result.enhancedSettings };
    }
    
    // Render custom timezones
    enhancedSettings.customTimezones.forEach(renderCustomTimezone);
    
    // Start alarm checking
    setInterval(checkAlarms, 60000); // Check every minute
    
    // Update badge periodically
    updateBadge();
    setInterval(updateBadge, 60000); // Update every minute
  } catch (error) {
    handleError(error, 'loadEnhancedSettings');
  }
}

// Export functions for use in main popup.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    popularTimezones,
    searchTimezones,
    addCustomTimezone,
    removeCustomTimezone,
    addAlarm,
    removeAlarm,
    convertMeetingTime,
    exportTimes,
    updateBadge,
    handleError,
    enhancedSettings
  };
}

