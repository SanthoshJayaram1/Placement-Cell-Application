import Student from '../models/student.js';
import Interview from '../models/interview.js';

export const interviewPage = async function (req, res) {
    const studentList = await Student.find({});
    const interview_list = await Interview.find({});
    return res.render('interview', {
        title: "Interview List",
        studentList: studentList,
        interview_list: interview_list

    });
}

// form for interview allocation
export const interviewForm = async function (req, res) {
    return res.render('formForInterviewAllocation', {
        title: "Interview Allocation",
        id: req.params.id
    })
}
export const interviewAllocation = async function (req, res) {
    try {
        const companyPresent = await Interview.findOne({ companyName: req.body.companyName });
        if (companyPresent) {
            const id = req.body.studentID;
            const studentPresent = await Student.findById(id);
            const index = studentPresent.interviews.indexOf(companyPresent.id);
            if (index == -1) {
                studentPresent.interviews.push(companyPresent.id);
                await studentPresent.save();
            }
            //interview table
            const cindex = companyPresent.students.indexOf(studentPresent.id);
            if (cindex == -1) {
                companyPresent.students.push(studentPresent.id);
                await companyPresent.save();
            }
        } else {
            const company = await Interview.create({ companyName: req.body.companyName, date: req.body.date });
            const id = req.body.studentID;
            const studentPresent = await Student.findById(id);
                company.students.push(studentPresent.id);
                await company.save();
        }
        req.flash('success' , 'Interview Allocate To Student SuccessFully !!')
        return res.redirect('/employee/dashboard');
    } catch (error) {
        console.log(error);
        return res.send("Error in allocating interview")
    }

}

