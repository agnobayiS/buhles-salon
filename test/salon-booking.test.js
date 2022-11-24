import assert from 'assert';
import salonBooking from '../salon-booking.js';
import pgPromise from 'pg-promise';

// TODO configure this to work.
const DATABASE_URL = process.env.DATABASE_URL || "postgresql://siyabonga:siya@localhost:5432/booking";

const config = {
    connectionString: DATABASE_URL
}

const pgp = pgPromise({});
const db = pgp(config);

let booking = salonBooking(db);

describe("The Booking Salon", function () {

    beforeEach(async function () {

        await db.none(`truncate table booking restart identity`);

    });

    it("should be able to list treatments", async function () {

        const treatments = await booking.findAllTreatments();

        assert.deepEqual([
            { id: 1, type: 'Pedicure', code: 'ped', price: '175.00' },
            { id: 2, type: 'Manicure', code: 'man', price: '215.00' },
            { id: 3, type: 'Make up', code: 'mak', price: '185.00' },
            { id: 4, type: 'Brows & Lashes', code: 'bro', price: '240.00' }
        ]

            , treatments);
    });

    it("should be able to find a stylist", async function () {

        const stylist = await booking.findStylist(727654321);

        assert.deepEqual([
            {
                commision_percentage: '0.71',
                first_name: 'siya',
                id: 1,
                last_name: 'zazaza',
                phone_number: 727654321
            }
        ]
            , stylist);
    });

    it("should be able to allow a client to make a booking", async function () {


        const booking1 = await booking.makeBooking(1, 1, 2, '2022-11-29', '07:00');

        let bookings = await booking.findAllBookings()

        assert.deepEqual([
            {
                id: 1,
                booking_date: new Date('2022-11-29T22:00:00.000Z'),
                booking_time: '07:00:00',
                client_id: 1,
                treatment_id: 1,
                stylist_id: 1
            }
        ]

            , bookings);
    });

    it("should be able to get client booking(s)", async function () {

        const booking1 = await booking.makeBooking(1, 1, 2, '2022-11-29', '08:00');


        let clientBooking = await booking.findClientBookings(1);


        assert.deepEqual([
            {
                id: 1,
                booking_date: new Date('2022-11-29T22:00:00.000Z'),
                booking_time: '08:00:00',
                client_id: 1,
                treatment_id: 1,
                stylist_id: 1
            }
        ], clientBooking)
    })

    it("should be able to get bookings for a date", async function () {

        let booking1 = await booking.makeBooking(1, 1, 2, '2022-11-29', '08:00');
        let booking2 = await booking.makeBooking(2, 2, 3, '2022-11-29', '09:00');


        let bookingz = await booking.findAllBookingsby('2022-11-29');

        assert.deepEqual([
            {
              id: 1,
              booking_date: new Date('2022-11-29T22:00:00.000Z'),
              booking_time: '08:00:00',
              client_id: 1,
              treatment_id: 1,
              stylist_id: 1
            },
            {
              id: 2,
              booking_date: new Date('2022-11-29T22:00:00.000Z'),
              booking_time: '09:00:00',
              client_id: 2,
              treatment_id: 2,
              stylist_id: 2
            }
          ]
          , bookingz)

    })



    // it("should be able to find the total income for a day", function () {
    //     assert.equal(1, 2);
    // })

    // it("should be able to find the most valuable client", function () {
    //     assert.equal(1, 2);
    // })
    // it("should be able to find the total commission for a given stylist", function () {
    //     assert.equal(1, 2);
    // })

    // after(function () {
    //     db.$pool.end()
    // });

});