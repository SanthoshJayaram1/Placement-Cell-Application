import Student from '../models/student.js';
import Interview from '../models/interview.js';
import Result from '../models/result.js';

export const resultPage = async function (req, res) {
    const id = req.params.id;
    const companyResult = await Interview.findById(id).populate('students').populate('result');
    return res.render('result', {
        title: "Result",
        companyResult: companyResult
    });
}

export const update = async function (req, res) {
    try {
        console.log(req.body);
        const updateResult = await Result(req.body);
        console.log(updateResult);
        await updateResult.save();
        console.log("after");
        const id = req.body.interviewId;
        const interviewResult = await Interview.findById(id);
        const index = interviewResult.result.indexOf(req.body.studentId);
        if (index == -1) {
            interviewResult.result.push(req.body.studentId);
            await interviewResult.save();
        }
        if (req.body.result == "PASS") {
            const studentId = req.body.studentId;
            const studentPresent = await Student.findById(studentId);
            studentPresent.status = "placed";
            await studentPresent.save();
            req.flash('success', 'Status Updated !!');
        }
        req.flash('success', 'Result Updated !!');
        return res.redirect('back');
    } catch (error) {
        console.log(error);
        return res.send("Error in updating data")
    }
}