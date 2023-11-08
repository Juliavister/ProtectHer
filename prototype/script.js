// script.js


let longitude;
let latitude;
let watchId; // Declare watchId outside the event listeners

document.addEventListener("DOMContentLoaded", function () {
    const locationElement = document.getElementById('location');
    const shareLocationButton = document.getElementById('shareLocation');
    const stopShareLocationButton = document.getElementById('stopLocation');
    const addDangerZoneButton = document.getElementById('addDangerZone');
    const map = L.map('map');
    let marker; // Declare marker here so it can be accessed in both functions

    if (navigator.geolocation) {
        shareLocationButton.addEventListener('click', function () {
            watchId = navigator.geolocation.watchPosition(function (position) {
                latitude = position.coords.latitude;
                longitude = position.coords.longitude;
                locationElement.textContent = `Latitude: ${latitude}, Longitude: ${longitude}`;
                map.setView([latitude, longitude], 15);
                L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    maxZoom: 100,
                    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                }).addTo(map);
                // Check if a marker exists and remove it before adding a new one
                if (marker) {
                    map.removeLayer(marker);
                }
                marker = L.marker([latitude, longitude]).addTo(map);
            }, function (error) {
                locationElement.textContent = `Error getting location: ${error.message}`;
            });
        });


        stopShareLocationButton.addEventListener('click', function () {
            navigator.geolocation.clearWatch(watchId);
            latitude = null;
            longitude = null;
            map.removeLayer(marker); // Remove the marker from the map
            marker = null;
            alert('You have stopped sharing your location')
        });

        var addingDangerZone = false;
        addDangerZoneButton.addEventListener('click', function () {
            if (!addingDangerZone) {
                Swal.fire({
                    title: 'Add Danger Zone',
                    html:
                        '<input id="swal-input-title" class="swal2-input" placeholder="Title">' +
                        '<input id="swal-input-description" class="swal2-input" placeholder="Description">',
                    showCancelButton: true,
                    confirmButtonText: 'Add',
                    showLoaderOnConfirm: true,
                    preConfirm: () => {
                        const title = document.getElementById('swal-input-title').value;
                        const description = document.getElementById('swal-input-description').value;
                        return [title, description];
                    },
                }).then((result) => {
                    if (result.isConfirmed) {
                        const [title, description] = result.value;
                        // Use the title and description as needed
                        console.log('Title:', title);
                        console.log('Description:', description);
                        addingDangerZone = true;
                        var circle;
                        function onMapClick(e) {
                            circle = L.circle(e.latlng, {
                                color: 'red',
                                fillColor: '#f03',
                                fillOpacity: 0.5,
                                radius: 500,
                            }).addTo(map);
                            circle.bindTooltip(title).openTooltip(); // Use the title
                        }
                        map.on('click', onMapClick);
                        setTimeout(function () {
                            addingDangerZone = false;
                            map.off('click', onMapClick);
                        }, 1000);
                    }
                });
            }
        });


        // Initialize button states
    } else {
        locationElement.textContent = 'Geolocation is not supported by your browser.';
    }



});
