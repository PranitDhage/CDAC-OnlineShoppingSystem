import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../actions/cartActions';
import { getProductComments, getProductDetails, getProductRatings } from '../../actions/productActions';
import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/core/styles';
import { request_url } from '../../config/url';

// dependency of rating needed to be used to show stars 
const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		'& > * + *': {
			marginTop: theme.spacing(1),
		},
	},
}));

const ProductDetailsScreen = (props) => {
	let params = useParams()
	console.log('params.id' + params.id)

	const classes = useStyles();

	// to fetch product details 
	const allProductStore = useSelector((store) => store.allProductStore);

	// to fetch product avg rating
	const getProductRatingStore = useSelector(state => state.getProductRatingStore)

	// to fetch product comments
	const getProductCommentStore = useSelector(state => state.getProductCommentStore)

	const cartStore = useSelector((state) => state.cartStore);

	const dispatch = useDispatch()

	useEffect(async () => {
		console.log('in use effect');
		await dispatch(getProductDetails(params.id));
		await dispatch(getProductRatings(params.id));
		await dispatch(getProductComments(params.id));
	}, []);

	const onAddToCart = (p) => {
		console.log(p)
		dispatch(addToCart(p.prod_id, '1'))
	}

	//to check if reviews are avaliable or not 
	const [reviewAvailablityToggle, setReviewAvailablityToggle] = useState(false);

	return (

		<div>
			{
				allProductStore &&
				allProductStore.response &&
				allProductStore.response.data &&
				allProductStore.response.data.length > 0 &&
				allProductStore.response.data.map((p) => {
					return (
						<main className="page product-page">
							<section className="clean-block clean-product dark">
								<div className="container">
									<div className="block-heading">
										<h2 className="text-info">Product Details</h2>
										<hr />
										<br />
									</div>
									<div className="block-content" style={{ textAlign: "left" }}>
										<div className="product-info">
											<div className="row">
												<div className="col-md-6">
													<div className="gallery">
														<div id="product-preview" className="vanilla-zoom">
															<div className="zoomed-image">
																<div className="sidebar">
																	<img className="img-fluid d-block small-preview"
																		src={request_url + `/${p.photo}`} />
																</div>
															</div>
														</div>
													</div>
												</div>
												<div className="col-md-6">
													<div className="info">
														<h3>{p.prod_title}</h3>
														{
															getProductRatingStore &&
															getProductRatingStore.response &&
															getProductRatingStore.response.status == 'success' &&
															getProductRatingStore.response.data.map((productrating) => {

																console.log(productrating.rating)
																if (productrating != null) {
																	return (
																		< Rating name="half-rating-read"
																			defaultValue={productrating.rating}
																			precision={0.5} readOnly />)
																}
																else {
																	return (
																		< Rating name="half-rating-read"
																			defaultValue={0}
																			precision={0.5} readOnly />)
																}

															})
														}
														<hr />
														<div className="price">
															<h2>₹ {p.prod_price}</h2>
														</div>
														<button className="btn btn-primary" type="button" onClick={onAddToCart}>
															<i className="icon-basket"></i>
															Add to Cart
															</button>
														<hr />

														<div className="summary">
															<p>{p.prod_description}</p>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className="product-info">
											<div>

												<ul className="nav nav-tabs" role="tablist" id="myTab">
													<li className="nav-item" role="presentation"
													>
														<a className="nav-link" role="tab"
															data-bs-toggle="tab" id="reviews-tab" href="#reviews">Reviews</a></li>
												</ul>

												<div className="tab-content" id="myTabContent">
													<div className="tab-pane fade" role="tabpanel" id="reviews">
														<div className="reviews">
															{
																getProductCommentStore &&
																getProductCommentStore.response &&
																getProductCommentStore.response.status == 'success' &&
																getProductCommentStore.response.data.map((r) => {
																	if (r.rating != null) {
																		// setReviewAvailablityToggle(true);
																		return (<div className="review-item">
																			<Rating name="half-rating-read" defaultValue={r.rating} precision={0.5} readOnly />
																			<br />
																			<span class="text-muted">{r.user_name}, {r.orderDate}</span>
																			<p>{r.comment}</p>
																		</div>)
																	}
																})
															}
															{/* {
																getProductCommentStore &&
																getProductCommentStore.response &&
																getProductCommentStore.response.status == 'success' &&
																reviewAvailablityToggle == false &&
																<div className="review-item">
																	<span class="text-muted">No Reviews Posted Yet</span>
																</div>
															} */}
														</div>
													</div>
												</div>
											</div>
										</div>

									</div>
								</div>
							</section>
						</main>
					)
				}
				)
			}
		</div >


	);

};

export default ProductDetailsScreen
