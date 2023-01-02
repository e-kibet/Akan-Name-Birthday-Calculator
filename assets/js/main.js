$(function () {
    let dayOutcomeInDom = document.querySelector('#dayOfWeek')
    let akanOutcomeInDom = document.querySelector('#akanName');
    let dayCalculator = (c, y, mon, d) => {
        let m;
        if (mon >= 3) {
            m = mon - 2;
        } else if (mon == 1) {
            m = 11
        } else {
            m = 12
        }

        return Math.abs((d + Math.floor((2.6 * m) - 0.2) - (2 * c) + y + Math.floor(y / 4) + Math.floor(c / 4)) % 7);
    }


    function adderror(selector) {
        $(selector).addClass('error');
        $(selector).next().css({ display: "block" })
    }

    function removeError(selector) {
        $(selector).removeClass('error')
        $(selector).next().css({ display: "none" })
    }
    function checkwholeFormValidity() {
        if (validDay && validMonth && validYear && validGender) {

            $('input[type=submit]').removeAttr('disabled');
        } else {
            $('input[type=submit]').attr('disabled', 'disabled');
        }
    }

    let validDay = false;
    let validMonth = false;
    let validYear = false;
    let validGender = false;

    $('#day').on('blur', function () {
        if (this.value < 1 || this.value > 31) {
            validDay = false;
            adderror($(this))
            checkwholeFormValidity();

        } else {
            validDay = true;
            removeError($(this))
            checkwholeFormValidity();

        }
    })
    $('#month').on('blur', function () {
        if (this.value < 1 || this.value > 12) {
            validMonth = false;
            adderror($(this))
            checkwholeFormValidity();
        } else {
            validMonth = true;
            removeError($(this))
            checkwholeFormValidity()
        }
    })

    $('#year').on('blur', function () {
        if (this.value < 1900 || this.value > 2023) {
            validYear = false;
            adderror($(this))
            checkwholeFormValidity();
        } else {
            validYear = true;
            removeError($(this))
            checkwholeFormValidity()
        }
    })
    $('#sex').on('click', function () {
        if (this.value) {
            validGender = true;
            removeError($(this))
            checkwholeFormValidity()
        } else {
            validGender = false;
            adderror($(this))
            checkwholeFormValidity();
        }
    })



    $('form').on('submit', function (e) {

        let day = parseInt($('#day')[0].value);
        let month = parseInt($('#month')[0].value);
        let year = $('#year')[0].value;
        let gender = $('#sex')[0].value;

        let cc = parseInt(year.substr(0, 2));
        let yy = parseInt(year.substr(2, 2));

        let calculatedDay = dayCalculator(cc, yy, month, day);

        let akanName;

        switch (calculatedDay) {
            case 0:
                akanName = { male: "Kwasi", female: "Akosua", day: "Sunday" }
                break;
            case 1:
                akanName = { male: "Kwadwo", female: "Adwoa", day: "Monday" }
                break;
            case 2:
                akanName = { male: "Kwabena", female: "Abenaa", day: "Tuesday" }
                break;
            case 3:
                akanName = { male: "Kwaku", female: "Akua", day: "Wednesday" }
                break;
            case 4:
                akanName = { male: "Yaw", female: "Yaa", day: "Thursday" }
                break;
            case 5:
                akanName = { male: "Kofi", female: "Afua", day: "Friday" }
                break;
            case 6:
                akanName = { male: "Kwame", female: "Ama", day: "Saturday" }
                break;
            default:
                console.log("An unknown error occured")
                break;
        }

        if (gender == "female") {
            dayOutcomeInDom.innerHTML = `${akanName.day}`;
            akanOutcomeInDom.innerHTML = `${akanName.female}`

        } else {
            dayOutcomeInDom.innerHTML = `${akanName.day}`;
            akanOutcomeInDom.innerHTML = `${akanName.male}`

        }

        // clear form values 
        $('form')[0].reset();

        validDay = false;
        validMonth = false;
        validYear = false;
        validGender = false;

        // Disbale the submit button after submitting
        $('input[type=submit]').attr('disabled', 'disabled');

        e.preventDefault();
    });

});