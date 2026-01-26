// Background script for World Clock Extension
// Handles badge updates, alarm notifications, context menus, and keyboard shortcuts

let badgeMode = 'none';
let alarms = [];

// Load settings on startup
chrome.storage.sync.get(['badgeMode'], (syncResult) => {
  chrome.storage.local.get(['alarms'], (localResult) => {
    if (syncResult.badgeMode) badgeMode = syncResult.badgeMode;
    if (localResult.alarms) alarms = localResult.alarms;
    updateBadge();
  });
});

// Listen for storage changes
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'sync' && changes.badgeMode) {
    badgeMode = changes.badgeMode.newValue;
    updateBadge();
  }
  if (namespace === 'local' && changes.alarms) {
    alarms = changes.alarms.newValue || [];
  }
});

// Context menu setup
chrome.runtime.onInstalled.addListener(() => {
  // Remove existing context menus
  chrome.contextMenus.removeAll(() => {
    // Create main menu
    chrome.contextMenus.create({
      id: 'world-clock-main',
      title: '🌏 World Clock',
      contexts: ['all']
    });
    
    // Quick time copy submenu
    chrome.contextMenus.create({
      id: 'copy-time-local',
      parentId: 'world-clock-main',
      title: '📋 Copy local time',
      contexts: ['all']
    });
    
    chrome.contextMenus.create({
      id: 'copy-time-est',
      parentId: 'world-clock-main',
      title: '📋 Copy EST time',
      contexts: ['all']
    });
    
    chrome.contextMenus.create({
      id: 'copy-time-pst',
      parentId: 'world-clock-main',
      title: '📋 Copy PST time',
      contexts: ['all']
    });
    
    chrome.contextMenus.create({
      id: 'copy-time-utc',
      parentId: 'world-clock-main',
      title: '📋 Copy UTC time',
      contexts: ['all']
    });
    
    chrome.contextMenus.create({
      id: 'separator-1',
      parentId: 'world-clock-main',
      type: 'separator',
      contexts: ['all']
    });
    
    chrome.contextMenus.create({
      id: 'open-stopwatch',
      parentId: 'world-clock-main',
      title: '⏱️ Open Stopwatch',
      contexts: ['all']
    });
    
    chrome.contextMenus.create({
      id: 'open-timer',
      parentId: 'world-clock-main',
      title: '⏲️ Open Timer',
      contexts: ['all']
    });
  });
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  const now = new Date();
  
  const formatTime = (date, options = {}) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
      ...options
    });
  };
  
  let timeString = '';
  
  switch (info.menuItemId) {
    case 'copy-time-local':
      timeString = formatTime(now);
      break;
    case 'copy-time-est':
      timeString = formatTime(now, { timeZone: 'America/New_York' }) + ' EST';
      break;
    case 'copy-time-pst':
      timeString = formatTime(now, { timeZone: 'America/Los_Angeles' }) + ' PST';
      break;
    case 'copy-time-utc':
      timeString = formatTime(now, { timeZone: 'UTC' }) + ' UTC';
      break;
    case 'open-stopwatch':
    case 'open-timer':
      // Open popup (user can navigate to feature)
      chrome.action.openPopup();
      return;
  }
  
  if (timeString && tab?.id) {
    // Copy to clipboard via content script
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: (text) => {
        navigator.clipboard.writeText(text).then(() => {
          // Show a brief notification
          const toast = document.createElement('div');
          toast.textContent = `Copied: ${text}`;
          toast.style.cssText = 'position:fixed;bottom:20px;right:20px;background:#333;color:#fff;padding:12px 20px;border-radius:8px;z-index:999999;font-family:system-ui;font-size:14px;box-shadow:0 4px 12px rgba(0,0,0,0.3);';
          document.body.appendChild(toast);
          setTimeout(() => toast.remove(), 2000);
        });
      },
      args: [timeString]
    }).catch(err => {
      console.log('Could not copy to clipboard:', err);
    });
  }
});

// Handle keyboard commands
chrome.commands.onCommand.addListener((command) => {
  if (command === 'quick-copy-time') {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
    
    // Get active tab and copy time
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          func: (text) => {
            navigator.clipboard.writeText(text).then(() => {
              const toast = document.createElement('div');
              toast.textContent = `⏰ Copied: ${text}`;
              toast.style.cssText = 'position:fixed;bottom:20px;right:20px;background:#667eea;color:#fff;padding:12px 20px;border-radius:8px;z-index:999999;font-family:system-ui;font-size:14px;box-shadow:0 4px 12px rgba(102,126,234,0.4);';
              document.body.appendChild(toast);
              setTimeout(() => toast.remove(), 2000);
            });
          },
          args: [timeString]
        }).catch(err => console.log('Could not copy:', err));
      }
    });
  }
});

// Update badge based on mode
function updateBadge() {
  if (badgeMode === 'none') {
    chrome.action.setBadgeText({ text: '' });
    return;
  }
  
  const now = new Date();
  
  switch (badgeMode) {
    case 'next-hour':
      const minutesLeft = 60 - now.getMinutes();
      chrome.action.setBadgeText({ text: `${minutesLeft}m` });
      chrome.action.setBadgeBackgroundColor({ color: '#667eea' });
      break;
    
    case 'time':
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const timeStr = `${hours}:${String(minutes).padStart(2, '0')}`;
      chrome.action.setBadgeText({ text: timeStr });
      chrome.action.setBadgeBackgroundColor({ color: '#22c55e' });
      break;
    
    case 'countdown':
      const endOfDay = new Date(now);
      endOfDay.setHours(17, 0, 0, 0);
      if (now > endOfDay) {
        chrome.action.setBadgeText({ text: '✓' });
      } else {
        const hoursLeft = Math.floor((endOfDay - now) / (1000 * 60 * 60));
        chrome.action.setBadgeText({ text: `${hoursLeft}h` });
      }
      chrome.action.setBadgeBackgroundColor({ color: '#f59e0b' });
      break;
  }
}

// Check alarms
function checkAlarms() {
  const now = new Date();
  const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  const currentDay = now.getDay();
  
  alarms.forEach(alarm => {
    if (!alarm.enabled) return;
    if (alarm.time !== currentTime) return;
    if (alarm.repeat && alarm.days.length > 0 && !alarm.days.includes(currentDay)) return;
    
    // Trigger notification
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'icons/icon128.png',
      title: `⏰ ${alarm.label}`,
      message: `It's ${alarm.time}`,
      priority: 2,
      requireInteraction: true
    });
    
    // Disable non-repeating alarms
    if (!alarm.repeat) {
      alarm.enabled = false;
      chrome.storage.local.set({ alarms });
    }
  });
}

// Update badge every minute
setInterval(updateBadge, 60000);

// Check alarms every minute
setInterval(checkAlarms, 60000);

// Initial update
updateBadge();


