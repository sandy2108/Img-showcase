import Image from "next/image"
import Link from "next/link"
import { useState } from "react";
import { createClient } from '@supabase/supabase-js'
import { Metadata } from 'next'
import Head from "next/head";


export const metadata: Metadata = {
  title: 'FollowersPlus',
  description: 'A person created a basic website to express gratitude to their supporters.',
}



export async function getStaticProps() {
   
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_ROLE_KEY || '',
    {
      auth: {
        persistSession: false,
      },
    }
  );
  
  const {data} = await supabaseAdmin
  .from('images')
  .select('*')
  .order('id')
  return {
    props: {
      images: data
    },
  }
}


function helperfunction(...classes: string[]){
  return classes.filter(Boolean).join(" ");
}

type Image = {
  id: number
  name: string
  href: string
  username: string
  imageSrc: string
}

export default function Gallery({ images }: { images: Image[] }) {
  return (
    <>
    <Head>
      <title>FollowersPlus</title>
      <meta name="description" content="A person created a basic website to express gratitude to their supporters."></meta>
    </Head>
    <div className="max-w-2xl mx-auto px-4 py-5 sm:px-6 lg:max-w-7xl lg:px-8">
      <p className="flex justify-center items-center place-content-center text-2xl mb-10 text-gray-700">Thanks for your Engagement Crew! </p>
      <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
           {images.map((image) => (
            <UserImage key={image.id} image={image} />
           ))}
      </div>
    </div>
    </>
  )
}


function UserImage({image}: { image:Image }) {
  const [isLoading ,setLoading] = useState(true);

  return (
    <Link href={image.href} className="group">
      <div className="aspect-w-1 aspect-h-1 xl:aspect-w-7 xl:aspect-h-8 w-full overflow-hidden rounded-lg bg-gray-200">
        <Image
         src={image.imageSrc}
         alt="/"
         layout="fill"
         objectFit="cover"
         className={helperfunction('group-hover:opacity-75 duration-700 ease-in-out', isLoading ? 'grayscale blur-xl scale-110' : 'grayscale-0 blur-0 scale-100')}
         onLoadingComplete={()=> setLoading(false)} 
        />
      </div>
      <h2 className="mt-4 text-sm text-gray-700">{image.name}</h2>
      <p className="mt-1 text-lg font-medium text-gray-900">{image.username}</p>
    </Link>
  )
}