import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Booking from "@/models/Booking";

export async function GET(req) {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const role = searchParams.get("role");

    try {
        let matchStage = {};
        
        if (role === 'user' && userId) {
            matchStage = { userId };
        } else if (role === 'caretaker' && userId) {
            matchStage = { caretakerId: userId };
        }
        // Admin sees all, so no extra filters needed for them unless specified
        
        const stats = await Booking.aggregate([
            { $match: matchStage },
            { 
                $group: {
                    _id: "$status",
                    count: { $sum: 1 }
                }
            }
        ]);
        
        console.log("Stats Aggregation Result:", JSON.stringify(stats));

        const formattedStats = {
            total: 0,
            pending: 0,
            confirmed: 0,
            completed: 0,
            cancelled: 0,
            paid: 0 // Adding paid if we treat it as status, though it's separate usually. 
            // Wait, user said "make it payed... overview ui should also show data of booking like on count".
            // If payment updates status to something else? Usually payment updates paymentStatus.
            // But if user wants to see "Paid" count? 
            // Let's stick to status for now.
        };

        stats.forEach(s => {
            const key = s._id ? s._id.toLowerCase() : 'pending';
            if (formattedStats.hasOwnProperty(key)) {
                formattedStats[key] = s.count;
            }
            formattedStats.total += s.count;
        });

        return NextResponse.json(formattedStats);
    } catch (error) {
        console.error("Stats Error:", error);
        return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
    }
}
