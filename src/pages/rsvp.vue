<template lang='pug'>
	#page-rsvp.texture-2.img-preload
		.page-rsvp-inner
			.col
				.texture-2.img-preload
					.overlay
					router-link.go-back(to='/')
						span
							.icon-home: include ../assets/images/icon-home.svg
				.text.clear
					.steps.step-1
						.inner
							wedding-monogram.not-entered
							p
								span Join us in celebrating our marriage 
								span and all the happiness that awaits.
								span Family and Friends, please enter
								span your Guest ID to RSVP.
							.input
								input(
									id='rsvp-input',
									type='text',
									value='',
									placeholder='',
									@keyup='checkGuest',
									@keydown.enter='submitGuestPassword'
									@focus='onFocus',
									@blur='onBlur')
								.input-placeholder Guest Password
								.input-message
							.step-1-button(@click='submitGuestPassword'): wedding-button.continue Continue
					.steps.step-2
						.inner
							p Welcome
							h3 #[span#guest-name]!
							.inner-message
								p Thank you for taking the time to RSVP.
								p Please select the number of guests attending.
							#guest-count
								.icon-arrow
								select(@change='onChange', tabindex='-1')
							.step-2-button(@click='submitCount'): wedding-button.submit-count Submit
			.col
				wedding-image.ep-3(file='ep-3.jpg')
					.overlay
</template>

