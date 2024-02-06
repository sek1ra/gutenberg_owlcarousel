const crel = wp.element.createElement;
const { MediaUpload, InspectorControls } = wp.blockEditor;
const { Button, PanelBody } = wp.components;


wp.blocks.registerBlockType('owl-carousel-plugin/owl-carousel', {
    title: 'Owl Carousel',
    icon: 'smiley',
    category: 'common',
    attributes: {
        images: {
            type: 'array',
            default: [],
        },
        numberValue: {
            type: 'number',
            default: 4,
        },
    },
    edit: function (props) {
        const { attributes, setAttributes } = props;

        const onSelectImage = (newImages) => {
            const images = newImages.map((image) => {
                return {
                    url: image.url,
                    id: image.id,
                    alt: image.alt,
                    caption: image.caption,
                };
            });
            setAttributes({ images: images });
        };

        
        return [
            crel(PanelBody, { title: 'Галерея' },
                [
                crel(wp.blockEditor.MediaUpload, {
                    onSelect: onSelectImage,
                    type: 'image',
                    multiple: true,
                    gallery: true,
                    value: attributes.images.map((image) => image.id),
                    render: ({ open }) => crel(Button, {
                        onClick: open,
                        isPrimary: true,
                    }, 'Открыть медиабиблиотеку'),
                }),
                crel('div', { className: 'gallery-block' },
                    attributes.images.map((image, index) => {
                        return crel('img', {
                            key: index,
                            src: image.url,
                            alt: image.alt
                        });
                    })
                ),
                crel(wp.components.TextControl, {
                    label: 'Сколько слайдов выводится',
                    value: attributes.numberValue,
                    onChange: function (newValue) {
                        let parsedValue = parseInt(newValue, 10) || 0;
                        let clampedValue = Math.min(10, Math.max(1, parsedValue));
                        setAttributes({ numberValue: clampedValue });
                    },
                    type: 'number',
                })
            ])
        ];
    },
    save: function (props) {
        const { attributes } = props;

        const imagesElements = attributes.images.map(function (image, index) {
            return wp.element.createElement('img', {
                key: index,
                src: image.url,
                alt: image.alt,
                style: { maxWidth: '100%', height: 'auto' },
            });
        });

        return wp.element.createElement(
            'div',
            { className: 'owl-carousel', 'data-count': attributes.numberValue },
            imagesElements
        );
    },
});
