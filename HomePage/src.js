    
$(document).ready(()=> 
{
            let lastpass;
    
        $('#log-in').hide();
        $('#reg-field').hide();
        console.log("inside ready function ")
        $.validator.addMethod('emailValidator',(val)=>{
            let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return reg.test(val);
        })
        $.validator.addMethod("phoneValidator",(val)=>{
            if(val>6000000000 && val <9999999999)
             return true;
        })
        $.validator.addMethod('passValidator',(val)=>{
            // console.log(val);
            lastpass=val;
           let reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
           return reg.test(val);
        })
        $.validator.addMethod('repassValidator',(val,element)=>{
            if(lastpass==val){
                $(`#${element.id}`).removeClass('is-invalid')
                $(`#${element.id}`).addClass('is-valid');
                return true;
              
            }
        })
        $('#logIn-btn a').click(()=>{
        // $('#log-in').show()
        $('#log-in').slideToggle(2000)
     });
  
       $('#reg-btn').click(()=>{
        // alert('hello');
        $('#log-in').fadeOut(500);
         $('#reg-field').fadeIn(2000);
       })


       $('#re-sub').click(()=>{
        $('label').removeAttr("style")
        $(`#reg_repassword`).addClass('is-invalid');
           $('#reg_form').validate({
               rules:{
                reg_name:'required',
                reg_dob:'required',
                reg_email:{
                    required:true,
                    emailValidator:true
                },
                reg_password:{
                    required:true,
                    passValidator:true
                },
                reg_repassword:{
                    required:true,
                    repassValidator:true
                },
                reg_phone:{
                    required:true,
                    phoneValidator:true
                }
               },
               messages:{
                   reg_email:'Not a Valid Email',
                   reg_password:'Not a Strong Password',
                   reg_repassword:'Not same ',
                   reg_phone:'please enter a valid phone'
               }
           })

           $('label').removeAttr("style")
       })

    });







