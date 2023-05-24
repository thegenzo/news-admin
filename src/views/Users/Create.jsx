import React, { useEffect, useState } from "react";
import LayoutDefault from "../../layouts/Default";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Api from "../../api";
import { toast } from "react-hot-toast";

const UsersCreate = () => {
	// title page
	document.title = "Create user - NewsApp Administrator";

	// navigate
	const navigate = useNavigate();

	// define state for form
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirmation, setPasswordConfirmation] = useState("");
	const [rolesData, setRolesData] = useState([]);
	const [errors, setErrors] = useState([]);

	// define state roles
	const [roles, setRoles] = useState([]);

	// token from cookies
	const token = Cookies.get("token");

	// function fetch data roles
	const fetchDataRoles = async () => {
		await Api.get('/api/admin/roles/all', {
			// header
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
		.then(response => {
			// set response to data roles
			setRoles(response.data.data);
		})
	}

	// useEffect
	useEffect(() => {
		fetchDataRoles();
	}, [])

	// function handleCheckboxClick
	const handleCheckboxClick = async (e) => {
		// define data
		let data = rolesData;

		// push data on state
		data.push(e.target.value);

		setRolesData(data);
	}

	// function storeUser
	const storeUser = async (e) => {
		e.preventDefault();

		// sending data
		await Api.post('/api/admin/users', {
			// data
			name: name,
			email: email,
			password: password,
			password_confirmation: passwordConfirmation,
			roles: rolesData
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

			// redirect
			navigate('/users');
		})
		.catch(error => {
			setErrors(error.response.data);
		})
	}
	return (
		<LayoutDefault>
			<div className="container-fluid mb-5 mt-5">
				<div className="row">
					<div className="col-md-12">
						<Link to="/users" className="btn btn-md btn-tertiary border-0 shadow mb-3" type="button">
							<i className="fa fa-long-arrow-alt-left me-2"></i> Back
						</Link>
						<div className="card border-0 shadow">
							<div className="card-body">
								<h6>
									<i className="fa fa-user"></i> Create user
								</h6>
								<form onSubmit={storeUser}>
									<div className="row">
										<div className="col-md-6">
											<div className="mb-3">
												<label className="form-label fw-bold">Full name</label>
												<input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter full name" />
											</div>
											{errors.name && (
												<div className="alert alert-danger">
													{errors.name[0]}
												</div>
											)}
										</div>
										<div className="col-md-6">
											<div className="mb-3">
												<label className="form-label fw-bold">Email</label>
												<input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
											</div>
											{errors.email && (
												<div className="alert alert-danger">
													{errors.email[0]}
												</div>
											)}
										</div>
									</div>
									<div className="row">
										<div className="col-md-6">
											<div className="mb-3">
												<label className="form-label fw-bold">Password</label>
												<input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" />
											</div>
											{errors.password && (
												<div className="alert alert-danger">
													{errors.password[0]}
												</div>
											)}
										</div>
										<div className="col-md-6">
											<div className="mb-3">
												<label className="form-label fw-bold">Password confirmation</label>
												<input type="password" className="form-control" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} placeholder="Enter password confirmation" />
											</div>
											{errors.passwordConfirmation && (
												<div className="alert alert-danger">
													{errors.passwordConfirmation[0]}
												</div>
											)}
										</div>
									</div>
									<hr />
									<div className="mb-3">
										<label className="fw-bold">Roles</label>
										<br />
										{roles.map((role) => (
											<div className="form-check form-check-inline" key={Math.random()}>
												<input type="checkbox" className="form-check-input" value={role.name} onChange={handleCheckboxClick} id={`id-${role.id}`} />
												<label htmlFor={`id-${role.id}`} className="form-check-label fw-normal">{role.name}</label>
											</div>
										))}
										{errors.roles && (
											<div className="alert alert-danger mt-2">
												{errors.roles[0]}
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

export default UsersCreate;
