import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { PaymentOperation } from '@/BE-library/main';

export async function GET(req: NextRequest) {
  try {
    // 1. Lấy các giá trị từ query string
    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get('orderId');
    const requestId = searchParams.get('requestId');
    const resultCode = searchParams.get('resultCode');
    const action = new PaymentOperation()
    if (!orderId || !requestId || resultCode === null) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }
    const token = req.cookies.get('gid');  // Token từ cookie
    // 2. Gọi API POST với axios
    const payload = {
            orderId: orderId,
            requestId: requestId,
            resultCode: parseInt(resultCode, 10)
    }
    const response = await  action.confirm(payload, token.value)
    if (response.status == 200)
        return  NextResponse.redirect(new URL("/en/profile", req.url));
    else 
     throw new Error("Giao dịch lỗi")
  } catch (error) {
    console.error('Error handling payment:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}
