var tax_brackets = [
    { 
        bracket: 10000,
        amount_in_bracket: 10000,
        ryan: {
            single: 1.2,
            joint: 2.5,
            children: 6.3
        },
        romney: {
            single: 1.2,
            joint: 2.6,
            children: 6.3
        },
        obama: {
            single: 0,
            joint: 0.2,
            children: 0
        }
    },
    { 
        bracket: 20000,
        amount_in_bracket: 10000,
        ryan: {
            single: 0.3,
            joint: 2.4,
            children: 5.1
        },
        romney: {
            single: 0.1,
            joint: 2.5,
            children: 5.1
        },
        obama: {
            single: 0,
            joint: 0.1,
            children: 0
        }
    },
    { 
        bracket: 30000,
        amount_in_bracket: 10000,
        ryan: {
            single: -0.5,
            joint: 1.4,
            children: 2.1
        },
        romney: {
            single: -0.7,
            joint: 1.5,
            children: 2
        },
        obama: {
            single: 0,
            joint: 0,
            children: -0.2
        }
    },
    { 
        bracket: 40000,
        amount_in_bracket: 10000,
        ryan: {
            single: -1.3,
            joint: 0.6,
            children: 0.7
        },
        romney: {
            single: -1.3,
            joint: 0.4,
            children: 0.5
        },
        obama: {
            single: 0,
            joint: 0,
            children: -0.2,
        }
    },
    { 
        bracket: 50000,
        amount_in_bracket: 10000,
        ryan: {
            single: -2,
            joint: 0.2,
            children: 0.1
        },
        romney: {
            single: -1.8,
            joint: -0.1,
            children: -0.1
        },
        obama: {
            single: 0,
            joint: 0,
            children: 0.2
        }
    },
    { 
        bracket: 75000,
        amount_in_bracket: 25000,
        ryan: {
            single: -2.1,
            joint: -0.9,
            children: -0.9
        },
        romney: {
            single: -2.6,
            joint: -1.1,
            children: -1
        },
        obama: {
            single: 0.1,
            joint: 0,
            children: -0.1
        }
    },
    { 
        bracket: 100000,
        amount_in_bracket: 25000,
        ryan: {
            single: -1.8,
            joint: -1.9,
            children: -1.6
        },
        romney: {
            single: -3.3,
            joint: -1.7,
            children: -1.4
        },
        obama: {
            single: 0.2,
            joint: 0,
            children: -0.1
        }
    },
    { 
        bracket: 200000,
        amount_in_bracket: 100000,
        ryan: {
            single: -2,
            joint: -1.9,
            children: -1.7
        },
        romney: {
            single: -4.1,
            joint: -2.5,
            children: -2.1
        },
        obama: {
            single: 0.4,
            joint: 0.1,
            children: 0
        }
    },
    { 
        bracket: 500000,
        amount_in_bracket: 300000,
        ryan: {
            single: -4.5,
            joint: -3.4,
            children: -3.6
        },
        romney: {
            single: -6.6,
            joint: -4.9,
            children: -4.8
        },
        obama: {
            single: 2.2,
            joint: 0.9,
            children: 0.9
        }
    },
    { 
        bracket: 1000000,
        amount_in_bracket: 500000,
        ryan: {
            single: -6.5,
            joint: -6.5,
            children: -6.7
        },
        romney: {
            single: -8.6,
            joint: -6.7,
            children: -6.7
        },
        obama: {
            single: 4.9,
            joint: 3.1,
            children: 3.2
        }
    },
    { 
        bracket: 9999999999999, // max allowed by our input
        amount_in_bracket: 9999998999999, // if we ever need this we fucked up
        ryan: {
            single: -8.8,
            joint: -6.5,
            children: -6.7
        },
        romney: {
            single: -10.7,
            joint: -7.7,
            children: -7.7
        },
        obama: {
            single: 7.4,
            joint: 5.7,
            children:5.8
        }
    }
];
jQuery(document).ready(function() {
    var Tax_calc = function() {
        var errors, income, filing_status, dependents, running_total;
        var results_showing = false;

        var verify_inputs = function() {
            errors = [];
            //verify the inputs, duh
            throw_a_fit(errors);
            return errors;
        }
        var throw_a_fit = function(errors) {
            for (var i = 0; i < errors.length; i++) {
                //make error message
            }
            return;
        }
        var fetch_inputs = function() {
            income = parseInt(jQuery('#annual_income_input').val().replace(/\D/, ''));
            filing_status = jQuery('#filing_status_select input:checked').val();
            dependents = jQuery('#dependents_select input:checked').val();
        };
        
        var calculate_change = function() {
            console.log('got here');
            running_total = {
                obama: 0,
                romney: 0,
                ryan: 0
            }
            var filing_type = dependents 
                ? 'children'
                : filing_status
                    ? 'joint'
                    : 'single';
            var over = false;

            for (var i = 0; i < tax_brackets.length; i++ ) {
                var bracket = tax_brackets[i];
                for (politician in running_total) {
                    if (income > bracket.bracket) { 
                        running_total[politician] += bracket[politician][filing_status] 
                                                        * bracket.amount_in_bracket;
                    } else { // not the total amount in this bracket
                        running_total[politician] += bracket[politician][filing_status] 
                                                        * (income - bracket.bracket)
                        over = true;
                    }
                }
                if (over) {
                    return;
                }
            }
            console.log('we should never be here');
            return;
        }

        var replace_change_amounts = function() {
            jQuery('#obama_results .dollar_results').text(commafy(running_total['obama'])); 
            jQuery('#romney_results .dollar_results').text(commafy(running_total['romney'])); 
            jQuery('#ryan_results .dollar_results').text(commafy(running_total['ryan'])); 
        }
        var commafy = function(num) {
            num = num.toString();
            var numbers = num.split(/\./);
            num = numbers[0];
            var num_after_decimal = numbers.length > 1
                ? '.' + numbers[1]
                : '';
            var regex = /(\d+)(\d{3})/; 
            while ( regex.test(num) ) {
                num =  num.replace(regex, '$1' + ',' + '$2');
            }
            return num + num_after_decimal
        }

        var display_results_page = function() {
            if (results_showing) {
                return;
            }
            jQuery('#title_page').hide();
            jQuery('#ryan_results').show();
            jQuery('#obama_results').show();
            jQuery('#romney_results').show();
            results_showing = true;
            return;
        }

        return {
            run : function() {
                errors = verify_inputs();
                if (errors.length) {
                    throw_a_fit(errors);
                }
                this.update_results();
                
            }, 
            update_results : function() {
                fetch_inputs();
                calculate_change();
                replace_change_amounts();
                display_results_page();
                return;
            }
        }
    }

    var calculator = new Tax_calc();
    jQuery('form').bind('submit', function() {
        calculator.run();
        return false;
    });
    jQuery('input').bind('change', function() {
        calculator.run();
    });
    jQuery('input[type="radio"]').bind('click', function() {
        calculator.run();
    });
});

