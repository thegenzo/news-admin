import React from 'react'

const Loader = () => {
	return (
		<div className='d-flex justify-content-center'>
			<div className="row">
				<div className="spinner-border" role='status' style={{ width: '3rem', height: '3rem', position: 'absolute', left: '50%', right: '50%'}}>
					<span className="sr-only">
						Loading...
					</span>
				</div>
			</div>
		</div>
	)
}

export default Loader