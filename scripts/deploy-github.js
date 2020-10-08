var ghpages = require('gh-pages');

ghpages.publish(
		    'public',
		    {
					        branch: 'main',
					        repo: '../',
					    },
		    () => {
					        console.log('Deploy Complete!')
					    }
)
