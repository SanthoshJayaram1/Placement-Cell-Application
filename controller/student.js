import validator from "validator";
import convertor from "objects-to-csv";
import Student from "../models/student.js";
import Interview from "../models/interview.js";
import Result from "../models/result.js";
import fs from "fs";


// employee dashboard list
export const dashboard = async function (req, res) {
    const studentList = await Student.find({});
    return res.render('employeeDashboard', {
        title: "EmployeeDashboard",
        studentList: studentList
    })
}

// add student page
export const addStudentPage = async function (req, res) {
    return res.render('addStudent', {
        title: "Student"
    })
}
export const addStudent = async function (req, res) {
    try {
        if (!validator.isEmail(req.body.email)) {
            req.flash('error' ,'Enter valid Email !!');
            return res.redirect('back');
        } else {
            console.log("inside alreadypresent");
            const presentStudent = await Student.findOne({ email: req.body.email });
            if (presentStudent) {
                req.flash('error' ,'Student Already Present!!');
                return res.redirect('back');
            } else {
                const addStudent = await Student(req.body);
                if(addStudent.status=="placed" || addStudent.status=="not_placed"){
                    await addStudent.save();
                    req.flash('success' , 'Student Added Successfully !!');
                return res.redirect('/employee/dashboard');
                }else{
                    req.flash('error','Enter Status either placed Or not_placed');
                    return res.redirect('/employee/student');
                }
                
            }
        }
    } catch (error) {
        console.log(error);
        return res.send('Error in adding student');
    }
}

export const downloadData = async function (req, res) {
    const studentList = await Student.find({});
    const dataPresent = [];
    for (var i = 0; i < studentList.length; i++) {
        const student = studentList[i];
        for (var j = 0; j < student.interviews.length; j++) {
            const id = student.interviews[j];
            const interviewData = await Interview.findById(id);
            //find result
            var result = "On Hold";
            const resultIndex = interviewData.result.indexOf(student.id);
            if (resultIndex != -1) {
                const resultData = await Result.find({ studentId: interviewData.result[resultIndex] });
                for (var k = 0; k < resultData.length; k++) {
                    if (resultData[k].interviewId == interviewData.id) {
                        result = resultData[k].result;
                        break;
                    }
                }
            }
            const list = {
                StudentId: student.id,
                Batch: student.batch,
                Name: student.name,
                Email: student.email,
                Status: student.status,
                College: student.college,
                DSA: student.DSA_FinalScore,
                WEBD: student.WebD_FinalScore,
                REACT: student.React_FinalScore,
                CompanyName: interviewData.companyName,
                InterviewDate: interviewData.date.toString().substring(4, 15),
                Result: result
            };
            dataPresent.push(list);
        }
    }
    const csv = new convertor(dataPresent);
    await csv.toDisk('./studentData.csv');
    return res.download('./studentData.csv', () => {
        //for deleting file
        fs.unlinkSync('./studentData.csv');
    });
}