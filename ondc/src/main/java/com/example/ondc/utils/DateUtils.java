package com.example.ondc.utils;

import lombok.extern.slf4j.Slf4j;
import org.joda.time.DateTimeZone;
import org.joda.time.Days;
import org.joda.time.LocalDateTime;
import org.joda.time.Minutes;
import org.springframework.util.ObjectUtils;
import org.springframework.util.StringUtils;

import java.util.TimeZone;

/**
 * Created by GAGAN.HV on 08/01/22
 */
@Slf4j
public class DateUtils {

    public static boolean isCompareDateRange(TimeZone zone, LocalDateTime expireDate, Long lowerLimit, Long upperLimit) {

        if (StringUtils.isEmpty(expireDate) || ObjectUtils.isEmpty(lowerLimit) || ObjectUtils.isEmpty(upperLimit)) {
            return true;
        }
        Days days = Days.daysBetween(expireDate, new LocalDateTime(DateTimeZone.forTimeZone(zone)));
        return (days.getDays() >= lowerLimit && days.getDays() <= upperLimit);
    }


    public static boolean isCompareTimeRange(TimeZone zone, LocalDateTime expireDate, Long lowerLimit, Long upperLimit) {

        if (StringUtils.isEmpty(expireDate) || StringUtils.isEmpty(lowerLimit) || StringUtils.isEmpty(upperLimit)) {
            return true;
        }
        Minutes minutes = Minutes.minutesBetween(expireDate, new LocalDateTime(DateTimeZone.forTimeZone(zone)));
        return (minutes.getMinutes() >= lowerLimit && minutes.getMinutes() <= upperLimit);
    }


    public static double isMultiple(Double weightge, Double percentage) {
        if (ObjectUtils.isEmpty(weightge) || ObjectUtils.isEmpty(percentage)) {
            return 0d;
        }
        return weightge * percentage;
    }

    public static double isMultiple(Double weightge, int percentage) {
        if (ObjectUtils.isEmpty(weightge)) {
            return 0d;
        }
        return weightge * percentage;
    }
}
