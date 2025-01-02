chrome.alarms.onAlarm.addListener((alarm) => {
    const prayerName = alarm.name; // The alarm name corresponds to the prayer name

    chrome.notifications.create(prayerName, {
        type: 'basic',
        iconUrl: 'Salah.png', 
        title: 'Prayer Reminder',
        message: `It's time for ${prayerName}.`,
        priority: 2,
    });
});

// Debugging: Log when alarms are created
chrome.alarms.onAlarm.addListener((alarm) => {
    console.log(`Alarm triggered for ${alarm.name}`);
});
