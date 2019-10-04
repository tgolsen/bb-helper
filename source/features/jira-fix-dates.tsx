import features from '../libs/features';

function log(msg: string) {
    console.log("[jira-fix-dates] " + msg);
}

function monthBreevToNum(month_breev: string) {
    let result = "idk[" + month_breev + "]";
    switch (month_breev) {
        case "Jan":
            result = "01";
            break;
        case "Feb":
            result = "02";
            break;
        case "Mar":
            result = "03";
            break;
        case "Apr":
            result = "04";
            break;
        case "May":
            result = "05";
            break;
        case "Jun":
            result = "06";
            break;
        case "Jul":
            result = "07";
            break;
        case "Aug":
            result = "08";
            break;
        case "Sep":
            result = "09";
            break;
        case "Oct":
            result = "10";
            break;
        case "Nov":
            result = "11";
            break;
        case "Dec":
            result = "12";
            break;
    }
    return result;
}

// Where el is the DOM element you'd like to test for visibility
// https://stackoverflow.com/questions/19669786/check-if-element-is-visible-in-dom
function isHidden(el: HTMLElement) {
    return (el.offsetParent === null)
}

/**
 *  Convert display date [19/Jun/19] to date you can enter in UI [2019/06/19]
 */
function init() {
    /**
    const eles = select.all('body *')!;
    let match: string[];

    for (const ele of eles) {
        match = ele.innerHTML.trim().match(/(\d{2})\/(\w{3})\/(\d{2})/i)!;
        if (match != null && match.length >= 4) {
            debugger;
            const [date, day, month_breev, year]: string[] = match;
            log("date original: " + date);
            const new_date = "20" + year + "/" + monthBreevToNum(month_breev) + "/" + day;
            log("date new: " + new_date);
            ele.innerHTML = ele.innerHTML.replace(date, new_date);
        }
    }
     */

    let body = document.getElementsByTagName('body')[0],
        eles: HTMLCollectionOf<Element> = body.getElementsByTagName('*');

    for (let i = 0; i < eles.length; i++) {
        let ele = eles[i];
        for (let j = 0; j < ele.childNodes.length; j++) {
            let node = ele.childNodes[j];
            if (!isHidden(ele as HTMLElement) && node.nodeType === 3) {
                let match = ele.innerHTML.trim().match(/(\d{2,4})\/(\w{3})\/(\d{2,4})/i)!;
                if (match != null && match.length >= 4) {
                    let [date, day, month_breev, year]: string[] = match;

                    // if day 4 digits
                    if (+day > 999) {
                        let save_day = day;
                        day = year;
                        year = save_day;
                    }

                    // two digit year
                    if (+year < 1000) {
                        year = "20" + year;
                    }

                    log("date original: " + date);
                    const new_date = year + "/" + monthBreevToNum(month_breev) + "/" + day;
                    log("date new: " + new_date);
                    ele.innerHTML = ele.innerHTML.replace(date, new_date);
                }
            }
        }
    }
}

features.add({
	id: __featureName__,
	description: 'Standardize Jira date format',
	screenshot: false,
    load: features.onAjaxedPagesRaw,
    init
});
