$( function() {

    var buttons = $(".section button");
    var status = $("#status");
    var valeur = $(".value");
    var valeur2 = $(".value2");
    var div = $(".section");
    var invent = $('.inventaire');

    div.hide();
    $(".arc").hide();
    $(".popo").hide();
    $(".clé").hide();
    $(".vie").hide();
    $("#intro").show();

    var lifemonster = $(".life_monster");
    lifemonster.hide();
    var pv_mnst;
	
    buttons.click( function() {

        // début de partie
        if($(this).attr('go')=="wakeUp"){
            startGame();
                
        }
        if($(this).attr('go')=="popo"){
            $(".popo").hide();
                
        }

        // cas ou le joueur se tape la tête et le cas ou il crochette la porte
        if ($(this).attr('go')=="hitWall" || $(this).attr('go')=="hitDoor" || $(this).attr('go')=="hitCoffre"){
            loseOneLife();
        }
		
        if ($(this).attr('go')=="corridor") {
            $('#fight button').not('.popo').attr('go','fight');
        };

        // début du combat
        if($(this).attr('go')=="fight"){
            lifemonster.show();

            // premier choix d'attaque (poing)
            if($(this).attr('att')=="1"){
                hit();

                // teste si la valeur du monstre est en dessous de 0
                if($(".value2").text()==0 || $(".value2").text()<0){
                    $(this).attr('go','win');
                    lifemonster.hide();
                    var pv = Math.floor((Math.random()*5)+1);
                    valeur2.text(pv);
                    $("#fight span").html(" ");

                }

                // continuer le combat car le monstre est vivant
                else{
                    attackMonster();
                     $("#fight span").html("Vous avez perdu "+pv_mnst+" PV. Le monstre a perdu 1 PV. <br/>");
                    gotoSection('fight');
                }
            }

            // deuxième choix d'attaque (épee)
            if($(this).attr('att')=="2"){
                sword();
                if($(".value2").text()==0 || $(".value2").text()<0){
                    $(this).attr('go','win');
                    lifemonster.hide();
                    var pv2 = Math.floor((Math.random()*5)+1);
                    valeur2.text(pv2);
                    $("#fight span").html(" ");

                }

                // continuer le combat car le monstre est vivant
                else{
                    attackMonster();
                    $("#fight span").html("Vous avez perdu "+pv_mnst+" PV. Le monstre a perdu 2 PV. <br/>");
                    gotoSection('fight');
					
                }
            }

            //attaque arc
            if($(this).attr('att')=="3"){
                arc();

                if($(".value2").html()==0 || $(".value2").html()<0){
                    $(this).attr('go','win');
                    lifemonster.hide();
                    var pv2 = Math.floor((Math.random()*5)+1);
                    valeur2.text(pv2);
                    $("#fight span").html(" ");

                }

                // continuer le combat car le monstre est vivant
                else{
                    attackMonster();
                    $("#fight span").html("Vous avez perdu "+pv_mnst+" PV. Le monstre a perdu 3 PV. <br/>");
                    gotoSection('fight');
                }
            }
        }

        // si il gagne un combat avec un monstre
        if($(this).attr('att')=="vie"){
            $(".vie").css("display","block");
        }
        if($(this).attr('att')=="arc"){
            $(".arc").css("display","block");
        }
        if($(this).attr('att')=="popo"){
            $(".popo").css("display","block");
        }
        if($(this).attr('att')=="clé"){
            $(".clé").css("display","block");
        }	

        //mort ou etape suivante
        if ( (valeur.html() ==0)||(valeur.html()<0 ))  {
            endGame();
            valeur.html(0);
        }
        else{
            gotoSection($(this).attr('go'));
        }
    });

    $(".vie").click(function(){
        getLife();
        $(".vie").hide();
        alert("Vous avez gagné 2pv");
    });
	
    function attackMonster(){
        var tmp ;
        tmp = valeur.html();
        var degat = Math.floor((Math.random()*3)+1);
        valeur.html(tmp-degat);
        pv_mnst=degat;
    }
	

    function gotoSection(key) {
        div.hide();
        $("#"+key).show();
    }
	
    function loseOneLife() {
        var tmp ;
        tmp = valeur.html();
        valeur.html(tmp-1);
    }
	
    function getLife() {
        var tmp ;
        tmp = parseInt(valeur.html());
        valeur.html(tmp+2);
    }

    function startGame() {
        valeur.html(10);
        var pv = Math.floor((Math.random()*5)+3);
        valeur2.text(pv);
        $(".arc").hide();
        $(".popo").hide();
        $(".clé").hide();
        $(".vie").hide();
        lifemonster.hide();
    }
	
    function endGame() {
        gotoSection('death');
    }
	
    function hit(){
        var pv = valeur2.text();
        valeur2.text(pv-1);
    }
	
    function sword(){
        var pv = valeur2.text();
        valeur2.text(pv-2);
    }

    function arc(){
        var pv = valeur2.text();
        valeur2.text(pv-3);
    }
});
