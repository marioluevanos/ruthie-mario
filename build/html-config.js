var config = require('../config')

module.exports = {
	filename: config.build.index,
	title: 'Ruthie & Mario Are Getting Married',
	template: require('html-webpack-template'),
	appMountId: 'app',
	meta: [
	{
		name: 'description',
		content: 'Ruthie and Mario are getting married on October 27, 2017.'
	},
	{
		property: 'og:site_name',
    	content: 'Ruthie & Mario’s Wedding Day'
    },
    {
    	name: 'viewport',
    	content: 'width=device-width'
    },
    {
    	property: 'og:type',
        content: 'website'
    },
    {
    	property: 'og:title',
        content: 'Ruthie & Mario are tying the knot!'
    },
    {
    	property: 'og:url',
        content: 'https://www.ruthie-mario.love'
    },
    {
    	property: 'og:image',
        content: 'https://www.ruthie-mario.love/static/images/og-preview.jpg',
    },{
    	property: 'og:description',
    	content: 'Ruthie Collins and Mario Luevanos invite you to join the fun as they stand together before family and friends extending their friendship to include the vows of marriage.'
	}],
	googleAnalytics: {
		trackingId: 'UA-103156256-1',
		mobile: true,
		lang: 'en-US',
		pageViewOnLoad: true
	},
	inject: false,
	minify: {
		removeComments: true,
		collapseWhitespace: true,
		removeAttributeQuotes: true
		// more options:
		// https://github.com/kangax/html-minifier#options-quick-reference
	},
	// necessary to consistently work with multiple chunks via CommonsChunkPlugin
	chunksSortMode: 'dependency'
}