<script>
	import Firebase from 'firebase';

	import animations from '../scripts/animations-page-rsvp';
	 
	Firebase.initializeApp({
		apiKey: "AIzaSyB9MbNuwaqb1uIW18ervfyn2uxapX78bdc",
		authDomain: "wedding-rsvp-f4466.firebaseapp.com",
		databaseURL: "https://wedding-rsvp-f4466.firebaseio.com",
		projectId: "wedding-rsvp-f4466",
		storageBucket: "wedding-rsvp-f4466.appspot.com",
		messagingSenderId: "363754879000"
	});

	const database = Firebase.database();

	export default {
		name: 'rsvp',
		firebase: {
			guests: {
				source: database.ref('/'),
				asObject: false,
				readyCallback() {

					/* Reduce the main guest list into an iterable list from firebase */
					const attendanceOrigin = this.guests.reduce((all, guest, index) => {
						let key = Object.keys(guest)[0];
						let guestObject = guest[key];
						for (let key in guestObject) {
							all.push({
								origin: guestObject.origin,
								relationship: guestObject.relationship,
								count: guestObject.count,
								name: guestObject.name,
								attending: guestObject.attending
							});
							return all;
						}
					}, []);

					const getGuestPerInvitee = name => attendanceOrigin
						.filter(guest => guest.origin === name && guest.count);

					const getGuestPerRelation = (name, relation) => getGuestPerInvitee(name)
						.filter(m => m.relationship === relation)
						.reduce((total, guest) => total += guest.count, 0);

					let m1 = getGuestPerRelation('mario', 'family');
					let m2 = getGuestPerRelation('mario', 'friend');
					let r1 = getGuestPerRelation('ruthie', 'family');
					let r2 = getGuestPerRelation('ruthie', 'friend');
					
					let overview = {
						mario: {
							family: m1,
							friends: m2,
							total: m1 + m2
						},
						ruthie: {
							family: r1,
							friends: r2,
							total: r1 + r2
						},
						total: m1 + m2 + r1 + r2
					};

					let attendance = attendanceOrigin
					.filter(guest => {
						if (guest.attending) {
							let count = guest.count;
							let name = guest.name;
							let attending = guest.attending;
							return Object.assign({}, { count, name, attending });
						}
					})
					.map(guest => {
						return {
							count: guest.count,
							name: guest.name,
							attending: guest.attending
						};
					});

					/* This is just a hack to check the records of attendance objects */
					document.addEventListener('click', () => window.attendance = attendance);
				}
			}
		},
		methods: {
			checkGuest(e) {

				/* Current guest object meta data */
				const verifiedGuest = this.verifiedGuest(this.currentGuestList());
				
				/* Check is the password is a guest */
				this.enteredGuestPassword = verifiedGuest ? true : false;

				/* Show continue button is password finds a match */
				this.$el.querySelector('.step-1-button').classList.toggle('active',  this.enteredGuestPassword);
			},
			/* Check if there is people on the array, list  */
			verifiedGuest(list) {
				if (list.length === 0) {
					return false;
				}
				else {
					return list;
				}	
			},
			/* If password is correct, get the current guest */
			currentGuestList() {
				return this.guests.filter((guest, i) => {
					let guestKey = Object.keys(guest)[0];
					return this.rsvpInputElement.value.toLowerCase() === guestKey;
				});
			},
			guestObject(verifiedGuestObject) {
				let obj = verifiedGuestObject[0];
				let id = Object.keys(obj)[0];

				return {
					name() {
						return obj[id].name;
					},
					count() {
						return obj[id].count;
					},
					id() {
						return id;
					},
					key() {
						return obj['.key'];
					}
				}
			},
			goToStep2(guest) {
				this.guest = {
					name: guest.name(), 
					count: guest.count(), 
					id: guest.id(), 
					key: guest.key()
				};
				this.step2.classList.add('verified');
				this.guestNameElement.innerHTML = this.guest.name;
				this.createGuestOptions(this.guest.count)
					.forEach(option => this.guestCountElement.appendChild(option));
			},
			createGuestOptions(count) {
				let optionArray = [];

				for (let i = 0; i <= count; i++) {
					let optionsElement = document.createElement('option');
					optionsElement.value = i === 0 ? '' : i;
					optionsElement.innerHTML = 
						i === 0 ? 'Select the number of guests' : 
						i === 1 ? i + ' Guest' : i + ' Guests';

					optionArray.push(optionsElement);
				}
				
				const cantGoOption = () => {
					let optionsElement = document.createElement('option');
					optionsElement.value = 0;
					optionsElement.innerHTML = '0 Sorry, can’t attend.'
					return optionsElement;
				};

				// Add for can't attend
				optionArray.splice(1, 0, cantGoOption());

				return optionArray;
			},
			submitGuestPassword(e) {

				/* Current guest object meta data */
				const verifiedGuest = this.verifiedGuest(this.currentGuestList());

				if (!verifiedGuest) {
					this.inputContentElement.classList.add('incorrect');
					return false;
				}
				else {
					let guest = this.guestObject(verifiedGuest);
					/* 
						Add animating in for verified content
						shit here later, everything here below 
						needs organization
					*/
					this.goToStep2(guest);
				}
			},
			submitCount(e) {
				let dbPath = '/' + this.guest.key + '/' + this.guest.id + '/';
				let attending = { attending: parseFloat(this.guestCountElement.value) };
				
				/* Updating Firebase records here */
				database.ref(dbPath).update(attending);

				/* Display thank you message */
				let message = `\
					<p>Thank you</p>
					<h3>${this.guest.name}!</h3> 
					<p>See you on our wedding day.</p>
					<p>Get ready to party!</p>
					<button class='wedding-button'>
						<a href='/'></a>
						<span class='border'></span>
						<span class='border'></span>
						<span class='text'>Go Back</span>
					</button>
				`;
				this.$el.querySelector('.step-2 .inner').innerHTML = message;
			},
			onFocus() {

				this.rsvpInputElement.nextSibling.style.transitionDelay = '0s';

				/* Remove the incorrect class, so it looks like a reset */
				return this.inputContentElement.classList.remove('incorrect');
			},
			onBlur() {

				/* 
					Check if there is text onBlur so the placeholder element rises up 
					+ scales down or stays at initial position.
				*/
				let hasText = this.rsvpInputElement.value.length > 0;
				this.inputPlaceholderElement.classList.toggle('active', hasText);
			},
			onChange(e) {
				this.$el.querySelector('.step-2-button').classList.toggle('active', e.target.value.length > 0);
			}
		},
		mounted() {
			this.rsvpInputElement = this.$el.querySelector('#rsvp-input');
			this.inputContentElement = this.$el.querySelector('.input');
			this.inputPlaceholderElement = this.$el.querySelector('.input-placeholder');
			this.guestNameElement = this.$el.querySelector('#guest-name');
			this.guestCountElement = this.$el.querySelector('#guest-count select');
			this.step2 = this.$el.querySelector('.step-2');
			
			this.animations = animations();
			this.animations.enter(this);
			
		},
		beforeRouteLeave(to, from, next) {
			this.animations.leave(next);
		}
	}
