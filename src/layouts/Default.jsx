import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const LayoutDefault = ({ children }) => {
	return (
		<>
			<nav className="navbar navbar-dark navbar-theme-primary px-4 col-12 d-lg-none">
				<a href="/" className="navbar-brand me-lg-5">
					<img src="" alt="" className="navbar-brand-dark" />
					<img src="" alt="" className="navbar-brand-light" />
				</a>
				<div className="d-flex align-items-center">
					<button className="navbar-toggler d-lg-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-aria-label="Toggle Navigation">
						<span className="navbar-toggle-icon"></span>
					</button>
				</div>
			</nav>

			{/** sidebar */}
			<Sidebar />

			<main className="content">
				{/** navbar */}
				<Navbar />

				{/** children */}
				{children}
			</main>
		</>
	);
};

export default LayoutDefault;
