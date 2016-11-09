const config = [
	{
		src: require('./assets/images/Patient_Safety_Slide01.png'),
		relative: [
			{
				type: 'image',
				src: require('./assets/images/Patient_Safety_Logo.png'),
				classes: ['philips-logo']
			}
		],
		toc: true,
	},
	// {
	// 	src: require('./assets/images/Patient_Safety_Slide02.png'),
	// 	title: 'Patient Safety',
	// 	buttons: [
	// 		{
	// 			type: 'square',
	// 			src: require('./assets/images/Button-1_Overview.png'),
	// 			classes: ['playlist'],
	// 			ref: '1_Overview',
	// 		}
	// 	]
	// },
	// {
	// 	src: require('./assets/images/Patient_Safety_Slide03.png'),
	// 	title: 'PCMS Overview',
	// 	buttons: [
	// 		{
	// 			type: 'square',
	// 			src: require('./assets/images/Button-PCMS_Overview.png'),
	// 			classes: ['open-submenu'],
	// 			submenu: [
	// 				{
	// 					ref: 'PCMS_Overview',
	// 					title: 'About us',
	// 					classes: ['playlist'],
	// 					playlistIndex: 1,
	// 				},
	// 				{
	// 					ref: 'PCMS_Overview',
	// 					title: 'Business Lines',
	// 					classes: ['playlist'],
	// 					playlistIndex: 32,
	// 				},
	// 				{
	// 					ref: 'PCMS_Overview',
	// 					title: 'Customer Engagement',
	// 					classes: ['playlist'],
	// 					playlistIndex: 39,
	// 				}
	// 			],
	// 		}
	// 	]
	// },
	// {
	// 	src: require('./assets/images/Patient_Safety_Slide04.png'),
	// 	title: 'Alarm Hazards',
	// 	buttons: [
	// 		{
	// 			type: 'square',
	// 			src: require('./assets/images/Button-2_Overview.png'),
	// 			classes: ['playlist'],
	// 			ref: '2_Overview',
	// 		}
	// 	]
	// },
	// {
	// 	src: require('./assets/images/Patient_Safety_Slide05.png'),
	// 	title: 'Healthcare Associated Infections',
	// 	buttons: [
	// 		{
	// 			type: 'square',
	// 			src: require('./assets/images/Button-3_Perioperative_Solutions.png'),
	// 			classes: ['playlist'],
	// 			ref: '3_Perioperative_Solutions',
	// 		},
	// 		{
	// 			type: 'square',
	// 			src: require('./assets/images/Button-3_Respironics_V680.png'),
	// 			classes: ['playlist'],
	// 			ref: '3_Respironics_V680',
	// 		},
	// 		{
	// 			type: 'square',
	// 			src: require('./assets/images/Button-3_Supplies.png'),
	// 			classes: ['playlist'],
	// 			ref: '3_Supplies',
	// 		}
	// 	]
	// },
	// {
	// 	src: require('./assets/images/Patient_Safety_Slide06.png'),
	// 	title: 'Patient Deterioration',
	// 	buttons: [
	// 		{
	// 			type: 'square',
	// 			src: require('./assets/images/Button-4_Birth_Experience.png'),
	// 			classes: ['playlist'],
	// 			ref: '4_Birth_Experience',
	// 		},
	// 		{
	// 			type: 'square',
	// 			src: require('./assets/images/Button-4_Safer_Wards.png'),
	// 			classes: ['playlist'],
	// 			ref: '4_Safer_Wards',
	// 		}
	// 	]
	// },
	// {
	// 	src: require('./assets/images/Patient_Safety_Slide07.png'),
	// 	title: 'Sepsis',
	// 	buttons: [
	// 		{
	// 			type: 'square',
	// 			src: require('./assets/images/Button-5_Beat_of_Innovation.png'),
	// 			classes: ['content-item'],
	// 			ref: '5_Beat_of_Innovation',
	// 		},
	// 		{
	// 			type: 'square',
	// 			src: require('./assets/images/Button-5_Documents.png'),
	// 			classes: ['playlist'],
	// 			ref: '5_Documents',
	// 		},
	// 		{
	// 			type: 'square',
	// 			src: require('./assets/images/Button-5_Education.png'),
	// 			classes: ['playlist'],
	// 			ref: '5_Education',
	// 		}
	// 	]
	// },
	// {
	// 	src: require('./assets/images/Patient_Safety_Slide08.png'),
	// 	title: 'Sudden Cardiac Arrest',
	// 	buttons: [
	// 		{
	// 			type: 'square',
	// 			src: require('./assets/images/Button-6_Overview.png'),
	// 			classes: ['content-item'],
	// 			ref: '6_Overview',
	// 		},
	// 		{
	// 			type: 'square',
	// 			src: require('./assets/images/Button-HeartStart_FR3.png'),
	// 			classes: ['playlist'],
	// 			ref: 'HeartStart_FR3',
	// 		}
	// 	]
	// },
	// {
	// 	src: require('./assets/images/Patient_Safety_Slide09.png'),
	// 	title: 'CareEvent',
	// 	buttons: [
	// 		{
	// 			type: 'square',
	// 			src: require('./assets/images/Button-7_CareEvent.png'),
	// 			classes: ['playlist'],
	// 			ref: '7_CareEvent',
	// 		}
	// 	]
	// },
	// {
	// 	src: require('./assets/images/Patient_Safety_Slide10.png'),
	// 	title: 'Advanced system-level monitoring',
	// 	buttons: [
	// 		{
	// 			type: 'square',
	// 			src: require('./assets/images/Button-8_CSCN.png'),
	// 			classes: ['playlist'],
	// 			ref: '8_CSCN',
	// 		},
	// 		{
	// 			type: 'square',
	// 			src: require('./assets/images/Button-Patient_Monitoring.png'),
	// 			classes: ['playlist'],
	// 			ref: 'Patient_Monitoring',
	// 		},
	// 		{
	// 			type: 'square',
	// 			src: require('./assets/images/Button-Critical_Care.png'),
	// 			classes: ['playlist'],
	// 			ref: 'Critical_Care',
	// 		}
	// 	]
	// },
	// {
	// 	src: require('./assets/images/Patient_Safety_Slide11.png'),
	// 	title: 'Monitor with convenience and value',
	// 	buttons: [
	// 		{
	// 			type: 'square',
	// 			src: require('./assets/images/Button-10_Efficia.png'),
	// 			classes: ['playlist'],
	// 			ref: '10_Efficia',
	// 		}
	// 	]
	// },
	// {
	// 	src: require('./assets/images/Patient_Safety_Slide12.png'),
	// 	title: 'Expression MR400',
	// 	buttons: [
	// 		{
	// 			type: 'square',
	// 			src: require('./assets/images/Button-Expression_MR400.png'),
	// 			classes: ['playlist'],
	// 			ref: 'Expression_MR400',
	// 		}
	// 	]
	// },
	// {
	// 	src: require('./assets/images/Patient_Safety_Slide13.png'),
	// 	title: 'Count on us as your patients count on you',
	// 	buttons: [
	// 		{
	// 			type: 'square',
	// 			src: require('./assets/images/Button-Services_Portfolio.png'),
	// 			classes: ['content-item'],
	// 			ref: 'Services_Portfolio',
	// 		},
	// 		{
	// 			type: 'square',
	// 			src: require('./assets/images/Button-9_Services.png'),
	// 			classes: ['playlist'],
	// 			ref: '9_Services',
	// 		},
	// 		{
	// 			type: 'square',
	// 			src: require('./assets/images/Button-9_Evolution.png'),
	// 			classes: ['open-submenu'],
	// 			submenu: [
	// 				{
	// 					ref: 'RightFit_Presentation',
	// 					title: 'Presentation',
	// 					classes: ['playlist'],
	// 				},
	// 				{
	// 					ref: 'Evolution_brochure',
	// 					title: 'Evolution brochure',
	// 					classes: ['content-item'],
	// 				},
	// 				{
	// 					ref: 'Biomed_video',
	// 					title: 'Biomed video',
	// 					classes: ['content-item'],
	// 				},
	// 				{
	// 					ref: 'IT_video',
	// 					title: 'IT video',
	// 					classes: ['content-item'],
	// 				},
	// 				{
	// 					ref: 'Hospital_Board_video',
	// 					title: 'Hospital Board video',
	// 					classes: ['content-item'],
	// 				}
	// 			],
	// 		},
	// 		{
	// 			type: 'square',
	// 			src: require('./assets/images/Button-9_Monitoring.png'),
	// 			classes: ['playlist'],
	// 			ref: '9_Monitoring',
	// 		},
	// 		{
	// 			type: 'square',
	// 			src: require('./assets/images/Button-Clinical_Services.png'),
	// 			classes: ['playlist'],
	// 			ref: 'Clinical_Services',
	// 		}
	// 	]
	// },
	// {
	// 	src: require('./assets/images/Patient_Safety_Slide14.png'),
	// 	title: 'Mother and Child Care',
	// 	buttons: [
	// 		{
	// 			type: 'square',
	// 			src: require('./assets/images/Button-Mother_and_Child_Care.png'),
	// 			classes: ['playlist'],
	// 			ref: 'Mother_and_Child_Care',
	// 		}
	// 	]
	// },
	// {
	// 	src: require('./assets/images/Patient_Safety_Slide15.png'),
	// 	title: 'Hospital Respiratory Care',
	// 	buttons: [
	// 		{
	// 			type: 'square',
	// 			src: require('./assets/images/Button-HRC.png'),
	// 			classes: ['playlist'],
	// 			ref: 'HRC',
	// 		}
	// 	]
	// },
	// {
	// 	src: require('./assets/images/shield.png'),
	// }
]

module.exports = {
  config,
}
