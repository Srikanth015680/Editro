import { NextResponse } from "next/server";
import {getUploadAuthParams} from "@imagekit/next/server"

export async function GET() {
    try{
        const{token,signature,expire}=getUploadAuthParams({
            privateKey:process.env.IMAGEKIT_PRIVATE_KEY as string,
            publicKey:process.env.IMAGEKIT_PUBLIC_KEY as string
        })
        return NextResponse.json({
            token,
            expire,
            signature,
            publicKey:process.env.IMAGEKIT_PUBLIC_KEY
        })

    }catch(e){
        console.error("Auth Error: ",e);
        return  NextResponse.json(
            {error:"Failed to generate auth params"},
           { status:500}
        )

    }
    
}