import { connect } from '@/dbConfig/dbConfig';
import User from '@/model/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import { sendEmail } from '@/helpers/mailer';

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;
    console.log('--------', reqBody);

    //check if the user already exists
    const user = await User.findOne({ email });
    console.log(user);

    if (user) {
      return NextResponse.json({
        status: 400,
        message: 'User already exists',
        success: false,
      });
    }
    //hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    //storing the new user
    const savedUser = await newUser.save();
    console.log(savedUser);
    console.log('Signup Success');

    //send verification email
    await sendEmail({ email, emailType: 'VERIFY', userId: savedUser._id });

    return NextResponse.json({
      message: 'User created successfully',
      success: true,
      status: 201,
      savedUser,
    });
  } catch (error: any) {
    console.log(error);

    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
