package com.yxboot.config.web;

import com.fasterxml.jackson.databind.util.StdDateFormat;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.InitBinder;

import java.text.DateFormat;
import java.util.Date;
import java.util.TimeZone;

/**
 * @author Boya
 */
@ControllerAdvice
public class DatetimeHandler {
    @InitBinder
    public void initBinder(WebDataBinder binder) {
        DateFormat dateFormat = new StdDateFormat().withTimeZone(TimeZone.getTimeZone("GMT+8")).withLenient(true);
        binder.registerCustomEditor(Date.class, new CustomDateEditor(dateFormat, true));
    }
}
