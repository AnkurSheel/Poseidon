import DateFnsUtils from '@date-io/moment';
import { FormControl } from '@material-ui/core';
import { DatePicker, MaterialUiPickersDate, MuiPickersUtilsProvider } from 'material-ui-pickers';
import moment from 'moment';
import React from 'react';

interface IMonthYearDatePickerProps {
    className: string;
    label: string;
    value: moment.Moment;
    onChange: (date: MaterialUiPickersDate) => void;
}

export const MonthYearDatePicker = (props: IMonthYearDatePickerProps) => {
    return (
        <FormControl fullWidth className={props.className}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                    label={props.label}
                    views={['year', 'month']}
                    value={props.value}
                    onChange={props.onChange}
                    showTodayButton={true}
                    todayLabel={'Current Month'}
                    disableFuture
                />
            </MuiPickersUtilsProvider>
        </FormControl>
    );
};