</script>

<style lang='scss'>

	@import '../styles/vars.scss';
	@import '../styles/mixins.scss';

	$nav-height: 180px;

	#page-rsvp {
		height: 100vh;
		overflow: hidden;
		margin: auto;
		position: relative;
		@include bp(2) {
			min-height: 100%;
			height: 100vh;
			flex-direction: column;
		}
		.overlay {
			position: absolute;
			top: 0; right: 0; bottom: 0; left: 0;
			background: white;
			z-index: 1;
		}
		.page-rsvp-inner {
			position: relative;
			display: flex;
			@include bp(2) {
				height: inherit;
				display: block;
			}
		}
		
		p {
			font-size: 1.5vw;
			transition: all 0.6s $ease-in-out-p0;
			@include bp(2) {
				font-size: 6vw;
			}
		}
		.wedding-button {
			margin: vw(30) 0;
		}
		.monogram {
			width: vw(80);
			height: vw(80);
			position: relative;
			margin: 0 auto vw(15);
			box-sizing: content-box;
			@include bp(2) {
				width: vw(250);
				height: vw(250);
				margin: 0 auto vw(15);
			}
			svg {
				overflow: visible;
			}
			.monogram-text {
				fill: $color-navy;
				transition: all 0.3s ease-in-out;
			}
			.monogram-sq {
				stroke: $color-gold-1;
				transition: all 0.3s ease-in-out;
			}
			&.not-entered {
				svg .monogram-text {
					opacity: 0;
					transform: scale(1.1);
				}
				svg .monogram-sq {
					opacity: 0;
					transform: rotate(135deg) scale(1.1);
				}
			}
		}
		.col:nth-of-type(1) {
			width: vw(890);
			background: white;
			position: relative;
			z-index: 1;
			@include bp(2) {
				padding: 0;
				height: 100%;
				width: 100%;
			}
			.texture-2 {
				position: absolute;
				top: 0;
				bottom: 0;
				left: 0;
				width: vw(210);
				overflow: hidden;
				z-index: 2;
				@include bp(2) {
					top: 0;
					display: flex;
					width: 100%;
					height: $nav-height / 4;
				}
			}
		}

		a.go-back {
			position: absolute;
			top: 50%;
			transform: translate(0, -50%);
			right: 0;
			padding: vw(15) vw(15) vw(15) vw(20);
			background: $color-gold-1;
			text-decoration: none;
			font: 1.875em $font-bold;
			text-decoration: none;
			transition: all 0.3s $ease-in-out-p0;
			color: $color-navy;
			&:before, &:after {
				transition: all 0.3s $ease-in-out-p0; 
				border: 2px solid white;
    			border-right: none;
    			content: '';
				position: absolute;
				z-index: 0;
			}
			&:before {
				top: 0; right: 0; bottom: 0; left: -6px;
			}
			&:after {
				top: -6px; right: 0; bottom: -6px; left: 0;
			}
			@include bp(2) {
				top: 0;
				padding: 0;
				right: 0;
				height: $nav-height;
				width: $nav-height;
				background: $color-gold-1;
				transform: none;
				display: none;
			}
			span {
				position: relative;
				top: vw(-3);
				display: flex;
				align-items: center;
				justify-content: flex-start;
				transition: all 0.6s $ease-in-out-p0;
				@include bp(2) {
					top: 0;
					justify-content: center;
					height: $nav-height;
				}
			}
			.icon-home {
				position: relative;
				top: vw(3);
				width: vw(32);
				height: vw(32);
				margin-right: vw(5);
				@include bp(2) {
					width: #{$nav-height / 3};
					height: #{$nav-height / 3};
				}
				svg {
					width: 100%;
					display: block;
				}
				path{
					fill: none;
					stroke: white;
					stroke-width: 2;
					stroke-linecap: square;
					stroke-miterlimit:10;
					transition: all 0.3s $ease-in-out-p0;
					@include bp(2) {
						stroke-width: 2;
						stroke: white;
					}
				}
			}
			&:hover {
    			background: white;
    			&:before, &:after {
    				top: 0; right: 0; bottom: 0; left: 0;
    			}
    			.icon-home {
    				path{
						stroke: $color-gold-1;
					}
    			}
    		}
		}

		.col > .text {
			margin-left: vw(210);
			height: 100%;
			width: vw(680);
			position: relative;
			@include bp(2) {
				margin: 0 auto;
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				padding: 180px 0 $nav-height;
			}
		}

		.steps {
			width: 100%;
			height: 100vh;
			float: left;
			display: flex;
			align-items: center;
			justify-content: center;
			@include bp(2) {
				padding-top: 0;
				height: auto;
				float: none;
			}
			.inner {
				width: 75%;
				margin: auto;
				text-align: center;
				@include bp(2) {
					width: 90%;
					padding: 0;
				}
				&.do-count {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					padding: 120px 0px;
				}
			}

			.input {
				position: relative;
				@include bp(2) {
					margin: 0 0 vw(120);
				}
				input#rsvp-input {
					font-family: $font-regular;
					display: block;
					padding: 0;
					background: none;
					border: none;
					width: 80%;
					margin: auto;
					text-align: center;
					border-radius: 2px;
					padding: vw(10) vw(10);
					font-size: 1.5vw;
					position: relative;
					z-index: 1;
					width: 100%;
					color: rgba($color-navy, 1);
					background: transparent;
					border-bottom: 2px solid $color-navy;
					margin: vw(40) 0 vw(40);
					@include bp(2) {
						padding: vw(30) vw(30);
						font-size: 6vw;
					}
				}
				.input-placeholder {
					position: absolute;
					font-size: 1.875vw;
					opacity: 1;
					text-align: center;
					top: 50%; left: 0; right: 0;
					transform-origin: 50% 0;
					font-family: $font-bold;
					color: $color-gold-1;
					transform: scale(1) translate(0, -100%);
					transition: all 0.3s $ease-in-out-p0 0.6s;
					opacity: 0;
					z-index: 0;
					@include bp(2) {
						font-size: 6vw;
					}
					&.active {
						top: -15%;
						transform: scale(0.5) translate(0, -50%);
					}
				}
				input:active + .input-placeholder,
				input:focus + .input-placeholder {
					top: -15%;
					transform: scale(0.5) translate(0, -50%);
					transition-delay: 0s;
				}
				.input-message {
					position: absolute;
					bottom: -0.5em;
					left: 0;
					right: 0;
					font: 1em $font-bold;
					text-align: center;
					color: #ce203e;
					transform: translate(0, 100%);
					
				}
				input:focus {
					outline: none;
				}
				
				&.incorrect {
					input{
						border-color: #ce203e;
					}
					.input-message:before {
						content: 'Sorry, wrong password.'
					}
				}
			}

			.step-1-button,
			.step-2-button {
				opacity: 0;
				visibility: hidden;
				transform: translate3d(0, 50%, 0);
				transition: 
					opacity 0.3s ease-in 0s,
					transform 0.3s ease-in 0s;
				&.active {
					opacity: 1;
					visibility: visible;
					transform: translate3d(0, 0, 0);
					transition: 
						opacity 0.3s ease-out,
						transform 0.3s ease-out;
						@include bp(2) {
							.wedding-button.continue .border {
								border-color: $color-gold-1;
							}
							.wedding-button.continue .text {
								color: $color-gold-1;
							}
						}

				}
				@include bp(2) {
					opacity: 1;
					visibility: visible;
					transform: translate3d(0, 0, 0);
				}
			}

			.wedding-button.continue {
				&:before {
					display: none;
				}
				.text {
					text-transform: uppercase;
					color: $color-gold-1;
					@include bp(2) {
						color: rgba($color-navy, 0.1);
					}
				}
				.border {
					border-color: $color-gold-1;
					@include bp(2) {
						border-color: rgba($color-navy, 0.1);
					}
				}
			}


			&.step-1 {
				z-index: 0;
				p span {
					display: block;
				}
			}
			&.step-2 {
				background: lighten($color-gold-2, 10%);
				position: absolute;
				top: 0;
				left: 0;
				bottom: 0;
				transform: translate3d(200%, 0, 0);
				transition: all 1s $ease-in-out-p0;
				z-index: 1;
				h3 {
					font: normal 3.5vw/1 $font-bold;
					margin: 0 0 vw(30);
					color: $color-gold-1;
					@include bp(2) {
						font-size: 12vw;
					}
				}
				p {
					margin: 0;
				}
				&.verified {
					margin-left: 0;
					left: vw(50);
					width: calc(100% - #{vw(50)});
					transform: translate3d(0, 0, 0);
					@include bp(2) {
						width: 100%;
						left: 0;
					}
					h3 {
						margin: 0 0 vw(15);
					}
				}
				select {
					cursor: context-menu;
					width: 100%;
					margin: 0;
					font: normal 1.5vw $font-bold;
					padding: vw(15);
					border-radius: 0;
					display: block;
					border: 2px solid $color-gold-1;
					outline: none;
					background: white;
					appearance: none;
					transition: all 0.3s ease-in-out;
					@include bp(2) {
						margin-bottom: 60px;
						font-size: 6vw;
						padding: vw(30) vw(30);
					}
				}
			}
		}

		#guest-count {
			margin-top: vw(20);
			position: relative;
			@include bp(2) {
				margin: 30px 0;
			}
			.icon-arrow {
				pointer-events: none;
				position: absolute;
				top: 0;
				right: 0;
				bottom: 0;
				width: vw(60);
				background: $color-gold-1 url('../assets/images/icon-select-arrow.svg') 50% 50%/auto 50% no-repeat;
				transition: all 0.3s ease-in-out;
				@include bp(2) {
					width: vw(120);
				}
			}
			&:hover .icon-arrow {
				background-color: darken($color-gold-1, 15%);
			}
			&:hover select {
				border-color: darken($color-gold-1, 15%);
			}
		}

		.col:nth-of-type(2) {
			width: vw(550);
			position: relative;
			z-index: 1;
			background: white;
			overflow: hidden;
			@include bp(2) {
				display: none;
				position: relative;
				width: 100%;
				height: 20vh;
				z-index: 2;
				bottom: 0;
			}
			.wedding-image {
				position: absolute;
				overflow: hidden;
				top: 0; right: 0; bottom: 0; left: 0;
				transform: scale(1.01);
				&:before {
					content: '';
					position: absolute;
					top: 0; right: 0; bottom: 0; left: 0;
					border: 2px solid white;
					z-index: 1;
				}
				img {
					position: relative;
					width: auto;
					height: 100%;
					left: 50%;
					transform: translate(-50%, 0);
					@include bp(2) {
						width: 200%;
						height: auto;
						top: 50%;
						transform: translate(-50%, -50%);
					}
				}
			}
			a {
				position: absolute;
				top: vw(50);
				right: vw(50);
				color: white;
				z-index: 1337;
			}
		}
	}

</style>
