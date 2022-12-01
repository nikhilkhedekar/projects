import { useEffect, useState } from "react";
import Map, { useMap, Marker, Popup } from "react-map-gl";

const StoreLocations = ({ getAllStoresList }) => {
    const MAPBOX_TOKEN = "pk.eyJ1IjoibmlraGlsa2hlZGVrYXIiLCJhIjoiY2w5czE1ZGZ4MDdiZTN2cDBvemo0YjBqeSJ9.ZOMYJhoJ1YWj2JbfhQI3qg";
    const [showPopup, setShowPopup] = useState(true);
    return (
        <Map
            id="storeLocations"
            initialViewState={{
                latitude: 19.18871,
                longitude: 72.84741,
                zoom: 10
            }}
            mapStyle="mapbox://styles/mapbox/streets-v9"
            mapboxAccessToken={MAPBOX_TOKEN}
        >
            {
                getAllStoresList && getAllStoresList.stores && getAllStoresList.stores.map((stores, i) => {
                    return (
                        <div key={stores._id} >
                            <Marker longitude={stores.location.coordinates[0]} latitude={stores.location.coordinates[1]} color="red" />
                            <>
                                {
                                    showPopup && (
                                        <Popup
                                            longitude={stores.location.coordinates[0]}
                                            latitude={stores.location.coordinates[1]}
                                            anchor="right"
                                            onClose={() => setShowPopup(false)}>
                                            <div >
                                                {stores.storeId}
                                            </div>
                                        </Popup>
                                    )
                                }
                            </>
                        </div>
                    )
                })
            }
        </Map>
    )
}

export default StoreLocations