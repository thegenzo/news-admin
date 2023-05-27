import React from "react";
import LayoutDefault from "../../layouts/Default";
import { Link } from "react-router-dom";

const Forbidden = () => {
	return (
		<LayoutDefault>
			<div className="container-fluid mb-5 mt-5">
				<div className="row">
					<div className="col-12 col-sm-12 col-xl-12 mb-4">
						<div className="card border-0 shadow">
							<div className="card-body text-center">
								<img src="/assets/images/no-touch.png" className="mt-5 mb-3" width="200" />
								<h2>Access Denied!</h2>
								<Link to="/dashboard" className="btn btn-md btn-tertiary mt-3"><i className="fa fa-long-arrow-alt-left me-2"></i> Back to Dashboard</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</LayoutDefault>
	);
};

export default Forbidden;
