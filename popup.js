/* document.getElementById('fetchTimes').addEventListener('click', async function () {
    const city = document.getElementById('cityInput').value.trim();
    const country = document.getElementById('countryInput').value.trim();
    const prayerTimesList = document.getElementById('prayerTimes');

    // Clear previous results
    prayerTimesList.innerHTML = '';

    if (!city || !country) {
        prayerTimesList.innerHTML = '<li>Please enter both city and country.</li>';
        return;
    }

    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];

    // API URL
    const apiUrl = `https://api.aladhan.com/v1/timingsByCity/${today}?city=${city}&country=${country}&method=2`;

    try {
        // Fetch prayer times from the API
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.code === 200) {
            const timings = data.data.timings;

            // Display prayer times
            prayerTimesList.innerHTML = `
                <li>Fajr: ${timings.Fajr}</li>
                <li>Dhuhr: ${timings.Dhuhr}</li>
                <li>Asr: ${timings.Asr}</li>
                <li>Maghrib: ${timings.Maghrib}</li>
                <li>Isha: ${timings.Isha}</li>
            `;
        } else {
            prayerTimesList.innerHTML = `<li>${data.data}</li>`;
        }
    } catch (error) {
        prayerTimesList.innerHTML = '<li>Error fetching prayer times. Please try again later.</li>';
    }
});
 */
/* document.addEventListener('DOMContentLoaded', () => {
    const citySelect = document.getElementById('citySelect');
    const prayerTimesList = document.getElementById('prayerTimes');
    const fetchButton = document.getElementById('fetchTimes');

    // Load the previously selected city and prayer times from localStorage
    const savedCity = localStorage.getItem('selectedCity');
    const savedPrayerTimes = JSON.parse(localStorage.getItem('prayerTimes'));

    if (savedCity) {
        citySelect.value = savedCity;
    }

    if (savedPrayerTimes) {
        displayPrayerTimes(savedPrayerTimes);
    }

    // Event listener to fetch prayer times
    fetchButton.addEventListener('click', async function () {
        const city = citySelect.value;
        const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
        const apiUrl = `https://api.aladhan.com/v1/timingsByCity/${today}?city=${city}&country=auto&method=2`;

        // Save the selected city to localStorage
        localStorage.setItem('selectedCity', city);

        try {
            // Fetch prayer times from the API
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (data.code === 200) {
                const timings = data.data.timings;
                displayPrayerTimes(timings);
                // Save prayer times to localStorage
                localStorage.setItem('prayerTimes', JSON.stringify(timings));
                schedulePrayerNotifications(timings);

                // Display prayer times

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

    function schedulePrayerNotifications(timings) {
        chrome.alarms.clearAll(() => {
            const prayerNames = Object.keys(timings);
            const currentDate = new Date();

            prayerNames.forEach((prayer) => {
                const [hours, minutes] = timings[prayer].split(':');
                const prayerTime = new Date(currentDate);
                prayerTime.setHours(hours);
                prayerTime.setMinutes(minutes);
                prayerTime.setSeconds(0);

                if (prayerTime > currentDate) {
                    const timeUntilPrayer = (prayerTime.getTime() - currentDate.getTime()) / 1000;
                    chrome.alarms.create(prayer, { delayInMinutes: timeUntilPrayer / 60 });
                }
            });
        });
    }
}); */

