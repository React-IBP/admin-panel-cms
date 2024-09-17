import { ConnectDB } from"@/utils/config/db";
import UserModel from "@/models/UserModel";
const { NextResponse } = require("next/server");
import { writeFile } from "fs/promises";
const fs = require("fs");
const LoadDB = async () => {
  await ConnectDB();
};
LoadDB();
export async function GET(request) {
  const userQuery = request.nextUrl.searchParams.get("id");
  console.log("data search--------------------->", userQuery);
  if (!userQuery) {
    // Get all users from db and order  by descending id
    const users = await UserModel.find({}).sort({ _id: -1 });
    return NextResponse.json({ users });
  } else {
    //Find the blog by th id
    const users = await UserModel.find({ _id: userQuery });
    console.log("data response --------------------->", users);
    return NextResponse.json({ users });
  }
}
