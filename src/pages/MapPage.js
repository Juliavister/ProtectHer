//MAP PAGE
import React, { useEffect, useState, useRef } from "react";
import L, { marker } from "leaflet";
import "leaflet/dist/leaflet.css";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "/Users/juliavister/my-react-app/src/Custom.css";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";
import { render } from "@testing-library/react";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

function MapPage() {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [watchId, setWatchId] = useState(null);
  const [addingDangerZone, setAddingDangerZone] = useState(false);
  const mapRef = useRef(null);

  useEffect(() => {
    if (!map) {
      const leafletMap = L.map("map").setView([0, 0], 13); // Set initial view
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(leafletMap);
      setMap(leafletMap);
      mapRef.current = leafletMap;
    }
  }, [map]);

  const shareLocation = () => {
    if (navigator.geolocation) {
      const newWatchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          if (mapRef.current) {
            mapRef.current.setView(
              [latitude, longitude],
              mapRef.current.getZoom()
            );

            if (marker) {
              mapRef.current.removeLayer(marker);
            }

            const newMarker = L.marker([latitude, longitude]).addTo(
              mapRef.current
            );
            setMarker(newMarker);
            //newMarker.bindPopup("My position").openPopup();
          }

          /*if (map) {
            map.setView([latitude, longitude], map.getZoom());

            if (marker) {
              map.removeLayer(marker);
            }

            const newMarker = L.marker([latitude, longitude]).addTo(map);
            setMarker(newMarker);
          }  */
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
      setWatchId(newWatchId);
    } else {
      console.error("Geolocation is not supported by your browser.");
    }
  };

  /*useEffect(() => {
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId);
      setWatchId(null);
      alert("Successfully stopped sharing location.");
    }
  }, [watchId]); */

  /*useEffect(() => {
    if (map && marker) {
      map.addLayer(marker);
      map.setView(marker.getLatLng(), 13);
      return () => {
        map.removeLayer(marker);
      };
    }
  }, [map, marker]); */

  /*const stopShareLocation = () => {
    try {
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
        setWatchId(null);
        if (map && marker) {
          map.removeLayer(marker);
          setMarker(null);
        }
        alert("Successfully stopped sharing location.");
      }
    } catch (error) {
      console.error("Error while stopping location sharing:", error);
    }
  }; */

  const stopShareLocation = () => {
    if (watchId) {
      navigator.geolocation.clearWatch(watchId);
      setWatchId(null);
      mapRef.current.removeLayer(marker);
    }
    alert("Successfully stopped sharing location.");
  };

  const handleAddDangerZoneClick = () => {
    if (!addingDangerZone) {
      Swal.fire({
        title: "Add Danger Zone",
        html:
          '<input id="swal-input-title" class="swal2-input" placeholder="Title">' +
          '<input id="swal-input-description" class="swal2-input" placeholder="Description">',
        showCancelButton: true,
        confirmButtonText: "Add",
        showLoaderOnConfirm: true,
        preConfirm: () => {
          const title = document.getElementById("swal-input-title").value;
          const description = document.getElementById(
            "swal-input-description"
          ).value;
          return [title, description];
        },
      }).then((result) => {
        if (result.isConfirmed) {
          const [title, description] = result.value;

          console.log("Title:", title);
          console.log("Description:", description);

          setAddingDangerZone(true);

          let circle;

          const onMapClick = (e) => {
            console.log("Map clicked at:", e);
            circle = L.circle(e.latlng, {
              color: "red",
              fillColor: "#f03",
              fillOpacity: 0.5,
              radius: 500,
            }).addTo(mapRef.current);

            circle.bindTooltip(title).openTooltip();
          };

          mapRef.current.on("click", onMapClick);

          setTimeout(() => {
            setAddingDangerZone(false);
            mapRef.current.off("click", onMapClick);
            console.log("Danger zone added:");
          }, 1000);
        }
      });
    }
  };

  return (
    <div style={{ height: "400px", width: "100%" }}>
      <h1>ProtectHer interactive map</h1>
      <div id="map" style={{ height: "80vh", width: "80wh" }}></div>

      <button id="shareLocation" onClick={shareLocation}>
        Share Location
      </button>
      <button id="stopLocation" onClick={stopShareLocation}>
        Stop Sharing Location
      </button>
      <button id="addDangerZone" onClick={handleAddDangerZoneClick}>
        Add Danger Zone
      </button>
    </div>
  );
}

export default MapPage;
