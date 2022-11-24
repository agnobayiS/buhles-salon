export default function salonBooking(db) {

    async function findStylist(phoneNumber) {

        let data = await db.manyOrNone(`select * from style where phone_number = $1`, [phoneNumber])
        return data


    }

    async function findClient(phoneNumber) {
        return await db.oneOrNone(`select * from client where phone_number = $1`, [phoneNumber])

    }

    async function findTreatment(shortcode) {
        return await db.oneOrnone(`select * from treatment where code = $1`, [shortcode])
    }

    async function findAllTreatments() {
        let list = await db.manyOrNone(`select * from treatment`)
        return list
    }


    async function makeBooking(clientId, treatmentId, stylistId, date, time) {

        let times = await db.manyOrNone(`select booking_time from booking where stylist_Id = $1 `, [stylistId])
        let dates = await db.manyOrNone(`select booking_date from booking where stylist_Id = $1 `, [stylistId])
        let treatment = await db.manyOrNone(`select treatment_id from booking where booking_date  =$1 and booking_time = $2 `, [date, time])

        if (times.length >= 1 && dates.length >= 1) {

            return "stylist not available"

        } else if (treatment.length > 2) {

            return "overbooked"

        } else {

            let book = await db.none(`insert into booking(client_id, treatment_id, stylist_id, booking_date::text ,booking_time) values ($1, $2, $3, $4, $5)`,
                [clientId, treatmentId, treatmentId, date, time])

            return book
        }
    }

    async function findAllBookingsby(date) {
        return await db.manyOrNone(`select * from booking where booking_date  = $1`, [date])
    }

    async function findAllBookings() {
        return await db.manyOrNone(`select * from booking`)
        //  where booking_date = $1`,[date])
    }

    async function findClientBookings(clientId) {
        return await db.manyOrNone(`select * from booking where client_id = $1`, [clientId])
    }
    async function findStylistsForTreatment(treatmentId) {

        await db.manyOrNone(`select * from booking where client_id = $1`, [treatmentId])

    }

    async function findAllBookingz({date, time}){
        await db.manyOrNone(`select * from booking where (booking_date,booking_time) values ($1, $2) `,[date,time])
    }

    async function totalIncomeForDay(date){

    }

    async function mostValuebleClient(){
        await db.manyOrNone(`select client_id from booking group by client_id Having count(client_id)`)
    }




    return {
        findStylist,
        findClient,
        findTreatment,
        findAllTreatments,
        makeBooking,
        findAllBookings,
        findAllBookingz,
        findClientBookings,
        findStylistsForTreatment,
        findAllBookingsby


    }
}  