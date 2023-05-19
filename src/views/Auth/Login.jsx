import React, { useState } from 'react'

// import API
import Api from '../../api'

// import js cookie
import Cookies from 'js-cookie'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const Login = () => {

	// title page
	document.title = 'Login - NewsApp Administrator'

	// navigate
	const navigate = useNavigate()

	// definisi state
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	// define state errors
	const [errors, setErrors] = useState([])

	// method login
	const login = async (e) => {
		e.preventDefault()

		await Api.post('/api/login', {
			//data
			email: email,
			password: password
		})
			.then(response => {
				// set token to cookies
				Cookies.set('token', response.data.token)

				// set user to cookies
				Cookies.set('user', JSON.stringify(response.data.user))

				// set permission to cookies
				Cookies.set('permissions', JSON.stringify(response.data.permissions))

				// show toast
				toast.success('Login successfully!', {
					position: 'top-right',
					duration: 4000
				})

				// redirect to dashboard page
				navigate('/dashboard')
			})
			.catch(error => {
				// set response error to state
				setErrors(error.response.data)
			})
	}

	// check if cookie already exists
	if(Cookies.get('token')) {
		// redirect dashboard page
		navigate('/dashboard')
	}

	return (
		<div className='login-page bg-light'>
			<div className="container">
				<div className="row">
					<div className="col-lg-10 offset-lg-1" style={{ marginTop: '120px'}}>
						<div className="bg-white shadow rounded">
							<div className="row">
								<div className="col-md-7 pe-0">
									<div className="form-left h-100 py-5 px-5">
										{errors.message && (
											<div className="alert alert-danger">
												{errors.message}
											</div>
										)}
										<form onSubmit={login} className="row g-4">
											<div className="col-12">
												<label>Email Address</label>
												<div className="input-group">
													<div className="input-group-text"><i className="fa fa-envelope"></i></div>
													<input type="text" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter email address' />
												</div>
												{errors.mail && (
													<div className="alert alert-danger mt-2">
														{errors.mail[0]}
													</div>
												)}
											</div>
											<div className="col-12">
												<label>Password</label>
												<div className="input-group">
													<div className="input-group-text"><i className="fa fa-lock"></i></div>
													<input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter password' />
												</div>
												{errors.password && (
													<div className="alert alert-danger mt-2">
														{errors.password[0]}
													</div>
												)}
											</div>
											<div className="col-sm-6 col-6">
												<div className="form-check">
													<input type="checkbox" id="inlineFormCheck" className="form-check-input" />
													<label htmlFor="inlineFormCheck" className="form-check-label">Remember me</label>
												</div>
											</div>
											<div className="col-sm-6 col-6">
												<button type="submit" className="btn btn-tertiary px-4 float-end">LOGIN</button>
											</div>
										</form>
									</div>
								</div>
								<div className="col-md-5 ps-0 d-none d-md-block">
									<div className="form-right h-100 bg-tertiary text-white text-center pt-5">
										<img src="/assets/images/reading.png" width="150" className="mb-3" />
										<h5 className="fs-3">NEWSAPP ADMIN</h5>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Login