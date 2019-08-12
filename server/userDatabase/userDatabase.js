var user = [
    {
        Name: 'Josefin',
        Age: 21,
        Height: 169,
        Weight: 59,
        Gender: 'F',
        Preference: '',
        Type: '',
        BMI: 0
    }
]

function calculateBMI(use) 
{   var i = 0
    use.forEach(u => {  
        
        u.BMI = u.Weight / ((u.Height* u.Height)/10000)
        user[i].BMI = u.BMI
        console.log('Your BMI is ',u.BMI)
        if(user[i].BMI<18.5)
        {
            user[i].Type = 'underweight'
        }
        else if(18.5<user[i].BMI && user[i].BMI < 25)
        {
             user[i].Type = 'normal weight'
        }
        else if( 25 <user[i].BMI && user[i].BMI< 30 )
        {
            user[i].Type = 'overweight'
        }
        else
        {
            user[i].Type = 'Obese'
        }
        i++
    });
    return user
}

 console.log(calculateBMI(user))
