import Student from '../models/student.js';
import Interview from '../models/interview.js';
import Result from '../models/result.js';

// to  resultPage
export const resultPage = async function (req, res) {
    const id = req.params.id;
    // populates all students array and result array inside companyResult Object
    const companyResult = await Interview.findById(id).populate('students').populate('result');
    // then renders result page with retrieved data
    return res.render('result', {
        title: "Result",
        companyResult: companyResult
    });
}

// to update result data
export const update = async function (req, res) {
  try {
    // first we have to check whether result is already present or not and have to update again 
        const interviewId = req.body.interviewId;
        // find which interview it belongs as (interviewR)
        const interviewR=await Interview.findById(interviewId);
        // declare variable for already present result
        let resultAlreadypresent;
        let bool=false;
        // after getting which companyinterview it belongs loop over the result array inside interview document
        // for knowing whether result is there or not 
        for(var result of interviewR.result){
            const resultI=await Result.findById(result);
            if(resultI.studentId==req.body.studentId && resultI.interviewId==req.body.interviewId ){
                // if matches then result is already present
               resultAlreadypresent=result;
               // make boolean as true
               bool=true;
               break;
            }
        }
      if(!bool){ 
        //if boolean is false i.e not already present 
            // create Result document
            const createResult = await Result(req.body);
            await createResult.save();
            const id = req.body.interviewId;
            const interview = await Interview.findById(id);
            // after creating result document , update Interview document with created result
            interview.result.push(createResult);
            await interview.save();
        }else{
      // if result document for this interview and student already present
             // find that result document and update with latest status of the result  
            const updatedResult=Result.findById(resultAlreadypresent);
            updatedResult.result=req.body.result;
            try {
                //update the result after finding resultId
                await Result.findByIdAndUpdate(resultAlreadypresent, { result: req.body.result });
              } catch (err) {
                // if error occurs in finding
                req.flash('error', 'Error in updating !!');
                console.error("Error in updating:", err);
              }
        }

    // here updating status of the student based on result status submitted
        if (req.body.result == "PASS") {
            // if result is updated as PASS then make status of student as placed
            const studentId = req.body.studentId;
            const studentPresent = await Student.findById(studentId);
            studentPresent.status = "placed";
            await studentPresent.save();
            req.flash('success', 'Status Updated !!');
        }else{
            // if result is updated as other than PASS status  then make status of student as not_placed
            const studentId = req.body.studentId;
            const studentPresent = await Student.findById(studentId);
            studentPresent.status = "not_placed";
            await studentPresent.save();
            req.flash('success', 'Status Updated !!');
        }
        req.flash('success', 'Result Updated !!');
        // redirects to back
        return res.redirect('back');
    } catch (error) {
        // if there is a error
        console.log(error);
        req.flash('error', 'Error in updating data !!');
        return res.send("Error in updating data")
    }
}