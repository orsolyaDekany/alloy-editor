import ButtonCfgProps from '../base/button-props.js';
import ButtonIcon from './button-icon.jsx';
import ButtonKeystroke from '../base/button-keystroke.js';
import ButtonLinkEdit from './button-link-edit.jsx';
import ButtonStateClasses from '../base/button-state-classes.js';
import React from 'react';

/**
 * The ButtonLink class provides functionality for creating and editing a link in a document. ButtonLink
 * renders in two different modes:
 *
 * - Normal: Just a button that allows to switch to the edition mode
 * - Exclusive: The ButtonLinkEdit UI with all the link edition controls.
 *
 * @class ButtonLink
 * @uses ButtonCfgProps
 * @uses ButtonKeystroke
 * @uses ButtonStateClasses
 */
class ButtonLink extends React.Component {
	/**
	 * Lifecycle. Returns the default values of the properties used in the widget.
	 *
	 * @instance
	 * @memberof ButtonLink
	 * @method getDefaultProps
	 * @return {Object} The default properties.
	 */
	static defaultProps = {
		keystroke: {
			fn: '_requestExclusive',
			keys: CKEDITOR.CTRL + 76 /* L*/,
		},
	};

	/**
	 * The name which will be used as an alias of the button in the configuration.
	 *
	 * @default link
	 * @memberof ButtonLink
	 * @property {String} key
	 * @static
	 */
	static key = 'link';

	/**
	 * Checks if the current selection is contained within a link.
	 *
	 * @instance
	 * @memberof ButtonLink
	 * @method isActive
	 * @return {Boolean} True if the selection is inside a link, false otherwise.
	 */
	isActive() {
		return (
			new CKEDITOR.Link(
				this.props.editor.get('nativeEditor')
			).getFromSelection() !== null
		);
	}

	/**
	 * Lifecycle. Renders the UI of the button.
	 *
	 * @instance
	 * @memberof ButtonLink
	 * @method render
	 * @return {Object} The content which should be rendered.
	 */
	render() {
		const cssClass = `ae-button ${this.getStateClasses()}`;

		if (this.props.renderExclusive) {
			const props = this.mergeButtonCfgProps();

			return <ButtonLinkEdit {...props} />;
		} else {
			return (
				<button
					aria-label={AlloyEditor.Strings.link}
					className={cssClass}
					data-type="button-link"
					onClick={this._requestExclusive}
					tabIndex={this.props.tabIndex}
					title={AlloyEditor.Strings.link}>
					<ButtonIcon editor={this.props.editor} symbol="link" />
				</button>
			);
		}
	}

	/**
	 * Requests the link button to be rendered in exclusive mode to allow the creation of a link.
	 *
	 * @instance
	 * @memberof ButtonLink
	 * @method _requestExclusive
	 * @protected
	 */
	_requestExclusive = () => {
		this.props.requestExclusive(ButtonLink.key);
	};
}

export default ButtonCfgProps(ButtonKeystroke(ButtonStateClasses(ButtonLink)));
