import React, { useEffect, useState } from "react";
import LayoutDefault from "../../layouts/Default";
import Api from "../../api";
import Cookies from "js-cookie";
import hasAnyPermissions from "../../utils/Permissions";
import { Link } from "react-router-dom";
import Pagination from "../../components/Pagination";

//import CSS react-confirm-alert
import 'react-confirm-alert/src/react-confirm-alert.css';
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-hot-toast";

const CategoriesIndex = () => {
	// title page
	document.title = "Categories - NewsApp Administrator";

	// define state categories
	const [categories, setCategories] = useState([]);

	// define state pagination
	const [pagination, setPagination] = useState({
		currentPage: 0,
		perPage: 0,
		total: 0
	});

	// define state keywords
	const [keywords, setKeywords] = useState("");

	// token from cookies
	const token = Cookies.get("token");

	// function fetchData
	const fetchData = async (pageNumber = 1, keywords = "") => {
		// define variable page
		const page = pageNumber ? pageNumber : pagination.currentPage

		await Api.get(`/api/admin/categories?search=${keywords}&page=${page}`, {
			// header
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
		.then(response => {
			setCategories(response.data.data.data);

			setPagination(() => ({
				currentPage: response.data.data.current_page,
				perPage: response.data.data.per_page,
				total: response.data.data.total
			}));
		})
	}

	// useEffect
	useEffect(() => {
		fetchData();
	}, []);

	// function searchData
	const searchData = async (e) => {

		// set value to state keywords
		setKeywords(e.target.value);

		// call function fetchData
		fetchData(1, e.target.value)
	}

	const deleteCategory = (id) => {
		// show confirm alert
		confirmAlert({
			title: 'Are you sure?',
			message: 'want to delete this data?',
			buttons: [{
				label: 'Yes',
				onClick: async () => {
					await Api.delete(`/api/admin/categories/${id}`, {
						// headers
						Authorization: `Bearer ${token}`
					})
					.then(response => {
						// show toast
						toast.success(response.data.message, {
							position: "top-right",
							duration: 4000
						})

						// call function fetchData
						fetchData();
					})
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
				<div className="row">
					<div className="col-md-8">
						<div className="row">
							{hasAnyPermissions(['categories.create']) && (
								<div className="col-md-3 col-12 mb-2">
									<Link to='/categories/create' className="btn btn-md btn-tertiary border-0 shadow w-100" type="button">
										<i className="fa fa-plus-circle"></i> Add new
									</Link>
								</div>
							)}
							<div className="col-md-9 col-12 mb-2">
								<div className="input-group">
									<input type="text" className="form-control border-0 shadow" onChange={(e) => searchData(e)} placeholder="Search here..." />
									<span className="input-group-text border-0 shadow">
										<i className="fa fa-search"></i>
									</span>
								</div>
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
														<th className="border-0">Category name</th>
														<th className="border-0" style={{ width: '15%' }}>Actions</th>
													</tr>
												</thead>
												<tbody>
													{/** check if data exists */}
													{categories.length > 0 ? (
														// looping categories data with map method
														categories.map((category, index) => (
															<tr key={index}>
																<td className="fw-bold text-center">{++index + (pagination.currentPage - 1) * pagination.perPage}</td>
																<td className="text-center">
																	<img src={category.image} width="70" />
																</td>
																<td>{category.name}</td>
																<td className="text-center">
																	{hasAnyPermissions(['categories.edit']) && (
																		<Link to={`/categories/edit/${category.id}`} className="btn btn-sm btn-primary me-2">
																			<i className="fa fa-pencil-alt"></i>
																		</Link>
																	)}
																	{hasAnyPermissions(['categories.delete']) && (
																		<button onClick={() => deleteCategory(category.id)} className="btn btn-sm btn-danger">
																			<i className="fa fa-trash"></i>
																		</button>
																	)}
																</td>
															</tr>
														))
													) : (
														// show message data is empty
														<tr>
															<td colSpan={4}>
																<div className="alert alert-danger border-0 rounded shadow-sm w-100">
																	Data is empty!
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
											position="end"
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</LayoutDefault>
	);
};

export default CategoriesIndex;
