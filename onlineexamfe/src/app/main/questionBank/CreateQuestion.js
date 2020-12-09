import React, { useState } from 'react';
import FuseAnimate from '@fuse/core/FuseAnimate';
// import FuseChipSelect from '@fuse/core/FuseChipSelect';
//import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { useDeepCompareEffect } from '@fuse/hooks';
// import FuseUtils from '@fuse/utils';
import Formsy from 'formsy-react';
import _ from '@lodash';
import { useTheme, Icon, Button, Tab, Tabs, Radio, InputLabel, Select, MenuItem, OutlinedInput, RadioGroup, Typography, FormControlLabel, FormControl, FormLabel } from '@material-ui/core';
import { TextFieldFormsy } from '@fuse/core/formsy';
import withReducer from 'app/store/withReducer';
// import clsx from 'clsx';
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

function CreateQuestion(props) {
	const dispatch = useDispatch();
	const product = useSelector(({ eCommerceApp }) => eCommerceApp.product);
	const theme = useTheme();
	const categories = [{id:'A', value:'Section A', label:'Section A'},
						{id:'B', value:'Section B', label:'Section B'},
						{id:'C', value:'Section C', label:'Section C'},
						{id:'D', value:'Section D', label:'Section D'},
						{id:'E', value:'Section E', label:'Section E'},]
	//const classes = (props);
	const [tabValue, setTabValue] = useState(0);
	const [value, setValue] = useState("");
	const [marks, setMarks] = useState(0);
		const [selectedCategory, setSelectedCategory] = useState("Section A");

	//const answer="";
	// const { form, handleChange, setForm } = useForm(null);
	const routeParams = useParams();
	const [isFormValid, setIsFormValid] = useState(false);

	useDeepCompareEffect(() => {
		function updateProductState() {
			const { productID } = routeParams;
			if (productID === 'new') {
				//dispatch(Actions.newProduct());
			} else {
				dispatch(Actions.getProduct(routeParams));
			}
		}
		updateProductState();
	}, [dispatch]);

	// useEffect(() => {
	// 	if ((product.data && !form) || (product.data && form && product.data.id !== form.id)) {
	// 		setForm(product.data);
	// 	}
	// }, [form, product.data, setForm]);
	
	function handleSelectedCategory(event) {
		setSelectedCategory(event.target.value);
	}
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
	// function handleChipChange(value, name) {
	// 	setForm(
	// 		_.set(
	// 			{ ...form },
	// 			name,
	// 			value.map(item => item.value)
	// 		)
	// 	);
	// }

	//function setFeaturedImage(id) {
		//	setForm(_.set({ ...form }, 'featuredImageId', id));
	//}

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
		dispatch(Actions.saveAnswer(value));
	};

	if (
		(!product.data || (product.data && routeParams.productID !== product.data.id)) &&
		routeParams.productID !== 'new'
	) {
		// console.log(routeParams.productID);
		// return <FuseLoading />;
	}

	const handleChange = (event) => {
		setValue(event.target.value);
	};
	const handleChangeMarks = (event) => {
		setMarks(event.target.value);
	};
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
								<span className="mx-4">Questions</span>
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
										src="https://www.destination-innovation.com/wp-content/uploads/2014/08/question.png"
										alt={product.name}
									/>
								)}
							</FuseAnimate>
							<div className="flex flex-col min-w-0 mx-8 sm:mc-16">
								<FuseAnimate animation="transition.slideLeftIn" delay={300}>
									<Typography className="text-16 sm:text-20 truncate">
										{product.name ? product.name : 'Create Question'}
									</Typography>
								</FuseAnimate>
								
							</div>
						</div>
					</div>
					<FuseAnimate animation="transition.slideRightIn" delay={300}>
						<Button
							className="whitespace-no-wrap normal-case"
							variant="contained"
							color="secondary"
							disabled={false}
							onClick={() => dispatch(Actions.saveProduct(product))}
							onClick={()=>submitData()}
						>
							Save
						</Button>
					</FuseAnimate>
				</div>
			}
			
			content={
				product && (
					<Formsy id="formsy" onValidSubmit={submitData} onValid={enableButton} onInvalid={disableButton}>
						<div className="p-16 sm:p-24 max-w-2xl">
							{tabValue === 0 && (
								<div>
									{/*// 

									<p className="mt-8 mb-16">Q1. What are arrays in C? Why are they so useful?</p>*/}
									<FormControl component="fieldset">
      <FormLabel component="legend">Subject</FormLabel>
      <RadioGroup row aria-label="Subject" name="subject" defaultValue="top">
        <FormControlLabel value="Introduction to C" control={<Radio color="primary" />} label="Introduction to C" />
      	        <FormControlLabel value="Web Development" control={<Radio color="primary" />} label="Web Development" />
      </RadioGroup>
    </FormControl>
									<TextFieldFormsy
										className="mt-8 mb-16"
										id="question"
										name="question"
										label="Enter Question"
										type="text"
										value={value}
										onChange={handleChange}
										multiline
										rows={5}
										variant="outlined"
										fullWidth
									/>
									<FormControl className="flex w-full sm:w-320" variant="outlined">
						<InputLabel htmlFor="category-label-placeholder"> Category </InputLabel>
						<Select
							value={selectedCategory}
							onChange={handleSelectedCategory}
							input={
								<OutlinedInput
									labelWidth={'category'.length * 9}
									name="category"
									id="category-label-placeholder"
								/>
							}
						>
							
							{categories.map(category => (
								<MenuItem value={category.value} key={category.id}>
									{category.label} 
								</MenuItem>
							))}
						</Select>
					</FormControl>
					<TextFieldFormsy
						className="mt-8 mb-16"
						required
						label="Allot Marks"
						autoFocus
						id="marks"
						name="marks"
						value={marks}
						onChange={handleChangeMarks}
						variant="outlined"
						validations={{	isNumeric: true, minLength:1 }}
						validationErrors={{	isNumeric: "It should be a Number", minLength: "Min character length is 1",}}
						
						/> 
									{/*	<FuseChipSelect
									className="mt-8 mb-24"
									value={form.categories.map(item => ({
										value: item,
										label: item
									}))}
									onChange={value => handleChipChange(value, 'categories')}
									placeholder="Select multiple categories"
									TextFieldFormsyProps={{
										label: 'Categories',
										InputLabelProps: {
											shrink: true
										},
										variant: 'outlined'
									}}
									isMulti
								/>

								<FuseChipSelect
									className="mt-8 mb-16"
									value={form.tags.map(item => ({
										value: item,
										label: item
									}))}
									onChange={value => handleChipChange(value, 'tags')}
									placeholder="Select multiple tags"
									TextFieldFormsyProps={{
										label: 'Tags',
										InputLabelProps: {
											shrink: true
										},
										variant: 'outlined'
									}}
									isMulti
								/> */}
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

export default withReducer('eCommerceApp', reducer)(CreateQuestion);
