
import prisma from '@/lib/prisma';
import {MercadoPagoConfig, Payment} from 'mercadopago';
import { NextResponse } from 'next/server';
// import { NextResponse, NextRequest } from 'next/server';

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
});

type Params = Promise<{
    id: string;
}>

// interface Segments {
//     params: {
//         id: string;
//     }
// }

export async function POST(request: Request, segmentData: {params: Params}) {

    const { id: orderId } = await segmentData.params;

    const body = await request.json();

    try {

        if (body.type === "payment") {
            const payment = await new Payment(client).get({ id: body.data.id });
            console.log(payment)
            if (payment.status === "approved") {
                await prisma.order.update({
                  where: { id: orderId },
                  data: {
                    transactionId: payment!.id?.toString(),
                    isPaid: true,
                    paidAt: new Date(),
                  },
                });
            }
        }        
        
          return NextResponse.json({success: true}, { status: 200 });
        
    } catch (error : any) {
        return NextResponse.json({ error }, { status: 500 });
    }
}