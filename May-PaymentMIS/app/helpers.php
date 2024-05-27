<?php

if (!function_exists('parseFloat')) {

    /**
     * Convert a Floatable string to an float number
     * @param string $param
     * @return float
     */
    function parseFloat($param): float {
        $numericString = preg_replace('/[^0-9.]/', '', $param); // Remove non-numeric characters
        $integerValue = floatval($numericString); // Remove commas and convert to an integer
        return $integerValue;
    }
}

if (!function_exists('format_currency')) {

    function format_currency($number, $currencyCode = '₹') {
        $formattedAmount = number_format($number, 2, '.', ',');
        return $currencyCode . ' ' . $formattedAmount;
    }
}


if (!function_exists('convert_to_crores')) {

    function convert_to_crores(float $number) {
        return $number / 10000000;
    }
}