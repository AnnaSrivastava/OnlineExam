import FuseChipSelect from '@fuse/core/FuseChipSelect';
import _ from '@lodash';
import { FormControl, FormHelperText, InputLabel } from '@material-ui/core';
import clsx from 'clsx';
import { withFormsy } from 'formsy-react';
import React from 'react';

function FuseChipSelectFormsy(props) {
	const importedProps = _.pick(props, [
		'children',
		'classes',
		'className',
		'defaultValue',
		'disabled',
		'fullWidth',
		'id',
		'label',
		'name',
		'onBlur',
		'onChange',
		'onFocus',
		'placeholder',
		'required',
		'textFieldProps',
		'variant',
		'isMulti',
		'options',
		'errorMessage'
	]);

	// An error message is returned only if the component is invalid
	const { errorMessage, value } = props;

	function changeValue(val, selectedOptions) {
		if (props.multiple) {
			props.setValue(selectedOptions.map(option => option.value));
		} else {
			props.setValue(val);
		}
		//console.log(val);
		importedProps.onChange(val);
		console.log(importedProps);
		importedProps.options = val;
	}

	return (
		<FormControl
			error={Boolean((!props.isPristine && props.showRequired) || errorMessage)}
			className={clsx(
				props.className,
				'z-10',"mt-8 mb-16 max-w-2xl",
				props.showRequired ? 'required' : '',
				props.showError ? 'error' : null
			)}
			variant={importedProps.variant}
		>
			{props.label && <InputLabel htmlFor={props.name}>{props.label}</InputLabel>}
			<FuseChipSelect
				{...importedProps}
				value={value}
				onChange={changeValue}
				error={Boolean((!props.isPristine && props.showRequired) || errorMessage)}
			/>
			{Boolean(errorMessage) && <FormHelperText>{errorMessage}</FormHelperText>}
		</FormControl>
	);
}

export default React.memo(withFormsy(FuseChipSelectFormsy));
