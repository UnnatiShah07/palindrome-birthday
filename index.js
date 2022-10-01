const birthdayInput = document.querySelector("#birthday-input");
const palindromeBtn = document.querySelector("#palindrome-btn");
const output = document.querySelector("#output");

function reverseStr(date) {
    let dateArr = date.split("");
    let reversedArr = dateArr.reverse();
    let reversedDate = reversedArr.join("");
    return reversedDate;
}

function isPalindrome(date) {
    // const date = birthdayInput.value;
    const reversedDate = reverseStr(date);
    return date === reversedDate;
}

function convertDateToStr(date) {
    const dateStr = { day: "", month: "", year: "" };

    if (date.day < 10) dateStr.day = "0" + date.day;
    else dateStr.day = date.day.toString();

    if (date.month < 10) dateStr.month = "0" + date.month;
    else dateStr.month = date.month.toString();

    dateStr.year = date.year.toString();

    return dateStr;
}

function getAllDateFormats(date) {
    let dateStr = convertDateToStr(date);

    let ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    let mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    let yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    let ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    let mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    let yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindromForAllDatesFormate(date) {
    let listOfPalindromes = getAllDateFormats(date);
    let flag = false;
    for (let i = 0; i < listOfPalindromes.length; i++) {
        if (isPalindrome(listOfPalindromes[i])) {
            flag = true;
            break;
        }
    }
    return flag;
}

function isLeapYear(year) {
    if (year % 400 === 0) {
        return true;
    }
    if (year % 100 === 0) {
        return false;
    }
    if (year % 4 === 0) {
        return true;
    }
    return false;
}

function getNextDate(date) {
    let day = date.day + 1;
    let month = date.month;
    let year = date.year;

    let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (month === 2) {
        if (isLeapYear(year)) {
            if (day > 29) {
                day = 1;
                month++;
            }
        } else {
            if (day > 28) {
                day = 1;
                month++;
            }
        }
    } else {
        if (day > daysInMonth[month - 1]) {
            day = 1;
            month++;
        }
    }

    if (month > 12) {
        month = 1;
        year++;
    }

    return { day: day, month: month, year: year };
}

function getNextPalindromeDate(date) {
    let gapOfDays = 0;
    let nextDate = getNextDate(date);

    while (1) {
        gapOfDays++;
        let isPalindrome = checkPalindromForAllDatesFormate(nextDate);
        if (isPalindrome) {
            break;
        }
        nextDate = getNextDate(nextDate);
    }

    return [gapOfDays, nextDate];
}

function getPreviousDate(date) {
    let day = date.day - 1;
    let month = date.month;
    let year = date.year;

    let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (month === 3) {
        if (isLeapYear(year)) {
            if (day < 1) {
                day = 29;
                month--;
            }
        } else {
            if (day < 1) {
                day = daysInMonth[month - 2];
                month--;
            }
        }
    } else {
        if (day < 1) {
            day =
                month === 1
                    ? daysInMonth[daysInMonth.length - 1]
                    : daysInMonth[month - 2];
            month--;
        }
    }

    if (month < 1) {
        month = 12;
        year--;
    }

    return { day: day, month: month, year: year };
}

function getPreviousPalindromeDate(date) {
    let gapOfDays = 0;
    let prevDate = getPreviousDate(date);

    while (1) {
        gapOfDays++;
        let isPalindrome = checkPalindromForAllDatesFormate(prevDate);
        if (isPalindrome) {
            break;
        }
        prevDate = getPreviousDate(prevDate);
    }

    return [gapOfDays, prevDate];
}

function handleOnClick() {
    let dateArr = birthdayInput.value.split("-");
    const date = {
        day: Number(dateArr[2]),
        month: Number(dateArr[1]),
        year: Number(dateArr[0]),
    };

    let isPalindrome = checkPalindromForAllDatesFormate(date);

    if (isPalindrome) {
        output.innerText = "Congratulation! Your birthday is a palindrome. 🎊 🥳";
    } else {
        const nextPalindrome = getNextPalindromeDate(date);
        const prevPalindrome = getPreviousPalindromeDate(date);
        if (nextPalindrome[0] < prevPalindrome[0]) {
            let nextDate = convertDateToStr(nextPalindrome[1]);
            output.innerText = `The next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed it by ${nextPalindrome[0]} days! 😔`;
        } else {
            let prevDate = convertDateToStr(prevPalindrome[1]);
            output.innerText = `The last palindrome date is ${prevDate.day}-${prevDate.month}-${prevDate.year}, you missed it by ${prevPalindrome[0]} days! 😔`;
        }
    }
}

palindromeBtn.addEventListener("click", handleOnClick);
