export default {
	aboutSections: [
		{
			title: 'Junior Full-Stack Web Developer',
			skills: [
				['Frontend', 'HTML, CSS, JavaScript, jQuery, React, Angular, Vue', 'indigo'],
				['Backend', 'SQL, Firebase, APIs, PHP, Ruby on Rails, WordPress', 'gray'],
				['IDE + Deployment', 'Github, Heroku, Docker, BitBucket, AWS C9', 'bluegray']
			],
			style: {
				backgroundImage:
					"linear-gradient(to bottom right, rgba(220,220,220, 0.8) 15%, rgba(220,220,220, 0.7) 60%, rgba(220,220,220,0.4)), url('/img/about/skills.jpg')",
				backgroundSize: '100% auto',
				backgroundPosition: 'right top',
				filter: 'contrast(95%) saturate(70%) brightness(110%) blur(5px)'
			}
		},
		{
			education: [
				'Bloc: Full-Stack Web Development',
				'TeamTreehouse: JavaScript, HTML, CSS, PHP, WordPress',
				'University of Idaho: English, Psychology (2 years)',
				'Institute for Integrative Nutrition: Health Coaching'
			],
			style: {
				backgroundImage: "url('/img/about/education.jpg')",
				backgroundSize: 'auto 100%',
				backgroundPosition: '0 0',
				filter: 'contrast(63%) saturate(110%) brightness(120%)'
			}
		},
		{
			path: [
				'In grade school, design and writing helped me express myself. I carried this to university, where I studied art, psychology, and English.',
				'Over time, my focus shifted outward. I found myself drawn to web development as a platform for expression. For that, I put university on pause.',
				'With help from TeamTreehouse, I built my first full-stack websites with HTML, CSS, Javascript, PHP, and SQL. These were integral to my studies but, ultimately, too free-form to be marketable.',
				'For a more professional foundation, I sought formal education at Bloc. Bloc appealed to my learning style with remote work, flexible hours, and regular mentorship. With Bloc, I refined my abilities with Javascript, learned common design patterns in React and Angular, built and implemented RESTful APIs, and was introduced to Ruby on Rails.',
				"Now, after graduation, I'm open to contract work.",
				'See what I <a href="/services">offer</a>. <a href="/contact">Contact me</a> if you think I can help.'
			],
			style: {
				backgroundImage: "url('/img/about/path.jpg')",
				backgroundPosition: 'right top',
				backgroundSize: '100% auto',
				filter: 'contrast(85%) saturate(110%) brightness(80%)',
				boxShadow: 'inset 0 0 4000px rgba(20,20,20,0.7)'
			}
		}
	]
}
