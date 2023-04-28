import React, { useState, useEffect } from "react";
import { YMaps, Map, Placemark } from "react-yandex-maps";
const API_KEY = "617bcf03-6f80-4905-807b-5902f024d834";

export default function Maps({ value }) {
  const [coordinates, setCoordinates] = useState([55.751574, 38.573856]);

  useEffect(() => {
    const url = `https://geocode-maps.yandex.ru/1.x/?apikey=${API_KEY}&lang=en_US&geocode=${value}&format=json`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const { pos } =
          data.response.GeoObjectCollection.featureMember[0].GeoObject.Point;
        const [lng, lat] = pos.split(" ");
        setCoordinates([lat, lng]);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [value]);

  return (
    <>
      {value && (
        <div>
          <YMaps>
            <Map
              className="map"
              defaultState={{
                center: coordinates,
                zoom: 17,
              }}
              options={{
                suppressMapOpenBlock: true,
              }}
            >
              <Placemark geometry={coordinates} />
            </Map>
          </YMaps>
        </div>
      )}
    </>
  );
}
