$(document).ready(function() {


    $('button.nickRandom-btn').text('New Name').on('click',function() {
// OPTIONS

// Number of names
        var num_names = 2;

// Minimum size for names
        var min_name_size = 3;

// Maximum size for names
        var max_name_size = 8;

        var name_size;

        function letterRandomizer() {

            var randomNum;
            var letter;

            randomNum = 97 + Math.floor(Math.random() * 34);
            if (randomNum > 122) {
                switch (randomNum) {
                    case 123:
                        letter = 'a';
                        break;
                    case 124:
                        letter = 'e';
                        break;
                    case 125:
                        letter = 'i';
                        break;
                    case 126:
                        letter = 'o';
                        break;
                    case 127:
                        letter = 'u';
                        break;
                    case 128:
                        letter = 'y';
                        break;
                    case 129:
                        letter = 'w';
                        break;
                    default:
                        letter = '\'';
                        break;
                }
            } else {
                letter = String.fromCharCode(randomNum);
            }
            return letter;
        }

        var name = [num_names];
        var tempName, tempLetter, lastLetter;
        var consonant= 0, vogal= 0, plica=0;

        for (var i = 0; i < num_names; i++) {

            name_size = (min_name_size + Math.floor(Math.random() * (max_name_size - min_name_size + 1)));

            for (var u = 0; u < name_size; u++) {

                do{
                    tempLetter=letterRandomizer();
                    if(tempLetter=='a' || tempLetter=='e' || tempLetter=='y' || tempLetter=='i' || tempLetter=='o' || tempLetter=='w' || tempLetter=='u'){
                        vogal++;
                        consonant=0;
                        plica=0;
                    }else if(tempLetter =='\''){
                        plica++;
                        consonant=0;
                        vogal=0;
                    }else{
                        consonant++;
                        vogal=0;
                        plica=0
                    }
                }while(consonant>=3 || vogal>=3 || plica>=2 || lastLetter==tempLetter)
                lastLetter=tempLetter;


                if(u==0){
                    tempName = tempLetter.toUpperCase();
                }else {
                    tempName = tempName + tempLetter;
                }
            }
            name[i]= tempName;
            tempName = '';
        }
            var fullName='';
        for(i=0;i< num_names; i++){
            fullName=fullName + name[i] +' ';
        }
        $('div.nickRandom').text(fullName);
    })

});