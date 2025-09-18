/* adapted from :
https://www.w3resource.com/javascript/form/email-validation.php
*/
function validate(mail) 
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
  {
  	console.log("email is valid")
    return (true)
  }
    console.log("You have entered an invalid email address!")
    return (false)
}
// test:
/*let isanemail = validate("ohio@study.streetwalder.edu")
console.log(isanemail)*/
// if true , that means it is working.