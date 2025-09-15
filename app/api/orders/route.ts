import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "data");
const ORDERS_FILE = path.join(DATA_PATH, "orders.json");

export async function POST(req: Request){
  try{
    const body = await req.json();
    if(!fs.existsSync(DATA_PATH)) fs.mkdirSync(DATA_PATH);
    const orders = fs.existsSync(ORDERS_FILE) ? JSON.parse(fs.readFileSync(ORDERS_FILE, "utf-8")) : [];
    const id = Date.now();
    const order = { id, ...body };
    orders.push(order);
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2));
    return NextResponse.json({ ok: true, order });
  }catch(e){
    return NextResponse.json({ ok: false, error: (e as any).message }, { status: 500 });
  }
}

export async function GET(){
  try{
    const orders = fs.existsSync(ORDERS_FILE) ? JSON.parse(fs.readFileSync(ORDERS_FILE, "utf-8")) : [];
    return NextResponse.json({ ok: true, orders });
  }catch(e){
    return NextResponse.json({ ok: false, error: (e as any).message }, { status: 500 });
  }
}
