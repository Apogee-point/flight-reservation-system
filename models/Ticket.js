import {model,Schema } from "mongoose";    

const TicketSchema = new Schema({
    trip: {
        type: Schema.Types.ObjectId,
        ref: 'Trip',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    passengers: {
        economy: {
            type: Number,
            required: true
        },
        business: {
            type: Number,
            required: true
        }
    },
    totalPrice: {
        type: Number,
        required: true
    },
    bookingDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['booked', 'cancelled'],
        default: 'booked'
    }
});

TicketSchema.methods.getTotalPrice = function(){
    return this.passengers * this.trip.price;
}

TicketSchema.methods.cancel = function(){
    this.status = 'cancelled';
    this.trip.cancel(this.passengers);
}


const Ticket =model('Ticket', TicketSchema);

export default Ticket;
