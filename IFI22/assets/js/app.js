$(document).ready(function() {
    $(window).resize(function() {
        let highestBox = 0;

        $('.box-defisc').css('height', 'auto');

        $('.box-defisc').each(function(){
            if($(this).height() > highestBox) {
                highestBox = $(this).height();
            }
        });

        $('.box-defisc').height(highestBox);
    }).resize();
});

$(".smooth-slide-to-content").on("click", function (event) {
    let target = event.target.attr("href");
    $(target).get(0).scrollIntoView();
});

$(document).ready(function() {
    $(window).resize(function() {
        let highestBox = 0;

        $('.title-picto').css('height', 'auto');

        $('.title-picto').each(function(){
            if($(this).height() > highestBox) {
                highestBox = $(this).height();
            }
        });

        $('.title-picto').height(highestBox);
    }).resize();
});

$(document).ready(function() {
    $(window).resize(function() {
        let highestBox = 0;

        $('.text-agir').css('height', 'auto');

        $('.text-agir').each(function(){
            if($(this).height() > highestBox) {
                highestBox = $(this).height();
            }
        });

        $('.text-agir').height(highestBox);
    }).resize();
});

$(document).ready(function() {
    $(window).resize(function() {
        let highestBox = 0;

        $('.btn-ir-ifi').css('height', 'auto');

        $('.btn-ir-ifi').each(function(){
            if($(this).height() > highestBox) {
                highestBox = $(this).height();
            }
        });

        $('.btn-ir-ifi').height(highestBox);
    }).resize();
});

$(document).ready(function() {
    $(window).resize(function() {
        let highestBox = 0;

        $('.stats').css('height', 'auto');

        $('.stats').each(function(){
            if($(this).height() > highestBox) {
                highestBox = $(this).height();
            }
        });

        $('.stats').height(highestBox);
    }).resize();
});

$(document).ready(function() {
    $(window).resize(function() {
        let highestBox = 0;

        $('.result-don').css('height', 'auto');

        $('.input-don-container').each(function(){
            if($(this).height() > highestBox) {
                highestBox = $(this).height();
            }
        });

        $('.result-don').height(highestBox);
    }).resize();
});


$(document).ready(function() {
    $(window).resize(function() {
        let width = $('.percent').width();
        $(".percent").height(width);
    }).resize();
});

const defisc = new Map();
const links = new Map();
let discount = 66;
let amount = 0;

defisc.set(66, ['Impôt sur le Revenu<span class="show-for-medium hide-br"><br>&nbsp;</span>', 'IR']);
defisc.set(75, ['Impôt sur la Fortune Immobilière', 'IFI']);

links.set(66, 'https://donner.perce-neige.org/b?cid=65');
links.set(75, 'https://donner.perce-neige.org/b?cid=64');

function changeDefisc(event, nb) {
    let value = $('#calculatorInput').val().toString()
    let regex = /[^\d.]/g;
    $('.btn-ir-ifi').removeClass('selected-reduc');
    event.target.classList.add('selected-reduc');

    discount = nb;
    $('#textDefisc').html(defisc.get(nb)[0]);
    $('#btnTextDefisc').text(defisc.get(nb)[1]);
    $('#percentDefisc').text(nb);

    if (!value) value = '';

    if (discount === 66) {
        $('#donCalc').attr('href', 'https://donner.perce-neige.org/b?cid=65' + (value === '' ? '' : ('&amount=' + parseFloat(value.replaceAll(regex, '')).toFixed(0) * 100)))
    } else {
        $('#donCalc').attr('href', 'https://donner.perce-neige.org/b?cid=64' + (value === '' ? '' : ('&amount=' + parseFloat(value.replaceAll(regex, '')).toFixed(0) * 100)))
    }

    onChange($('#calculatorInput').val());
}

let inputValue = ''

document.getElementById('calculatorInput').addEventListener('keyup', (event) => {
    if (inputValue !== event.target.value.toString()) {
        onChange(event.target.value);
        inputValue = event.target.value.toString();
    }
});

function onChange(v) {
    let value = v;
    let regex = /[^\d.]/g;

    value = value.replaceAll(regex, '');
    $('#calculatorInput').val(value);

    amount = parseFloat(value.toString().replaceAll(' ', ''));
    if (isNaN(amount) || amount <= 0) {
        $('#discountAmount').text('...€');
        $('#amountLeft').text('...€');
        return;
    }

    $('#calculatorInput').val(formatValue(value));

    let textLen = $('#calculatorInput').val().toString().length;

    $('#calculatorInput').width(textLen === 0 ? 30 : 14 * (textLen >= 17 ? 17 : textLen));

    $('#discountAmount').html(formatValue((amount * (discount / 100)).toFixed(2).toString()) + '&nbsp;€');
    $('#amountLeft').html(formatValue((amount * (1 - (discount / 100))).toFixed(2).toString()) + '&nbsp;€');
    $('#donCalc').attr('href', links.get(discount) + (value === '' ? '' : '&amount=') + parseFloat(value.replaceAll(regex, '')).toFixed(0) * 100)

}

function formatValue(value) {
    let float = value.toString().indexOf('.') !== -1;
    let part1 = value.toString().split('.')[0].replaceAll(' ', '');
    let part2 = float ? value.toString().split('.')[1].replaceAll(' ', '') : '';
    let res = '';

    let c = 0;
    for (let i = part1.length - 1; i >= 0; i--, c++) {
        if (c === 3) {
            res += ' ';
            c = 0;
        }

        res += part1[i];
    }

    return res.split("").reverse().join().replaceAll(',', '') + (float ? '.' : '') + part2;
}


let visible = true;

setInterval(function () {
    if ($('#anim-btn1').is(':hover') || $('#anim-btn2').is(':hover')) {
        $('.anim-btn').css('opacity', '1');
        return;
    }
    $('.anim-btn').css('opacity', (visible = !visible) ? '1' : '0.5');
}, 1000);
