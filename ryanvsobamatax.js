jQuery(document).ready(function() {
    var Tax_calc = function() {
        var errors, income, filing_status, dependents, obama_previous, obama_now, ryan_proposed;
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
            income = jQuery('#annual_income_input').val().replace(/\D/, '');
            filing_status = jQuery('#filing_status_select input:checked').val();
            dependents = jQuery('#dependents_select input:checked').val();
        };
        
        var calculate_change = function() {
            //FIXME oh crap
            obama_previous = 1;
            obama_now = 1;
            ryan_proposed = 1;
        }

        var replace_change_amounts = function() {
            jQuery('#tax_under_obama_previous .dollar_results').text(commafy(obama_previous)); 
            jQuery('#tax_under_obama_2013 .dollar_results').text(commafy(obama_now)); 
            jQuery('#ryan_results .dollar_results').text(commafy(ryan_proposed)); 
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
            results_showing = true;
            return;
        }

        return {
            run : function() {
                errors = verify_inputs();
                if (errors.length) {
                    throw_a_fit(errors);
                    return false;
                }
                this.update_results();
                
                return false;
            }, 
            update_results : function() {
                fetch_inputs();
                calculate_change();
                replace_change_amounts();
                display_results_page();
            }
        }
    }

    var calculator = new Tax_calc();
    jQuery('form').bind('submit', function() {
        calculator.run();
        return false;
    });
});

