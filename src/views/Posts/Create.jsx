import React, { useEffect, useState } from "react";
import LayoutDefault from "../../layouts/Default";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { editorState } from "../../store";
import Cookies from "js-cookie";
import Api from "../../api";
import { toast } from "react-hot-toast";
import Editor from "../../components/Editor";

const PostsCreate = () => {
	// title page
	document.title = "Create post - NewsApp Administrator";

	// navigate
	const navigate = useNavigate();

	// define state for form
	const [image, setImage] = useState("");
	const [title, setTitle] = useState("");
	const [categoryId, setCategoryId] = useState("");
	const [content, setContent] = useRecoilState(editorState);
	const [errors, setErrors] = useState([]);

	const [categories, setCategories] = useState([]);

	// token from cookies
	const token = Cookies.get("token");

	// function fetchDataCategories
	const fetchDataCategories = async () => {
		await Api.get('/api/admin/categories/all', {
			// header
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
		.then(response => {
			// set response data to state categories
			setCategories(response.data.data);
		});
	}

	// useEffect
	useEffect(() => {
		// call function fetchDataCategories
		fetchDataCategories();
	}, []);

	// function store post
	const storePost = async (e) => {
		e.preventDefault();

		// define formData
		const formData = new FormData();

		// append data to formData
		formData.append('image', image);
		formData.append('title', title);
		formData.append('category_id', categoryId);
		formData.append('content', content);

		// sending data
		await Api.post('/api/admin/posts', formData, {
			// header
			headers: {
				'Authorization': `Bearer ${token}`,
				'content-type': 'multipart/form-data'
			}
		})
		.then(response => {
			// show success toast
			toast.success(response.data.message, {
				position: "top-right",
				duration: 4000
			})

			// set global state empty
			setContent("");

			// navigate
			navigate('/posts')
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
						<Link to="/posts" className="btn btn-md btn-tertiary border-0 shadow mb-3" type="button">
							<i className="fa fa-long-arrow-alt-left me-2"></i> Back
						</Link>
						<div className="card border-0 shadow">
							<div className="card-body">
								<h6><i className="fa fa-folder"></i> Create post</h6>
								<hr />
								<form onSubmit={storePost}>
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
										<label className="form-label fw-bold">Title</label>
										<input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter title" />
									</div>
									{errors.title && (
										<div className="alert alert-danger">
											{errors.title[0]}
										</div>
									)}
									<div className="mb-3">
										<label className="form-label fw-bold">Category</label>
										<select className="form-select" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
											<option value="">--- Select category ---</option>
											{categories.map(category => (
												<option value={category.id} key={category.id}>{category.name}</option>
											))}
										</select>
									</div>
									{errors.category_id && (
										<div className="alert alert-danger">
											{errors.category_id[0]}
										</div>
									)}
									<div className="mb-3">
										<label className="form-label fw-bold">Content</label>
										<Editor content={content} />
									</div>
									{errors.content && (
										<div className="alert alert-danger">
											{errors.content[0]}
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

export default PostsCreate;
