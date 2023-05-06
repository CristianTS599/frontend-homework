

///  Method: PutFormToConsole
/// Purpose: This method Puts the contents of the UI form to the 
///          console while implementing input validation for the courses, 
///          and comment input fields
///    Args: 
///         - event: button submit event I need in order to stop the postback 
function PutFormToConsole(event) {
    // stop window refresh
    event.preventDefault();

    // grab the form
    let form = document.querySelector('form');
    
    // put items to the console
    console.log(`FullName: ${form.querySelector('#NameInput').value}`);
    console.log(`Email: ${form.querySelector('#EmailInput').value}`);
    console.log(`Registration: ${form.querySelector('#RegistrationDropDown').value}`);
    
    // grab all checkboxes
    let courses = form.getElementsByClassName('form-check-input');

    // search for check boxes that are checked and set display string
    let checkedCourses = ''
    for(let i = 0; i < courses.length; ++i) {
        if (courses[i].checked) {
            checkedCourses = `${checkedCourses} ${courses[i].value}`;
        }
    }

    // set no courses message
    if (checkedCourses === '') {
        checkedCourses = 'None Selected';
    }
    
    // put to console
    console.log(`Courses: ${checkedCourses}`);

    // extract comment from the form and check for empy
    let comment = form.querySelector('#CommentBox').value;
    if (comment === '') {
        comment = 'No Comment Made';
    }
    console.log(`Comment: ${comment}`);

    // helps see different attempts
    console.log('End Of Form\n\n\n');
}

//register event
document.querySelector('form').addEventListener('submit', PutFormToConsole);
