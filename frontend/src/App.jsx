import Navbar from "./components/Navbar";

import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";

import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import { useThemeStore } from "./store/useThemeStore";
import { useEffect } from "react";

import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";

const App = () => {
	const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();
	const { theme } = useThemeStore();

	console.log({ onlineUsers });

	useEffect(() => {
		checkAuth();
	}, [checkAuth]);

	useEffect(() => {
		document.documentElement.setAttribute("data-theme", theme);
		document.body.setAttribute("data-theme", theme);
	}, [theme]);

	console.log({ authUser });

	if (isCheckingAuth && !authUser)
		return (
			<div className="flex items-center justify-center h-screen">
				<Loader className="size-10 animate-spin" />
			</div>
		);

	return (
		<div data-theme={theme}>
			<Navbar />

			<Routes>
				<Route
					path="/"
					element={authUser ? <HomePage /> : <Navigate to="/auth" />}
				/>
				<Route
					path="/signup"
					element={<Navigate to="/auth" />}
				/>
				<Route
					path="/login"
					element={<Navigate to="/auth" />}
				/>
				<Route
					path="/auth"
					element={!authUser ? <AuthPage /> : <Navigate to="/" />}
				/>
				<Route path="/settings" element={<SettingsPage />} />
				<Route
					path="/profile"
					element={authUser ? <ProfilePage /> : <Navigate to="/auth" />}
				/>
			</Routes>

			<Toaster />
		</div>
	);
};
export default App;
