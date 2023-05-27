import React, { useEffect, useState } from "react";
import LayoutDefault from "../../layouts/Default";
import Cookies from "js-cookie";
import Api from "../../api";
import hasAnyPermissions from "../../utils/Permissions";
import Pagination from "../../components/Pagination";
import SlidersCreate from "./Create";

//import CSS react-confirm-alert
import 'react-confirm-alert/src/react-confirm-alert.css';
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-hot-toast";


const SlidersIndex = () => {
	// title page
	document.title = "Sliders - NewsApp Administrator";

	// define state
	const [sliders, setSliders] = useState([]);
	const [pagination, setPagination] = useState({
		currentPage: 0,
		perPage: 0,
		total: 0
	});

	// token from cookies
	const token = Cookies.get("token");

	const fetchData = async (pageNumber = 1) => {
		// define variable page
		const page = pageNumber ? pageNumber : pagination.currentPage;

		await Api.get(`/api/admin/sliders?page=${page}`, {
			// header
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
		.then(response => {
			setSliders(response.data.data.data);

			setPagination({
				currentPage: response.data.data.current_page,
				perPage: response.data.data.per_page,
				total: response.data.data.total
			});
		})
	}

	// useEffect
	useEffect(() => {
		fetchData();
	}, []);

	const deleteSlider = (id) => {
		confirmAlert({
			title: 'Are you sure?',
			message: 'want to delete this data?',
			buttons: [{
				label: 'Yes',
				onClick: async () => {
					await Api.delete(`/api/admin/sliders/${id}`, {
						// headers
						headers: {
							Authorization: `Bearer ${token}`
						}
					})
					.then(response => {
						toast.success(response.data.message, {
							position: "top-right",
							duration: 4000
						});

						// fetch data
						fetchData();
					});
				}
			}, {
				label: 'No',
				onClick: () => {}
			}]
		})
	}


	return (
		<LayoutDefault>
			<div className="container-fluid mb-5 mt-5">
				<div className="row mb-4">
					<div className="col-md-12">
						{hasAnyPermissions(['sliders.create']) && (
							<SlidersCreate fetchData={fetchData} />
						)}
					</div>
				</div>
				<div className="row mt-1">
					<div className="col-md-12">
						<div className="card border-0 shadow">
							<div className="card-body">
								<div className="table-responsive">
									<table className="table table-bordered table-centered mb-0 rounded">
										<thead className="thead-dark">
											<tr className="border-0">
												<th className="border-0" style={{ width: '5%' }}>No.</th>
												<th className="border-0">Image</th>
												<th className="border-0">Link</th>
												<th className="border-0" style={{ width: '15%' }}>Actions</th>
											</tr>
										</thead>
										<tbody>
											{/** check if sliders data exist */}
											{sliders.length > 0 ? (
												sliders.map((data, index) => (
													<tr key={index}>
														<td className="fw-bold text-center">{++index + (pagination.currentPage - 1) * pagination.perPage}</td>
														<td className="text-center">
															<img src={data.image} width={70} />
														</td>
														<td>{data.link}</td>
														<td className="text-center">
															{hasAnyPermissions(['sliders.delete']) && (
																<button onClick={() => deleteSlider(data.id)} className="btn btn-sm btn-danger">
																	<i className="fa fa-trash"></i>
																</button>
															)}
														</td>
													</tr>
												))
											) : (
												<tr>
													<td colSpan={4}>
														<div className="alert alert-danger border-0 rounded shadow-sm w-100">
															Data is empty
														</div>
													</td>
												</tr>
											)}
										</tbody>
									</table>
								</div>
								<Pagination 
									currentPage={pagination.currentPage}
									perPage={pagination.perPage}
									total={pagination.total}
									onChange={(pageNumber) => fetchData(pageNumber, keywords)}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</LayoutDefault>
	);
};

export default SlidersIndex;
