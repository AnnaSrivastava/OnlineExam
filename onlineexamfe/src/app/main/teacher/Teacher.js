import FuseAnimate from '@fuse/core/FuseAnimate';
// import FuseChipSelect from '@fuse/core/FuseChipSelect';
// import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { useDeepCompareEffect, 
	//useForm 
} from '@fuse/hooks';
// import FuseUtils from '@fuse/utils';
import Formsy from 'formsy-react';
import _ from '@lodash';
import { Button, 
	//orange, makeStyles, 
	Icon, useTheme, Tabs, Tab } from '@material-ui/core';
import { TextFieldFormsy, FuseChipSelectFormsy } from '@fuse/core/formsy';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import * as Actions from './store/actions';
import reducer from './store/reducers';

// const useStyles = makeStyles(theme => ({
// 	productImageFeaturedStar: {
// 		position: 'absolute',
// 		top: 0,
// 		right: 0,
// 		color: orange[400],
// 		opacity: 0
// 	},
// 	productImageUpload: {
// 		transitionProperty: 'box-shadow',
// 		transitionDuration: theme.transitions.duration.short,
// 		transitionTimingFunction: theme.transitions.easing.easeInOut
// 	},
// 	productImageItem: {
// 		transitionProperty: 'box-shadow',
// 		transitionDuration: theme.transitions.duration.short,
// 		transitionTimingFunction: theme.transitions.easing.easeInOut,
// 		'&:hover': {
// 			'& $productImageFeaturedStar': {
// 				opacity: 0.8
// 			}
// 		},
// 		'&.featured': {
// 			pointerEvents: 'none',
// 			boxShadow: theme.shadows[3],
// 			'& $productImageFeaturedStar': {
// 				opacity: 1
// 			},
// 			'&:hover $productImageFeaturedStar': {
// 				opacity: 1
// 			}
// 		}
// 	}
// }));

