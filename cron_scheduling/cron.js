const cron = require('node-cron');
const {individuals} = require('../models/model')

let startCronJob = ()=>{
  //min hour date month
  cron.schedule('30 01 31 06 *', async() => {
    try {
      let arrayOfPositions = ['president','vice president','secretary','programming head','treasurer','pr head','external affairs head','electroics head',
      'core coordinator']
      await individuals.updateMany(
        { position: { $in: arrayOfPositions } },
        { $set: { position: 'alumni' } }
      );
      await individuals.updateMany(
        { position: 'coordinator' },
        { $set: { position: 'core coordinator' } }
      );
      await individuals.updateMany(
        { position: 'executive'},
        { $set: { position: 'coordinator' } }
      );
    } catch (error) {
      console.log(error)
    }
    console.log('Running a task on June 31st, 2023 at 01:30 AM');
  },{
    scheduled: true,
    timezone: "Asia/Kolkata"
  });
}

module.exports = {startCronJob}