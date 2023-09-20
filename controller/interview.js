import Student from '../models/student.js';
import Interview from '../models/interview.js';

export const interviewPage = async function (req, res) {
    // retrieve all student data from Student collection 
    const studentList = await Student.find({});
    //retrieve all interview data from Interview collection
    const interview_list = await Interview.find({});
    // then render interview page with retrived data
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

// if company is not there in database it will create Interview and allocates to student
export const interviewAllocation = async function (req, res) {
    try {
        // checks if already there in database
        const companyPresent = await Interview.findOne({ companyName: req.body.companyName });
        // if company is already there in Interview collection
        if (companyPresent) {
            const id = req.body.studentID;
            const studentPresent = await Student.findById(id);
            // first checks whether there is a Entry of company linked  with student  in Database
            const index = studentPresent.interviews.indexOf(companyPresent.id);
            // if there is no record of company linked with student
            if (index == -1) {
                //then adds interview with studentpresent
                studentPresent.interviews.push(companyPresent.id);
                await studentPresent.save();
                // first checks whether there is a Entry of student linked with Interview  in Interview collection
                const cindex = companyPresent.students.indexOf(studentPresent.id);
                // if there is no link then adds a link with student in Interview collection 
                if (cindex == -1) {
                    companyPresent.students.push(studentPresent.id);
                    await companyPresent.save();
                }
                req.flash('success' , 'Interview Allocated To Student SuccessFully !!');
            }else{
                // if Interview is already sceduled to the student before, then scheduling is not allowed( only once is allowed)
                const datePart = companyPresent.date.toISOString().split('T')[0];
                req.flash('error',`Interview is Already scheduled on ${datePart}`);
            }
            
        } else {
            // if company is not present in Interview collection
            const company = await Interview.create({ companyName: req.body.companyName, date: req.body.date });
            const id = req.body.studentID;
            const studentPresent = await Student.findById(id);

            // push student inside newly created interview document
            company.students.push(studentPresent.id);
            await company.save();

            // update in student collection
            studentPresent.interviews.push(company);
            await studentPresent.save();
            req.flash('success' , 'Interview Allocated To Student SuccessFully !!');
        }
        // redirect to dashboard
        return res.redirect('/employee/dashboard');
    } catch (error) {
        console.log(error);
        return res.send("Error in allocating interview")
    }

}

