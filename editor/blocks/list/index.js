const Editable = wp.blocks.Editable;
const { html, prop } = wp.blocks.query;

wp.blocks.registerBlock( 'core/list', {
	title: wp.i18n.__( 'List' ),
	icon: 'editor-ul',
	category: 'common',

	attributes: {
		listType: prop( 'ol,ul', 'nodeName' ),
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
			icon: 'editor-ul',
			title: wp.i18n.__( 'Unordered list' ),
			isActive: ( { } ) => false,
			onClick( attributes, setAttributes ) {
				setAttributes( { listType: 'ul' } );
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

	edit( { attributes, setAttributes } ) {
		const { listType = 'ol', items = [], align } = attributes;
		const content = items.map( item => {
			return `<li>${ item.value }</li>`;
		} ).join( '' );
		const defaultListStyles = { listStylePosition: 'inside' };
		const alignment = align ? { textAlign: align } : {};
		const style = { ...alignment, ...defaultListStyles };

		return (
			<Editable
				tagName={ listType }
				onChange={ ( value ) => setAttributes( { content: value } ) }
				style={ style }
				value={ content } />
		);
	},

	save( { attributes } ) {
		const { listType = 'ol', items = [] } = attributes;
		const children = items.map( ( item, index ) => (
			<li key={ index } dangerouslySetInnerHTML={ { __html: item.value } } />
		) );
		return wp.element.createElement( listType.toLowerCase(), null, children );
	}
} );
