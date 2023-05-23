import React, { useEffect, useState } from "react";
import LayoutDefault from "../../layouts/Default";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Api from "../../api";
import { toast } from "react-hot-toast";

const RolesCreate = () => {
	// title page
	document.title = "Create Role - NewsApp Administrator";

	// navigate
	const navigate = useNavigate();

	// define state for form
	const [name, setName] = useState("");
	const [permissionData, setPermissionData] = useState([]);
	const [errors, setErrors] = useState([]);

	// define state permissions
	const [permissions, setPermissions] = useState([]);

	// token from cookies
	const token = Cookies.get("token");

	// function fetchDataPermissions
	const fetchDataPermissions = async () => {
		await Api.get('/api/admin/permissions/all', {
			// headers
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
		.then(response => {
			// set data permission to state
			setPermissions(response.data.data);
		});
	}

	// useEffect
	useEffect(() => {
		fetchDataPermissions();
	}, []);

	// function handleCheckboxChange
	const handleCheckboxChange = async (e) => {
		// define data
		let data = permissionData;

		// push data on state
		data.push(e.target.value);

		// set data to state
		setPermissionData(data);
	}

	// function storeRole
	const storeRole = async (e) => {
		e.preventDefault();

		await Api.post('/api/admin/roles', {
			// data
			name: name,
			permissions: permissionData
		}, {
			// headers
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
		.then(response => {
			// show toast
			toast.success(response.data.message, {
				position: "top-right",
				duration: 4000
			});

			navigate('/roles');
		})
		.catch(error => {
			// set error message to state
			setErrors(error.response.data);
		});
	}

	return (
		<LayoutDefault>
			<div className="container-fluid mb-5 mt-5">
				<div className="row">
					<div className="col-md-12">
						<Link to="/roles" className="btn btn-md btn-tertiary border-0 shadow mb-3" type="button"><i className="fa fa-long-arrow-alt-left me-2"></i> Back</Link>
						<div className="card border-0 shadow">
							<div className="card-body">
								<h6><i className="fa fa-shield-alt"></i> Create Role</h6>
								<hr />
								<form onSubmit={storeRole}>
									<div className="mb-3">
										<label className="form-label fw-bold">Role Name</label>
										<input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter role name" />
									</div>
									{errors.name && (
										<div className="alert alert-danger">
											{errors.name[0]}
										</div>
									)}
									<hr />
									<div className="mb-3">
										<label className="fw-bold">Permissions</label>
										<br />
										{permissions.map((permission) => (
											<div className="form-check form-check-inline" key={Math.random()}>
												<input type="checkbox" className="form-check-input" value={permission.name} onChange={handleCheckboxChange} id={`check-${permission.id}`} />
												<label htmlFor={`check-${permission.id}`} className="form-check-label fw-normal">{permission.name}</label>
											</div>
										))}
										{errors.permissions && (
											<div className="alert alert-danger mt-2">
												{errors.permissions[0]}
											</div>
										)}
									</div>
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

export default RolesCreate;
