import DatePicker from "@/components/date-picker/DatePicker";

export default async function () {
    const date = new Date()
    return <>
        <DatePicker defaultSelectedDate={date} selectionMode="spinner" showTimePicker />
        <DatePicker defaultSelectedDate={date} showTimePicker />
    </>
}