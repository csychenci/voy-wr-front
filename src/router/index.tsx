import React, { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

const Layout = lazy(() => import("@/layout"));

export default function Router() {
	return (
		<Routes>
			<Route path="/" element={<Layout />} />
		</Routes>
	);
}
