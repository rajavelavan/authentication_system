import { getDatafromToken } from '@/helpers/getDataFrToken';
import { NextRequest, NextResponse } from 'next/server';
import User from '@/model/userModel';
import { connect } from '@/dbConfig/dbConfig';

connect();

export async function GET(request: NextRequest) {
  try {
    const userId = await getDatafromToken(request);
    const user = await User.findOne({ _id: userId }).select('-password');

    return NextResponse.json({ message: 'UserFound', data: user });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
