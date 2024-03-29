const { Guild } = require('discord.js');
const { get_task_index } = require('../../helper functions/tools');

module.exports = (client, message, Discord, args) => {
	
	// sends "We out here, Baby! My prefix is .." when the bot goes online 
	console.log('We out here, Baby! My prefix is ..') 

	/*
	 	NOT SURE IF THIS BELGONS HERE BUT HERE WE ARE
	*/

	setInterval(function(){
		// makes a google object to interact with
		const { google } = require('googleapis');
        
		// gets some important files 
		const keys = require(`../../keys.json`);
        
		// makes a google client to interact with 
		const gclient = new google.auth.JWT(
            keys.client_email, 
            null, 
            keys.private_key, 
            ['https://www.googleapis.com/auth/spreadsheets'],
        )
        
		// authorizes the client 
		// kind of he main function that runs 
		gclient.authorize(function(err, tokens) {
            if (err) {
                console.log(err);
                return;
            } else {
                gsrun(gclient);
            }
        })
        
		// runs the client 
		async function gsrun(cl){
            
			// establishes the google api connection sort of
			const gsapi = google.sheets({ version: 'v4', auth: cl })

			// assigns a manually entered range to 'timestamps'
			const ts = {
				spreadsheetId: '1EbdTodl_ZwQNLbEDHwpPhWLkYTCqH6sDGISSTF0PuPg',
				range: 'Sheet1!A2:A7',
			}
			// gets the content of the cells in the assigned range
            // gets the values of the cells 
			// more of formatting to make them easier to work with
			let ts_array = (await gsapi.spreadsheets.values.get(ts)).data.values;

			const hour = {
				spreadsheetId: '1EbdTodl_ZwQNLbEDHwpPhWLkYTCqH6sDGISSTF0PuPg',
				range: 'Sheet1!C9:C9'
			}
			let hour_string = (await gsapi.spreadsheets.values.get(hour)).data.values[0][0];

			// gets the current day 
			const day = {
				spreadsheetId: '1EbdTodl_ZwQNLbEDHwpPhWLkYTCqH6sDGISSTF0PuPg',
				range: 'Sheet1!B9',
			}
            let day_string = (await gsapi.spreadsheets.values.get(day)).data.values[0][0];

			// gets the index of the task that corresponds to the current timeslot
            let task_index = get_task_index(ts_array, hour_string);

			switch (day_string) {

				case 'Monday':
					// assigns a manually entered range to the day
					const mon = {
						spreadsheetId: '1EbdTodl_ZwQNLbEDHwpPhWLkYTCqH6sDGISSTF0PuPg',
						range: 'Sheet1!B2:B7',
					}
					// gets the content of the assigned cells
					// gets all the values of all the tasks in a formatted way 
					let mon_tasks = (await gsapi.spreadsheets.values.get(mon)).data.values;
                    
					// sends to the user a message containing the task based on the previously gotten index
					text_message =  mon_tasks[task_index];
					break;

				case 'Tuesday':
					const tues = {
						spreadsheetId: '1EbdTodl_ZwQNLbEDHwpPhWLkYTCqH6sDGISSTF0PuPg',
						range: 'Sheet1!C2:C7',
					}
                    let tues_tasks = (await gsapi.spreadsheets.values.get(tues)).data.values;
					text_message = tues_tasks[task_index];
					break;

				case 'Wednesday':
					const wednes = {
						spreadsheetId: '1EbdTodl_ZwQNLbEDHwpPhWLkYTCqH6sDGISSTF0PuPg',
						range: 'Sheet1!D2:D7',
					}
                    let wednes_tasks = (await gsapi.spreadsheets.values.get(wednes)).data.values;
                    text_message = wednes_tasks[task_index];
					break;

				case 'Thursday':
					const thurs = {
						spreadsheetId: '1EbdTodl_ZwQNLbEDHwpPhWLkYTCqH6sDGISSTF0PuPg',
						range: 'Sheet1!E2:E7',
					}
                    let thurs_tasks = (await gsapi.spreadsheets.values.get(thurs)).data.values;
                    text_message = thurs_tasks[task_index];
					break;

				case 'Friday':
					const fri = {
						spreadsheetId: '1EbdTodl_ZwQNLbEDHwpPhWLkYTCqH6sDGISSTF0PuPg',
						range: 'Sheet1!F2:F7',
					}
					let fri_tasks = (await gsapi.spreadsheets.values.get(fri)).data.values;
                    text_message =  fri_tasks[task_index];
					break;

				case 'Saturday':
					const satur = {
						spreadsheetId: '1EbdTodl_ZwQNLbEDHwpPhWLkYTCqH6sDGISSTF0PuPg',
						range: 'Sheet1!G2:G7',
					}
                    let satur_tasks = (await gsapi.spreadsheets.values.get(satur)).data.values;
                    text_message = satur_tasks[task_index];
					break;

				case 'Sunday':
					const sun = {
						spreadsheetId: '1EbdTodl_ZwQNLbEDHwpPhWLkYTCqH6sDGISSTF0PuPg',
						range: 'Sheet1!H2:H7',
					}
                    let sun_tasks = (await gsapi.spreadsheets.values.get(sun)).data.values;
                    text_message = sun_tasks[task_index];
					break;
			} 
			const user = client.users.cache.get('367386925323124748');
			user.send(text_message);
		}
	}, 20*1000)
}