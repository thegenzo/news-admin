import React, { useState } from "react";
import LayoutDefault from "../../layouts/Default";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Api from "../../api";
import { toast } from "react-hot-toast";

const CategoriesCreate = () => {
	// title page
	document.title = "Create category - NewsApp Administrator";

	// navigate
	const navigate = useNavigate();

	// define state form
	const [image, setImage] = useState("");
	const [name, setName] = useState("");
	const [errors, setErrors] = useState([]);

	// token from cookies
	const token = Cookies.get("token");

	// function storeCategory
	const storeCategory = async (e) => {
		e.preventDefault();

		// define formData
		const formData = new FormData();

		// append data to formData
		formData.append('image', image);
		formData.append('name', name);

		// sending data
		await Api.post('/api/admin/categories', formData, {
			// headers
			headers: {
				'Authorization': `Bearer ${token}`,
				'Content-Type': 'multipart/form-data'
			}
		})
		.then(response => {

			// show success notification
			toast.success(response.data.message, {
				position: "top-right",
				duration: 4000
			});

			// navigate
			navigate('/categories');
		})
		.catch(error => {
			setErrors(error.response.data);
		});
	}
	return (
		<LayoutDefault>
			<div className="container-fluid mb-5 mt-5">
				<div className="row">
					<div className="col-md-12">
						<Link to="/categories" className="btn btn-md btn-tertiary border-0 shadow mb-3" type="button">
							<i className="fa fa-long-arrow-alt-left me-2"></i> Back
						</Link>
						<div className="card border-0 shadow">
							<div className="card-body">
								<h6><i className="fa fa-folder"></i> Create category</h6>
								<hr />
								<form onSubmit={storeCategory}>
									<div className="mb-3">
										<label className="form-label fw-bold">Image</label>
										<input type="file" className="form-control" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
									</div>
									{errors.image && (
										<div className="alert alert-danger">
											{errors.image[0]}
										</div>
									)}
									<div className="mb-3">
										<label className="form-label fw-bold">Category name</label>
										<input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter category name" />
									</div>
									{errors.name && (
										<div className="alert alert-danger">
											{errors.name[0]}
										</div>
									)}

									<div>
										<button type="submit" className="btn btn-md btn-tertiary me-2"><i className="fa fa-save"></i> Save</button>
										<button type="reset" className="btn btn-md btn-warning"><i className="fa fa-redo"></i> Reset</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</LayoutDefault>
	);
};

export default CategoriesCreate;
