if('serviceWorker' in navigator) {window.addEventListener('load', () => {navigator.serviceWorker.register('/SuperViaApp/sw.js', { scope: '/SuperViaApp/' })})}