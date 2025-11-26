/* <!--
File:  script.js
GUI Assignment: Hw4pt2 Multiplication Table
Tai Dao, UMass Lowell Managament Information System Major, tai_dao@student.uml.edu

JS file to handle and create my multiplcation table with validation
added new sliders and ui features. UI features are tabs icon to save my tables and also delete tabs.

Copyright (c) 2025 by Tai Dao. All rights reserved. May be freely copied or
excerpted for educational purposes with credit to the author.
updated by Tai on November 26, 2025 at 5:49PM

-->*/


/*Created a checker function that recieve inputs from the form in the HTMl through the submit button.
Checks if the numbers are numerical and the boundaries that the number can exceed*/

/*global counter for tabs */
let tabCounter = 1;

$(document).ready(function () {
    /*New tab */

    let tabs = $("#tabs").tabs();
    /*Custom validation methods for the user when entering a number*/
    $.validator.addMethod("greaterOrEqual", function (value, element, selector) {
        const start = parseInt($(selector).val());
        const end = parseInt(value);

        if (this.optional(element) || Number.isNaN(start) || Number.isNaN(end)) {
            return true;
        }
        return end >= start;
    }, "Ending value must be greater than or equal to beginning value");

    $.validator.addMethod("integer", function (value, element) {
        if (this.optional(element)) return true;
        const n = Number(value);
        return Number.isInteger(n);
    }, "Please enter an integer");

    /*Sourcing where the validation methods will take place. So the form multForm will be validated and it's inputs */
    let validator = $("form[name='multForm']").validate({
        rules: {
            Beginning1: {
                required: true,
                integer: true,
                min: -50,
                max: 50
            },
            Ending1: {
                required: true,
                integer: true, min: -50,
                max: 50,
                greaterOrEqual: "#Beginning1"
            },
            Beginning2: {
                required: true,
                integer: true,
                min: -50,
                max: 50
            },
            Ending2: {
                required: true,
                integer: true,
                min: -50,
                max: 50,
                greaterOrEqual: "#Beginning2"
            }
        },
        /*Messaegs when inputs are not correct */
        messages: {
            Beginning1: {
                required: "Please enter a number",
                integer: "Invalid integer",
                min: "Must be >= -50",
                max: "Must be <= 50"
            },
            Ending1: {
                required: "Please enter a number",
                integer: "Invalid integer",
                min: "Must be >= -50",
                max: "Must be <= 50",
                greaterOrEqual: "Ending value must be greater than or equal to the beginning value"
            },
            Beginning2: {
                required: "Please enter a number",
                integer: "Invalid integer",
                min: "Must be >= -50",
                max: "Must be <= 50"
            },
            Ending2: {
                required: "Please enter a number",
                integer: "Invalid integer",
                min: "Must be >= -50",
                max: "Must be <= 50",
                greaterOrEqual: "Ending value must be greater than or equal to the beginning value"
            }
        },

        /*submitting form to create multiplication table and save it to a tab */
        submitHandler: function (form, event) {
            event.preventDefault();
            let b1 = parseInt($("#Beginning1").val());
            let e1 = parseInt($("#Ending1").val());
            let b2 = parseInt($("#Beginning2").val());
            let e2 = parseInt($("#Ending2").val());
            let Save_table = Table(b1, e1, b2, e2);
            $("#multiplicationtable").html(Save_table);
            addTableTab(Save_table);

        }
    });

    /*creating a slider for each of the section of the multiplication table*/
    $("#Beginning1_slider").slider({
        min: -50,
        max: 50,
        value: 0,
        slide: function (event, ui) {
            $("#Beginning1").val(ui.value);
            validator.element("#Beginning1");
        }
    });

    $("#Ending1_slider").slider({
        min: -49,
        max: 50,
        value: 0,
        slide: function (event, ui) {
            $("#Ending1").val(ui.value);
            validator.element("#Ending1");
        }
    });

    $("#Beginning2_slider").slider({
        min: -50,
        max: 50,
        value: 0,
        slide: function (event, ui) {
            $("#Beginning2").val(ui.value);
            validator.element("#Beginning2");
        }
    });

    $("#Ending2_slider").slider({
        min: -49,
        max: 50,
        value: 0,
        slide: function (event, ui) {
            $("#Ending2").val(ui.value);
            validator.element("#Ending2");
        }
    });

    /*closing button to delete saved tabs */
    tabs.on("click", "span.ui-icon-close", function () {
        let li = $(this).closest("li");
        let panelId = li.find("a").attr("href").replace("#", "");
        $("#" + panelId).remove();
        li.remove();
        tabCounter--;
        tabs.tabs("refresh");
    });

});

/*
function to create the multiplcation table taking in 4 inputs from the checker function
*/
function Table(begin1, end1, begin2, end2) {
    let output = "<tr><th></th>";

    /*Creates each column*/
    for (let i = begin1; i <= end1; i++) {
        output += `<th>${i}</th>`;
    }
    output += "</tr>";

    /*creates each row*/
    for (let j = begin2; j <= end2; j++) {
        output += `<tr><th>${j}</th>`;
        /*Creates each cells*/
        for (let i = begin1; i <= end1; i++) {
            output += `<td>${i * j}</td>`;
        }
        output += "</tr>";
    }
    return output;
}

/*adding the multiplication to table */
function addTableTab(table) {
    let tabs = $("#tabs");
    let tabId = `saved-tab-${tabCounter++}`;
    let label = `Table ${tabCounter - 1}`;

    tabs.find(".ui-tabs-nav").append(
        `<li><a href="#${tabId}">${label}</a> <span class="ui-icon ui-icon-close" role="button" aria-label="Close"></span></li>`
    );
    tabs.append(
        `<div id="${tabId}" class="saved-tab"><div class="table-wrapper"><table class="mult-table">${table}</table></div></div>`
    );
    let lastIndex = tabs.find(".ui-tabs-nav li").length - 1;
    tabs.tabs("refresh").tabs("option", "active", lastIndex);
}