/* document.addEventListener('DOMContentLoaded', () => {
    const citySelect = document.getElementById('citySelect');
    const prayerTimesList = document.getElementById('prayerTimes');
    const fetchButton = document.getElementById('fetchTimes');

    const savedCity = localStorage.getItem('selectedCity');
    if (savedCity) {
        citySelect.value = savedCity;
    }

    fetchButton.addEventListener('click', async function () {
        const city = citySelect.value;
        const today = new Date().toISOString().split('T')[0];
        const apiUrl = `https://api.aladhan.com/v1/timingsByCity/${today}?city=${city}&country=auto&method=2`;

        localStorage.setItem('selectedCity', city);

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (data.code === 200) {
                const timings = data.data.timings;
                displayPrayerTimes(timings);
                localStorage.setItem('prayerTimes', JSON.stringify(timings));
                schedulePrayerNotifications(timings);
            } else {
                prayerTimesList.innerHTML = `<li>Error fetching prayer times: ${data.data}</li>`;
            }
        } catch (error) {
            prayerTimesList.innerHTML = '<li>Error fetching prayer times. Please try again later.</li>';
        }
    });

    function displayPrayerTimes(timings) {
        prayerTimesList.innerHTML = `
            <li>Fajr: ${timings.Fajr}</li>
            <li>Dhuhr: ${timings.Dhuhr}</li>
            <li>Asr: ${timings.Asr}</li>
            <li>Maghrib: ${timings.Maghrib}</li>
            <li>Isha: ${timings.Isha}</li>
        `;
    }

    function schedulePrayerNotifications(timings) {
        chrome.alarms.clearAll(() => {
            const prayerNames = Object.keys(timings);
            const currentDate = new Date();

            prayerNames.forEach((prayer) => {
                const [hours, minutes] = timings[prayer].split(':');
                const prayerTime = new Date(currentDate);
                prayerTime.setHours(hours);
                prayerTime.setMinutes(minutes);
                prayerTime.setSeconds(0);

                if (prayerTime > currentDate) {
                    const timeUntilPrayer = (prayerTime.getTime() - currentDate.getTime()) / 1000;
                    chrome.alarms.create(prayer, { delayInMinutes: timeUntilPrayer / 60 });
                }
            });
        });
    }
});

 */


document.addEventListener('DOMContentLoaded', () => {
    const citySelect = document.getElementById('citySelect');
    const prayerTimesList = document.getElementById('prayerTimes');
    const fetchButton = document.getElementById('fetchTimes');
    const notificationOffsetInput = document.getElementById('notificationOffset');

    // Load the previously selected city and prayer times from localStorage
    const savedCity = localStorage.getItem('selectedCity');
    const savedPrayerTimes = JSON.parse(localStorage.getItem('prayerTimes'));
    const savedOffset = parseInt(localStorage.getItem('notificationOffset'), 10) || -15; // Default offset: -15 minutes

    if (savedCity) {
        citySelect.value = savedCity;
    }

    if (savedPrayerTimes) {
        displayPrayerTimes(savedPrayerTimes);
    }

    // Set saved offset
    notificationOffsetInput.value = savedOffset;

    // Event listener to fetch prayer times
    fetchButton.addEventListener('click', async function () {
        const city = citySelect.value;
        const notificationOffset = parseInt(notificationOffsetInput.value, 10);
        console.log('Notification Offest:', notificationOffset);
        const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
        console.log('Today:', today);
        const apiUrl = `https://api.aladhan.com/v1/timingsByCity/${today}?city=${city}&country=auto&method=2`;

        // Save the selected city and offset to localStorage
        localStorage.setItem('selectedCity', city);
        console.log('Selected City:', city);
        localStorage.setItem('notificationOffset', notificationOffset);

        try {
            // Fetch prayer times from the API
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (data.code === 200) {
                const timings = data.data.timings;
                displayPrayerTimes(timings);

                // Save prayer times to localStorage
                localStorage.setItem('prayerTimes', JSON.stringify(timings));

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

    // Function to schedule prayer notifications
    function schedulePrayerNotifications(timings, offset) {
        chrome.alarms.clearAll(() => {
            const prayerNames = Object.keys(timings);
            const currentDate = new Date();

            prayerNames.forEach((prayer) => {
                const [hours, minutes] = timings[prayer].split(':');
                const prayerTime = new Date(currentDate);
                prayerTime.setHours(hours);
                prayerTime.setMinutes(minutes);
                prayerTime.setSeconds(0);

/*                 console.log('Original ${prayer} time:', prayerTime.toLocaleTimeString()); */

                // Apply the offset
                prayerTime.setMinutes(prayerTime.getMinutes() + offset);

/*                 console.log('Adjusted ${prayer} time:', prayerTime.toLocaleTimeString()); */

                if (prayerTime > currentDate) {
                    const timeUntilPrayer = (prayerTime.getTime() - currentDate.getTime()) / 1000;
                    chrome.alarms.create(prayer, { delayInMinutes: timeUntilPrayer / 60 });
/*                     console.log(`Scheduled alarm for ${prayer} at ${prayerTime.toLocaleTimeString()}`); */
                }
            });
        });
    }
});
