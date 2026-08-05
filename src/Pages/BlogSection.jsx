import { useState, useMemo } from "react";
import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import {
  Calendar,
  ArrowRight,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Clock,
  User,
  X,
  Tag,
} from "lucide-react";




const blogs = [
{
id:1,
title:"Transforming Global Leadership Through Innovation",
slug:"global-leadership",
date:"2026-08-01",
author:"Admin",
authorRole:"Senior Editor",
category:"Leadership",
readingTime:"6 min",
coverImage:"https://images.unsplash.com/photo-1522202176988-66273c2fd55b?w=1200",
description:"Discover how modern leadership is evolving across industries.",
tags:["Leadership","Innovation","Business"],
galleryImages:[
"https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1200",
"https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200"
],
content:[
{
type:"paragraph",
text:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci consequatur beatae recusandae temporibus."
},
{
type:"heading",
text:"Future Of Leadership"
},
{
type:"paragraph",
text:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit quae fuga illum veniam, dolores quisquam."
},
{
type:"bullets",
items:[
"Vision Driven Strategy",
"Global Collaboration",
"AI Powered Decision Making",
"Sustainable Growth"
]
},
{
type:"quote",
text:"Leadership is not about titles. It is about impact.",
attribution:"John Maxwell"
}
]
},
];


while (blogs.length < 12) {

blogs.push({

...blogs[0],

id: blogs.length + 1,

title: `Premium Business Article ${blogs.length + 1}`,

slug: `article-${blogs.length + 1}`,

category:["Business","Technology","Finance","Leadership"][blogs.length%4],

date:`2026-08-${String(blogs.length+1).padStart(2,"0")}`

});

}

export default function BlogSection(){
    const [progress, setProgress] = useState(0);

const [selectedBlog,setSelectedBlog]=useState(null);

const relatedBlogs=useMemo(()=>{

if(!selectedBlog) return [];

return blogs

.filter(item=>item.id!==selectedBlog.id)

.slice(0,3);

},[selectedBlog]);

useEffect(() => {

const handleScroll=()=>{

if(!selectedBlog) return;

const scrollTop=window.scrollY;

const docHeight=document.body.scrollHeight-window.innerHeight;

const percent=(scrollTop/docHeight)*100;

setProgress(percent);

}

window.addEventListener("scroll",handleScroll);

return()=>window.removeEventListener("scroll",handleScroll);

},[selectedBlog]);

return(

<section className="relative overflow-hidden bg-[#07111F] py-24">

<div className="absolute inset-0">

<img

src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1600"

className="h-full w-full object-cover blur-sm scale-110 opacity-20"

/>

<div className="absolute inset-0 bg-black/70"/>

</div>

<div className="relative z-10 max-w-7xl mx-auto px-6">

<p className="text-center uppercase tracking-[5px] text-amber-400">

Latest Insights

</p>

<h2 className="text-center text-5xl font-bold text-white mt-4">

ARTICLES & COLUMNS

</h2>

<p className="text-center text-gray-300 mt-5 max-w-3xl mx-auto">

Discover ideas, innovation and leadership perspectives from our experts.

</p>


<div className="mt-16">

<Swiper

modules={[Navigation,Pagination,Autoplay]}

navigation

pagination={{clickable:true}}

autoplay={{

delay:3500,

disableOnInteraction:false

}}

loop

spaceBetween={25}

breakpoints={{

320:{slidesPerView:1},

768:{slidesPerView:2},

1024:{slidesPerView:3},

1400:{slidesPerView:4}

}}

>

{

blogs.map(blog=>(

<SwiperSlide key={blog.id}><motion.div

whileHover={{y:-10}}

className="overflow-hidden rounded-2xl bg-white shadow-2xl"

>

<div className="overflow-hidden">

<img

src={blog.coverImage}

className="h-60 w-full object-cover transition duration-500 hover:scale-110"

/>

</div>

<div className="p-6">

<div className="flex items-center gap-2 text-gray-500 text-sm">

<Calendar size={15}/>

{blog.date}

</div>

<h3 className="mt-4 text-xl font-bold line-clamp-3">

{blog.title}

</h3>

<p className="mt-3 text-gray-600 line-clamp-3">

{blog.description}

</p>

<button

onClick={()=>setSelectedBlog(blog)}

className="mt-6 flex items-center gap-2 font-semibold text-amber-600"

>

Continue Reading

<ArrowRight size={18}/>

</button>

</div>

</motion.div>

</SwiperSlide>

))

}

</Swiper>

</div>

</div>

</section>

)

}

