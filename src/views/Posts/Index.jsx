import React, { useEffect, useState } from "react";
import LayoutDefault from "../../layouts/Default";
import Cookies from "js-cookie";
import Api from "../../api";
import hasAnyPermissions from "../../utils/Permissions";
import { Link } from "react-router-dom";
import Pagination from "../../components/Pagination";

//import CSS react-confirm-alert
import 'react-confirm-alert/src/react-confirm-alert.css';
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-hot-toast";

const PostsIndex = () => {
	// title page
	document.title = "Posts - NewsApp Administrator";

	// define state posts
	const [posts, setPosts] = useState([]);

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

	const fetchData = async (pageNumber = 1, keywords = "") => {
		// define variable page
		const page = pageNumber ? pageNumber : pagination.currentPage;

		await Api.get(`/api/admin/posts?search=${keywords}&page=${page}`, {
			// header
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
		.then(response => {
			setPosts(response.data.data.data);

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
		// set value to keywords
		setKeywords(e.target.value);

		// call function fetchData
		fetchData(1, e.target.value);
	}

	// function deletePost
	const deletePost = (id) => {
		// show confirm alert
		confirmAlert({
			title: 'Are you sure?',
			message: 'want to delete this data?',
			buttons: [{
				label: 'Yes',
				onClick: async () => {
					await Api.delete(`/api/admin/posts/${id}`, {
						// headers
						headers: {
							Authorization: `Bearer ${token}`
						}
					})
					.then(response => {
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
					<div className="col-mb-8">
						<div className="row">
							{hasAnyPermissions(['posts.create']) && (
								<div className="col-md-3 col-12 mb-2">
									<Link to="/posts/create" className="btn btn-md btn-tertiary border-0 shadow w-100" type="button">
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
														<th className="border-0">Title</th>
														<th className="border-0" style={{ width: '15%' }}>Category</th>
														<th className="border-0" style={{ width: '5%' }}>Views</th>
														<th className="border-0" style={{ width: '15%' }}>Actions</th>
													</tr>
												</thead>
												<tbody>
													{/** check if data exists */}
													{posts.length > 0 ? (
														// looping posts data with map method
														posts.map((post, index) => (
															<tr key={index}>
																<td className="fw-bold text-center">{++index + (pagination.currentPage - 1) * (pagination.perPage)}</td>
																<td>{post.title}</td>
																<td>{post.category.name}</td>
																<td className="fw-bold text-center">{post.views_count}</td>
																<td className="text-center">
																	{hasAnyPermissions(['posts.edit']) && (
																		<Link to={`/posts/edit/${post.id}`} className="btn btn-primary btn-sm me-2">
																			<i className="fa fa-pencil-alt"></i>
																		</Link>
																	)}
																	{hasAnyPermissions(['posts.delete']) && (
																		<button onClick={() => deletePost(post.id)} className="btn btn-sm btn-danger">
																			<i className="fa fa-trash"></i>
																		</button>
																	)}
																</td>
															</tr>
														))
													) : (
														// display data is empty
														<tr>
															<td colSpan={5}>
																<div className="alert alert-danger border-0 rounded shadow-sm w-100" role="alert">
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

export default PostsIndex;
