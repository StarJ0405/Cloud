'use client';

import DatePicker from "@/components/date-picker/DatePicker";

export default function () {
    return <>
        <DatePicker selectionMode="spinner" showTimePicker />
        <DatePicker showTimePicker />
    </>
}