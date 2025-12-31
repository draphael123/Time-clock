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

// Settings state
let settings = {
  hour24: false,
  showSeconds: true,
  showOffset: false,
  showDifference: false,
  darkMode: false,
  compactMode: false
};

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
    const result = await chrome.storage.local.get(['settings']);
    if (result.settings) {
      settings = { ...settings, ...result.settings };
      applySettings();
    }
  } catch (error) {
    console.error('Error loading settings:', error);
  }
}

// Save settings to storage
async function saveSettings() {
  try {
    await chrome.storage.local.set({ settings });
    applySettings();
  } catch (error) {
    console.error('Error saving settings:', error);
  }
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
