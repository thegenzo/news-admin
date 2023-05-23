import React, { useEffect, useState } from "react";
// layout
import LayoutDefault from "../../layouts/Default";
import Cookies from "js-cookie";
import Api from "../../api";
import Pagination from "../../components/Pagination";

const PermissionIndex = () => {
	// title page
	document.title = "Permissions - NewsApp Administrator"

	// define state "permissions"
	const [permissions, setPermissions] = useState([]);

	// define state "pagination"
	const [pagination, setPagination] = useState({
		currentPage: 0,
		perPage: 0,
		total: 0
	});

	// define state keywords
	const [keywords, setKeywords] = useState("");

	// token from cookies
	const token = Cookies.get("token");

	// fetchData function
	const fetchData = async (pageNumber=1, keywords="") => {
		// define variable page
		const page = pageNumber ? pageNumber : pagination.currentPage;

		await Api.get(`/api/admin/permissions?search=${keywords}&page=${page}`, {
			// header
			headers: {
				// header bearer + token
				Authorization: `Bearer ${token}`
			}
		})
		.then(response => {
			// set data response to state categories
			setPermissions(response.data.data.data);

			// set data response to state pagination
			setPagination(() => ({
				currentPage: response.data.data.current_page,
				perPage: response.data.data.per_page,
				total: response.data.data.total
			}));
		})
	}

	// useEffect for calling the function when the page is loaded
	useEffect(() => {
		fetchData();
	}, [])

	// function searchData
	const searchData = async (e) => {
		// set value to state keywords
		setKeywords(e.target.value);

		// call method fetchData
		fetchData(1, e.target.value);
	}

	return (
		<LayoutDefault>
			<div className="container-fluid mb-5 mt-5">
				<div className="row">
					<div className="col-md-8">
						<div className="row">
							<div className="col-md-9 col-12 mb-2">
								<div className="input-group">
									<input type="text" className="form-control border-0 shadow" onChange={(e) => searchData(e)} placeholder="Search here..." />
									<span className="input-group-text border-0 shadow">
										<i className="fa fa-search"></i>
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="row mt-1">
					<div className="col-md-12">
						<div className="card border-0 shadow">
							<div className="card-body">
								<div className="table-responsive">
									<table className="table table-bordered table-centered table-nowrap mb-0 rounded">
										<thead className="thead-dark">
											<tr className="border-0">
												<th className="border-0" style={{ width: '5%' }}>No.</th>
												<th className="border-0">Permission name</th>
											</tr>
										</thead>
										<tbody>
											{/** check if permission data exist */}
											{permissions.length > 0 ? 
												// looping permissions with map method
												permissions.map((permission, index) => (
													<tr key={index}>
														<td className="fw-bold text-center">{++index + (pagination.currentPage - 1) * pagination.perPage}</td>
														<td>{permission.name}</td>
													</tr>
												))
												// display message data is not available
												: 
												<tr>
													<td colSpan={2}>
														<div className="alert alert-danger border-0 rounded shadow-sm w-100" role="alert">
															Data is not available
														</div>
													</td>
												</tr>
											}
										</tbody>
									</table>
								</div>
								{/** Pagination */}
								<Pagination
									currentPage={pagination.currentPage}
									perPage={pagination.perPage}
									total={pagination.total}
									onChange={(pageNumber) => fetchData(pageNumber, keywords)}
									position="end"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</LayoutDefault>
	);
};

export default PermissionIndex;