<AnimatePresence mode="wait">

{selectedBlog && (

<motion.div

layout

initial={{opacity:0,y:60}}

animate={{opacity:1,y:0}}

exit={{opacity:0,y:40}}

transition={{duration:.5}}

className="mt-20 overflow-hidden rounded-3xl bg-white shadow-2xl"

>

{/* HEADER */}

<div className="sticky top-0 z-30 flex items-center justify-between border-b bg-white/95 px-8 py-5 backdrop-blur">

<div>

<p className="text-xs uppercase tracking-[4px] text-amber-500">

Article Details

</p>

<h3 className="mt-1 text-lg font-bold">

{selectedBlog.category}

</h3>

</div>

<button

onClick={()=>setSelectedBlog(null)}

className="rounded-full border p-2 transition hover:bg-black hover:text-white"

>

<X size={18}/>

</button>

</div>

{/* IMAGE */}

<div className="relative h-[520px] overflow-hidden">

<img

src={selectedBlog.coverImage}

className="h-full w-full object-cover"

/>

<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"/>

<div className="absolute bottom-10 left-10">

<p className="mb-3 rounded-full bg-amber-500 px-4 py-1 text-xs uppercase tracking-[3px] text-white w-fit">

{selectedBlog.category}

</p>

<h2 className="max-w-4xl text-5xl font-bold leading-tight text-white">

{selectedBlog.title}

</h2>

</div>

</div>


<div className="mx-auto max-w-5xl px-8 py-12">

<div className="flex flex-wrap items-center gap-6 border-b pb-8 text-sm text-gray-600">

<div className="flex items-center gap-2">

<User size={17}/>

{selectedBlog.author}

</div>

<div className="flex items-center gap-2">

<Calendar size={17}/>

{selectedBlog.date}

</div>

<div className="flex items-center gap-2">

<Clock size={17}/>

{selectedBlog.readingTime}

</div>

<div className="flex items-center gap-2">

<Tag size={17}/>

{selectedBlog.tags.join(", ")}

</div>

</div>


<div className="mt-10 space-y-8">

{

selectedBlog.content.map((item,index)=>{

switch(item.type){

case "heading":

return(

<h2

key={index}

className="text-4xl font-bold"

>

{item.text}

</h2>

)

case "paragraph":

return(

<p

key={index}

className="text-lg leading-9 text-gray-700"

>

{item.text}

</p>

)

case "bullets":

return(

<ul

key={index}

className="space-y-4"

>

{

item.items.map((bullet,i)=>(

<li

key={i}

className="flex gap-4"

>

<div className="mt-2 h-2 w-2 rounded-full bg-amber-500"/>

<span className="text-lg text-gray-700">

{bullet}

</span>

</li>

))

}

</ul>

)

case "quote":

return(

<div

key={index}

className="rounded-3xl border-l-4 border-amber-500 bg-gray-50 p-8"

>

<p className="text-3xl italic">

"{item.text}"

</p>

<p className="mt-4 text-gray-500">

— {item.attribution}

</p>

</div>

)

default:

return null

}

})

}

</div>

<div className="mt-16">

<h3 className="mb-8 text-3xl font-bold">

Gallery

</h3>

<div className="grid gap-6 md:grid-cols-2">

{

selectedBlog.galleryImages.map((img,index)=>(

<img

key={index}

src={img}

className="h-80 w-full rounded-2xl object-cover"

/>

))

}

</div>

</div>

<div className="mt-16 flex flex-wrap items-center justify-between border-t pt-10">

<div>

<p className="text-sm uppercase tracking-[3px] text-gray-400">

Share Article

</p>

<div className="mt-4 flex gap-4">

<button className="rounded-full bg-blue-600 px-5 py-3 text-white">

Facebook

</button>

<button className="rounded-full bg-black px-5 py-3 text-white">

X

</button>

<button className="rounded-full bg-sky-700 px-5 py-3 text-white">

LinkedIn

</button>

</div>

</div>

<button

onClick={()=>{

setSelectedBlog(null)

window.scrollTo({

top:0,

behavior:"smooth"

})

}}

className="mt-8 rounded-full bg-black px-8 py-4 text-white transition hover:bg-amber-500"

>

← Back To Articles

</button>

</div>

</div>

</motion.div>

)}

</AnimatePresence>