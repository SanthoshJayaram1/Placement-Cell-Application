import axios from 'axios';

export const jobPage = async function (req, res) {
    const response = await axios.get("https://remotive.com/api/remote-jobs");
    const jobsData = response.data;
    return res.render('placementCell', {
        title: "Placement Cell",
        body : jobsData.jobs
    });
};