function Teacher(props) {
	const dispatch = useDispatch();
	const product = useSelector(({ studentStats }) => studentStats);
	const theme = useTheme();
	console.log(product);
	//const classes = useStyles(props);
	const [tabValue, setTabValue] = useState(0);
	const [keywordsList, setKeywordsList] = useState([]);

	//const { form, handleChange, setForm } = useForm(null);
	const routeParams = useParams();
	const [isFormValid, setIsFormValid] = useState(false);

	useDeepCompareEffect(() => {
		function updateProductState() {
			const { sheetID } = routeParams;
			if (sheetID === 'new') {
				dispatch(Actions.newProduct());
			} else {
				dispatch(Actions.getAnswerScore(routeParams));
			}
		}
		updateProductState();
	}, [dispatch]);

	// useEffect(() => {
	// 	if ((product.data && !form) || (product.data && form && product.data.id !== form.id)) {
	// 		setForm(product.data);
	// 	}
	// }, [form, product.data, setForm]);

	function handleChangeTab(event, value) {
		setTabValue(value);
	}
	function disableButton() {
		console.log(isFormValid);
		setIsFormValid(true);
	}

	function enableButton() {
		setIsFormValid(true);
	}
	// function handleChipChange(value) {
	// 	keywordsList.push(value);
	//  }

	// function setFeaturedImage(id) {
	// 	//	setForm(_.set({ ...form }, 'featuredImageId', id));
	// }

	// function handleUploadChange(e) {
	// 	const file = e.target.files[0];
	// 	if (!file) {
	// 		return;
	// 	}
	// 	const reader = new FileReader();
	// 	reader.readAsBinaryString(file);

	// 	reader.onload = () => {
	// 		// setForm(
	// 		// 	_.set({ ...form }, `images`, [
	// 		// 		{
	// 		// 			id: FuseUtils.generateGUID(),
	// 		// 			url: `data:${file.type};base64,${btoa(reader.result)}`,
	// 		// 			type: 'image'
	// 		// 		},
	// 		// 		...form.images
	// 		// 	])
	// 		// );
	// 	};

	// 	reader.onerror = () => {
	// 		console.log('error on load image');
	// 	};
	// }

	// function canBeSubmitted() {
	// 	//	return form.name.length > 0 && !_.isEqual(product.data, form);
	// }
	const submitData = () => {
		let finalList = [];
		for(let i=0;i<keywordsList.length;i++)
		{
			finalList.push(keywordsList[i].value);
		}
		console.log(finalList);
		dispatch(Actions.saveKeywords(finalList));
	};

	if (
		(!product.data || (product.data && routeParams.sheetID !== product.data.id)) &&
		routeParams.sheetID !== 'new'
	) {
		//console.log(routeParams.sheetID);
		//return <FuseLoading />;
	}
	const onChangeList = (arr) => {
		//console.log(arr);
		setKeywordsList(arr);
	} 
	//console.log(keywordsList);
	return (
		<FusePageCarded
			classes={{
				toolbar: 'p-0',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
			}}
			header={
				<div className="flex flex-1 w-full items-center justify-between">
					<div className="flex flex-col items-start max-w-full">
						<FuseAnimate animation="transition.slideRightIn" delay={300}>
							<Typography
								className="normal-case flex items-center sm:mb-12"
								component={Link}
								role="button"
								to=""
								color="inherit"
							>
								<Icon className="text-20">
									{theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}
								</Icon>
								<span className="mx-4">Answer Sheets</span>
							</Typography>
						</FuseAnimate>

						<div className="flex items-center max-w-full">
							<FuseAnimate animation="transition.expandIn" delay={300}>
								{false ? (
									<img
										className="w-32 sm:w-48 rounded"
										src={_.find(product.images, { id: product.featuredImageId }).url}
										alt={product.name}
									/>
								) : (
									<img
										className="w-32 sm:w-48 rounded"
										src="https://images.cdn4.stockunlimited.net/preview1300/a-test-paper_1241562.jpg"
										alt={product.name}
									/>
								)}
							</FuseAnimate>
							<div className="flex flex-col min-w-0 mx-8 sm:mc-16">
								<FuseAnimate animation="transition.slideLeftIn" delay={300}>
									<Typography className="text-16 sm:text-20 truncate">
										{product.name ? product.name : 'Introduction To C'}
									</Typography>
								</FuseAnimate>
								<FuseAnimate animation="transition.slideLeftIn" delay={300}>
									<Typography variant="caption">IT-104</Typography>
								</FuseAnimate>
                                <FuseAnimate animation="transition.slideLeftIn" delay={300}>
									<Typography variant="caption">Enrollment No. 4592342018</Typography>
								</FuseAnimate>
							</div>
						</div>
					</div>
				{(routeParams.sheetID==="new" ?

					<FuseAnimate animation="transition.slideRightIn" delay={300}>
						<Button
							className="whitespace-no-wrap normal-case"
							variant="contained"
							color="secondary"
							disabled={false}
							//onClick={() => dispatch(Actions.saveProduct(product))}
							onClick={()=>submitData()}
						>
							Save
						</Button>
					</FuseAnimate>
				: <div></div> )}
				</div>
			}
			contentToolbar={
				<Tabs
					value={tabValue}
					onChange={handleChangeTab}
					indicatorColor="primary"
					textColor="primary"
					variant="scrollable"
					scrollButtons="auto"
					classes={{ root: 'w-full h-64' }}
				>
					<Tab className="h-64 normal-case" label="Section A" />
				</Tabs>
			}
			content={
				product && (
					<Formsy id="formsy" onValidSubmit={submitData} onValid={enableButton} onInvalid={disableButton}>
						<div className="p-16 sm:p-24 max-w-2xl">
							{tabValue === 0 && (
								<div>
									{/* // <TextFieldFormsy
								// 	className="mt-8 mb-16"
								// 	error={form.name === ''}
								// 	required
								// 	label="Name"
								// 	autoFocus
								// 	id="name"
								// 	name="name"
								// 	value={form.name}
								// 	onChange={handleChange}
								// 	variant="outlined"
								// 	fullWidth
								// /> */}
							{(routeParams.sheetID==="new" ? <div></div> :
                                    <p className="mt-8 mb-16">Submitted Answer</p> )}
									<p className="mt-8 mb-16">Q1. What are arrays in C? Why are they so useful?</p>
							{(routeParams.sheetID==="new" ? <div></div> :
								<div>
									<TextFieldFormsy
										className="mt-8 mb-16"
										id="answer"
										name="answer"
										label="Answer"
										type="text"
										value={product.order ? product.order.answer : ""}
										multiline
										rows={5}
										variant="outlined"
										fullWidth
										disabled
									/>
                                  {/*}   <TextFieldFormsy
									// 	className="mt-8 mb-16"
									// 	id="Required Keywords"
									// 	name="Required Keywords"
									// 	label="Required Keywords"
									// 	type="text"
									// 	value={product ? product.description : ""}
									// 	multiline
									// 	rows={3}
									// 	variant="outlined"
									// 	fullWidth
									// /> */}
                                    <TextFieldFormsy
										className="mt-8 mb-16"
										id="score"
										name="score"
										label="Score"
										type="text"
                                        value={product.order ? product.order.score : 0}
										rows={1}
										variant="outlined"
                                        fullWidth
                                        disabled
									/>
								</div> )}
								 {/*// 		<FuseChipSelectFormsy
								// 	className="mt-8 mb-24"
								// 	value={categories.map(item => ({
								// 		value: item,
								// 		label: item
								// 	}))}
								// 	onChange={value => handleChipChange(value, 'categories')}
								// 	placeholder="Select multiple categories"
								// 	TextFieldFormsyProps={{
								// 		label: 'Categories',
								// 		InputLabelProps: {
								// 			shrink: true
								// 		},
								// 		variant: 'outlined'
								// 	}}
								// 	isMulti
								// />  */}
								{(routeParams.sheetID==="new" ?
									<div>
								<p className="mt-8">Add Keywords</p>
								<FuseChipSelectFormsy
									className="w-full"
									// value={tags.map(item => ({
									// 	value: item,
									// 	label: item
									// }))}
									name = "Keywords"
									options = {keywordsList}
									onChange={onChangeList}
									TextFieldFormsyProps={{
										label: 'Tags',
										InputLabelProps: {
											shrink: true
										},
										variant: 'outlined'
									}}
									isMulti
								/>
								</div>
								: <div></div> )}
								</div>
							)}
							{tabValue === 1 && (
								<div>
									{/*// <div className="flex justify-center sm:justify-start flex-wrap -mx-8">
								// 	<label
								// 		htmlFor="button-file"
								// 		className={clsx(
								// 			classes.productImageUpload,
								// 			'flex items-center justify-center relative w-128 h-128 rounded-4 mx-8 mb-16 overflow-hidden cursor-pointer shadow-1 hover:shadow-5'
								// 		)}
								// 	>
								// 		<input
								// 			accept="image/*"
								// 			className="hidden"
								// 			id="button-file"
								// 			type="file"
								// 			onChange={handleUploadChange}
								// 		/>
								// 		<Icon fontSize="large" color="action">
								// 			cloud_upload
								// 		</Icon>
								// 	</label>
								// 	{form.images.map(media => (
								// 		<div
								// 			onClick={() => setFeaturedImage(media.id)}
								// 			onKeyDown={() => setFeaturedImage(media.id)}
								// 			role="button"
								// 			tabIndex={0}
								// 			className={clsx(
								// 				classes.productImageItem,
								// 				'flex items-center justify-center relative w-128 h-128 rounded-4 mx-8 mb-16 overflow-hidden cursor-pointer shadow-1 hover:shadow-5',
								// 				media.id === form.featuredImageId && 'featured'
								// 			)}
								// 			key={media.id}
								// 		>
								// 			<Icon className={classes.productImageFeaturedStar}>star</Icon>
								// 			<img className="max-w-none w-auto h-full" src={media.url} alt="product" />
								// 		</div>
								// 	))}
								// </div> */}
								</div>
							)}
						</div>
					</Formsy>
				)
			}
			innerScroll
		/>
	);
}

export default withReducer('studentStats', reducer)(Teacher);
