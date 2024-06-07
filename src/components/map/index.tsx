import mapboxgl from "mapbox-gl";
import style from "./index.module.less";
import { forwardRef, useEffect, useRef } from "react";
import { MapProps } from "./type";
import React from "react";

console.log("style", style);

const Map = forwardRef<{}, MapProps>(({ className }, ref) => {
	const mapContainer = useRef<HTMLDivElement>(null);
	const mapbox = useRef<mapboxgl.Map>(null);
	const init = () => {
		mapbox.current = new mapboxgl.Map({
			container: mapContainer.current,
			style: "mapbox://styles/mapbox/streets-v11",
			// style: "mapbox://styles/voyagecentury2018/cln1634sd003g01rc1alr5qmp",
			accessToken:
				"pk.eyJ1Ijoidm95YWdlY2VudHVyeTIwMTgiLCJhIjoiY2xmOTM0NDJyMXV1MjQwb2NrNzFvZWJ3dSJ9.zyBT0Gd6HYyeywftD_XKtg",
			center: { lng: 174.7265625, lat: 29.305561325527698 },
			zoom: 1.2
		});
	};

	useEffect(() => {
		if (!mapbox.current) {
			init();
		}
		return () => {
			mapbox.current?.remove();
		};
	}, []);

	return <div ref={mapContainer} className={style["base-map"]}></div>;
});

export default Map;
