// Timezone configurations
const timezones = {
  est: {
    timezone: 'America/New_York',
    elementId: 'est-time',
    dateId: 'est-date'
  },
  pst: {
    timezone: 'America/Los_Angeles',
    elementId: 'pst-time',
    dateId: 'pst-date'
  },
  brazil: {
    timezone: 'America/Sao_Paulo',
    elementId: 'brazil-time',
    dateId: 'brazil-date'
  },
  italy: {
    timezone: 'Europe/Rome',
    elementId: 'italy-time',
    dateId: 'italy-date'
  }
};

// Update time for a specific timezone
function updateTimezone(tzConfig) {
  try {
    const now = new Date();
    
    // Create formatters for time and date
    const timeFormatter = new Intl.DateTimeFormat('en-US', {
      timeZone: tzConfig.timezone,
      hour12: true,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
    
    const dateFormatter = new Intl.DateTimeFormat('en-US', {
      timeZone: tzConfig.timezone,
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
    
    // Format time with better AM/PM visibility
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
    
    const timeString = `${hours}:${minutes}:${seconds} ${dayPeriod}`;
    const dateString = dateFormatter.format(now);
    
    const timeDisplay = document.getElementById(tzConfig.elementId);
    const dateDisplay = document.getElementById(tzConfig.dateId);
    
    if (timeDisplay) {
      // Split time and AM/PM for better styling
      const [timePart, period] = timeString.split(' ');
      timeDisplay.innerHTML = period 
        ? `<span class="time-value">${timePart}</span> <span class="time-period">${period}</span>`
        : timeString || '--:--:--';
    }
    
    if (dateDisplay) {
      dateDisplay.textContent = dateString || '--';
    }
  } catch (error) {
    console.error(`Error updating ${tzConfig.timezone}:`, error);
  }
}

// Update all timezones
function updateAllClocks() {
  Object.values(timezones).forEach(updateTimezone);
}

// Initialize and start updating
function init() {
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

