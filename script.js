$(document).ready(function() {
    $('body').append('<div id="goDzicz" style="position: fixed; cursor: pointer; top: 0; right: 328px; z-index: 9999"></div>');
    $('body').append('<div id="goButton" style="border-radius: 4px;position: fixed; cursor: pointer; top: 5px; right: 10px; font-size: 36px; text-align: center; width: 100px; height: 48px; line-height: 48px; background: ' + $('.panel-heading').css('background-color') + '; z-index: 9999">GO</div>');
    $('body').append('<div id="goAutoButton" style="border-radius: 4px;position: fixed; cursor: pointer; top: 5px; right: 122px; font-size: 36px; text-align: center; width: 140px; height: 48px; line-height: 48px; background: ' + $('.panel-heading').css('background-color') + '; z-index: 9999">AutoGO</div>');


    var iconSelect;

    iconSelect = new IconSelect("goDzicz", {
        'selectedIconWidth': 48,
        'selectedIconHeight': 48,
        'selectedBoxPadding': 1,
        'iconsWidth': 48,
        'iconsHeight': 48,
        'boxIconSpace': 1,
        'vectoralIconNumber': 1,
        'horizontalIconNumber': 6
    });

    var icons = [];
    //            icons.push({'iconFilePath':'http://poke-life.net/images/ikony/gesty_zagajnik.jpg', 'iconValue':'gesty_zagajnik'});
    //            icons.push({'iconFilePath':'http://poke-life.net/images/ikony/dolina_wiatrakow.jpg', 'iconValue':'dolina_wiatrakow'});
    //            icons.push({'iconFilePath':'http://poke-life.net/images/ikony/koronny_szczyt.jpg', 'iconValue':'koronny_szczyt'});
    //            icons.push({'iconFilePath':'http://poke-life.net/images/ikony/potrojny_staw.jpg', 'iconValue':'potrojny_staw'});
    //            icons.push({'iconFilePath':'http://poke-life.net/images/ikony/pustynia_lodowa.jpg', 'iconValue':'pustynia_lodowa'});
    //            icons.push({'iconFilePath':'http://poke-life.net/images/ikony/wielkie_bagna.jpg', 'iconValue':'wielkie_bagna'});


    $.each($('#pasek_skrotow li'), function(index, item) {
        if ($(item).find('a').attr('href').substring(0, 9) == "gra/dzicz") {
            icons.push({ 'iconFilePath': $(item).find('img').attr('src'), 'iconValue': $(item).find('a').attr('href').substring(28) });
        }
    });



    iconSelect.refresh(icons);

    iconSelect.setSelectedIndex(1);


    function parseHealth() {
        var link = $('button[href="dzicz.php?miejsce=' + iconSelect.getSelectedValue() + '&wybierz_pokemona=1"] span').html();
        link = link.replace("% PŻ", "");
        link = Number(link);
        return link;

    }

    function click() {
        if ($('.dzikipokemon-background-shiny').length == 1) {
            $('#goButton').css('background', 'green');
            clearInterval(window.repeat);
        } else if ($('.dzikipokemon-background-normalny').length == 1) {
            if (parseHealth() <= 70) {
                $('#skrot_leczenie').trigger('click');
                $('button[href="dzicz.php?miejsce=' + iconSelect.getSelectedValue() + '&wybierz_pokemona=4"]').trigger('click');
            } else {
                $('button[href="dzicz.php?miejsce=' + iconSelect.getSelectedValue() + '&wybierz_pokemona=1"]').trigger('click');
            }
        } else if ($('button[href="dzicz.php?miejsce=' + iconSelect.getSelectedValue() + '&zlap_pokemona=greatballe"]').length == 1) {
            $('button[href="dzicz.php?miejsce=' + iconSelect.getSelectedValue() + '&zlap_pokemona=greatballe"]').trigger('click');
        } else {
            if ($('.progress-stan2 div').attr('aria-valuenow') < 5) {
                clearInterval(window.repeat);
            } else {
                $('#pasek_skrotow a[href="gra/dzicz.php?poluj&miejsce=' + iconSelect.getSelectedValue() + '"] img').trigger('click');
            }
        }
    }

    $(document).on("click", '#goButton', function() {
        click();
    });

    $(document).on("click", '#goAutoButton', function() {
        window.repeat = setInterval(function() { click(); }, 500);
    });
});
