/**
 * Internal dependencies
 */
import './style.scss';

const Editable = wp.blocks.Editable;
const { html, prop } = wp.blocks.query;

wp.blocks.registerBlock( 'core/list', {
	title: wp.i18n.__( 'List' ),
	icon: 'editor-ul',
	category: 'common',

	attributes: {
		listType: prop( 'ol,ul', 'nodeName' ),
		content: () => {
			debugger;
			return html( 'li' );
		},
		items: wp.blocks.query.query(
			'li',
			{
				value: html()
			}
		)
	},

	controls: [
		{
			icon: 'editor-alignleft',
			title: wp.i18n.__( 'Align left' ),
			isActive: ( { align } ) => ! align || 'left' === align,
			onClick( attributes, setAttributes ) {
				setAttributes( { align: undefined } );
			}
		},
		{
			icon: 'editor-aligncenter',
			title: wp.i18n.__( 'Align center' ),
			isActive: ( { align } ) => 'center' === align,
			onClick( attributes, setAttributes ) {
				setAttributes( { align: 'center' } );
			}
		},
		{
			icon: 'editor-alignright',
			title: wp.i18n.__( 'Align right' ),
			isActive: ( { align } ) => 'right' === align,
			onClick( attributes, setAttributes ) {
				setAttributes( { align: 'right' } );
			}
		},
		{
			icon: 'editor-justify',
			title: wp.i18n.__( 'Justify' ),
			isActive: ( { align } ) => 'justify' === align,
			onClick( attributes, setAttributes ) {
				setAttributes( { align: 'justify' } );
			}
		},
		{
			icon: 'editor-ol',
			title: wp.i18n.__( 'Ordered list' ),
			isActive: ( { } ) => false,
			onClick( attributes, setAttributes ) {
				debugger;
				setAttributes( { listType: 'ol' } );
			}
		}
	],

	edit( { attributes } ) {
		const { listType = 'ol', align, content } = attributes;

		return (
			<Editable
				tagName={ listType }
				style={ align ? { textAlign: align } : null }
				value={ content }
				className="blocks-list" />
		);
	},

	save( { attributes } ) {
		const { listType = 'ol', align, content } = attributes;
		const ListElement = listType.toLocaleLowerCase();
		return (
			<ListElement style={ align ? { textAlign: align } : null } dangerouslySetInnerHTML={ { __html: content } }>
			</ListElement>
		);
	}
} );
