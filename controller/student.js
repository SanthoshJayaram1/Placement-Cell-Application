import validator from "validator";
import convertor from "objects-to-csv";
import Student from "../models/student.js";
import Interview from "../models/interview.js";
import Result from "../models/result.js";
import fs from "fs";


// employee dashboard list , renders dashboard page
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

// adds student in Student collection
export const addStudent = async function (req, res) {
    try {
        // first it validates entered email is correct or not
        if (!validator.isEmail(req.body.email)) {
            // if error
            req.flash('error' ,'Enter valid Email !!');
            // renders to dashboard page
            return res.redirect('back');
        } else {
            // check if there is a student with mail ID entered inside Student Database
            const presentStudent = await Student.findOne({ email: req.body.email });
            if (presentStudent) {
                // if student is already regestered with this Email id / already present
                req.flash('error' ,'Student Already Present!!');
                // renders back to dashboard page
                return res.redirect('back');
            } else {
                // if searched student email is not present in database then create Student document
                const addStudent = await Student(req.body);
                if(addStudent.status=="placed" || addStudent.status=="not_placed"){
                    await addStudent.save();
                    req.flash('success' , 'Student Added Successfully !!');
                    // renders to dashboard page
                return res.redirect('/employee/dashboard');
                }else{
                    // if there is error
                    req.flash('error','Enter Status either placed Or not_placed');
                    return res.redirect('/employee/student');
                }
            }
        }
    } catch (error) {
        console.log(error);
        req.flash('error','Error in adding student');
        return res.send('Error in adding student');
    }
}

// to download data in CSV format
export const downloadData = async function (req, res) {
    var resultV = "On Hold";
    // first collect all student data
    const studentList = await Student.find({});
    const dataPresent = [];

    // then after loop over for every student inside Student list
    for (let student of studentList) {

        // loop over interview details of every student
        for (let interviewID of student.interviews) {

            // get interview document by using interviewId
            const interviewData = await Interview.findById(interviewID);

            // loop over to find result status of every interview 
            for(let result of interviewData.result){
                const resultI=await Result.findById(result);
                if(interviewID.equals(resultI.interviewId)){
                    // get the result status if resultId object matches with interviewID object
                    resultV=resultI.result;
                    break;
                }
            }
            // create list of a particular student with particular interview with its result status
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
                Result: resultV
            };
            // and push this list inside dataPresent array
            dataPresent.push(list);
            resultV = "On Hold";
        }
    }
    // convert this array into CSV file
    const csv = new convertor(dataPresent);
    // save this as studentData.csv
    await csv.toDisk('./studentData.csv');
    // then finally give response as download that csv file
    return res.download('./studentData.csv', () => {
    // deleting file we saved
    fs.unlinkSync('./studentData.csv');
    });
}