document.addEventListener('DOMContentLoaded', () => {
    const citySelect = document.getElementById('citySelect');
    const prayerTimesList = document.getElementById('prayerTimes');
    const fetchButton = document.getElementById('fetchTimes');
    const notificationOffsetInput = document.getElementById('notificationOffset');

    // Load the previously selected city and prayer times from localStorage
    chrome.storage.local.get(['selectedCity', 'prayerTimes', 'notificationOffset'], (result) => {
        if (result.selectedCity) {
            citySelect.value = result.selectedCity;
        }
        if (result.prayerTimes) {
            displayPrayerTimes(result.prayerTimes);
        }
        if (result.notificationOffset !== undefined) {
            notificationOffsetInput.value = result.notificationOffset;
        }
    });

    // Event listener to fetch prayer times
    fetchButton.addEventListener('click', async function () {

        const notificationOffset = parseInt(notificationOffsetInput.value, 10);
        const today = new Date();
        const formattedDate = `${String(today.getDate()).padStart(2, '0')}-${String(today.getMonth() + 1).padStart(2, '0')}-${today.getFullYear()}`;
        const cityCountry = citySelect.value.split(',');
        const city = cityCountry[0];
        const country = cityCountry[1];
        const apiUrl = `https://api.aladhan.com/v1/timingsByCity/${formattedDate}?city=${city}&country=${country}`;


        chrome.storage.local.set({
            selectedCity: citySelect.value , 
            notificationOffset: notificationOffset
        }, () => {
            console.log('Saved city and offset to chrome.storage');
        });
        
        try {
            // Fetch prayer times from the API
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (data.code === 200) {
                const timings = data.data.timings;
                displayPrayerTimes(timings);

                chrome.storage.local.set({ prayerTimes: timings }, () => {
                    console.log('Saved prayer times to chrome.storage');
                });

                // Schedule notifications
                schedulePrayerNotifications(timings, notificationOffset);
            } else {
                prayerTimesList.innerHTML = `<li>Error fetching prayer times: ${data.data}</li>`;
            }
        } catch (error) {
            prayerTimesList.innerHTML = '<li>Error fetching prayer times. Please try again later.</li>';
        }
    });

    // Function to display prayer times
    function displayPrayerTimes(timings) {
        prayerTimesList.innerHTML = `
            <li>Fajr: ${timings.Fajr}</li>
            <li>Dhuhr: ${timings.Dhuhr}</li>
            <li>Asr: ${timings.Asr}</li>
            <li>Maghrib: ${timings.Maghrib}</li>
            <li>Isha: ${timings.Isha}</li>
        `;
    }

    function schedulePrayerNotifications(timings, offset) {
        chrome.alarms.clearAll(() => {
            const displayedPrayerTimes = Array.from(prayerTimesList.querySelectorAll('li')).map(li => li.textContent.split(':')[0].trim());
            const currentDate = new Date();

            displayedPrayerTimes.forEach((prayer) => {
                if (timings[prayer]) {
                    const [hours, minutes] = timings[prayer].split(':');
                    const prayerTime = new Date(currentDate);
                    prayerTime.setHours(hours);
                    prayerTime.setMinutes(minutes);
                    prayerTime.setSeconds(0);

                    prayerTime.setMinutes(prayerTime.getMinutes() + offset);

                    if (prayerTime > currentDate) {
                        const timeUntilPrayer = (prayerTime.getTime() - currentDate.getTime()) / 1000;
                        chrome.alarms.create(prayer, { delayInMinutes: timeUntilPrayer / 60 });
                        console.log(`Scheduled notification for ${prayer} at ${prayerTime.toLocaleTimeString()}`);
                    }
                }
            });
        });
    }
});
