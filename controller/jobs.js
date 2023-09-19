import axios from 'axios';

//to jobsPage 
export const jobPage = async function (req, res) {
    // retrieve all data from api
    const response = await axios.get("https://remotive.com/api/remote-jobs");
    const jobsData = response.data;
    // renders placementcell page with that data
    return res.render('placementCell', {
        title: "Placement Cell",
        body : jobsData.jobs
    });
};
