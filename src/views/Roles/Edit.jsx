import React, { useEffect, useState } from "react";
import LayoutDefault from "../../layouts/Default";
import { Link, useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import Api from "../../api";
import { toast } from "react-hot-toast";

const RolesEdit = () => {
	// title page
	document.title = "Edit Role - NewsApp Administrator";

	// navigate
	const navigate = useNavigate();

	// get id from params
	const { id } = useParams()

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

	//function "fetchDataRole"
	const fetchDataRole = async () => {
		await Api.get(`/api/admin/roles/${id}`, {
				//header
				headers: {
						//header Bearer + Token
						Authorization: `Bearer ${token}`,
				}
		})
		.then(response => {
				//set response data to state
				setName(response.data.data.name);
				setPermissionData(response.data.data.permissions.map(obj => obj.name));
		});
	}

	// useEffect
	useEffect(() => {
		fetchDataPermissions();
		fetchDataRole();
	}, []);

	// function handleCheckboxChange
	const handleCheckboxChange = (e) => {

		// define data
		let data = permissionData;

		// check item already exists, if so, remove with filter
		if (data.some((name) => name === e.target.value)) {
				data = data.filter((name) => name !== e.target.value);
		} else {

				//push new item to array
				data.push(e.target.value);
		}

		// set data to state
		setPermissionData(data);
}
	// function updateRole
	const updateRole = async (e) => {
		e.preventDefault();

		await Api.put(`/api/admin/roles/${id}`, {
			// data
			name: name,
			permissions: permissionData
		}, {
			// header
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

			// redirect
			navigate('/roles');
		})
		.catch(error => {
			// set error message to state error
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
								<h6><i className="fa fa-shield-alt"></i> Edit Role</h6>
								<hr />
								<form onSubmit={updateRole}>
									<div className="mb-3">
										<label className="form-label fw-bold">Role name</label>
										<input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter role name" />
									</div>
									{errors.name && (
										<div className="alert alert-danger">
											{errors.name[0]}
										</div>
									)}

									<div className="mb-3">
										<label className="fw-bold">Permissions</label>
										<br />
										{permissions.map(permission => (
											<div className="form-check form-check-inline" key={Math.random()}>
												<input type="checkbox" className="form-check-input" value={permission.name} defaultChecked={permissionData.some((name) => name === permission.name ?? true)} onChange={handleCheckboxChange} id={`check-${permission.id}`} />
												<label htmlFor={`check-${permission.id}`} className="form-check-label fw-normal">{permission.name}</label>
											</div>
										))}
										{errors.permission && (
											<div className="alert alert-danger">
												{errors.permissions[0]}
											</div>
										)}
									</div>
									<div>
										<button type="submit" className="btn btn-md btn-tertiary me-2"><i className="fa fa-save"></i> Update</button>
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

export default RolesEdit;
