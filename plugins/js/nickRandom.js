$(document).ready(function() {

// OPTIONS

// Number of names
    var num_names = 2;

// Minimum size for names
    var min_name_size = 3;

// Maximum size for names
    var max_name_size = 8;

// Exact name size
    var exact_name_size = false;

// Letter probabilities
    var probabilities = {
        a: 2,
        e: 2,
        i: 2,
        o: 2,
        u: 2,
        y: 2,
        w: 2,
        q: 0.2,
        z: 0.5,
        x: 0.5,
        plica: 0.5
    };
// END OPTIONS


    probabilities = createProbabilities(probabilities);

    var max = 0;
    for (var i = 0; i < 27; i++) {
        max += probabilities[i];
    }

    function letterRandomizer(probabilities, max) {

        var randomNum;
        var i;

        randomNum = Math.random() * max;

        for (i = 0; i < 27; i++) {
            randomNum -= probabilities[i];
            if(randomNum <=0){
                if(i === 26){
                    return '\'';
                }

                return String.fromCharCode(i + 97);
            }
        }

        return null;
    }

    function createProbabilities(probabilities){
        var letter;

        var letterProbs = [];

        for (var i = 0; i < 26; i++) {

            letter = String.fromCharCode(i + 97);

            if(probabilities.hasOwnProperty(letter)){
                letterProbs.push(probabilities[letter]);
            }else{
                letterProbs.push(1);
            }

        }

        if(probabilities.hasOwnProperty('plica')){
            letterProbs.push(probabilities.plica);
        }else{
            letterProbs.push(1);
        }

        return letterProbs;
    }


    $('button.nickRandom-btn').text('New Name').on('click',function() {

        var name = [num_names];
        var tempName, tempLetter, lastLetter, name_size;
        var consonant= 0, vogal= 0, plica=0;

        for (var i = 0; i < num_names; i++) {

            name_size = exact_name_size ? exact_name_size : (min_name_size + Math.floor(Math.random() * (max_name_size - min_name_size + 1)));

            for (var u = 0; u < name_size; u++) {

                do{
                    tempLetter=letterRandomizer(probabilities, max);
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
                }while(consonant>=3 || vogal>=3 || plica>=2 || lastLetter===tempLetter);
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
